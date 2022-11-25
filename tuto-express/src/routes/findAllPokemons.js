import { Pokemon, User } from "../db/sequelize.js"
import { Op } from "sequelize"
import { auth } from "../auth/auth.js"

export const findAll = (app) => {
    app.get("/api/pokemons", auth, (req, res) => {

        if(req.query.name){
            const name = req.query.name
            const limit = parseInt(req.query.limit) || 5

            if(name.length < 2){
                const message = 'Le terme de recherche doit contenir au moins 3 caractères'
                return  res.status(400).json({message})
            }

            return Pokemon.findAndCountAll({
                where : {
                    name: {
                        [Op.like] : `%${name}%`
                    }
                },
                order : ['name'],
                //order : ['name', 'DESC'],
                limit : limit
            })
            .then(({ count : totalPokemons , rows : pokemons}) => {
                const message = `Il y à ${totalPokemons} pokemons qui correspond au terme de recherche ${name}`
                res.json({ message, data: pokemons })
            })
        }else{

            Pokemon.findAll({ order : ['name'],  include: {
                model: User,
                attributes : ["username", "id"]
            }})
            .then((pokemons) => {
                const message = "La liste des pokémons a bien été récupérée."
                res.json({ message, data: pokemons})
            })
            .catch(error => {
                const message = "La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants."
                res.status(500).json({message, data: error})
            })
        }
    })
}
