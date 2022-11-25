import jwt from "jsonwebtoken"
import * as dotenv from 'dotenv'
dotenv.config()

export const auth = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
        return res.status(401).json({ message });
    }

    const token = authorizationHeader.split(" ")[1];

    const { verify } = jwt;
    const decodedToken = verify( token, process.env.PRIVATE_KEY, (error, decodedToken) => {
        if (error) {
            const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
            return res.status(401).json({ message, data: error })
        }

        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            const message = `L'identifiant de l'utilisateur est invalide.`
            res.status(401).json({ message })
        } else {
            req.userId = userId
            next()
        }
    })
}
