import {
  convertirTextoMDEnHtml, leerArchivo,
  seleccionarEtiquetasADeHtml, verificarRuta, verificarArchivoMD,
  verificarCodigoEstadoHttp
} from './funciones.js'
export const mdLinks = (path, options) => new Promise((resolve, reject) => {
  if (!path) reject("no hay path")
  if (!verificarRuta(path)) reject("ruta invalida verifique si la ruta es correcta")
  if (!verificarArchivoMD(path)) reject("no es archivo md")
  const contenido = leerArchivo(path)
  const textoHtml = convertirTextoMDEnHtml(contenido)
  const etiquetasA = seleccionarEtiquetasADeHtml(textoHtml)
  const arregloResultado = []
  // genero el arreglo de promesas
  const promesasHttp = []
  // recorro cada etiqueta a
  for (const elemento of etiquetasA) {
    // si no inicia con http pasamos a la siguiente vuelta
    if (!elemento.href.startsWith("http")) continue
    // si es true validate analizo el codigo de estado(status) y el ok
    if (options.validate) {
      // verifico el codigo de respuesta y el ok para cada link
      const promesa = verificarCodigoEstadoHttp(elemento.href)
        .then(estado => {
          //indicar fail u ok segundo codigo http          
          arregloResultado.push({
            href: elemento.href,
            text: elemento.textContent,
            file: path,
            // uso el spread para desparramar el objeto estado donde estan status y ok
            ...estado
          })
        })
        // agrego al arreglo de promesas
        promesasHttp.push(promesa)
        // agrego al arreglo vacio el objeto con el formato requerido href, text y file
    } else {
      arregloResultado.push({
        href: elemento.href,
        text: elemento.textContent,
        file: path
      })
    }
  }
  if (options.validate) {
    // en el caso validate true ejecuto promise all para esperar a todas las promesas terminen
    Promise.all(promesasHttp).then(()=>resolve(arregloResultado))
  }else{
    resolve(arregloResultado)
  }  
})



/* mdLinks("../readme.md",{validate:true})
  .then((respuesta)=>console.log(respuesta))
  .catch((error)=>console.log(error)) */

//console.log(mdLinks('./test.md'))