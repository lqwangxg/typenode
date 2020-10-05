import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

export default class EnvManager {
  greeting: string;
  username: string;
  readonly secretKey: string;
  readonly mongoUrl:  string;

  constructor(uname: string) {
    this.username = uname;
    this.greeting = "welcome here."

    if (fs.existsSync(".env")) {
      logger.debug("Using .env file to supply config environment variables");
      dotenv.config({ path: ".env" });
    } else {
      logger.debug("Using .env.example file to supply config environment variables");
      dotenv.config({ path: ".env.example" });  
      // you can delete this after you create your own .env file!
    }

    const SESSION_SECRET = process.env["SESSION_SECRET"];
    if (!SESSION_SECRET) {
      logger.debug("No client secret. Set SESSION_SECRET environment variable.");
      this.secretKey = "sessionKeySecret"
    } else {
      this.secretKey = SESSION_SECRET + "";
    }
    logger.debug("secretKey:" + this.secretKey);
    const MONGODB_URI = process.env["MONGODB_URI"];
    if (!MONGODB_URI) {
      this.mongoUrl = "mongodb://root:example@mongo:27017/local?authSource=admin";
      logger.debug("No MongodbUrl set. use default url.");
    } else {
      this.mongoUrl = MONGODB_URI + "";
    }
    logger.debug("mongoUrl:" + this.mongoUrl);
  }
  
  showGreeting(){
    this.greeting = this.username + " hello, how are you?";
  }
  changeUserName(newUserName: string){
    logger.debug("oldUserName:" + this.username);
    this.username = newUserName;
    logger.debug("newUserName:" + this.username);
  }
}
