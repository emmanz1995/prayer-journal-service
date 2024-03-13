const {
  AddJournal,
  GetJournals,
  GetJournalById,
  UpdateJournal,
  DeleteJournal,
} = require('../../mongo/journal.model')
const service = require('./service')
const _ = require('lodash')
const bibleConnector = require('../../connector')

jest.mock('../../connector')
jest.mock('../../mongo/journal.model')

describe('createJournal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should create a journal entry successfully (with a bible verse attached to it)', async () => {
    bibleConnector.mockResolvedValue({
      data: {
        reference: 'John 1:3',
        verses: [
          {
            book_id: 'JHN',
            book_name: 'John',
            chapter: 1,
            verse: 3,
            text: 'All things were made through him. Without him was not anything made that has been made.',
          },
        ],
        text: 'All things were made through him. Without him was not anything made that has been made.',
        translation_id: 'web',
        translation_name: 'World English Bible',
        translation_note: 'Public Domain',
      },
    })
    AddJournal.mockResolvedValue({
      title: 'Ham Sandwich',
      description:
        "I want a nice grilled ham sandwich this weekend in Jesus' name",
      completedAt: false,
      createdAt: '2023-04-17T21:23:15.901Z',
      updatedAt: '2023-04-18T19:37:19.642Z',
      postedBy: 'd443343432dr34f',
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
            },
          ],
        },
      },
    })

    const formData = {
      bibleBook: 'John',
      bibleChapter: 1,
      bibleVerse: 3,
      bibleTranslation: 'kjv',
      title: 'Ham Sandwich',
      description:
        "I want a nice grilled ham sandwich this weekend in Jesus' name",
      hasBibleVerse: true,
    }

    const createJournal = await service.createJournal(formData, {
      _id: 'd443343432dr34f',
    })

    expect(createJournal).toEqual({
      completedAt: false,
      createdAt: '2023-04-17T21:23:15.901Z',
      description:
        "I want a nice grilled ham sandwich this weekend in Jesus' name",
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
            },
          ],
        },
      },
      postedBy: 'd443343432dr34f',
      title: 'Ham Sandwich',
      updatedAt: '2023-04-18T19:37:19.642Z',
    })
    expect(bibleConnector).toHaveBeenCalled()
    expect(AddJournal).toHaveBeenCalledTimes(1)
    expect(AddJournal).toHaveBeenCalledWith({
      bibleBook: 'John',
      bibleChapter: 1,
      description:
        "I want a nice grilled ham sandwich this weekend in Jesus' name",
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
            },
          ],
        },
      },
      title: 'Ham Sandwich',
      userId: 'd443343432dr34f',
      bibleTranslation: 'kjv',
      bibleVerse: 3,
    })
  })

  it('should create a journal entry successfully (without a bible verse attached to it)', async () => {
    AddJournal.mockResolvedValue({
      title: 'Ham Sandwich',
      description:
        "I want a nice grilled ham sandwich this weekend in Jesus' name",
      completedAt: false,
      postedBy: 'd443343432dr34f',
      createdAt: '2023-04-17T21:23:15.901Z',
      updatedAt: '2023-04-18T19:37:19.642Z',
    })

    bibleConnector.mockResolvedValue(undefined)

    const formData = {
      translation: 'World English Bible',
      title: 'Ham Sandwich',
      description:
        "I want a nice grilled ham sandwich this weekend in Jesus' name",
      hasBibleVerse: false,
      userId: 'd443343432dr34f',
    }

    const createJournal = await service.createJournal(formData)

    console.log('...createJournal:', createJournal)

    expect(createJournal).toEqual({
      completedAt: false,
      description:
        "I want a nice grilled ham sandwich this weekend in Jesus' name",
      title: 'Ham Sandwich',
      postedBy: 'd443343432dr34f',
      createdAt: '2023-04-17T21:23:15.901Z',
      updatedAt: '2023-04-18T19:37:19.642Z',
    })
    expect(bibleConnector).toHaveBeenCalled()
    expect(AddJournal).toHaveBeenCalledTimes(1)
    expect(AddJournal).toHaveBeenCalledWith({
      userId: 'd443343432dr34f',
      description:
        "I want a nice grilled ham sandwich this weekend in Jesus' name",
      hasBibleVerse: false,
      output: undefined,
      title: 'Ham Sandwich',
      translation: 'World English Bible',
    })
  })

  it('should fail to create a new journal entry', async () => {
    AddJournal.mockImplementationOnce(() => {
      throw new Error('oops')
    })
    bibleConnector.mockImplementationOnce(() => {
      throw new Error('oops')
    })
    const formData = {
      translation: 'World English Bible',
      title: 'Ham Sandwich',
      description:
        "I want a nice grilled ham sandwich this weekend in Jesus' name",
      hasBibleVerse: false,
      _id: 'd443343432dr34f',
    }
    try {
      await service.createJournal(formData)
    } catch (err) {
      expect(err.message).toEqual('oops')
    }
  })
})

describe('getJournals', () => {})
describe('getJournal', () => {})
describe('updateJournal', () => {})
describe('deleteJournal', () => {})
