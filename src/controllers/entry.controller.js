import mongoose from "mongoose";
import MediaEntry from "../models/MediaEntry.js";


const createEntry = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      userId: req.user.id
    };

    const entry = await MediaEntry.create(payload);

    res.status(201).json({
      success: true,
      data: entry
    });
  } catch (error) {
    next(error);
  }
};


const getEntries = async (req, res, next) => {
  try {
    const { type, page = 1, limit = 10 } = req.query;

    const query = { userId: req.user.id };

    if (type) query.type = type;

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 50);
    const skip = (pageNum - 1) * limitNum;

    const [total, entries] = await Promise.all([
      MediaEntry.countDocuments(query),
      MediaEntry.find(query)
        .sort({ dateLogged: -1, createdAt: -1 })
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
      data: entries
    });
  } catch (error) {
    next(error);
  }
};


const getEntryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid entry id"
      });
    }

    const entry = await MediaEntry.findById(id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Entry not found"
      });
    }

    // ownership check
    if (entry.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Forbidden"
      });
    }

    res.status(200).json({
      success: true,
      data: entry
    });
  } catch (error) {
    next(error);
  }
};


// PUT /entries/:id
const updateEntry = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid entry id"
      });
    }

    const entry = await MediaEntry.findById(id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Entry not found"
      });
    }

    if (entry.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Forbidden"
      });
    }

    // apply updates (do NOT allow userId changes)
    const updates = { ...req.body };
    delete updates.userId;

    Object.assign(entry, updates);
    await entry.save(); // triggers schema validation + hooks

    res.status(200).json({
      success: true,
      data: entry
    });
  } catch (error) {
    next(error);
  }
};


// DELETE /entries/:id
const deleteEntry = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid entry id"
      });
    }

    const entry = await MediaEntry.findById(id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Entry not found"
      });
    }

    if (entry.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Forbidden"
      });
    }

    await entry.deleteOne();

    res.status(200).json({
      success: true,
      message: "Entry deleted"
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createEntry,
  getEntries,
  getEntryById,
  updateEntry,
  deleteEntry
};
