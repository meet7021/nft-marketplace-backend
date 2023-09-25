const express = require("express");

const nftControllers = require("./../Controller/nftController")

//const nftController = require("./../Controller/nftController");
const router = express.Router();
//router.param("id", nftControllers.checkId);

//TOP 5 NFTs by price
router.route("/top-5-nfts").get(nftControllers.aliasTopNFTs, nftControllers.getAllNfts)

//STATS ROUTE

router.route("/nfts-stats").get(nftControllers.getNFtsStats);

router.route("/monthly-plan/:year").get(nftControllers.getMonthlyPlan);

//***REFACTORED CODE -> ROUTER NFT***/

router.route('/').get(nftControllers.getAllNfts)
    // .post(nftControllers.checkBody, nftControllers.createNft);
    .post(nftControllers.createNft);
router.route("/:id").get(nftControllers.getSingleNft).patch(nftControllers.updateNft).delete(nftControllers.deleteNft);

module.exports = router;