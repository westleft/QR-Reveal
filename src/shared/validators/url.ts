export function vaildIsURL(value: string): boolean {
  const pattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/\S*)?$/
  return pattern.test(value.trim())
}
