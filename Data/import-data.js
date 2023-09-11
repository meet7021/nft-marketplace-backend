const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const NFT = require("./../models/nftModel")

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
}).then((con) => {
    // console.log(con.connection);
    console.log("DB Connection Successful");
})

const nfts = JSON.parse(fs.readFileSync(`${__dirname}/Nft-data/nft-sample.json`, "utf-8"));

//IMPORT DATA
const importData = async () => {
    try {
        await NFT.create(nfts)
        console.log('Data Successfully Loaded')
        process.exit();
    }
    catch (error) {
        console.log(error)
    }
};

//IMPORT DATA
const deleteData = async () => {
    try {
        await NFT.deleteMany();
        console.log('Data Successfully deleted')
        process.exit();
    }
    catch (error) {
        console.log(error)
    }
};

if (process.argv[2] === "--import") {
    importData()
}
else if (process.argv[2] === "--delete") {
    deleteData()
}