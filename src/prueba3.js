/* function fib(n){
  if(n==0) return 0
  if(n==1) return 1
  return fib(n-1)+fib(n-2)
}
console.log(fib(7)) */
import Fs from 'fs';
import Path from 'path';
const traverseSync = dir => ({
  path: dir,
  children: Fs.readdirSync(dir).map(file => {
    const path = Path.join(dir, file);
    return Fs.lstatSync(path).isDirectory()
      ? traverseSync(path)
      : { path };
  })
});