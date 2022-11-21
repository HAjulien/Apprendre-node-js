import { Pokemon } from "../db/sequelize.js";
import { auth } from "../auth/auth.js";

export const findPokemonByPk = (app) => {
    app.get("/api/pokemons/:id", auth, (req, res) => {
        Pokemon.findByPk(req.params.id).then((pokemon) => {
            if(pokemon === null) {
                const message = "Le pokemon n'existe pas. Réessayez avec un autre identifiant."
                return res.status(404).json({message})
            }
            const message = "Un pokémon a bien été trouvé."
            res.json({ message, data: pokemon })
        })
        .catch(error => {
            const message = "Le pokemon n'a pas pu être récupérée. Réessayez dans quelques instants."
            res.status(500).json({message, data: error})
        })
    })
}
