import express from 'express'

const app: express.Express = express()

// CORSの許可
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// body-parserに基づいた着信リクエストの解析
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

// GetとPostのルーティング
const router: express.Router = express.Router()
router.get('/', (req:express.Request, res:express.Response) => {
  res.send("hello, this is the default page.")
})
router.get('/api/getTest', (req:express.Request, res:express.Response) => {
  res.json(req.query)
})
router.post('/api/postTest', (req:express.Request, res:express.Response) => {
  res.json(req.body)
})
app.use(router)

// 3000番ポートでAPIサーバ起動
app.listen(3000,()=>{ console.log('Example app listening on port 3000!') })
