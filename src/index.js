import { range } from './utils/mydash';

console.log(range(4)); // => [0, 1, 2, 3]
console.log(range(-4)); // => [0, -1, -2, -3]
console.log(range(1, 5)); // => [1, 2, 3, 4]
console.log(range(0, 20, 5)); // => [0, 5, 10, 15]
console.log(range(0, -4, -1)); // => [0, -1, -2, -3]
console.log(range(1, 4, 0)); // => [1, 1, 1]
console.log(range(0)); // => []
