const express = require("express");
const {handleGetAllUsers,handlePostNewUser,handleGetUserById,handlePutUserById,handlePatchUserById,handleDeleteUserById} = require('../controllers/user');
const router=express.Router();
router
  .route("/")
  .get(handleGetAllUsers)
  .post(handlePostNewUser);

//
router
  .route("/:id")
  .get(handleGetUserById)
  .put(handlePutUserById)
  .patch(handlePatchUserById)
  .delete(handleDeleteUserById);

module.exports=router;
