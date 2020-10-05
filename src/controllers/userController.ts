import Express from 'express'
import * as User from "../models/user"

export default {
  index: (req: Express.Request, res: Express.Response) => {
    const users = User.find()
    res.render('user',{users})
    //res.send('<h1>User index</h1>')
  },
}
