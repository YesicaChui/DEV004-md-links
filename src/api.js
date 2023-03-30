

import { convertirTextoMDEnHtml, filtrarObjetosHttp, leerArchivo, seleccionarEtiquetasADeHtml } from './funciones.js'
export const mdLinks = (path,options)=>{
  const contenido = leerArchivo(path)
  const textoHtml = convertirTextoMDEnHtml(contenido)
  const etiquetasA = seleccionarEtiquetasADeHtml(textoHtml)
  const arregloResultado = []
  // recorro cada etiqueta a
  for(const elemento of etiquetasA){
    // agrego al arreglo vacio el objeto con el formato requerido href, text y file
    arregloResultado.push({
      href:elemento.href,
      text:elemento.textContent,
      file:path
    })
  } 
  return filtrarObjetosHttp(arregloResultado)
}

//console.log(mdLinks('./test.md'))