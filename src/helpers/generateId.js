/**
 * Generating an Id for mongoose documents
 * @param {number} length
 * @returns generated Id
 */
const generateId = length => {
  let id = ''
  const characters =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
  const charactersCount = characters.length

  let count = 0

  while (count < length) {
    id += characters.charAt(Math.floor(Math.random() * charactersCount))
    count += 1
  }
  return id
}

module.exports = { generateId }
