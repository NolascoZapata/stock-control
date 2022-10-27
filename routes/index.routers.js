const express = require('express');
const router = express.Router();
const prodRoutes = require('./products.routes');
const userRoutes = require('./users.routes')
const authRoutes = require('./auth.routes')

//middlewares
router.use(express.json())
router.use(express.urlencoded({extended: true}))
router.use('/control/products',prodRoutes)
router.use('/control/users',userRoutes)
router.use('/auth',authRoutes)

const auth = require('./../middlewares/auth')
const authAdmin = require('./../middlewares/authAdmin')
//Routes
router.get('/', async (req,res)=>{
	const user =  req.user;
  if (user) {
    return res.redirect('/home');
  }
  else {
    return res.status(200).render('pages/login');
  }
	res.status(200).render('pages/login')
})
router.get('/register', async (req,res)=>{
	res.status(200).render('pages/register')
})
router.get('/home',auth, async (req,res)=>{
	const user = req.user
	const isAdmin = req.user.isAdmin
	res.status(200).render('pages/home',{user,isAdmin})
})
router.get('/users',authAdmin, async (req,res)=>{
	const user = req.user
	const isAdmin = req.user.isAdmin
	res.status(200).render('pages/users',{user,isAdmin})
})

router.get('/profile',auth, async (req,res)=>{
	const user = req.user
	const isAdmin = req.user.isAdmin
	res.status(200).render('pages/profile', {user,isAdmin})
})
router.get('/logout',auth, async (req,res)=>{
	req.logOut(function(err) {
		if (err) { 
			return next(err)
		}
		})
	console.log(`User log out`);
	res.redirect('/')
})

router.get('/signin-error', async (req,res)=>{
	let error ={message:"Sign in"} 
	res.render('pages/error',{error})
})
router.get('/signup-error', async (req,res)=>{
	let error ={message:"Sign up"} 
	res.render('pages/error',{error})
})



module.exports = router