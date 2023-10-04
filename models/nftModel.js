const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const nftSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A nft must have a name"],
        unique: true,
        trim: true,
        maxlength: [40, "nft must have 50 character"],
        minlength: [2, "nft must have atleast 1 character"],
        //validate: [validator.isAlpha, "Nft name must contain only characters"]
    },
    slug: String,
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
        enum: {
            values: ["easy", "medium", "difficulty"],
            message: "Difficulty is either: easy, medium and difficulty",
        },
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, "must have 1"],
        max: [5, "must have 5"]
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, "A nft must have a price"],
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (val) {
                return val < this.price
            },
            message: "Discount price ({VALUE}) should be below regular price",
        },
    },
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
        select: false,
    },
    startDates: [Date],
    secretNfts: {
        type: Boolean,
        default: false,
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    });

nftSchema.virtual("durationWeeks").get(function () {
    return this.duration / 7;
}
);

//MONGOOSE MIDDLEWARE
//DOCUMENT MIDDLEWARE: runs before .save() or .create()

nftSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// nftSchema.pre("save", function (next) {
//     console.log("Document will save...");
//     next();
// });

// nftSchema.post("save", function (doc, next) {

//     console.log(doc);
//     next();
// });

//Query Middleware

nftSchema.pre(/^find/, function (next) {
    this.find({ secretNFTs: { $ne: true } });
    this.start = Date.now();
    next();
});

nftSchema.post(/^find/, function (doc, next) {
    console.log(`Query took time: ${Date.now() - this.start} times`)
    console.log(doc)
    next();
});

// // nftSchema.pre("findOne", function (next) {
// //     this.find({ secretNFTs: { $ne: true } });
// //     next();
// // })


//Aggregate middleware
nftSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { secretNFTs: { $ne: true } } });
    next();
});


const NFT = mongoose.model("NFT", nftSchema);

module.exports = NFT;