import { convertirTextoMDEnHtml, filtrarObjetosHttp, leerArchivo, 
  seleccionarEtiquetasADeHtml, verificarRuta, verificarArchivoMD,
 verificarCodigoEstadoHttp, mensajeExito} from './funciones.js'
export const mdLinks = (path,options)=>new Promise((resolve, reject)=>{
  if(!path) reject("no hay path")
  if(!verificarRuta(path)) reject("ruta invalida verifique si la ruta es correcta")
  if(!verificarArchivoMD(path)) reject("no es archivo md")
  const contenido = leerArchivo(path)
  const textoHtml = convertirTextoMDEnHtml(contenido)
  const etiquetasA = seleccionarEtiquetasADeHtml(textoHtml)
  const arregloResultado = []
  // recorro cada etiqueta a
  for(const elemento of etiquetasA){
    // si no inicia con http pasamos a la siguiente vuelta
    if(!elemento.href.startsWith("http")) continue
        // agrego al arreglo vacio el objeto con el formato requerido href, text y file
    if(options.validate){
      //leer codigo de respuesta 
      const status = verificarCodigoEstadoHttp(elemento.href)
      //indicar fail u ok segundo codigo http
      const ok = mensajeExito(status)
      arregloResultado.push({
        href:elemento.href,
        text:elemento.textContent,
        file:path
      })
    }else{
      arregloResultado.push({
        href:elemento.href,
        text:elemento.textContent,
        file:path
      })
    }
  } 
  // resolve(filtrarObjetosHttp(arregloResultado)) 
  resolve(arregloResultado) 
})
/* 
mdLinks("../testt.md")
  .then((respuesta)=>console.log(respuesta))
  .catch((error)=>console.log(error))
 */
//console.log(mdLinks('./test.md'))