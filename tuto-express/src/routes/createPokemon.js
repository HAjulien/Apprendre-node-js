import { Pokemon } from "../db/sequelize.js"
import { ValidationError, UniqueConstraintError } from "sequelize"
import { auth } from "../auth/auth.js"


export const createPokemon = (app) => {
    app.post("/api/pokemons", auth, (req, res) => {
        const formData = req.body
        const UserId = req.userId
        Pokemon.create(
            {...formData, UserId}
        )
        .then((pokemon) => {
            const message = `Le pokémon ${pokemon.name} a bien été crée.`
            res.json({ message, pokemon })
        })
        .catch(error => {
            if(error instanceof ValidationError){
                return res.status(400).json({ message : error.message, data: error})
            }
            if(error instanceof UniqueConstraintError){
                return res.status(400).json({ message : error.message, data: error})
            }
            const message = "Le pokemon n'a pas pu être ajouté. Réessayez dans quelques instants."
            res.status(500).json({message, data: error})
        })
    })
}
