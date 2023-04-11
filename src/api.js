import {
  convertirTextoMDEnHtml, leerArchivo,
  seleccionarEtiquetasADeHtml, verificarRuta, verificarArchivoMD,
  verificarCodigoEstadoHttp,
  obtenerArchivos,convertirARutaAbsoluta,buscarTextoEnLineas
} from './funciones.js'

export const mdLinks = (path, options) => new Promise((resolve, reject) => {
  if (!path) reject("no hay path")
  if (!verificarRuta(path)) reject("ruta invalida verifique si la ruta es correcta si es absoluta considere poner \\\\")
  path = convertirARutaAbsoluta(path)
  // arreglo donde estaran todos los objetos segur se requiera
  const arregloResultado = []
  // genero el arreglo de promesas http
  const promesasHttp = []
  // generar el arreglo de promesas de lectura de archivos
  const arregloPromesasLectura = []
  // obtenengo los archivos si es un directorio en un arreglo
  const arrayArchivos = obtenerArchivos(path)
  // recorro todas las rutas obtenidas y genero un arreglo de promesas de lectura de archivo
  for (const ruta of arrayArchivos) {
    if (!verificarArchivoMD(ruta)) continue
    const promesaLectura = leerArchivo(ruta)
    arregloPromesasLectura.push(promesaLectura)
  }
  // resuelvo todas las promesas de lectura de archivo
  Promise.all(arregloPromesasLectura)
    .then((arregloContenido) => {
      // recorro cada contenido de archivo md obtenido
      for (const objetoContenido of arregloContenido) {
        const textoHtml = convertirTextoMDEnHtml(objetoContenido.contenidoArchivoMD)
        const etiquetasA = seleccionarEtiquetasADeHtml(textoHtml)
        // recorro cada etiqueta a
        for (const elemento of etiquetasA) {
          // si no inicia con http pasamos a la siguiente vuelta
          if (!elemento.href.startsWith("http")) continue
          // busco los indices donde este el link para conseguir 
          // el arreglo donde indique la linea o lineas donde se encontro
          const lineas = buscarTextoEnLineas(objetoContenido.lineas,elemento.href)
          // si es true validate analizo el codigo de estado(status) y el ok
          if (options.validate) {
            // verifico el codigo de respuesta y el ok para cada link
            const promesa = verificarCodigoEstadoHttp(elemento.href)
              .then(estado => {
                // indicar fail u ok segundo codigo http          
                arregloResultado.push({
                  href: elemento.href,
                  text: elemento.textContent,
                  file: objetoContenido.ruta,
                  line: lineas.join("-"),
                  // uso el spread para desparramar el objeto estado donde estan status y ok
                  ...estado
                })
              })
            // agrego al arreglo de promesas http
            promesasHttp.push(promesa)
            // agrego al arreglo vacio el objeto con el formato requerido href, text y file
          } else {
            arregloResultado.push({
              href: elemento.href,
              text: elemento.textContent,
              file: objetoContenido.ruta,
              line: lineas.join("-"),
            })
          }
        }
      }
      if (options.validate) {
        // en el caso validate true ejecuto promise all para esperar a todas las promesas http terminen
        Promise.all(promesasHttp).then(() => resolve(arregloResultado))
      } else {
        // para el caso que no necesite peticion http
        resolve(arregloResultado)
      }
    })

})



/* mdLinks("../test.md", { validate: false })
  .then((respuesta) => console.log(respuesta))
  .catch((error) => console.log(error))
 */
/* mdLinks('../src',{validate:true})
  .then((respuesta)=>console.log(respuesta))
  .catch((error)=>console.log(error)) */