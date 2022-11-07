import fastify from "fastify"
import fastifyFormBody from "@fastify/formbody"
import fastifyView from "@fastify/view"
import fastifyStatic from "@fastify/static"
import {fileURLToPath} from "url"
import ejs from 'ejs'
import { dirname, join } from "node:path"
import { createPost, listPosts, showPost } from "./actions/posts.js"
import { RecordNotFoundError } from "./errors/RecordNotFoundError.js"
import { loginAction, logoutAction } from "./actions/auth.js"

const app = fastify()
const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))


app.register(fastifyView, {
    engine: {
        ejs
    }
})

app.register(fastifyFormBody)

app.register(fastifyStatic, {
    root: join(rootDir, 'public')
})

app.get('/', listPosts)
app.get('/login', loginAction)
app.post('/login', loginAction)
app.post('/logout', logoutAction)
app.post('/', createPost)
app.get('/article/:id', showPost)
app.setErrorHandler((error, req, res) => {
    if (error instanceof RecordNotFoundError){
        res.statusCode = 404
        return res.view('templates/404.ejs', {
            error : "cet enregistrement n'existe pas"
        })
    }
    console.error(error);
    res.statusCode = 500
    return {
        error: error.message
    }
})




const start = async () => {
    try {
        await app.listen( {port: 3000} )
    } catch (error) {
        console.error(error)
        process.exit(1)
        
    }
}

start()