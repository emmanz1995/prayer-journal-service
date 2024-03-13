const axios = require('axios')

/**
 * @typedef {object} Opts
 * @property {String} book
 * @property {String} chapter
 * @property {String} verse
 * @property {String} translation
 */

/**
 * @async
 * @param {Opts} opts
 * return bible references
 */

const bibleConnector = async opts => {
  const { book, chapter, verse, translation } = opts

  const path = `/${book} ${chapter}:${verse}`
  let url = new URL(`https://bible-api.com${path}`)

  let searchParams = url.searchParams

  if (translation !== null) {
    searchParams.set('translation', translation)
  }

  url.search = searchParams.toString()

  const { data } = await axios({
    url: url.href,
    method: 'GET',
  })
  return data
}

module.exports = bibleConnector
