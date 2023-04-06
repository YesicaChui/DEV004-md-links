// libreria que me permite usar las operaciones del dom sobre un texto con formato html
import { JSDOM } from 'jsdom'
// libreria nativa usado para leer archivos md
import fs from 'fs'
// libreria que permite convertir markdown(md) a html
import { marked } from 'marked'
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

/* leerArchivo Sincrono
export const leerArchivo = (ruta) => {
  // leo el archivo md
  const contenidoArchivo = fs.readFileSync(ruta, 'utf-8')
  console.log(contenidoArchivo.split(/\r?\n/)[0])
  return contenidoArchivo
} */


// lectura asincrona de un archivo
export const leerArchivo = (ruta) => new Promise((resolve, reject) => {
  fs.promises.readFile(ruta, 'utf-8')
    .then((contenidoArchivo) => {
      const lineas = contenidoArchivo.split(/\r?\n/)
      resolve(
        {
          "contenidoArchivoMD": contenidoArchivo,
          "ruta": ruta,
          "lineas": lineas
        }
      )
    }
    )
    .catch((error) => reject(error))
})

export const convertirTextoMDEnHtml = (textoMD) => {
  // convierto texto md a html
  const textoHtml = marked(textoMD)
  return textoHtml
}

export const seleccionarEtiquetasADeHtml = (textoHtml) => {
  // genero nodos del DOM
  const dom = new JSDOM(textoHtml)
  // selecciono todas las etiquetas a
  const arregloEtiquetasA = dom.window.document.querySelectorAll("a")
  return arregloEtiquetasA
}

export const verificarRuta = (ruta) => {
  // retorno true si la ruta existe o false sino existe
  return fs.existsSync(ruta)
}

export const verificarArchivoMD = (ruta) => {
  const nombreArchivo = ruta.split('/').pop(); // test.md
  const extensionArchivo = nombreArchivo.split('.').pop(); // [test, md] ->pop()-->retorna md
  // retorno true si el archivo es de extension md
  return extensionArchivo === 'md'
}

export const verificarCodigoEstadoHttp = (href) => new Promise((resolve, reject) => {
  // en cualquier caso retorno resolve pero con fail en el catch
  axios.get(href)
    .then(response => resolve({ status: response.status, ok: "ok" }))
    // si el codigo es de 400 para arriba
    .catch(error => {
      // respuesta del servidor
      if (error.response) resolve({ status: error.response.status, ok: "fail" })
      // respuesta personalizada si falla
      else resolve({ status: 404, ok: "fail" })
    })
})

export const obtenerArchivos = (ruta) => {
  // guardo los archivos en el arreglo de archivos
  let arregloArchivos = []
  if (esDirectorio(ruta)) {
    // leo las rutas del directorio
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
  // leo el estado de la ruta
  const stats = fs.statSync(ruta);
  // retorno true si es directorio
  return stats.isDirectory()
}

export const leerDirectorio = (ruta) => {
  // leo el directorio y le añado a cada archivo la ruta inicial
  return fs.readdirSync(ruta).map(file => path.join(ruta, file))
}

export const convertirARutaAbsoluta = (ruta) => {

  if (!path.isAbsolute(ruta)) {
    // consiguiendo la ruta absoluta del proyecto
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    // uniendo ruta absoluta con la ruta relativa
    const rutaAbsoluta = path.join(__dirname, ruta)
    return rutaAbsoluta
  } else {
    return ruta
  }
}

// console.log(convertirARutaAbsoluta("../test.md"))
//console.log(obtenerArchivos("..//node_modules"))

// console.log(esDirectorio("../test.md"))

/* console.log(seleccionarEtiquetasADeHtml(`<a href="https://httpbin.org/redirect-to">karencita</a>
<a href="https://google.com/mascotas/karen.jpg">linda gatita</a>`)[0].textContent) */