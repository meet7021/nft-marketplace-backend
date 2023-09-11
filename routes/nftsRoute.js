const express = require("express");

const nftControllers = require("./../Controller/nftController")

//const nftController = require("./../Controller/nftController");
const router = express.Router();
//router.param("id", nftControllers.checkId);

//***REFACTORED CODE -> ROUTER NFT***/

router.route('/').get(nftControllers.getAllNfts)
    // .post(nftControllers.checkBody, nftControllers.createNft);
    .post(nftControllers.createNft);
router.route("/:id").get(nftControllers.getSingleNft).patch(nftControllers.updateNft).delete(nftControllers.deleteNft);

module.exports = router;