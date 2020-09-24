import express from 'express'
import compression from "compression"
import session from "express-session"
import bodyParser from "body-parser"
import lusca from "lusca"
import mongo from "connect-mongo"
import flash from "express-flash"
import path from "path"
import mongoose from "mongoose"
import passport from "passport"
import bluebird from "bluebird"
import morgan from "morgan"

import { MONGODB_URI, SESSION_SECRET } from "./util/secrets"
const MongoStore = mongo(session)

// Controllers (route handlers)
//import * as homeController from "./controllers/home"
//import * as userController from "./controllers/user"
//import * as apiController from "./controllers/api"
//import * as contactController from "./controllers/contact"

// API keys and passport configuration
//import * as passportConfig from "./config/passport"
//import passportlocal from "passport-local"
//import passportFacebook from "passport-facebook"

// initialize configuration
//import dotenv from "dotenv"
//dotenv.config()

const app: express.Express = express()

// connect to mongoDB
if (MONGODB_URI){
  mongoose.Promise = bluebird
  mongoose.connect(MONGODB_URI, 
    { 
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true 
    }
  ).then( ()=>{
   /* ready to use. */ 
  }).catch(err =>{
   console.error(`MongoDB connection error. Please make sure MongoDB is running. ${err}`)
  })

  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
      url: MONGODB_URI,
      autoReconnect: true
    })
  }))
}else{
  app.use(session({ secret: SESSION_SECRET, cookie: { maxAge: 60000 }}))
}

app.set("port", process.env.SERVER_PORT || 3000)
app.set("mode", process.env.MODE || 'development')
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
//app.set("view engine", "pug")

// logging: Standard Apache combined log output. 
// options: combined,common,dev,short,tiny
app.use(morgan("combined"))
// attempt to compress response bodies for all request that traverse through
app.use(compression())
// CORS permission
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// body-parser for request and response 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(lusca.xframe("SAMEORIGIN"))
app.use(lusca.xssProtection(true))

/*
app.use((req, res, next) =>{
  res.locals.user = req.user
  next()
})
*/
/*
app.use((req, res, next) =>{
  // After successful login, redirect back to the intended page
  if(!req.user &&
  req.path !== "/login" &&
  req.path !== "/signup" &&
  !req.path.match(/^\/auth/) &&
  !req.path.match(/\./) {
    req.session.returnTo = req.path
  } else if (req.user && 
  req.path == "/account"){
    req.session.returnTo = req.path
  }
  next()
})
*/

// for static files. like html, js, css, img and so on.
app.use('/static', express.static(__dirname + '/public'));


/**
 * Primary app routes 
 */
app.get("/", homeController.index)
//import userRouter from "./route/user.ts"
//import contactRouter from "./route/contact.ts"
//app.use("/user", userRouter)
//app.use("/contact",contactRouter)

expert default app
