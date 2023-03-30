// CLI
// libreria nativa para leer argumentos de la terminal
import { argv } from 'process'
// importo la api de mdLinks
import {mdLinks} from './api.js'

// hay options
if(argv[3] === undefined){
  const arregloDeObjetos = mdLinks(argv[2])
  // recorrer el arreglo de objetos e imprimirlo en el formato solicitado file, href y text
  for(const elemento of arregloDeObjetos){
    console.log(`${elemento.file} ${elemento.href} ${elemento.text}`)
  }
  // si hay options y es --stats cuento los la cantidad de links encontrados
} else if(argv[3]=== '--stats'){
  const arregloDeObjetos = mdLinks(argv[2])
  console.log(`Total: ${arregloDeObjetos.length}`)
} else{
  console.log("Error opcion no valida, pruebe con --stats o no ponga opciones")
}
