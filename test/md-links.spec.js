import { esDirectorio, convertirTextoMDEnHtml, verificarArchivoMD, seleccionarEtiquetasADeHtml } from '../src/funciones.js'
import fs from 'fs'
// https://stackoverflow.com/questions/50066138/mock-fs-function-with-jest
// jest.mock('fs');

describe('esDirectorio', () => {

  it('esto debe ser una funcion', () => {
    expect(typeof esDirectorio).toBe('function')
  });

  it('esDirectorio("./test.md") deberia retornar false', () => {
    // fs.statSync.mockReturnValue({ isDirectory: () => false });
    expect(esDirectorio("./test.md")).toBe(false)

  })

});

describe('convertirTextoMDEnHtml', () => {

  it('esto debe ser una funcion', () => {
    expect(typeof convertirTextoMDEnHtml).toBe('function')
  });

  it('convertirTextoMDEnHtml("../test.md") deberia retornar string', () => {

    expect(typeof convertirTextoMDEnHtml("./test.md")).toBe('string')
  })
});

describe('seleccionarEtiquetasADeHtml', () => {

  it('esto debe ser una funcion', () => {
    expect(typeof seleccionarEtiquetasADeHtml).toBe('function')
  });

  it('seleccionarEtiquetasADeHtml("textoHtml")[1].textContent deberia retornar el textContent de la segunda etiqueta a', () => {

    expect(seleccionarEtiquetasADeHtml(`<a href="https://httpbin.org/redirect-to">karencita</a>
    <a href="https://google.com/mascotas/karen.jpg">linda gatita</a>`)[1].textContent).toBe('linda gatita')
  })
});

describe('verificarArchivoMD', () => {

  it('esto debe ser una funcion', () => {
    expect(typeof verificarArchivoMD).toBe('function')
  });

  it('verificarArchivoMD("./test.md") deberia retornar true', () => {
    expect(verificarArchivoMD("./testa.md")).toBe(true)
  })

  it('verificarArchivoMD("./thumb.png") deberia retornar false', () => {
    expect(verificarArchivoMD("./thumb.png")).toBe(false)
  })

});

