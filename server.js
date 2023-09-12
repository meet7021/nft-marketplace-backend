const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");
//
// const cors = require("cors")
//

//console.log(app.get("env"));

//
// app.use(cors())
//

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

//console.log(process.env);


// const testNFT = new NFT({
//     name: "Monk",
//     rating: 5,
//     price: 100,
// })



// testNFT.save().then(docNFT => {
//     console.log(docNFT)
// }).catch((error) => {
//     console.log("ERROR:", error);
// });

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
