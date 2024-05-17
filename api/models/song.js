const mongoose = require("mongoose");

const SongModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
        default: "https://image.pngaaa.com/851/2152851-middle.png",
    },
    filename: { // Add filename property to store the file path
        type: Array,
        required: true,
    },
    artistes: {
        type: Array,
        default: [],
    },
    artistIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artiste",
        },
    ],
    likes: {
        type: Map,
        of: Boolean,
        default: new Map(),
    },
    type: {
        type: String,
        required: true,
        default: "Song",
    },
    size: Number,

});

module.exports = mongoose.model('Song', SongModel);