//Admin

const authAdmin =(req,res,next)=>{
  if (req.session && req.user.isAdmin) {
      return next()
  }
  return res.status(401).send('<h1>No Autorizado</h1><a href="/">Back to Login</a>')
}


module.exports = authAdmin
