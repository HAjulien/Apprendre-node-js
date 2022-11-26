import { Sequelize, DataTypes } from "sequelize"
import { PokemonModel } from "../models/pokemon.js"
import { UserModel } from "../models/user.js"
import { pokemonsArray } from "./mock-pokemon.js"
import { badgesArray } from "./mock-badge.js"
import bcrypt from "bcrypt"
import * as dotenv from 'dotenv'
import { badgeModel } from "../models/badge.js"
dotenv.config()

export const sequelize = new Sequelize(process.env.NAME_BDD,process.env.NAME_SERVER,process.env.PASSWORD_SERVER, {
    host : 'localhost',
    dialect : 'mariadb',
    dialectOptions: {
        timezone : 'Etc/GMT-2'
    },
    logging : false
})

export const Pokemon = PokemonModel(sequelize, DataTypes) 
export const User = UserModel(sequelize, DataTypes) 
export const Badge = badgeModel(sequelize, DataTypes)

Pokemon.belongsTo(User);
User.hasMany(Pokemon);

Badge.belongsToMany(User, { through: 'BadgesUser' });
User.belongsToMany(Badge, { through: 'BadgesUser' });




let pokemons = pokemonsArray
let badges = badgesArray

export const initDb = () => {
    return sequelize.sync({ force: true }).then((_) => {
        bcrypt.hash("sasha", 10)
        .then(hash => User.create({ username: "sasha",password: hash}))
        //.then(user => console.log(user.toJSON()))
        .then( user =>{

            pokemons.map((pokemon) => {
                user.createPokemon({
                    name: pokemon.name,
                    hp: pokemon.hp,
                    cp: pokemon.cp,
                    picture: pokemon.picture,
                    types: pokemon.types
                })
                .then((pokemon) => console.log(pokemon.toJSON()))
            })

            badges.map((badge) => {
                Badge.create({
                    name : badge.name
                })
                .then(badge => user.addBadge(badge) )
            })

        })
        
        console.log("La base de donnée a bien été initialisée !")
    })
}
