import fs from 'fs'
import {marked} from 'marked'
import{ JSDOM } from 'jsdom'
export const mdLinks = (path,options)=>{
  const contenido = fs.readFileSync(path,'utf-8')
  const textoHtml = marked(contenido)
  const dom = new JSDOM(textoHtml)
  const etiquetasA = dom.window.document.querySelectorAll("a")
  const arregloResultado = []
  for(const elemento of etiquetasA){
    arregloResultado.push({
      href:elemento.href,
      text:elemento.textContent,
      file:path
    })
  }
  const arregloResultadoFiltrado = arregloResultado.filter((elemento)=>elemento.href.startsWith("http"))
  return arregloResultadoFiltrado
}

//console.log(mdLinks('./test.md'))