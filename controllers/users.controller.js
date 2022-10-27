const UsersDao = require('./../models/daos/Users.dao');
const users = new UsersDao()

const saveUserController = async (req, res, next) => {
	try {
		const newUser = await users.saveUser(req.body)
		console.log('[POST]==> User saved')
		res.status(200).json(newUser)
	} catch (error) {
		console.log('error', error.message)
		next(error)
	}
}
const getUserByEmailController = async (req, res, next) => {
	let email = req.params.email
	try {
		const user = await users.getUserByEmail(email)
		console.log(`[GET]==> Get User By email ${email}`)
		res.status(200).json(user)
	} catch (error) {
		console.log('error', error.message)
		next(error)
	}

}

//only admin
const getAllUsersController = async (req, res, next) => {
	try {
		const usrs = await users.getAllUsers()
		console.log('[GET]==> Get all users')
		res.status(200).json(usrs)
	} catch (error) {
		console.log('error', error.message)
		next(error)
	}
}
const deleteAllUsersController = async (req, res, next) => {
	try {
		const usrs = await users.deleteAllUsers()
		console.log(`[DELETE]==> All users have been deleted`)
		res.status(200).json(usrs)
	} catch (error) {
		console.log('error', error.message)
		next(error)
	}
}
const deleteUserByEmailontroller = async (req, res, next) => {
	let email = req.params.email
	try {
		const user = await users.deleteUserByEmail(email)
		console.log(`[DELETE]==> Delete User By email ${email}`)
		res.status(200).json(user)
	} catch (error) {
		console.log('error', error.message)
		next(error)
	}
}
const updateUserByIdController= async(req,res,next)=>{
	try {
			const id = req.params.id
			const updateUser = {
				name:req.body.name,
				isAdmin:req.body.isAdmin,
				email: req.body.email,
				userAvatar : req.body.userAvatar,
				password : req.body.password,
			}
			const user = await users.updateById(id,updateUser)
			console.log(`[PUT]==> Update User with id '${id}'`)
			res.status(200).json({message:"User updated",status:"ok"})
	} catch (error) {
			console.log('error',error.message)
			next(error)
	}
}


module.exports = {
	getAllUsersController,
	getUserByEmailController,
	saveUserController,
	updateUserByIdController,
	deleteUserByEmailontroller,
	deleteAllUsersController

}