import mongoose from "mongoose";
import WatchlistItem from "../models/WatchlistItem.js";

// POST /watchlist - Add movie to watchlist
const addToWatchlist = async (req, res, next) => {
    try {
        const { tmdbId, title, posterPath, type = "movie" } = req.body;

        if (!tmdbId || !title) {
            return res.status(400).json({
                success: false,
                message: "tmdbId and title are required"
            });
        }

        // Check if already in watchlist
        const existing = await WatchlistItem.findOne({
            userId: req.user.id,
            tmdbId
        });

        if (existing) {
            return res.status(409).json({
                success: false,
                message: "Movie already in watchlist"
            });
        }

        const item = await WatchlistItem.create({
            userId: req.user.id,
            tmdbId,
            title,
            posterPath,
            type
        });

        res.status(201).json({
            success: true,
            data: item
        });
    } catch (error) {
        next(error);
    }
};

// GET /watchlist - Get user's watchlist
const getWatchlist = async (req, res, next) => {
    try {
        const { page = 1, limit = 20 } = req.query;

        const pageNum = Math.max(parseInt(page, 10) || 1, 1);
        const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 50);
        const skip = (pageNum - 1) * limitNum;

        const [total, items] = await Promise.all([
            WatchlistItem.countDocuments({ userId: req.user.id }),
            WatchlistItem.find({ userId: req.user.id })
                .sort({ addedAt: -1 })
                .skip(skip)
                .limit(limitNum)
        ]);

        res.status(200).json({
            success: true,
            meta: {
                page: pageNum,
                limit: limitNum,
                total,
                pages: Math.ceil(total / limitNum)
            },
            data: items
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /watchlist/:tmdbId - Remove from watchlist
const removeFromWatchlist = async (req, res, next) => {
    try {
        const { tmdbId } = req.params;

        const item = await WatchlistItem.findOneAndDelete({
            userId: req.user.id,
            tmdbId: parseInt(tmdbId, 10)
        });

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found in watchlist"
            });
        }

        res.status(200).json({
            success: true,
            message: "Removed from watchlist"
        });
    } catch (error) {
        next(error);
    }
};

// GET /watchlist/check/:tmdbId - Check if movie is in watchlist
const checkInWatchlist = async (req, res, next) => {
    try {
        const { tmdbId } = req.params;

        const item = await WatchlistItem.findOne({
            userId: req.user.id,
            tmdbId: parseInt(tmdbId, 10)
        });

        res.status(200).json({
            success: true,
            inWatchlist: !!item
        });
    } catch (error) {
        next(error);
    }
};

export default {
    addToWatchlist,
    getWatchlist,
    removeFromWatchlist,
    checkInWatchlist
};
