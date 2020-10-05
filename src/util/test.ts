import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

export default class EnvManager {
  greeting: string;
  username: string;
  readonly secretKey: string;
  
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
  }

  showGreeting(){
    this.greeting = this.username + " hello, how are you?";
  }
}
