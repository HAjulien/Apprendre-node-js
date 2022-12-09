import mongoose from "mongoose"
import * as dotenv from 'dotenv'
dotenv.config()

export const connectDb = () => {
    mongoose.connect(process.env.MONGO_URL)
    console.log('db connecté!');
}