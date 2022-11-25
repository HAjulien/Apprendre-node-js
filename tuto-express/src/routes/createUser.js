import { User } from "../db/sequelize.js"
import { UniqueConstraintError } from "sequelize"
import bcrypt from "bcrypt"
import { generateToken } from "../../helpers.js"


export const createUser = (app) => {
    app.post("/api/createUser", (req, res) => {
        const username = req.body.username
        const password = req.body.password
        if(!username || !password){
            const message = "Le nom ou le mot de passe est obligatoire"
            return res.status(404).json({ message })
        }

        bcrypt.hash(password, 10)
        .then(password => User.create({ username ,password}))
        .then(user => {
            const message = `L'utilisateur a été enregistré`
            const token = generateToken(user)

            return res.json({ message, data: user, token })}
        )
        .catch(error => {
            if(error instanceof UniqueConstraintError){
                return res.status(400).json({ message : error.message, data: error})
            }
            const message = "L'utilisateur n'a pas pu être ajouté. Réessayez dans quelques instants."
            res.status(500).json({message, data: error})
        })
    })
}
