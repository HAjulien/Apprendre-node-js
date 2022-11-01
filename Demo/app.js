//import {readFile, writeFile, open} from 'node:fs/promises';


// const content = fs.readFileSync("demo.txt",{encoding : 'utf8'}) version synchrone

//ancienne façon faire

/*
const content = fs.readFile("demo.txt",{encoding : 'utf8'}, (err, content)=> {
    console.log(content);
})
console.log("text asynchrone, readFile est non bloquant");


const content = await readFile("demo.txt",{encoding : 'utf8'})
//console.log(content);

const multipleContent = await Promise.all([
    readFile("demo.txt",{encoding : 'utf8'}),
    readFile("app.js",{encoding : 'utf8'})
])
console.log(multipleContent);

await unlink()  //effacer fichier
const i = await stat('demo.txt')

await writeFile('demo.txt', "J'ai été ajouté au contenu du fichier txt", {
    flag : 'a'
})

open
const file = await open('demo.txt', 'a')
file.write('hello')
file.close()
*/

//--------------------------------------------------------------------------------------
/* import {watch} from 'node:fs/promises';

const watcher = watch('./')
for await(const event of watcher){
    console.log(event);
}
*/

import {readdir, stat} from 'node:fs/promises'

const files = await readdir('./', {withFileTypes: true})
console.log(files)
/*
for (const file of files){
    const parts = [
        file.isDirectory() ? 'D' : 'F',
        file.name
    ]
    if(!file.isDirectory()){
        const {size} = await stat(file.name)
        parts.push(`${size}o`)
    }
    console.log(parts.join(' - '));
} 
*/

await Promise.allSettled(
    files.map(async (file) => {
        const parts = [
            file.isDirectory() ? 'D' : 'F',
            file.name
        ]
        if(!file.isDirectory()){
            const {size} = await stat(file.name)
            parts.push(`${size}o`)
        }
        console.log(parts.join(' - '));
    })
        
)