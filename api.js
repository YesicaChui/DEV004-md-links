// libreria nativa usado para leer archivos md
import fs from 'fs'
// libreria que permite convertir markdown(md) a html
import {marked} from 'marked'
// libreria que me permite usar las operaciones del dom sobre un texto con formato html
import{ JSDOM } from 'jsdom'
export const mdLinks = (path,options)=>{
  // leo el archivo md
  const contenido = fs.readFileSync(path,'utf-8')
  // convierto archivo md a html
  const textoHtml = marked(contenido)
  // genero nodos del DOM
  const dom = new JSDOM(textoHtml)
  // selecciono todas las etiquetas a
  const etiquetasA = dom.window.document.querySelectorAll("a")
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
  // filtro solo los href que tengan http
  const arregloResultadoFiltrado = arregloResultado.filter((elemento)=>elemento.href.startsWith("http"))
  // retorno el arreglo de objetos filtrados
  return arregloResultadoFiltrado
}

//console.log(mdLinks('./test.md'))