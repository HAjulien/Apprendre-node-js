import { Sequelize, DataTypes } from "sequelize"
import { PokemonModel } from "../models/pokemon.js"
import { pokemonsArray } from "./mock-pokemon.js"

export const sequelize = new Sequelize('pokedex','root','root', {
    host : 'localhost',
    dialect : 'mariadb',
    dialectOptions: {
        timezone : 'Etc/GMT-2'
    },
    logging : false
})

export const Pokemon = PokemonModel(sequelize, DataTypes) 

let pokemons = pokemonsArray

export const initDb = () => {
    return sequelize.sync({ force: true }).then((_) => {
        pokemons.map((pokemon) => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types
            }).then((pokemon) => console.log(pokemon.toJSON()));
        });
        console.log("La base de donnée a bien été initialisée !");
    });
};
