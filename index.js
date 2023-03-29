// CLI
import { argv } from 'process'
import {mdLinks} from './api.js'

//console.log(mdLinks(argv[2]))
if(argv[3] === undefined){
  const arregloDeObjetos = mdLinks(argv[2])
  for(const elemento of arregloDeObjetos){
    console.log(`${elemento.file} ${elemento.href} ${elemento.text}`)
  }
} else if(argv[3]=== '--stats'){
  const arregloDeObjetos = mdLinks(argv[2])
  console.log(`Total: ${arregloDeObjetos.length}`)
} else{
  console.log("Error opcion no valida")
}
