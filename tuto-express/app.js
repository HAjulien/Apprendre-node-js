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
import { login } from "./src/routes/login.js"
import { createUser } from "./src/routes/createUser.js"
import { findUserByPk } from "./src/routes/findUserByPk.js"
import { addBadgesToUser } from "./src/routes/addBadgesToUser.js"

import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
const rootDir = dirname(fileURLToPath(import.meta.url))

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
createUser(app)
login(app)
findUserByPk(app)
findAll(app)
findPokemonByPk(app)
createPokemon(app)
updatePokemon(app)
deletePokemon(app)
addBadgesToUser(app)

//gestion erreur 404 route non trouvé
app.use( ({res}) => {
    const message = "Impossible de trouvé la ressource demandée ! Vous pouvez demander une autre URL"
    res.status(404).json({message})
})

app.listen(process.env.PORT, () => console.log(`Notre application Node est démarrée sur : http://localhost:${process.env.PORT} `))