import errorHandler from "errorhandler"
import app from "./app"

/**
 * Error handler. Providers full stack -remove for production
 */
app.use(errorHandler())

const port = app.get("port")
const mode = app.get("mode")

/*
 * Start Express Server
 */
const server = app.listen(port,()=> {
 console.log(`webserver started at http://localhost:${port} in ${mode} mode`) 
})

export default server;
