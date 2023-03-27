// https://nodejs.org/docs/latest/api/process.html#processargv
import { dirname } from 'node:path';
import { argv } from 'node:process';
// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import path from 'path';
import { fileURLToPath } from 'url';

//console.log(argv)
// print process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname)

/* const dividendo= argv[2]
const divisor = argv[3]
const aDividir = (dividendo,divisor)=>dividendo/divisor
console.log(aDividir(dividendo,divisor)) */

/* const dividir = (dividendo, divisor)=>{
  // al crear una promesa estamos pasando un callback con dos parametros resolve y reject
  return new Promise((resolve,reject)=>{
    if(divisor===0){
      //rechazamos la promesa porque no es posible dividir entre 0, con un mensaje String
      reject("No se puede dividir entre cero")
    }else{
      //si los valores son validos se resuelve la promesa y resolvemos con el resultado de la operacion un Number
      resolve(dividendo/divisor)
    }
  })
}

// al usar la promesa se utiliza then para el resolve y catch para el reject
dividir(dividendo,divisor)
  .then(resultado => console.log(resultado))
  .catch(error => console.log(error)) */
