import {
  convertirTextoMDEnHtml, filtrarObjetosHttp, leerArchivo,
  seleccionarEtiquetasADeHtml, verificarRuta, verificarArchivoMD,
  verificarCodigoEstadoHttp, mensajeExito
} from './funciones.js'
export const mdLinks = (path, options) => new Promise((resolve, reject) => {
  if (!path) reject("no hay path")
  if (!verificarRuta(path)) reject("ruta invalida verifique si la ruta es correcta")
  if (!verificarArchivoMD(path)) reject("no es archivo md")
  const contenido = leerArchivo(path)
  const textoHtml = convertirTextoMDEnHtml(contenido)
  const etiquetasA = seleccionarEtiquetasADeHtml(textoHtml)
  const arregloResultado = []
  const promesasHttp = []
  // recorro cada etiqueta a
  for (const elemento of etiquetasA) {
    // si no inicia con http pasamos a la siguiente vuelta
    if (!elemento.href.startsWith("http")) continue
    // agrego al arreglo vacio el objeto con el formato requerido href, text y file
    if (options.validate) {
      //leer codigo de respuesta 
      //const status = verificarCodigoEstadoHttp(elemento.href)
      const promesa = verificarCodigoEstadoHttp(elemento.href)
        .then(estado => {
          //indicar fail u ok segundo codigo http          
          arregloResultado.push({
            href: elemento.href,
            text: elemento.textContent,
            file: path,
            ...estado
          })
        })
        promesasHttp.push(promesa)
    } else {
      arregloResultado.push({
        href: elemento.href,
        text: elemento.textContent,
        file: path
      })
    }
  }
  if (options.validate) {
    Promise.all(promesasHttp).then(()=>resolve(arregloResultado))
  }else{
    resolve(arregloResultado)
  }  
})



/* mdLinks("../readme.md",{validate:true})
  .then((respuesta)=>console.log(respuesta))
  .catch((error)=>console.log(error)) */

//console.log(mdLinks('./test.md'))