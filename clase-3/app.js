const express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const { validacion } = require('./schemas/movies')

const app = express()
app.use(express.json())

app.disable('x-powered-by')

const desingPort = process.env.PORT ?? 3000

app.get('/', (req, res) => {
    res.status(200).send('<h1>Bienvenidos a la pagina principal</h1>')
})

app.get('/movies', (req, res) => {
    const { genre } = req.query

    if (genre) {
        const filterMovie = movies.filter(
            movie => movie.genre.toLowerCase() === genre.toLowerCase()
        )
        return res.json(filterMovie)
    }

    res.json(movies)
})

app.get('/movies/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find(movie => movie.id === Number(id));
    if (movie) return res.json(movie);

    res.status(404).json({ message: 'Page not found' })

})

app.post('/movies', (req, res) => {
    const result = validacion(req.body)
    if (result.error) {
        return res.status(400).json({ message: result.error.message })
    }


    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }

    movies.push(newMovie)

    res.status(201).json(newMovie)
})

app.listen(desingPort, () => {
    console.log(`Servidor corriendo en el puerto http://127.0.0.1:${desingPort}`)
})