import {
  convertirTextoMDEnHtml, leerArchivo,
  seleccionarEtiquetasADeHtml, verificarRuta, verificarArchivoMD,
  verificarCodigoEstadoHttp,
  obtenerArchivos
} from './funciones.js'

export const mdLinks = (path, options) => new Promise((resolve, reject) => {
  if (!path) reject("no hay path")
  if (!verificarRuta(path)) reject("ruta invalida verifique si la ruta es correcta")
  const arregloResultado = []
  // genero el arreglo de promesas http
  const promesasHttp = []

  // generar el arreglo de promesas de lectura de archivos
  const arregloPromesasLectura = []
  // obtenengo los archivos si es un directorio en un arreglo
  const arrayArchivos = obtenerArchivos(path)
  for (const ruta of arrayArchivos) {
    if (!verificarArchivoMD(ruta)) continue
    const promesaLectura = leerArchivo(ruta)
    arregloPromesasLectura.push(promesaLectura)
  }

  Promise.all(arregloPromesasLectura)
    .then((arregloContenido) => {
      for (const objetoContenido of arregloContenido) {
        const textoHtml = convertirTextoMDEnHtml(objetoContenido.contenidoArchivoMD)
        const etiquetasA = seleccionarEtiquetasADeHtml(textoHtml)
        // recorro cada etiqueta a
        for (const elemento of etiquetasA) {
          // si no inicia con http pasamos a la siguiente vuelta
          if (!elemento.href.startsWith("http")) continue
          // const linea = objetoContenido.lineas.findIndex((linea)=>linea.includes(elemento.href))+1
          // https://bobbyhadz.com/blog/javascript-find-index-all-occurrences-of-element-in-array
          const indices = objetoContenido.lineas
            .map((linea, index) =>
              linea.includes(elemento.href) ? index+1 : -1,
            )
            .filter(element => element !== -1);

          // si es true validate analizo el codigo de estado(status) y el ok
          if (options.validate) {
            // verifico el codigo de respuesta y el ok para cada link
            const promesa = verificarCodigoEstadoHttp(elemento.href)
              .then(estado => {
                //indicar fail u ok segundo codigo http          
                arregloResultado.push({
                  href: elemento.href,
                  text: elemento.textContent,
                  file: objetoContenido.ruta,
                  linea: indices.join(","),
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
              file: objetoContenido.ruta,
              linea: indices.join("-"),
            })
          }
        }
      }
      if (options.validate) {
        // en el caso validate true ejecuto promise all para esperar a todas las promesas terminen
        Promise.all(promesasHttp).then(() => resolve(arregloResultado))
      } else {
        resolve(arregloResultado)
      }
    })

})



mdLinks("../test.md", { validate: false })
  .then((respuesta) => console.log(respuesta))
  .catch((error) => console.log(error))

/* mdLinks('../src',{validate:true})
  .then((respuesta)=>console.log(respuesta))
  .catch((error)=>console.log(error)) */