import { createServer } from "node:http";
import { readFile } from "node:fs";
const desirePort = process.env.PORT ?? 3000

const procesRequest = (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf8')
    if (req.url === '/') {
        res.statusCode = 200
        res.end('<h1>Bienvenido a mi página de inicio</h1>')

    } else if (req.url === '/imagen-de-la-pagina.png') {

        readFile('./perfil.png', (err, data) => {
            if (err) {
                res.statusCode = 500
                res.end('<h1>Ocurrio un error en el servidor</h1>')
            } else {
                res.setHeader('Content-Type', 'image/png')
                res.statusCode = 200
                res.end(data)
            }
        })

    } else if (req.url === '/contacto') {
        res.statusCode = 200
        res.end('<h1>Contacto</h1>')
    } else {

        res.statusCode = 404
        res.end('<h1>404</h1>')
    }
}


const server = createServer(procesRequest)

server.listen(desirePort, () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${desirePort}`)
})

