import dotenv from "dotenv"
import fs from "fs-extra"
import { Client } from "pg"

const init = async()=>{
  dotenv.config()
  const pgclient = new Client();
  try{
    await pgclient.connect()
    const sql = await fs.readFile("./tools/initdb.pgsql", { encoding: "UTF-8" } );
    const statements = sql.split( /;\s*$/m );
    for ( const statement of statements ) {
      if( statement.length >3 ) {
        await pgclient.query( statement )
      }
    }
  }catch( err ) { 
    console.log( err )
    throw err
  }finally {
    await pgclient.end()
  }
}

init().then( ()=>{
  console.log( "finished" ) 
}).catch( ()=>{
  console.log( "finished with errors" )
})
