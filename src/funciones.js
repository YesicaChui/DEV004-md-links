// actualmente mdLinks lee archivos
// convierte markdown a html
// detecta links del html
// crea un arreglo de objetos donde cada objeto tiene las claves href, text y file
// filtra los links que inician con http

// libreria nativa usado para leer archivos md
import fs from 'fs'
export const leerArchivo = (ruta) =>{
 // leo el archivo md
 const contenidoArchivo = fs.readFileSync(ruta,'utf-8')
 return contenidoArchivo
}

