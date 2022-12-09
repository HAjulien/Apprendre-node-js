import { Pokemon } from "../db/sequelize.js";

export const modifyPokemon = (req, res, next) => {
    const userId = req.userId
    const id = req.params.id

    Pokemon.findByPk(id).then(pokemon => {
        //console.log(req.userId, req.params.id, pokemon.UserId );
        if (pokemon === null) {
            const message = "Ce pokémon n'existe pas."
            return res.status(404).json({message})
        }

        if(pokemon.UserId !== userId) {
            const message = "Vous n'avez pas les droits de modifier le pokémon de quelqu'un autre."
            return res.status(401).json({message})
        }
        next()
    })

}
