import { createServer } from "node:http";
import { findAvaiblePort } from "./12_fre-port.js";

const server = createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/plain' })
    console.log('peticion recibida')
    res.end('Hola mundo con nodejs')
})


findAvaiblePort(3000).then((port) => {
    server.listen(port, '127.0.0.1', () => {
        console.log(`Servidor corriendo en http://127.0.0.1:${port}`)
    })
})
