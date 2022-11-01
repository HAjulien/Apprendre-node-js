import {readFile} from 'node:fs/promises'
import {fileURLToPath} from'node:url'
import {dirname, join} from 'node:path'

const dir = dirname(fileURLToPath(import.meta.url))
const filename = join(dir, 'demo-deep.txt')

console.log(await readFile(filename, {encoding : 'utf8'}));