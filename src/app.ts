// Reqired Basic
import express from 'express'
import path from "path"

// For security
import compression from "compression"
import lusca from "lusca"

// For Auth
import passport from "passport"

// For session and error message
import session from "express-session"
import flash from "express-flash"

// For mongoDB
import mongo from "connect-mongo"
import mongoose from "mongoose"

// For Primese
import bluebird from "bluebird"

// For Logger
import morgan from "morgan"
import logger from "./util/logger"


const app: express.Express = express()

// Global Parameters
app.set("port", process.env.SERVER_PORT || 3000)
app.set("mode", process.env.MODE || 'development')
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
 
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
app.use(session({ cookie: { maxAge: 60000 }, 
                  secret: 'secret123456-0-10',
                  resave: false, 
                  saveUninitialized: false}));
app.use(flash())

app.use(lusca.xframe("SAMEORIGIN"))
app.use(lusca.xssProtection(true))

// for static files. like html, js, css, img and so on.
app.use(express.static(__dirname + '/public'));

const router = express.Router()
router.get('helloworld', (req: express.Request, res: express.Response) =>{
  res.status(200)
  res.send({message: 'hello, world. this is from express typescript applicatoin.'})
})

app.use((req: express.Request, res: express.Response) =>{
  res.status(404)
  res.render( 'error', {
    param: {
      status: 404,
      message: 'not found'
    }
  })
})


export default app;
