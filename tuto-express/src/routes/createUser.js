import { User } from "../db/sequelize.js"
import { UniqueConstraintError, ValidationError } from "sequelize"
import bcrypt from "bcrypt"
import { generateToken } from "../../helpers.js"
import { isPasswordValid } from "../../helpers.js"


export const createUser = (app) => {
    app.post("/api/createUser", (req, res) => {
        const username = req.body.username
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword

        if( password !== confirmPassword){
            const message = "Les mots de passe ne sont pas identiques, veuillez réessayer"
            return res.status(404).json({ message })
        }

        if(!username || !password){
            const message = "Le nom ou le mot de passe est obligatoire"
            return res.status(404).json({ message })
        }

        if(!isPasswordValid(password)){
            const message = "le mot de passe doit contenir 8 caractères minimun dont 1 chiffre, 1 maj, 1min, 1 spécial"
            return res.status(404).json({ message })
        }

        bcrypt.hash(password, 10)
        .then(password => User.create({ username ,password}))
        .then(user => {
            const message = `L'utilisateur a été enregistré`
            const token = generateToken(user)

            return res.json({ message, user, token })}
        )
        .catch(error => {
            if(error instanceof UniqueConstraintError){
                return res.status(400).json({ message : error.message, error})
            }
            if(error instanceof ValidationError){
                return res.status(400).json({ message : error.message, error})
            }
            const message = "L'utilisateur n'a pas pu être ajouté. Réessayez dans quelques instants."
            res.status(500).json({message, error})
        })
    })
}
