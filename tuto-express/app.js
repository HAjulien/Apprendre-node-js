import express from "express"
import morgan from "morgan"
import favicon from "serve-favicon"
import bodyParser from "body-parser"
import {fileURLToPath} from "url"
import { dirname, join } from "node:path"
import { sequelize, initDb } from "./src/db/sequelize.js"
import { findAll } from "./src/routes/findAllPokemons.js"
import { findPokemonByPk } from "./src/routes/findPokemonByPk.js"
import { createPokemon } from "./src/routes/createPokemon.js"
import { updatePokemon } from "./src/routes/updatePokemon.js"
import { deletePokemon } from "./src/routes/deletePokemon.js"


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

//routes API
findAll(app)
findPokemonByPk(app)
createPokemon(app)
updatePokemon(app)
deletePokemon(app)

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))