// https://nodejs.org/docs/latest/api/process.html#processargv
import { argv } from 'process';
// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'
import{ JSDOM } from 'jsdom'
import {marked} from 'marked'

/* argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
}); */

// consiguiendo la ruta absoluta del proyecto
/* const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname) */


//fs.writeFileSync('./ejemplo.txt', 'hola karen!!!')
const contenido = fs.readFileSync('./test.md','utf-8')
const textoHtml = marked(contenido)
console.log(contenido)
console.log(textoHtml)
const dom = new JSDOM(textoHtml);
//console.log(dom.window.document.querySelectorAll("a")); 
const anclas = dom.window.document.querySelectorAll("a")
const arregloResultado = []
for(const elemento of anclas){
  console.log(elemento.href)
  arregloResultado.push({
    href:elemento.href,
    text:elemento.textContent,
    file:"./test.md"
  })
}
console.log(arregloResultado)
const arregloResultadoFiltrado = arregloResultado.filter((elemento)=>elemento.href.startsWith("http"))
console.log(arregloResultadoFiltrado)
/* const markdownText = contenido
const htmlText = marked(markdownText);
const dom = new JSDOM(htmlText);
const links = dom.window.document.querySelectorAll('a');
const linkArray = Array.from(links);
const miObjeto = linkArray.map(link => {
  return {href: link.href,text: link.textContent}
});
//const texts = linkArray.map(link => link.textContent);
const miObjetoFinal= miObjeto.filter((elemento)=>elemento.href.startsWith('http'))
console.log(miObjetoFinal) */