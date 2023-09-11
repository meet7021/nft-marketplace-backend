
const express = require("express");

const { getAllUsers, createUser, getSingleUser, updateUser, deleteUser } = require("./../Controller/userController");

const router = express.Router();
//***REFACTORED CODE -> USER NFT**/

router.route('/').get(getAllUsers).post(createUser);
router.route("/:id").get(getSingleUser).patch(updateUser).delete(deleteUser);

module.exports = router;