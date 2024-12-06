const z = require('zod')

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'No es un string'
    }),
    genre: z.string(),
    release_year: z.number().min(2000).max(2024),
    duration_minutes: z.number().int().positive(),
    director: z.string(),
    cast: z.array(z.string()),
    synopsis: z.string(),
    rating: z.number().min(0).max(10),
    language: z.string(),
    box_office_millions: z.number()
})

function validacion(object) {
    return movieSchema.safeParse(object)
}

module.exports = { validacion }