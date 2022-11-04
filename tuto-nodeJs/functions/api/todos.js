import { createTodo, findTodos, removeTodo, updateTodo } from "../todos_storage.js"
import { json } from "node:stream/consumers"


export async function index (req, res){
    return findTodos()
    //res.write(JSON.stringify(todos))

}

export async function create (req, res){
    return createTodo(await json(req))
    //res.write(JSON.stringify(todo))
}

export async function remove (req, res, url) {
    const id = parseInt(url.searchParams.get('id'), 10)
    await removeTodo(id)
    res.writeHead(204)
}

export async function update (req, res, url) {
    const id = parseInt(url.searchParams.get('id'), 10)
    return updateTodo(id, await json(req))
}