import express from "express"
//import {TestSevice} from "../services/TestService"

export default const register = (app: express.Application) => {
  
  app.get("/all", (req: express.Request, res: express.Response) => {
    res.status(200).send({ message:"there are a lot users. :)"  })
    
  })
  app.post("/detail", (req: express.Request, res: express.Response) => {
    res.status(200).send({ "username":"lqwangxg", "age":20  })
  })


}
