const parse = require('urlencoded-body-parser')

module.exports = async req => {
  const data = await parse(req)
  console.log(data)
  return `<h1>${JSON.stringify(data)}<h1>`
}
