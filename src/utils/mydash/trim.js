// мое решение
export function trim(string, pattern) {
  let method = pattern || ' ';
  let cleanText = string.replace(/\xA0/g, ' ');
  let symbols = '';
  if (method.length > 1) {
    for (let i = 0; i < method.length; i++) {
      symbols +=  i === method.length - 1 ? method[i] : method[i] + '|'
    }
  }
  let matchPattern = symbols ? symbols : method;
  const regExp = new RegExp(matchPattern, 'g');
  return cleanText.replace(regExp, '');
}

export function elegantTrim(string, chars) {
  if (string && !chars) {
      return string.trim();
  }
  const reg = new RegExp(`[${chars}]`, "gi");
  return string.replace(reg, "");
}

