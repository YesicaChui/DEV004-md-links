// libreria que me permite usar las operaciones del dom sobre un texto con formato html
import { JSDOM } from 'jsdom'
// libreria nativa usado para leer archivos md
import fs from 'fs'
// libreria que permite convertir markdown(md) a html
import { marked } from 'marked'
import axios from 'axios';
import path from 'path';

// funcion asincrona que lee un archivo MD
export const leerArchivo = (ruta) => new Promise((resolve, reject) => {
  fs.promises.readFile(ruta, 'utf-8')
    .then((contenidoArchivo) => {
      // en un arreglo de lineas divido el contenido del archivo 
      // uso el caracter invisible de salto de linea \n para la division
      const lineas = contenidoArchivo.split('\n')
      resolve(
        {
          "contenidoArchivoMD": contenidoArchivo,
          "ruta": ruta,
          "lineas": lineas
        }
      )
    }
    )
    // si hay un error en la lectura del archivo rechaza la promesa
    .catch((error) => reject(error))
})


export const convertirTextoMDEnHtml = (textoMD) => {
  // convierto texto md a html
  const textoHtml = marked(textoMD)
  return textoHtml
}

export const seleccionarEtiquetasADeHtml = (textoHtml) => {
  // uso la libreria JSDOM para crear un objeo DOM con la estructura del HTML en nodos
  const dom = new JSDOM(textoHtml)
  // selecciono todas las etiquetas a
  const arregloEtiquetasA = dom.window.document.querySelectorAll("a")
  return arregloEtiquetasA
}


export const existeRuta = (ruta) => {
  // retorno true si la ruta existe o false sino existe
  return fs.existsSync(ruta)
}

export const esArchivoMD = (ruta) => {
  // guardo el nombre del archivo de la ruta entregada usando split para dividir la ruta
  // y pop para eliminar y retornar el ultimo elemento del arreglo que se elimino
  // ejemplo: /src/pruebas/test.md ->split()-> [src, pruebas, test.md]-->pop()->retorna test.md
  const nombreArchivo = ruta.split('/').pop(); 
  const extensionArchivo = nombreArchivo.split('.').pop(); // [test, md] ->pop()-->retorna md
  // retorno true si el archivo es de extension md
  return extensionArchivo === 'md'
}

export const verificarCodigoEstadoHttp = (href) => new Promise((resolve) => {
  // en cualquier caso retorno resolve pero con fail en el catch
  axios.get(href)
    .then(response => resolve({ status: response.status, ok: "ok" }))
    // si el codigo es de 400 para arriba
    .catch(error => {
      // respuesta del servidor existe servidor(dominio) pero ruta no existe u otro error
      if (error.response) resolve({ status: error.response.status, ok: "fail" })
      // respuesta personalizada si falla (o no existe el dominio o servidor)
      else resolve({ status: 404, ok: "fail" })
    })
})

export const obtenerArchivos = (ruta) => {
  // guardo las rutas de archivos encontrados en un arreglo
  let arregloArchivos = []
  if (esDirectorio(ruta)) {
    // leo las rutas de archivos y subdirectorio del directorio
    const rutas = leerDirectorio(ruta)
    // a cada ruta verifico si hay más directorios de forma recursiva
    for (const elemento of rutas) {
      // concateno el arreglo de archivos con el arreglo resultado de la recursividad en el directorio
      arregloArchivos = arregloArchivos.concat(obtenerArchivos(elemento))
    }
  } else {
    // caso base, si no es directorio es un archivo y retorno el arreglo con un solo archivo
    arregloArchivos.push(ruta)
  }
  return arregloArchivos
}

export const esDirectorio = (ruta) => { //../desarrollo/laboratoria/yesica
  // uso StatSync nos da un objeto con información de la ruta 
  const stats = fs.statSync(ruta);
  // retorno true si es directorio
  return stats.isDirectory()
}

export const leerDirectorio = (ruta) => { //leerDirectorio("../src")
  // Obtengo una lista de archivos y directorios en la ruta especificada
  // y agrego la ruta inicial a cada uno de ellos
  return fs.readdirSync(ruta).map(file => path.join(ruta, file)) // [ '../src/cli.js', '../src/ejemplo.md', '../src/funciones.js', '../src/pruebas' ]
}

//console.log(obtenerArchivos("c:\\desarrolloWeb\\laboratoria\\Proyectos\\DEV004-md-links\\test"))
 //console.log(fs.readdirSync("../src"))
// console.log(leerDirectorio("../test"))

export const convertirARutaAbsoluta = (ruta) => {
  // Si no es absoluta voy al caso verdadero
  if (!path.isAbsolute(ruta)) {
    // process.cwd(): El process.cwd()método devuelve el directorio de trabajo actual del proceso de Node.js
    // que es una ruta absoluta
    // El método path.resolve() resuelve una secuencia de rutas o segmentos de ruta en una ruta absoluta.
    // https://www.geeksforgeeks.org/difference-between-process-cwd-and-__dirname-in-node-js/
    // https://openbase.com/js/@yummy/dotenv/documentation
    // https://www.jianshu.com/p/9d213734d881
    // https://www.jianshu.com/p/9c086a551e52
    // __dirname contendra la ruta absoluta del directorio de trabajo
    const __dirname = path.resolve(process.cwd());
    // uniendo ruta absoluta con la ruta relativa
    const rutaAbsoluta = path.join(__dirname, ruta)
    return rutaAbsoluta
  } else {
    // Si eres absoluta retono la misma ruta
    return ruta
  }
}

/* console.log(path.resolve(process.cwd()))
console.log(convertirARutaAbsoluta("../test/prueba/pruebatest.md")) */

/* console.log(process.cwd())
console.log("-----")
console.log(path.resolve(process.cwd())) */

// funcion usada para buscar el link(href) en el arreglo de lineas
export const buscarTextoEnLineas = (arregloLineas, textoBuscar) => {
  // https://bobbyhadz.com/blog/javascript-find-index-all-occurrences-of-element-in-array
  // Creo un arreglo de lineas donde este la linea del texto a buscar sino pongo -1
  const numerosDeLineas = arregloLineas.map((linea, index) =>
    // si la linea tiene el link entonces retorna el indice +1
      linea.includes(textoBuscar) ? index + 1 : -1,
    ) // ejemplo [1,-1,-1,-1,-1,6]
    // filtro solo los que son diferentes a -1
    .filter(element => element !== -1) // ejemplo [1,6]
  return numerosDeLineas
}

export const calcularCantidadUnique = (arregloObjetos) => {
  // genero arreglo Unique vacio donde guardare los objetos unicos
  const arregloUnique = []
  // recorro el arreglo de objetos que contienen la clave href
  for (const elemento of arregloObjetos) {
    //  Comprobamos si el objeto actual ya existe en arregloUnique
    const objetoExiste = arregloUnique.some((elementoUnique) => elementoUnique.href === elemento.href)
   // Si el objeto no existe, lo agregamos al arregloUnique
    if (!objetoExiste) arregloUnique.push(elemento)
  }
  // Devolvemos la cantidad de objetos únicos en el arreglo
  return arregloUnique.length
}

export const calcularCantidadBroken = (arregloObjetos) => {
  // retorno cuantos objetos del arreglo tiene la propiedad 'ok' igual a 'fail'
  return arregloObjetos.reduce((acumulador, elemento) => elemento.ok === 'fail' ? acumulador + 1 : acumulador, 0)
}
