import { Pokemon } from "../db/sequelize.js"

export const createPokemon = (app) => {
    app.post("/api/pokemons", (req, res) => {
        Pokemon.create(req.body).then((pokemon) => {
            const message = `Le pokémon ${req.body.name} a bien été crée.`;
            res.json({ message, data: pokemon });
        });
    });
};
