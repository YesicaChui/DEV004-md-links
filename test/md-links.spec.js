import {
  convertirARutaAbsoluta, leerDirectorio, obtenerArchivos, verificarCodigoEstadoHttp,
  verificarRuta, leerArchivo, esDirectorio, convertirTextoMDEnHtml, verificarArchivoMD,
  seleccionarEtiquetasADeHtml, buscarTextoEnLineas, calcularCantidadUnique, calcularCantidadBroken
} from '../src/funciones.js'
import path from 'path';
// https://stackoverflow.com/questions/50066138/mock-fs-function-with-jest
// jest.mock('fs');

describe('leerArchivo', () => {

  it('esto debe ser una funcion', () => {
    expect(typeof leerArchivo).toBe('function')
  });
  // https://jestjs.io/docs/asynchronous
  it('Resuelve la promesa con un objeto con 3 claves contenidoArchivoMD un string, ruta (la ruta entregada) y lineas un arreglo de strings', (done) => {
    // fs.statSync.mockReturnValue({ isDirectory: () => false });
    leerArchivo("./pruebatest.md")
      .then((respuesta) => {
        expect(respuesta).toStrictEqual({
          "contenidoArchivoMD": 'bueno [Node.js](https://nodejs.org/es/)\r\n' +
            'y mi gatita  [fallo404](https://google.com/mascotas/karen.jpg)',
          "ruta": "./pruebatest.md",
          "lineas": ["bueno [Node.js](https://nodejs.org/es/)\r",
            "y mi gatita  [fallo404](https://google.com/mascotas/karen.jpg)"]
        })
        done() // aviso a Jest que termino el test asincrono
      })

  });


  it('debería lanzar un error si no existe la ruta del archivo', () => {
    return leerArchivo("./testNoExiste.md")
      .catch((error) => {
        // si existe mensaje de error entonces sera true
        expect(!!error.message).toBe(true);
      })
  });


});

describe('convertirTextoMDEnHtml', () => {

  it('esto debe ser una funcion', () => {
    expect(typeof convertirTextoMDEnHtml).toBe('function')
  });

  it('Entregamos un texto en formato Md con un link y retorna otro texto que incluye la cadena "href"', () => {

    expect(convertirTextoMDEnHtml(`bueno [Node.js](https://nodejs.org/es/)`).includes('href')).toBe(true)
  })
});

describe('seleccionarEtiquetasADeHtml', () => {

  it('esto debe ser una funcion', () => {
    expect(typeof seleccionarEtiquetasADeHtml).toBe('function')
  });

  it('Se entrega un texto html con etiquetas <a> su textContent del <a> en la posicion 1 deberia retornar "linda gatita"', () => {
    expect(seleccionarEtiquetasADeHtml(`<a href="https://httpbin.org/redirect-to">karencita</a>
    <a href="https://google.com/mascotas/karen.jpg">linda gatita</a>`)[1].textContent).toBe('linda gatita')
  })
});

describe('verificarRuta', () => {
  it('esto debe ser una funcion', () => {
    expect(typeof verificarRuta).toBe('function')
  });

  it('Le entrego una ruta que existe y me retorna true', () => {
    expect(verificarRuta("./test.md")).toBe(true)
  })

  it('Le entrego una ruta que no existe y me retorna false', () => {
    expect(verificarRuta("./testNoExiste.md")).toBe(false)
  })

});

describe('verificarArchivoMD', () => {

  it('esto debe ser una funcion', () => {
    expect(typeof verificarArchivoMD).toBe('function')
  });

  it('Se entrega la ruta de un archivo md deberia retornar true', () => {
    expect(verificarArchivoMD("./testa.md")).toBe(true)
  })

  it('Se entrega la ruta de un archivo que no es md deberia retornar false', () => {
    expect(verificarArchivoMD("./thumb.png")).toBe(false)
  })
});


describe('verificarCodigoEstadoHttp', () => {
  it('esto debe ser una funcion', () => {
    expect(typeof verificarCodigoEstadoHttp).toBe('function')
  });

  it('Se entrega la ruta una pagina que funciona debe resolver un objeto con las claves status y ok con los valores 200 y "ok" ', (done) => {
    verificarCodigoEstadoHttp("https://www.google.com/")
      .then((res) => {
        expect(res).toStrictEqual({ status: 200, ok: "ok" })
        done()
      })
  })

  it('Se entrega la direccion de un dominio valido con una ruta que no existe debe resolver un objeto con las claves status y ok con los valores 404 y "fail" ', (done) => {
    verificarCodigoEstadoHttp("https://google.com/mascotas/karen.jpg")
      .then((res) => {
        expect(res).toStrictEqual({ status: 404, ok: "fail" })
        done()
      })
  })

  it('Se entrega la direccion de un dominio que no existe debe resolver un objeto con las claves status y ok con los valores 404 y "fail" ', (done) => {
    verificarCodigoEstadoHttp("https://karencitaDurmiente.com/mascotas/karen.jpg")
      .then((res) => {
        expect(res).toStrictEqual({ status: 404, ok: "fail" })
        done()
      })
  })
});

describe('obtenerArchivos', () => {
  it('esto debe ser una funcion', () => {
    expect(typeof obtenerArchivos).toBe('function')
  });

  it('Se entrega una ruta de una carpeta y retorna un arreglo con las rutas de todos los archivos encontrados incluyendo los archivos de las subcarpetas', () => {
    expect(obtenerArchivos("test")).toStrictEqual([
      'test\\.eslintrc',
      'test\\md-links.spec.js',
      'test\\prueba\\pruebatest.md',
      'test\\prueba\\pruebatest1.md'
    ])
  })
});


describe('esDirectorio', () => {
  it('esto debe ser una funcion', () => {
    expect(typeof esDirectorio).toBe('function')
  });

  it('Se entrega una ruta de un directorio deberia retornar true', () => {
    expect(esDirectorio("./test")).toBe(true)
  })

  it('Se entrega una ruta de un archivo deberia retornar false', () => {
    expect(esDirectorio("./test.md")).toBe(false)
  })
});


describe('leerDirectorio', () => {
  it('esto debe ser una funcion', () => {
    expect(typeof leerDirectorio).toBe('function')
  });

  it('Se entrega una ruta de un directorio retorna las rutas de archivos y carpetas del directorio sin ingresar a las subcarpetas', () => {
    expect(leerDirectorio("test")).toStrictEqual([
      'test\\.eslintrc',
      'test\\md-links.spec.js',
      'test\\prueba'
    ])
  })
});

describe('convertirARutaAbsoluta', () => {
  it('esto debe ser una funcion', () => {
    expect(typeof convertirARutaAbsoluta).toBe('function')
  });

  it('Se entrega una ruta relativa y retorna su ruta absoluta', () => {
    expect(path.isAbsolute(convertirARutaAbsoluta("./test.md"))).toBe(true)
  })

  it('Se entrega una ruta absoluta y retorna la misma ruta absoluta', () => {
    expect(convertirARutaAbsoluta(process.cwd())).toBe(process.cwd())
  })
});


describe('buscarTextoEnLineas', () => {
  it('esto debe ser una funcion', () => {
    expect(typeof buscarTextoEnLineas).toBe('function')
  });

  it('Se entrega un arreglo con textos y un texto a buscar retorna un arreglo con las posiciones donde este el texto a buscar', () => {
    expect(buscarTextoEnLineas([
      'hola como estas karen',
      'mi bella genio interesante',
      'karen la durmiente',
      'el libro esta interesante',
      'karen bonita'
    ],'karen')).toStrictEqual([1,3,5])
  })

});

describe('calcularCantidadUnique', () => {
  it('esto debe ser una funcion', () => {
    expect(typeof calcularCantidadUnique).toBe('function')
  });

  it('Se entrega un arreglo de objetos con links y retorna la cantidad de links unicos que hay', () => {
    expect(calcularCantidadUnique([
      {
        href:"www.google.com",
        text:"durmiente"
      },
      {
        href:"www.facebook.com",
        text:"durmiente bonita"
      },
      {
        href:"www.facebook.com",
        text:"chuki"
      },
      {
        href:"www.google.com",
        text:"molestosa"
      },
    ])).toBe(2)
  })

});


describe('calcularCantidadBroken', () => {
  it('esto debe ser una funcion', () => {
    expect(typeof calcularCantidadBroken).toBe('function')
  });

  it('Se entrega un arreglo de objetos que tienen la clave ok y retorna la cantidad de valores fail que hay en ok ', () => {
    expect(calcularCantidadBroken([
      {
        href:"www.google.com",
        ok:"fail"
      },
      {
        href:"www.facebook.com",
        ok:"fail"
      },
      {
        href:"www.twitter.com",
        ok:"ok"
      },
      {
        href:"www.linkedin.com",
        ok:"fail"
      },
    ])).toBe(3)
  })
});