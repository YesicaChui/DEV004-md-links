// CLI
// libreria nativa para leer argumentos de la terminal
import { argv } from 'process'
// importo la api de mdLinks
import { mdLinks } from './api.js'

const CLI = () => {
  // hay options
  if (argv[2] === undefined) {
    console.log("error debes ingresar la ruta ej. mdlink ./prueba.js")
    return
  }
  if (argv[3] === undefined) {
    mdLinks(argv[2], { validate: false })
      .then((respuesta) => {
        // recorrer el arreglo de objetos e imprimirlo en el formato solicitado file, href y text
        for (const elemento of respuesta) {
          console.log(`${elemento.file} ${elemento.href} ${elemento.text}`)
        }
      })
      .catch((error) => console.log(error))

    // si hay options y es --stats cuento los la cantidad de links encontrados
  } else if (argv[3] === '--validate' && argv[4] === undefined) {
    mdLinks(argv[2], { validate: true })
      .then((respuesta) => {
        // recorrer el arreglo de objetos e imprimirlo en el formato solicitado file, href y text
        for (const elemento of respuesta) {
          console.log(`${elemento.file} ${elemento.href} ${elemento.ok} ${elemento.status} ${elemento.text} `)
        }
      })
      .catch((error) => console.log(error))

  } else if (argv[3] === '--stats' && argv[4] === undefined) {
    mdLinks(argv[2], { validate: false })
      .then((respuesta) => console.log(`Total: ${respuesta.length}`))
      .catch(error => console.log(error))
  } else if((argv[3] === '--stats' && argv[4] === '--validate')||(argv[3] === '--validate' && argv[4] === '--stats')){
    mdLinks(argv[2], { validate: true })
    .then((respuesta) => {
      // cuent la cantidad de fail que hay por objeto
      const cantidadFail = respuesta.reduce((acumulador, elemento)=>elemento.ok === 'fail'?acumulador+1:acumulador, 0)
      // imprimo la cantidad de links y la cantidad de fail
      console.log(`Total: ${respuesta.length}\nBroken:${cantidadFail}`)
    })
    .catch(error => console.log(error))
  } else {
    console.log("Error opcion no valida, pruebe con --stats o no ponga opciones")
  }
}

CLI()