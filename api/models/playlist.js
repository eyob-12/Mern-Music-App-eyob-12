const mongoose = require("mongoose");

const PlaylistContent = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: false,
    },
    songs: {
        type: Array,
        default: [],
    },
    type: {
        type: String,
        required: true,
        default: "Playlist",
    },

}, { timestamps: true });

const Playlist = mongoose.model("Playlist", PlaylistContent);
module.exports = Playlist;