import { Sequelize, DataTypes } from "sequelize"
import { PokemonModel } from "../models/pokemon.js"
import { UserModel } from "../models/user.js"
import { pokemonsArray } from "./mock-pokemon.js"
import bcrypt from "bcrypt"

export const sequelize = new Sequelize('pokedex','root','root', {
    host : 'localhost',
    dialect : 'mariadb',
    dialectOptions: {
        timezone : 'Etc/GMT-2'
    },
    logging : false
})

export const Pokemon = PokemonModel(sequelize, DataTypes) 
export const User = UserModel(sequelize, DataTypes) 

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
            }).then((pokemon) => console.log(pokemon.toJSON()))
        })
        
        bcrypt.hash("sasha", 10)
        .then(hash => User.create({ username: "sasha",password: hash}))
        .then(user => console.log(user.toJSON()))
        
        console.log("La base de donnée a bien été initialisée !")
    })
}
