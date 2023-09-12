//import cors from "cors"

const express = require("express");
const morgan = require("morgan");
const cors = require("cors")



const nftsRouter = require("./routes/nftsRoute");
const usersRouter = require("./routes/usersRoute");

const app = express();
app.use(express.json());

app.use(cors())

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

//SERVING TEMPLETE 

app.use(express.static(`${__dirname}/Data/Nft-img`));

//CUSTOM MIDDLE WARE

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

{// app.get('/', (req, res) => {
    //     res.status(200).send("Tested successfully")
    // })

    // app.get('/', (req, res) => {
    //     res.status(200).json({
    //         message: "Testing",
    //         api: "nft-marketplace",
    //     });
    // });

    // app.post('/', (req, res) => {
    //     res.status(201).json({
    //         message: "your data",
    //     });
    // })
}

{//***REFACTORED CODE -> ROUTER NFT***/

    // app.get('/api/v1/nfts', getAllNfts);
    // app.post('/api/v1/nfts', createNft);
    // app.get("/api/v1/nfts/:id", getSingleNft);
    // app.patch("/api/v1/nfts/:id", updateNft);
    // app.delete("/api/v1/nfts/:id", deleteNft);
}

//ROUTE SECTION
app.use('/api/v1/nfts', nftsRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;