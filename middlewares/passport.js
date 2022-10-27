const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt');

const UsersDao= require('./../models/daos/Users.dao');
const User = new UsersDao();

const { formatUserForDB } = require('../utils/users.utils');

const salt = () => bCrypt.genSaltSync(10); 
const encrypt = (password)=> bCrypt.hashSync(password,salt())

const isValidPassword = (user, password)=>bCrypt.compareSync(password,user.password);


//Passport Local Strategy

//registry logic
passport.use('signup',new LocalStrategy({
	passReqToCallback:true,
	},
	(req, username, password, done)=>{

    const userObject = {
          name: req.body.firstname,
          email: username,
          password: encrypt(password),
          isAdmin: req.body.isAdmin,
    }
		if (userObject.isAdmin===true) {
			userObject.userAvatar='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'
		} else {
			userObject.userAvatar='https://toppng.com/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png'
		}

		const newUser = formatUserForDB(userObject);
		User.saveUser(newUser)
		.then((user)=>{
			console.log('Successful registration');
			return done(null,user)
		})
		.catch(error=>{
			console.log('Error signing up >>>',error.message)
	
			return done(error)
		})
	}
));



//login logic
passport.use('signin',new LocalStrategy(
	(username, password, done)=>{
		User.getUserByEmail(username)
		.then(user=>{
			if(!isValidPassword(user,password)){
				console.log('Incorrect password');
				return done(null,false)
			}
			console.log(`User ${user.isAdmin ? "Admin" : "Client"} log in`)
			return done(null,user)
		})
		.catch(error =>{
			console.log('Error signing in >>>',error.message)
			return done(null,user)
			//return done(error)
		})

	}
));


passport.serializeUser((user,done)=>{
	done(null,user._id)
})


passport.deserializeUser((id,done)=>{	
	User.getUserById(id)
	.then(user=>{

		done(null,user)
	})
})




module.exports= passport;
