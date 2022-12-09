import { connectDb } from "./src/services/mongoose.js"
import express from "express"
import { router as userRoutes } from "./src/routes/user.js"
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

connectDb()

app.use(express.json())
app.use(userRoutes)


app.listen( port, () => {
    console.log(`Le serveur est lancé sur htpp://localhost:${port}`)
})