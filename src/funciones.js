// libreria que me permite usar las operaciones del dom sobre un texto con formato html
import { JSDOM } from 'jsdom'
// libreria nativa usado para leer archivos md
import fs from 'fs'
// libreria que permite convertir markdown(md) a html
import { marked } from 'marked'
import axios from 'axios';
import path from 'path';

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
  // en cualquier caso retorno resolve pero con fail en el catch
  axios.get(href)
  .then(response => resolve({status:response.status,ok:"ok"}))
  // si el codigo es de 400 para arriba
  .catch(error => {
    // respuesta del servidor
    if(error.response) resolve({status:error.response.status, ok:"fail"})
    // respuesta personalizada si falla
    else resolve({status:404, ok:"fail"})
  })
})

export const obtenerArchivos=(ruta)=>{
  let arregloArchivos=[]
  if(esDirectorio(ruta)){
    const rutas =leerDirectorio(ruta)
    for(const elemento of rutas){
      arregloArchivos=arregloArchivos.concat(obtenerArchivos(elemento))
    }
  }else{
    arregloArchivos.push(ruta)
  }
  return arregloArchivos
}

export const esDirectorio =(ruta)=>{ //../desarrollo/laboratoria/yesica
  const stats = fs.statSync(ruta);
  return stats.isDirectory()
}

export const leerDirectorio=(ruta)=>{
  return fs.readdirSync(ruta).map(file =>path.join(ruta,file))
}
//console.log(obtenerArchivos("..//node_modules"))

//console.log(esDirectorio("../hola"))