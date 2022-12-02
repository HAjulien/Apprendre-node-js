import { Badge, User } from "../db/sequelize.js";
import { auth } from "../auth/auth.js"
import { RecordNotFoundError } from "../errors/RecordNotFoundError.js"


export const removeBadgeFromUser = async (app) => {
    app.post("/api/removeBadgeFromUser",auth, async (req, res) => {

        const id = req.userId
        try {
            const user = await User.findByPk(id)
            const badgeToRemove = await Badge.findByPk(req.body.badgeId)
            if(badgeToRemove === null){
                throw new RecordNotFoundError("identifiant badge incorrect")
            }
            await user.removeBadge(badgeToRemove)

            const userUpdate = await User.findByPk(id , {
                attributes : [ "id","username"],
                include: {
                    model: Badge,
                    attributes : ["name", "id"],
                    through: { attributes: [] }
                }
            })
            res.json({ userUpdate })
            

        } catch (error) {
            console.error(error);
            let message = "Une erreur est survenu, réesseyer une autre fois."
            if(error instanceof RecordNotFoundError){
                message = error.message     
            }
            return res.status(404).json({ message })
        }

    })
}