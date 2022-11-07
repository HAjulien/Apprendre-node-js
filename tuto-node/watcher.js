import {exec, spawn} from 'node:child_process'
import { watch } from 'node:fs/promises';

const [node, _, file] = process.argv

/*variable env global
console.log(process.argv);
exec('dir', (error, out, err) => {
    console.log({
        error,
        out,
        err
    });
})
*/

//process child
function spawnNode(){
    const pr = spawn(node, [file])
    /* pr.stdout.on('data', (data) => {
        console.log(data.toString('utf8'));
    })
    pr.stderr.on('data', (data) => {
        console.error(data.toString('utf8'));
    })
    */

    pr.stdout.pipe(process.stdout)
    pr.stderr.pipe(process.stderr)


    pr.on('close', (code) =>{
        // if (code > 0){
        //     throw new Error(`Process exited : ${code} `);
        // }
        if (code !== null){
            process.exit(code)
        }
    })

    return pr
}
let childNodeProcess = spawnNode()
const watcher = watch('./', {recurcive: true})
for await(const event of watcher){
    if (event.filename.endsWith('.js')){
        childNodeProcess.kill('SIGKILL')
        childNodeProcess = spawnNode()
    }
}
