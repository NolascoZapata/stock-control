const express = require('express');
const app = express()
const mongoose = require('mongoose')
const compression = require('compression')
const path = require('path')
const routes = require('./routes/index.routers')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require('passport')

const PORT = process.env.PORT | 8080

app.use(compression())
require('dotenv').config();



app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, '/public')))


//Express-Session
app.use(session({
  name: 'babies-session',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
  mongoUrl: `mongodb+srv://NolascoZapata:${process.env.DB_PASSWORD}@backend-coderhouse.0dkdf.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`
  })
}))

//-----Passport Session
app.use(passport.initialize());
app.use(passport.session());




//Routes
app.use('/',routes)

//----------------Template engine----------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

(async () => {

    await mongoose
        .connect(`mongodb+srv://NolascoZapata:${process.env.DB_PASSWORD}@backend-coderhouse.0dkdf.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`)
        .then(() => console.log(`Connected to ${process.env.DATABASE}`))
        .then(()=>{app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))})
})()
