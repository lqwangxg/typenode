import * as express from "express"

export const register = (app: express.Application) => {

  app.get("/", (req: express.Request, res: express.Response) => {
    res.send({"token": 123456789 })
  })

  app.get("/login", (req, res) => {
    res.redirect("/login")
  })

  app.get("/logout",(req, res) =>{
    res.redirect("/")
  })
}
