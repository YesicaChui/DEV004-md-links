#!/usr/bin/env node
// link para convertir a md-link
// https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e
// CLI
// libreria nativa para leer argumentos de la terminal
import { argv } from 'process'
// importo la api de mdLinks
import { mdLinks } from './api.js'
import { calcularCantidadBroken, calcularCantidadUnique } from './funciones.js'


const CLI = () => {
  // si no hay path o ruta
  if (argv[2] === undefined) {
    console.log("error debes ingresar la ruta ej. mdlink ./prueba.js")
    return
  }
  // si no hay options
  if (argv[3] === undefined) {
    mdLinks(argv[2], { validate: false })
      .then((respuesta) => {
        // recorrer el arreglo de objetos e imprimirlo en el formato solicitado file, href y text
        for (const elemento of respuesta) {
          console.log(`${elemento.file} ${elemento.line} ${elemento.href} ${elemento.text}`)
        }
      })
      .catch((error) => console.log(error))

    // si hay options y es validate muestro el el ok y status tambien
  } else if (argv[3] === '--validate' && argv[4] === undefined) {
    mdLinks(argv[2], { validate: true })
      .then((respuesta) => {
        // recorrer el arreglo de objetos e imprimirlo en el formato solicitado file, href y text
        for (const elemento of respuesta) {
          console.log(`${elemento.file} ${elemento.line} ${elemento.href} ${elemento.ok} ${elemento.status} ${elemento.text} `)
        }
      })
      .catch((error) => console.log(error))
    // si hay options y es --stats cuento los la cantidad de links encontrados
  } else if (argv[3] === '--stats' && argv[4] === undefined) {
    mdLinks(argv[2], { validate: false })
      .then((respuesta) => {
        const cantidadUnique = calcularCantidadUnique(respuesta)
        console.log(`Total: ${respuesta.length}\nUnique:${cantidadUnique}`)
      })
      .catch(error => console.log(error))
    // si hay la opcion stats y validate cuento los fail y muestro la cantidad de links
  } else if ((argv[3] === '--stats' && argv[4] === '--validate') || (argv[3] === '--validate' && argv[4] === '--stats')) {
    mdLinks(argv[2], { validate: true })
      .then((respuesta) => {
        // cuent la cantidad de links unicos
        const cantidadUnique = calcularCantidadUnique(respuesta)
        // cuent la cantidad de fail que hay por objeto
        const cantidadFail = calcularCantidadBroken(respuesta)
        // imprimo la cantidad de links y la cantidad de fail
        console.log(`Total: ${respuesta.length}\nUnique:${cantidadUnique}\nBroken:${cantidadFail}`)
      })
      .catch(error => console.log(error))
  } else {
    console.log("Error opcion no valida, pruebe con --stats o --validate o no ponga opciones")
  }
}

CLI()