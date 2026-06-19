function getExtension(filename) {
  if(filename.includes(".")) return undefined
return "hello.py".split(".").pop()
}

console.log(getExtension('hello.py'))
console.log(getExtension('hello'))
console.log(getExtension('hell.py.backup'))
console.log(getExtension(''))
