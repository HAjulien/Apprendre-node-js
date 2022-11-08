import { createReadStream } from 'fs'
import {createServer} from 'http'
import { NotFoundError } from './functions/api/error.js'
import { create, index, remove, update } from './functions/api/todos.js'

createServer(async (req, res) =>{
    try{
        res.setHeader("Content-Type", "application/json")
        const url = new URL(req.url, `http://${req.headers.host}`)
        const endpoint = `${req.method}:${url.pathname}`
        let results
        switch (endpoint) {
            case 'GET:/':
                res.setHeader("Content-Type", "text/html")
                createReadStream('index.html').pipe(res)
                return
                break;
            case 'GET:/todos':
                results = await index(req, res)
                break;
            case 'POST:/todos':
                results = await create(req, res)
                break;
            case 'DELETE:/todos':
                results = await remove(req, res, url)
                break;
            case 'PUT:/todos':
                results = await update(req, res, url)
                break;
            default:
                res.writeHead(404)
        }
        if (results){
            res.write(JSON.stringify(results))
        }
    }catch (e){
        if (e instanceof NotFoundError){
            res.writeHead(404)
        } else {
            throw e
        }
    }
    res.end()
}).listen(3000)

/*
import Fastify from "fastify";
import { findTodos, removeTodo } from "./functions/todos_storage.js"

const fastify = Fastify({
    logger : false
})

fastify.get('/todos', async (request, reply) => {
    reply.send( await findTodos())
})

fastify.delete('/todos', async (request, reply) => {
    await removeTodo(parseInt(request.query.id, 10))
    reply.code(204)
})

fastify.listen({ port: 3000 }, (err, address) => {
    if (err) throw err
})
*/