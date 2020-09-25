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
//app.set("view engine", "pug")

 
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

// for static files. like html, js, css, img and so on.
app.use('/static', express.static(__dirname + '/public'));

export default app;
