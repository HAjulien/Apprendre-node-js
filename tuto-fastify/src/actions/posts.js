import { db } from "../database.js"
import { RecordNotFoundError } from "../errors/RecordNotFoundError.js"

export const listPosts = (req, res) => {
    const posts = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all()
    // console.log(posts)
    /* const posts = [
        {
            title : "Mon titre 1",
            content : "Mon premier contenu"
        },
        {
            title : "Mon titre 2",
            content : "Mon second contenu"
        }
    ]
    */
    res.view('templates/index.ejs', {
        //title : "Mon <br> titre",
        posts
    })
}

export const showPost = ( req, res) => {
    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id)
    if (post === undefined) {
        throw new RecordNotFoundError(`impossible de trouver l'article avec l'id: ${req.params.id}`)
    }
    return res.view('templates/single.ejs', {
        post
    })
}

export const createPost = (req, res) => {
    db.prepare('INSERT INTO posts (title, content, created_at) VALUES (?, ?, ?)')
        .run(
            req.body.title,
            req.body.content,
            Math.round(Date.now() / 1000)
        )
    return res.redirect('/')
}