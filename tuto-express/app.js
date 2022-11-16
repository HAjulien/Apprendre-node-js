import express from "express"
import morgan from "morgan"
import favicon from "serve-favicon"
import {fileURLToPath} from "url"
import { dirname, join } from "node:path"
import { pokemons } from "./mock-pokemon.js"
import { success } from "./helpers.js"

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

app.get('/', (req,res) => res.send('Hello, express avec nodemon ✋'))

app.get('/api/pokemons', (req, res) => {
    //res.send(`Il y a ${pokemons.length} pokemons dans le pokedex en ce moment`)
    const message = 'La liste des pokémons.'
    res.json(success(message, pokemons))

})

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find( pokemon => pokemon.id === id ) 
    //res.send(`Vous avez demandé le pokemon ${pokemon.name}`)
    const message = 'Un pokemon à bien été trouvé.'
    res.json(success(message, pokemon))
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))