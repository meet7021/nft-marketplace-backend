// //  const fs = require("fs");

// // const nfts = JSON.parse(
// //     fs.readFileSync(`${__dirname}/../Data/Nft-data/nft-sample.json`));


// const NFT = require("./../models/nftModel");
// //check id Function

// exports.checkId = (req, res, next, value) => {

//     // if (req.params.id * 1 > nfts.length) {
//     //     console.log(`ID: ${value}`);
//     //     return res.status(404).json({
//     //         status: "fail",
//     //         message: "Invalid Id",
//     //     });
//     // }
//     next();
// }

// //checkBody Function

// // exports.checkBody = (req, res, next) => {
// //     if (!req.body.name || req.body.price) {
// //         return res.status(400).json({
// //             status: "fail",
// //             message: "Missing name and price",
// //         });
// //     }
// //     next();
// // };

// //GET REQUEST FOR OUR API

// exports.getAllNfts = (req, res) => {
//     console.log(req.requestTime);
//     res.status(200).json({
//         status: "success",
//         requestTime: req.requestTime,
//         // results: nfts.length,
//         // data: {
//         //     nfts: nfts,
//         // },
//     });
// };

// //POST REQUEST FOR OUR API

// exports.createNft = (req, res) => {

//     // console.log(req.body);
//     // console.log(req);

//     // const newId = nfts[nfts.length - 1].id + 1;
//     // const newNFTs = Object.assign({ id: newId }, req.body);

//     // nfts.push(newNFTs);

//     // fs.writeFile(`${__dirname}/Data/Nft-data/nft-sample.json`, JSON.stringify(nfts), (err) => {
//     //     res.status(201).json(
//     //         {
//     //             status: "success",
//     //             nft: newNFTs,
//     //         }
//     //     );
//     // })
//     //res.send("Post NFT");

// }

// //GET SINGLE NFT

// exports.getSingleNft = (req, res) => {
//     //console.log(req.params);

//     const id = req.params.id * 1;
//     // const nft = nfts.find((el) => (el.id === id));
//     // // if (id => nfts.length) {
//     // if (!nft) {
//     //     return res.status(404).json({
//     //         status: "fail",
//     //         message: "Invalid ID",
//     //     });
//     // }

//     res.status(200).json({
//         status: "success",
//         // data:
//         // {
//         //     nft,
//         // },
//     });
// }

// //PATCH METHOD

// exports.updateNft = (req, res) => {

//     // if (req.params.id * 1 > nfts.length) {
//     //     return res.status(404).json({
//     //         status: "fail",
//     //         message: "Invalid Id",
//     //     });
//     // }
//     res.status(200).json({
//         status: "success",
//         data: {
//             nft: "Updating nft"
//         }
//     });
// }

// // DELETE METHOD

// exports.deleteNft = (req, res) => {
//     res.status(204).json({
//         status: "success",
//         data: null
//     });
// }



// PART 2 RE FACTORIZATION

const NFT = require("./../models/nftModel");


//GET REQUEST FOR OUR API

exports.getAllNfts = async (req, res) => {

    try {

        //BUILD QUERY

        const queryObj = { ...req.query }
        const excludedFields = ["page", "sort", "limit", "fields"];
        excludedFields.forEach((el) => delete queryObj[el]);

        // console.log(req.query, queryObj);

        //EXCECUTE QUERY BASED ON >,<,<=,>=

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
        //console.log(JSON.parse(queryStr))
        // const sort = {};
        const query = NFT.find(JSON.parse(queryStr));

        // SORTING METHOD
        // if (req.query.sort) {
        //     const sortBy = req.query.sort.split(",").join(" ");
        //     console.log(sortBy);
        //     query = query.sort(sortBy);
        // }
        // else {
        //     query = query.sort("-createdAt");
        // }

        // //Fields Limiting
        // if (req.query.fields) {
        //     const fields = req.query.fields.split(",").json(" ");
        //     query = query.select(fields);
        // }
        // else {
        //     query = query.select("__v");
        // }



        const nfts = await query;

        //SEND QUERY 

        res.status(200).json({
            status: "success",
            // requestTime: req.requestTime,
            results: nfts.length,
            data: {
                nfts,
            }
        });


    }
    catch (error) {
        res.status(404).json({
            status: "fail",
            message: "server errror",
        })
    }
};

//POST REQUEST FOR OUR API

exports.createNft = async (req, res) => {

    // const newNFT = new NFT({})
    // newNFT.save();

    try {
        const newNFT = await NFT.create(req.body);

        res.status(201).json
            ({
                status: "success",
                data: {
                    nft: newNFT
                },
            });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        })
    }
};

//GET SINGLE NFT

exports.getSingleNft = async (req, res) => {

    try {

        const nft = await NFT.findById(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                nft,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        })
    }

}

//PATCH METHOD

exports.updateNft = async (req, res) => {

    try {

        const nft = await NFT.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: "success",
            data: {
                nft,
            },
        });
    }
    catch (error) {
        res.status(404).json({
            status: "fail",
            message: error,
        })
    }
}

// DELETE METHOD

exports.deleteNft = async (req, res) => {

    try {

        await NFT.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: "success",
            data: null
        });
    }
    catch (error) {
        res.status(404).json({
            status: "fail",
            message: error,
        })
    }
}
