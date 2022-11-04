import {readFile, writeFile} from "node:fs/promises"
import { NotFoundError } from "./api/error.js"
const path = "storage/todos.json"

/**
 * @typeof {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

/**
 * @return {Promise<Todo[]>}
 */
export async function findTodos(){
    const data = await readFile(path, 'utf8')
    return JSON.parse(data)
}

/**
 * @property {string} title
 * @property {boolean} completed
 * @return {Promise<Todo[]>}

 */
export async function createTodo({title, completed = false}){
    const todo = {title, completed, id: Date.now()}
    const todos =[todo, ...await findTodos()]
    await writeFile(path, JSON.stringify(todos, null, 2))
    return todo
}

/**
 * @property {number} id
 * @return {Promise<>}
 */
export async function removeTodo(id){
    const NOT_FOUND = -1
    const todos = await findTodos()
    const todo = todos.findIndex(todo => todo.id === id)
    if (todo === NOT_FOUND){
        throw new NotFoundError
    }
    //const todoSplice = [...todos.splice(todo, 1)]
    const todosFilter = todos.filter( todo => todo.id !== id)
    await writeFile(path, JSON.stringify(todosFilter, null, 2))
}

/**
 * @property {number} id
 * @property { {completed?: boolean, title?: string} } partialTodo
 * @return {Promise<Todo[]>}
 */
export async function updateTodo(id, partialTodo){
    const todos = await findTodos()
    const todo = todos.find(todo => todo.id === id)
    if (todo === undefined){
        throw new NotFoundError
    }
    Object.assign(todo, partialTodo)
    await writeFile(path, JSON.stringify(todos, null, 2))
    return todo
}