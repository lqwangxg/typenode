import express from 'express'

const router = express.Router();

router.get('/:userid', (req: express.Request, res: express.Response) =>{
    res.status(200).send({ message: 'welcome to access user pages,'+req.params["userid"] })
})

router.get('/', (req: express.Request, res: express.Response) =>{
   res.status(200).send({ message: 'this is index of user' })
})

//module.exports = router;
export default router;
