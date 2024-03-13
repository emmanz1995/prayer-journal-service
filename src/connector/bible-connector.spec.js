jest.mock('axios')
const axios = require('axios')
const bibleConnector = require('./bible-connector')

describe('axios call for bible api', () => {
  it('should retrieve bible data', async () => {
    const bibleRef = {
      reference: 'John 1:3',
      verses: [
        {
          book_id: 'JHN',
          book_name: 'John',
          chapter: 1,
          verse: 3,
          text: 'All things were made through him. Without him was not anything made that has been made.\n',
        },
      ],
      text: 'All things were made through him. Without him was not anything made that has been made.\n',
      translation_id: 'web',
      translation_name: 'World English Bible',
      translation_note: 'Public Domain',
    }
    axios?.mockResolvedValue({
      data: bibleRef,
    })

    const opts = {
      book: 'John',
      chapter: '1',
      verse: '3',
      translation: 'kjv',
    }

    const res = await bibleConnector(opts)

    expect(res).toEqual(bibleRef)
    expect(axios).toHaveBeenCalledTimes(1)
    expect(axios).toHaveBeenCalledWith({"method": "GET", "url": "https://bible-api.com/John%201:3?translation=kjv"})
  })
})
