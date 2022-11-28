import { Badge, User } from "../db/sequelize.js";
import { auth } from "../auth/auth.js"


export const addBadge = async (app) => {
    app.post("/api/addBadge/:id",auth, async (req, res) => {

        const badgeId = req.body.badgeId
        const id = req.params.id

        try {
            const user = await User.findByPk(id , {
                attributes : [ "id","username"],
                include: {
                    model: Badge,
                    attributes : ["name", "id"],
                    through: { attributes: [] }
                }
            })
            const badge = await Badge.findByPk(badgeId)
            const badgeAdding = await user.addBadge(badge, { through: { name_dresseur: user.username } })
            res.json({ user ,badge, badgeAdding })

        } catch (error) {
            console.log(error);
        }

    })
}