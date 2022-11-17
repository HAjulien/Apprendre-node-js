import { Pokemon } from "../db/sequelize.js";

export const findAll = (app) => {
    app.get("/api/pokemons", (req, res) => {
        Pokemon.findAll()
        .then((pokemons) => {
            const message = "La liste des pokémons a bien été récupérée."
            res.json({ message, data: pokemons})
        })
        .catch(error => {
            const message = "La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants."
            res.status(500).json({message, data: error})
        })
    })
}
