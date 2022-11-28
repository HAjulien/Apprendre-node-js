import { Badge, User } from "../db/sequelize.js";
import { auth } from "../auth/auth.js"


export const addBadgesToUser = async (app) => {
    app.post("/api/addBadges",auth, async (req, res) => {

        const id = req.userId
        try {
            const user = await User.findByPk(id)
            const allBadgesId = Object.values(req.body)

            for (const badgeId of allBadgesId) {
                const badgeAdd = await Badge.findByPk(badgeId)
                await user.addBadge(badgeAdd, { through: { name_dresseur: user.username } })
            }

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
            console.error(error)
            const message = "Une erreur est survenu, réesseyer une autre fois."
            return res.status(404).json({ message })
        }

    })
}