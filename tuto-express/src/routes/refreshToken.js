import jwt from "jsonwebtoken"
import * as dotenv from 'dotenv'
import { generateToken } from "../../helpers.js"
import { User } from "../db/sequelize.js"
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

            try {
                const searchUser = await User.findByPk(user.userId)
                if(searchUser === null ){
                    throw new Error("Le user n'existe plus.")
                }
                delete user.iat
                delete user.exp
                const refreshedToken = generateToken(user);
                res.send({
                    accessToken : refreshedToken
                })
            } catch (e) {
                const message = "Le user n'existe plus."
                return res.json({message})                
            }
        })

    })
}
