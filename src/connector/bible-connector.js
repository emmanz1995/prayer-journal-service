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

  const url = `https://bible-api.com/${book} ${chapter}:${verse}`
  let data

  const options = {
    url,
    method: 'GET',
    params: {
      translation,
    },
  }

  try {
    ;({ data } = await axios(options))
  } catch (err) {
    console.log(err)
  }
  return data
}

module.exports = bibleConnector
