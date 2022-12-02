import jwt from "jsonwebtoken"
import * as dotenv from 'dotenv'
import { generateToken } from "../../helpers.js"
import { User } from "../db/sequelize.js"
import { RecordNotFoundError } from "../errors/RecordNotFoundError.js"

dotenv.config()


export const refreshToken = (app) => {
    app.post("/api/refreshToken", (req, res) => {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader && authorizationHeader.split(" ")[1]

        if (!token){
            return res.sendStatus(404)
        }

        jwt.verify(token, process.env.PRIVATE_REFRESH_KEY, async (error, user) => {
            if (error){
                return res.sendStatus(401)
            }
            delete user.iat
            delete user.exp
            
            try {
                const searchUser = await User.findByPk(user.userId)
                if(searchUser === null ){
                    throw new RecordNotFoundError("Le user n'existe plus.")
                }
                const refreshedToken = generateToken(searchUser);
                res.send({
                    accessToken : refreshedToken
                })
            } catch (error) {
                console.error(error);
                let message = "une erreur est survenue, veuillez réessayer plus tard."
                
                if(error instanceof RecordNotFoundError){
                    message = error.message
                }
                return res.json({message})                
            }
        })

    })
}
