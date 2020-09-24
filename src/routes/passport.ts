import * as express from "express"

export const register = (app: express.Application) => {
  const oid = "123456"

  app.get("/", (req: express.Request, res: express.Response) => {
    res.render("index")
  })

  app.get("/login", (req, res) => {
    res.redirect("home")
  })
  app.get("/logout",(req, res) =>{
    res.redirect("/")
  })
}
