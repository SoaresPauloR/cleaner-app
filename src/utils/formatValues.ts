export function formatValue<T>(value: T) {
  if (typeof value === 'number') {
    return `£ ${value.toFixed(2)}`;
  }
  return `£ ${value}`;
}

export function removeStr(str: string) {
  let newStr = str.replace(/\D+/g, '');
  newStr = newStr.slice(0, -2) + '.' + newStr.slice(-2);
  return parseFloat(newStr);
}
