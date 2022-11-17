import express from "express"
import morgan from "morgan"
import favicon from "serve-favicon"
import bodyParser from "body-parser"
import {fileURLToPath} from "url"
import { dirname, join } from "node:path"
import { sequelize, initDb } from "./src/db/sequelize.js"


const app = express()
const rootDir = dirname(fileURLToPath(import.meta.url))
const port = 3000

/*middleware 
app.use((req, res, next) => {
    console.log(`URL : ${req.url}`)
    next()
})
*/

app
.use(favicon(join(rootDir, 'favicon.ico')))
.use(morgan("dev"))
.use(bodyParser.json())

sequelize
initDb()

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))