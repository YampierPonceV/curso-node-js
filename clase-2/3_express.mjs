import express from 'express'
import personas from './data.mjs'

const app = express()

app.disable('x-powered-by')
const desingPort = process.env.PORT ?? 3000


app.use(express.json())

/* app.use((req, res, next) => {
    if (req.method != 'POST') return next()
    if (req.headers['content-type'] != 'application/json') return next()

    let body = ''

    req.on('data', chunck => {
        body += chunck.toString()
    })

    req.on('end', () => {
        const data = JSON.parse(body)
        req.body = data

        next()
    })


}) */

app.get('/personas', (req, res) => {
    res.json(personas)
})

app.post('/personas', (req, res) => {

    res.status(201).json(req.body)
})


app.use((req, res) => {
    res.status(404).send('<h1>404</h1>')
})


app.listen(desingPort, () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${desingPort}`)
})