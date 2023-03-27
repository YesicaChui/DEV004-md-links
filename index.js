/* module.exports = () => {
  // ...
}; */

import { argv } from 'node:process';

console.log(argv)
// print process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});