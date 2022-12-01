import { Pokemon } from "../db/sequelize.js";
import { auth } from "../auth/auth.js";
import { modifyPokemon } from "../auth/modifyPokemon.js";

export const deletePokemon = (app) => {
    app.delete("/api/pokemons/:id", auth, modifyPokemon, (req, res) => {
        Pokemon.findByPk(req.params.id).then((pokemon) => {
            if(pokemon === null) {
                const message = "Le pokemon n'existe pas. Réessayez avec un autre identifiant."
                return res.status(404).json({message})
            }

            const pokemonDeleted = pokemon
            return Pokemon.destroy({
                where: { id: pokemon.id }
            })
            .then((_) => {
                const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
                res.json({ message, pokemonDeleted })
            })   
        })
        .catch(error => {
            const message = "Le pokemon n'a pas pu supprimé. Réessayez dans quelques instants."
            res.status(500).json({message, data: error})
        })
    })
}
