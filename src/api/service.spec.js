const {
  AddJournal,
  UpdateJournal,
  GetJournals,
  GetJournalById,
  DeleteJournal,
} = require('../mongo/journal.model')
const service = require('./service')
const _ = require('lodash')
const bibleConnector = require('../connector')

jest.mock('../connector');
jest.mock('../mongo/journal.model')

describe('createJournal', () => {
  it('should create a journal entry successfully', async () => {
    bibleConnector.mockResolvedValue({
      data: {
        reference: 'John 1:3',
        verses: [
          {
            book_id: 'JHN',
            book_name: 'John',
            chapter: 1,
            verse: 3,
            text: "All things were made through him. Without him was not anything made that has been made."
          }
        ],
        text: "All things were made through him. Without him was not anything made that has been made.",
        translation_id: 'web',
        translation_name: 'World English Bible',
        translation_note: 'Public Domain'
      }
    })
    AddJournal.mockResolvedValue({
      title: 'Ham Sandwich',
      description:
        "I want a nice grilled ham sandwich this weekend in Jesus' name",
      completedAt: false,
    })

    const formData = {
      book: 'John',
      chapter: 1,
      verse: 3,
      translation: 'World English Bible',
      title: 'Ham Sandwich',
      description:
        "I want a nice grilled ham sandwich this weekend in Jesus' name",
      hasBibleVerse: true
    }

    const createJournal = await service.createJournal(formData)

    expect(createJournal).toEqual({
      completedAt: false,
      description: "I want a nice grilled ham sandwich this weekend in Jesus' name",
      title: 'Ham Sandwich'
    })
    expect(bibleConnector).toHaveBeenCalled()
    expect(AddJournal).toHaveBeenCalledTimes(1)
    expect(AddJournal).toHaveBeenCalledWith({
      book: 'John',
      chapter: 1,
      description: "I want a nice grilled ham sandwich this weekend in Jesus' name",
      hasBibleVerse: true,
      output: {
        data: {
          reference: 'John 1:3',
          text: 'All things were made through him. Without him was not anything made that has been made.',
          translation_id: 'web',
          translation_name: 'World English Bible',
          translation_note: 'Public Domain',
          verses: [
            {
              book_id: 'JHN',
              book_name: 'John',
              chapter: 1,
              text: 'All things were made through him. Without him was not anything made that has been made.',
              verse: 3,
            }
          ]
        }
      },
      title: 'Ham Sandwich',
      translation: 'World English Bible',
      verse: 3
    })
  })
})