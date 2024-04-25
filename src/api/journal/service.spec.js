const {
  AddJournal,
  GetJournals,
  GetJournalById,
  UpdateJournal,
  DeleteJournal,
} = require('../../mongo/journal.model')
const service = require('./service')
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

describe('getJournals', () => {
  it('should get all of the journals', async () => {
    GetJournals.mockResolvedValue([
      {
        title: 'Prayer for healing',
        description: "Oh Lord I want to be healed today in Jesus's name, amen!",
        id: 'c7231513-f021-492b-882f-6affc5001956',
        journalType: 'prayer',
        output: undefined,
        postedBy: '4eb0b467-3d70-484f-96f9-8ae5a6f1cdb4',
        createdAt: '2024-04-25T20:48:11.000Z',
        updatedAt: '2024-04-25T21:50:03.000Z',
      },
    ])

    const getAllJournals = await service.getJournals()

    expect(getAllJournals).toEqual([
      {
        title: 'Prayer for healing',
        description: "Oh Lord I want to be healed today in Jesus's name, amen!",
        journalType: 'prayer',
        output: undefined,
        postedBy: '4eb0b467-3d70-484f-96f9-8ae5a6f1cdb4',
        createdAt: '2024-04-25T20:48:11.000Z',
        updatedAt: '2024-04-25T21:50:03.000Z',
      },
    ])
    expect(GetJournals).toHaveBeenCalledTimes(1)
    expect(GetJournals).toHaveBeenCalledWith()
  })

  it('should fail to get all of the journals', async () => {
    expect.assertions(2)
    GetJournals.mockImplementationOnce(() => {
      throw new Error('oh no!')
    })
    try {
      await service.getJournals()
    } catch (err) {
      expect(err.message).toEqual('oh no!')
      expect(GetJournals).toHaveBeenCalled()
    }
  })
})

describe('getJournal', () => {
  it('should successfully get one journal', async () => {
    GetJournalById.mockResolvedValue({
      title: 'Prayer for healing',
      description: "Oh Lord I want to be healed today in Jesus's name, amen!",
      id: 'c7231513-f021-492b-882f-6affc5001956',
      journalType: 'prayer',
      output: undefined,
      postedBy: '4eb0b467-3d70-484f-96f9-8ae5a6f1cdb4',
      createdAt: '2024-04-25T20:48:11.000Z',
      updatedAt: '2024-04-25T21:50:03.000Z',
    })

    const getOne = await service.getJournalById(
      'c7231513-f021-492b-882f-6affc5001956'
    )

    expect(getOne).toEqual({
      createdAt: '2024-04-25T20:48:11.000Z',
      description: "Oh Lord I want to be healed today in Jesus's name, amen!",
      id: 'c7231513-f021-492b-882f-6affc5001956',
      journalType: 'prayer',
      output: undefined,
      postedBy: '4eb0b467-3d70-484f-96f9-8ae5a6f1cdb4',
      title: 'Prayer for healing',
      updatedAt: '2024-04-25T21:50:03.000Z',
    })
    expect(GetJournalById).toHaveBeenCalledTimes(1)
    expect(GetJournalById).toHaveBeenCalledWith(
      'c7231513-f021-492b-882f-6affc5001956'
    )
  })

  it('should fail get one journal', async () => {
    expect.assertions(3)
    GetJournalById.mockImplementationOnce(() => {
      throw new Error('oh no!')
    })
    try {
      await service.getJournalById('123')
    } catch (err) {
      expect(err.message).toEqual('oh no!')
      expect(GetJournalById).toHaveBeenCalled()
      expect(GetJournalById).toHaveBeenCalledWith('123')
    }
  })
})

describe('updateJournal', () => {
  it('should successfully update one journal', async () => {
    UpdateJournal.mockResolvedValue({
      title: 'Hey you!',
      id: '1234',
      createdAt: '2024-04-25T20:48:11.000Z',
      updatedAt: new Date(),
    })

    const updateJournal = await service.updateJournal({
      title: 'Hey you!',
      id: '1234',
    })

    expect(updateJournal).toEqual({
      title: 'Hey you!',
      id: '1234',
      createdAt: '2024-04-25T20:48:11.000Z',
      updatedAt: expect.any(Date),
    })
    expect(UpdateJournal).toHaveBeenCalledTimes(1)
    expect(UpdateJournal).toHaveBeenCalledWith({
      id: '1234',
      title: 'Hey you!',
    })
  })

  it('should fail to update one journal', async () => {
    expect.assertions(3)
    UpdateJournal.mockImplementationOnce(() => {
      throw new Error('oh no!')
    })

    try {
      await service.updateJournal({ title: 'Hey', id: '12343' })
    } catch (err) {
      expect(err.message).toEqual('oh no!')
      expect(UpdateJournal).toHaveBeenCalledTimes(1)
      expect(UpdateJournal).toHaveBeenCalledWith({
        title: 'Hey',
        id: '12343',
      })
    }
  })
})

describe('deleteJournal', () => {
  it('should successfully delete a journal', async () => {
    DeleteJournal.mockResolvedValue({
      id: '54321',
      title: 'Hello World',
      description: 'Say hello to the world!',
      createdAt: '2024-04-25T20:48:11.000Z',
      updatedAt: '2024-04-25T21:50:03.000Z',
    })

    const removeJournal = await service.deleteJournal('123456789')

    expect(removeJournal).toEqual({
      id: '54321',
      title: 'Hello World',
      description: 'Say hello to the world!',
      createdAt: '2024-04-25T20:48:11.000Z',
      updatedAt: '2024-04-25T21:50:03.000Z',
    })
    expect(DeleteJournal).toHaveBeenCalledTimes(1)
    expect(DeleteJournal).toHaveBeenCalledWith('123456789')
  })
  it('should fail to delete a journal', async () => {
    expect.assertions(3)
    DeleteJournal.mockImplementationOnce(() => {
      throw new Error('oh no!')
    })

    try {
      await service.deleteJournal('123456789')
    } catch (err) {
      expect(err.message).toEqual('oh no!')
      expect(DeleteJournal).toHaveBeenCalledTimes(1)
      expect(DeleteJournal).toHaveBeenCalledWith('123456789')
    }
  })
})
