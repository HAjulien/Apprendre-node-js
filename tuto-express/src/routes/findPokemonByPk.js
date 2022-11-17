import { Pokemon } from "../db/sequelize.js";

export const findPokemonByPk = (app) => {
    app.get("/api/pokemons/:id", (req, res) => {
        Pokemon.findByPk(req.params.id).then((pokemon) => {
            const message = "Un pokémon a bien été trouvé.";
            res.json({ message, data: pokemon });
        });
    });
};
