// actualmente mdLinks lee archivos
// convierte markdown a html
// detecta links del html
// crea un arreglo de objetos donde cada objeto tiene las claves href, text y file
// filtra los links que inician con http
// libreria que me permite usar las operaciones del dom sobre un texto con formato html
import { JSDOM } from 'jsdom'
// libreria nativa usado para leer archivos md
import fs from 'fs'
// libreria que permite convertir markdown(md) a html
import { marked } from 'marked'
import axios from 'axios';

export const leerArchivo = (ruta) => {
  // leo el archivo md
  const contenidoArchivo = fs.readFileSync(ruta, 'utf-8')
  return contenidoArchivo
}

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

export const filtrarObjetosHttp = (arregloObjetos) => {
  // filtro solo los href que tengan http
  const arregloObjetosFiltrados = arregloObjetos.filter((elemento) => elemento.href.startsWith("http"))
  // retorno el arreglo de objetos filtrados
  return arregloObjetosFiltrados
}

export const verificarRuta = (ruta) => {
  // retorno true si la ruta existe o false sino existe
  return fs.existsSync(ruta)
}

export const verificarArchivoMD = (ruta) => {
  const nombreArchivo = ruta.split('/').pop(); // test.md
  const extensionArchivo = nombreArchivo.split('.').pop(); // [test, md] ->pop()-->retorna md
  // retorno true si la ruta existe o false sino existe
  return extensionArchivo === 'md'
}
export const verificarCodigoEstadoHttp = (href) => new Promise((resolve,reject)=>{
  axios.get(href)
  .then(response => resolve({status:response.status,ok:"ok"}))
  .catch(error => {
    if(error.response) resolve({status:error.response.status, ok:"fail"})
    else resolve({status:404, ok:"fail"})
  })

})
export const mensajeExito = (status) => {
  const nombreArchivo = ruta.split('/').pop(); // test.md
  const extensionArchivo = ruta.split('.').pop(); // [test, md] ->pop()-->retorna md
  // retorno true si la ruta existe o false sino existe
  return extensionArchivo === 'md'
}