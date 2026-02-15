import mongoose from "mongoose"

const watchlistItemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tmdbId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    posterPath: {
        type: String
    },
    type: {
        type: String,
        enum: ["movie", "series"],
        default: "movie"
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

// Compound index to prevent duplicates
watchlistItemSchema.index({ userId: 1, tmdbId: 1 }, { unique: true })

export default mongoose.model("WatchlistItem", watchlistItemSchema)
