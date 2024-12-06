const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.'

async function ls(folder) {
    let files = []

    try {
        files = await fs.readdir(folder)


    } catch (err) {
        console.log(pc.red(`Ocurrio un error al leer el directorio ${folder}`))
        process.exit(1)
    }

    const filePormises = files.map(async (file) => {
        const filePath = path.join(folder, file)
        let stats
        try {
            stats = await fs.stat(filePath)
        } catch {
            console.log('Error al leer el archivo:')
            process.exit(1)
        }

        const isDirectori = stats.isDirectory()
        const fileType = isDirectori ? 'd' : '-'
        const fileSize = stats.size.toString()
        const fileModified = stats.atime.toLocaleString()

        return `${fileType} ${pc.blue(file.padEnd(20))} ${pc.green(fileSize.padStart(10))} ${pc.yellow(fileModified)}`
    })
    const filesInfo = await Promise.all(filePormises)

    filesInfo.forEach(file => {
        console.log(file)
    })

}

ls(folder)