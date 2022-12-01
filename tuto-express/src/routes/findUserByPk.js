import { Badge, User } from "../db/sequelize.js";


export const findUserByPk = (app) => {
    app.get("/api/users/:id", (req, res) => {
        User.findByPk(req.params.id , {
            attributes : [ "id","username"],
            include: {
                model: Badge,
                attributes : ["name", "id"],
                through: { attributes: [] }  //hide badgesUser Table on response
            }
        }).then((user) => {
            if(user === null) {
                const message = "Le user n'existe pas. Réessayez avec un autre identifiant."
                return res.status(404).json({message})
            }
            const message = "Un user a bien été trouvé."
            res.json({ message, user })
        })
        .catch(error => {
            const message = "Le user n'a pas pu être récupérée. Réessayez dans quelques instants."
            res.status(500).json({message, error})
        })
    })
}