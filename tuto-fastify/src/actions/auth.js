import { db } from "../database.js"
import {hash, verify} from "phc-argon2" 

export const loginAction = async (req, res) =>{
    const params = {}

    if(req.method === "POST"){
        const {password, username} = req.body
        params.username = username

        const user = db.prepare('SELECT * FROM users WHERE username = ?')
                        .get(username)
        
        if (
            user !== undefined &&
            (await verify(user.password, password))
        ) {
            req.session.set('user', {
                id: user.id,
                username : user.username
            })
            return res.redirect('/')
        }
        params.error = "Identifiants invalides"
    }
    return res.view('templates/login.ejs', params)
}

export const logoutAction = (req, res) =>{
    req.session.delete()
    return res.redirect('/')
}