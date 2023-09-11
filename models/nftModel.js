const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A nft must have a name"],
        unique: true,
    },
    duration: {
        type: String,
        required: [true, "must provide duration"],
    },
    maxGroupSize: {
        type: Number,
        required: [true, "must have a group size"],
    },
    difficulty: {
        type: String,
        required: [true, "must have difficulty"],
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, "A nft must have a price"],
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, "must provide the summary"],
    },
    description: {
        type: String,
        trim: true,
    },
    imageCover: {
        tyep: String,

    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    startDates: [Date],
});

const NFT = mongoose.model("NFT", nftSchema);

module.exports = NFT;