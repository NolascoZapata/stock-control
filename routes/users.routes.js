const express = require('express');
const router = express.Router();

const {
  getAllUsersController,
  getUserByEmailController,
  saveUserController,
  deleteUserByEmailontroller,
  deleteAllUsersController
} = require('../controllers/users.controller')

//middlewares
router.use(express.json())
router.use(express.urlencoded({extended: true}))

//Routes

//everyone
router.post('/',saveUserController);

//// only client
// router.put('/:email',updateUserByEmailController);

////client or admin 
router.get('/:email',getUserByEmailController);
router.delete('/:email', deleteUserByEmailontroller);

////only admin 
router.get('/', getAllUsersController);
router.delete('/',deleteAllUsersController)




getAllUsersController,
getUserByEmailController,
saveUserController,
deleteUserByEmailontroller,
deleteAllUsersController



module.exports = router