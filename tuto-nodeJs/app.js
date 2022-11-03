import {createServer} from 'http'

createServer((req, res) =>{
    res.write('Bonsoir')
    console.log('bonjour');
    res.end()
}).listen('8888')