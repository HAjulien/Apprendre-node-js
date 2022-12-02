import rateLimit from "express-rate-limit"

const MINUTES_IN_MILLISECONDES = 60000

export const limiter = rateLimit({
    windowMs : 15 * MINUTES_IN_MILLISECONDES,
    max : 10,
    message: async(req, res) => {
        const message = "Trop de tentative effectué, réeesayer dans 15 minutes."
        return res.json({message})
    },
    
    standardHeaders : true,
    legacyHeaders : false,
})

