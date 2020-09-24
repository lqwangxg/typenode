import express from 'express'
import compression from "compression"
import session from "express-sessoin"
import bodyParser from "body-parser"
import lusca from "lusca"
import mongo from "connect-mongo"
import flash from "express-flash"
import path from "path"
import mongoose from "mongoose"
import passport from "passport"
import bluebird from "bluebird"

import { MONGODB_URI, SESSION_SECRET } from "./util/secrets"


// Controllers (route handlers)
import * as homeController from "./controllers/home"
//import * as userController from "./controllers/user"
//import * as apiController from "./controllers/api"
//import * as contactController from "./controllers/contact"

// API keys and passport configuration
import * as passportConfig from "./config/passport"
//import passportlocal from "passport-local"
//import passportFacebook from "passport-facebook"

// initialize configuration
//import dotenv from "dotenv"
//dotenv.config()

const app: express.Express = express()

app.set("port", process.env.SERVER_PORT || 3000)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// CORS permission
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// body-parser for request and response 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// simple logger
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('%s %s', req.method, req.url);
  next();
});
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  next(err);
})

// for static files. like html, js, css, img and so on.
app.use('/static', express.static(__dirname + '/public'));

//sessionAuth.register(app)

// GetとPostのルーティング
const router: express.Router = express.Router()
router.get('/', (req:express.Request, res:express.Response) => {
  res.render("index")
  //res.send("hello, this is the default page.")
})
router.get('/home', (req:express.Request, res:express.Response) => {
  res.render("home")
})

router.get('/api/getTest', (req:express.Request, res:express.Response) => {
  res.json(req.query)
})
router.post('/api/postTest', (req:express.Request, res:express.Response) => {
  res.json(req.body)
})
app.use(router)

// 3000番ポートでAPIサーバ起動
app.listen(port,()=>{ console.log(`webserver started at http://localhost:${port}`) })
