import express from "express"
import morgan from "morgan"
import favicon from "serve-favicon"
import bodyParser from "body-parser"
import {fileURLToPath} from "url"
import { dirname, join } from "node:path"
import { pokemonsModele } from "./mock-pokemon.js"
import { success, getUniqueId } from "./helpers.js"

const app = express()
const rootDir = dirname(fileURLToPath(import.meta.url))
const port = 3000

let pokemons = pokemonsModele

/*middleware 
app.use((req, res, next) => {
    console.log(`URL : ${req.url}`)
    next()
})
*/

app.use(favicon(join(rootDir, 'favicon.ico'))).use(morgan("dev")).use(bodyParser.json())

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

app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = {...req.body, ...{id : id, created : new Date()}}
    pokemons.push(pokemonCreated)
    const message = `le pokemon ${pokemonCreated.name} à bien été crée.`
    res.json(success(message, pokemonCreated))
})

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = { ...req.body, id : id}
    pokemons = pokemons.map( pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = `le pokemon ${pokemonUpdated.name} à bien été modifié.`
    res.json(success(message, pokemonUpdated))
})

app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons = pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
    res.json(success(message, pokemonDeleted))
});


app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))