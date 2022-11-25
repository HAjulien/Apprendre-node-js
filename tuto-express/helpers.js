/*
export const success = (message, data) => {
    return { message, data }
}

export const getUniqueId = (pokemons) => {
    const pokemonsIds = pokemons.map( pokemon => pokemon.id )
    const maxId = pokemonsIds.reduce( (a,b) => Math.max(a,b) )
    const uniqueId = maxId + 1

    return uniqueId
}
*/

import jwt from "jsonwebtoken"
import * as dotenv from 'dotenv'
dotenv.config()

export const generateToken = (user) => {
    return jwt.sign(
        { userId : user.id},
        process.env.PRIVATE_KEY,
        { expiresIn : '1h' }
    )
}