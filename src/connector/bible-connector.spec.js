const axios = require('axios')
const bibleConnector = require('./bible-connector')

jest.mock('axios')

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
    expect(axios).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://bible-api.com/John%201:3?translation=kjv',
    })
  })

  it('should fail to retrieve the bible verse', async () => {
    expect.assertions(3)
    axios?.mockImplementation(() => {
      throw new Error('oh no!')
    })

    try {
      await bibleConnector({
        book: 'John',
        chapter: '1',
        verse: '3',
        translation: 'kjv',
      })
    } catch (err) {
      expect(err.message).toEqual('oh no!')
      expect(axios).toHaveBeenCalledTimes(1)
      expect(axios).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://bible-api.com/John%201:3?translation=kjv',
      })
    }
  })
})
