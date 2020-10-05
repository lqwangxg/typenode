import Express from 'express'
import UserDocument, * as User from "../models/user"

export default {
  index: async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    //const users = User.find()
    //res.render('user',{users})
    //res.send('<h1>User index</h1>')
    try{
      //const users = await User.find({}).exec()
      const users = await UserDocument.find({})
      res.locals.users = users
      next()
    } catch (err) {
      next(err)
    }
  },
  indexView: (req: Express.Request, res: Express.Response) => {
    res.render('user')
  },
}
