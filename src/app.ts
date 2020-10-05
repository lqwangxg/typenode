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

// For Router
import userRouter from "./routes/index"
import Greeter from "./util/test"

// For .env parameters.
//import { MONGODB_URI, SESSION_SECRET } from "./util/secrets"
import * as sec from "./util/secrets"

const app: express.Express = express()

const MongoStore = mongo(session)
const mongoUrl = "";
mongoose.Promise = bluebird;
if(mongoUrl){
  mongoose.connect(mongoUrl, 
  { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
  }
  ).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
  ).catch(err => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
    // process.exit();
  });
}
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
app.use(session({ 
  cookie: { maxAge: 60000 }, 
  secret: 'SESSION_SECRET',
  resave: true, 
  saveUninitialized: true,
  //store: new MongoStore({
  //  url: sec.mongoUrl,
  //  autoReconnect: true
  //})

}));
app.use(flash())

app.use(lusca.xframe("SAMEORIGIN"))
app.use(lusca.xssProtection(true))

// for static files. like html, js, css, img and so on.
app.use(express.static(__dirname + '/public'));

// Router from subfiles.
app.use("/user", userRouter)

// GET method route
app.get('/', function (req, res) {
  const greeter = new Greeter("lqwangxg");
  greeter.showGreeting()
  res.send('<h1>Hello,world</h1> <hr> This is GET request to the homepage.and '+greeter.greeting)
})

//const router = express.Router()
app.get('/index', (req: express.Request, res: express.Response) =>{
   res.render('index')
})

app.get('/api', (req: express.Request, res: express.Response) =>{
  res.status(200)
  res.send({message: 'hello, world. this is from express typescript applicatoin.'})
})

app.get('/home', (req: express.Request, res: express.Response) =>{
  res.render('home')
})

export default app;
