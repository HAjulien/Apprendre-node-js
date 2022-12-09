import rateLimit from "express-rate-limit"

const MINUTE_IN_MILLISECONDES = 60000

const   maxAttemps = 10,
        timeBlocking = 15

export const limiter = rateLimit({
    windowMs : timeBlocking * MINUTE_IN_MILLISECONDES,
    max : maxAttemps,
    message: async(req, res) => {
        const message = `Trop de tentative effectué, réeesayer dans ${timeBlocking} minutes maximun.`
        return res.json({message})
    },
    
    standardHeaders : true,
    legacyHeaders : false,
})

