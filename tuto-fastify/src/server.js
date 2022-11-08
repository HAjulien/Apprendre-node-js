import fastify from "fastify"
import fastifyFormBody from "@fastify/formbody"
import fastifySecureSession from "@fastify/secure-session"
import fastifyView from "@fastify/view"
import fastifyStatic from "@fastify/static"
import {fileURLToPath} from "url"
import ejs from 'ejs'
import { dirname, join } from "node:path"
import { createPost, listPosts, showPost } from "./actions/posts.js"
import { RecordNotFoundError } from "./errors/RecordNotFoundError.js"
import { loginAction, logoutAction } from "./actions/auth.js"
import { readFileSync } from "fs"
import { notAuthenticatedError } from "./errors/notAuthenticatedError.js"

const app = fastify()
const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))


app.register(fastifyView, {
    engine: {
        ejs
    }
})

app.register(fastifySecureSession, {
    cookieName: 'session',
    key: readFileSync(join(rootDir, 'secret-key')),
    cookie: {
        path: '/'
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
    } else if ( error instanceof notAuthenticatedError){
        return res.redirect('/login')
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