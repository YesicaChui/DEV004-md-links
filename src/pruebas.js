// https://nodejs.org/docs/latest/api/process.html#processargv
import { argv } from 'process';
// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'
import{ JSDOM } from 'jsdom'
// https://dustinpfister.github.io/2017/11/19/nodejs-marked/
import {marked} from 'marked'
import axios from 'axios';

console.log(argv)
console.log(argv[2])
console.log(argv[3])
console.log(argv[4])
/* axios.get("https://google.com/mascotas/karen.jpg")
  .then(response => console.log(response.status))
  .catch(error => {
    if(error.response) console.log(error.response.status)
    else console.log(404)
  }) */




/* fetch("https://google.com/mascota/karen.png")
  .then((response)=>console.log("ok", response.status))
  .catch((error)=> console.log("mi error", error, error.status, error.response.status)) */



/* argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
}); */

// consiguiendo la ruta absoluta del proyecto
/* const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname) */


//fs.writeFileSync('./ejemplo.txt', 'hola karen!!!')
/* const contenido = fs.readFileSync('./test.md','utf-8')
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
console.log(arregloResultadoFiltrado) */
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
