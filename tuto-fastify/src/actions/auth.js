import { db } from "../database.js"
import {hash, verify} from "phc-argon2" 

export const loginAction = async (req, res) =>{
    const params = {}
    const {password, username} = req.body
    params.username = username

    if(req.method === "POST"){
        const user = db.prepare('SELECT * FROM users WHERE username = ?')
                        .get(username)
        
        if (
            user !== undefined &&
            (await verify(user.password, password))
        ) {
            return 'connecté'
        }
        params.error = "Identifiants invalides"
    }
    return res.view('templates/login.ejs', params)
}

export const logoutAction = (req, res) =>{
    return 'logout'
}