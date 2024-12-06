import { createServer } from "node:http";
import persons from './data.mjs'
const procesRequest = (req, res) => {
    const { method, url } = req

    switch (method) {
        case 'GET':
            switch (url) {
                case '/personas':
                    res.setHeader('Content-Type', 'application/json')
                    return res.end(JSON.stringify(persons))
                default:
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html')
                    return res.end('<h1>404</h1>')
            }
        case 'POST':
            switch (url) {
                case '/personas': {

                    let body = ''

                    req.on('data', chunck => {
                        body += chunck.toString()
                    })

                    req.on('end', () => {
                        const data = JSON.parse(body)

                        res.writeHead(201, { 'Content-Type': 'application/json' })
                        data.timestamp = Date.now()
                        res.end(JSON.stringify(data))
                    })
                    break;
                }
                default:
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html')
                    return res.end('<h1>404</h1>')
            }
    }
}

const desingPort = process.env.PORT ?? 3000

const server = createServer(procesRequest)

server.listen(desingPort, () => {
    console.log(`Servidor ejecutandose en http://127.0.0.1:${desingPort}`)
})