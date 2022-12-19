const a: number = 1;
console.log(a)

// a: {
//   b: {
//     c: {
//       d: {
//         e: {

//         }
//       }
//     }
//   }
// }

function namespace(str: string) {
  const arr = str.split('.');
  const startObj: {[key: string]: {}} = {};
  let curObj = startObj;
  for (const char of arr) {
    curObj[char] = {}; // e: {}
    console.log(curObj, "=> before")
    curObj = curObj[char]; // { e: {} }
  }
  return startObj;
}

const namespace2 = (str: string): object =>
  str.split(".").reduceRight((acc, key) => ({ [key]: acc }), {});

console.log(namespace('a.b.c.d.e'))

type Nullable<T> = T | null;

const text: Nullable<HTMLDivElement> = document.getElementById(
  "text"
) as HTMLDivElement;
const input: Nullable<HTMLInputElement> = document.getElementById(
  "input"
) as HTMLInputElement;

if (!text || !input) {
  throw new Error("нет полей");
}

const data = {
  title: ""
};

Object.defineProperty(data, 'title', {});

export default Nullable
