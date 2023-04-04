import { argv } from 'process';
//console.log(argv)
/* console.log(argv[2])
console.log(argv[3])
console.log(argv[4]) */
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
console.log(traverseSync("../coverage"))