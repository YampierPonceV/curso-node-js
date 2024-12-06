const path = require('node:path')

//bara seperadora de cadenas segun sistema Operativo
console.log(path.sep)

const filePath = path.join('content', 'subfolder', 'archivo.tx')
console.log(filePath)

const base = path.basename('/temp/secret/home')
console.log(base)

const extencion = path.extname('url/image.png')
console.log(extencion)