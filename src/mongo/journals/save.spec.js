const { saveJournal, updateJournal } = require('./save')
const BadRequest = require('../../errors/badRequest')

const save = jest.fn()
const Model = jest.fn(() => ({
  save,
}))

Model.findByIdAndUpdate = jest.fn(() => item => ({
  toObject: jest.fn(() => item),
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Testing save', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('should save an account to db', async () => {
    save.mockImplementationOnce(() => ({
      title: 'Bacon Cheese',
      description:
        "I want a Bacon Cheese sandwich this weekend in Jesus' name.",
      journalType: 'Prayer',
      postedBy: '65bfc61f241c483f5e82e689',
      createdAt: '2024-03-10T00:30:37.955Z',
      updatedAt: '2024-03-10T00:30:37.955Z',
    }))
    const formData = {
      title: 'Bacon Cheese',
      description:
        "I want a Bacon Cheese sandwich this weekend in Jesus' name.",
      journalType: 'Prayer',
      userId: '65bfc61f241c483f5e82e689',
    }
    const createJournalEntry = await saveJournal(Model)(formData)
    expect(createJournalEntry).toEqual({
      title: 'Bacon Cheese',
      description:
        "I want a Bacon Cheese sandwich this weekend in Jesus' name.",
      journalType: 'Prayer',
      postedBy: '65bfc61f241c483f5e82e689',
      createdAt: '2024-03-10T00:30:37.955Z',
      updatedAt: '2024-03-10T00:30:37.955Z',
    })
    expect(save).toHaveBeenCalledTimes(1)
  })
  test('saveAccount function is defined', async () => {
    const createJournalEntry = saveJournal(Model)
    expect(createJournalEntry).toBeDefined()
  })
  test('failed to save new account', async () => {
    save.mockImplementationOnce(() => {
      throw new BadRequest('Title, description and or type missing!')
    })
    const formData = {
      title: '',
      description:
        "I want a Bacon Cheese sandwich this weekend in Jesus' name.",
      journalType: 'Prayer',
    }
    try {
      await saveJournal(Model)(formData)
    } catch (err) {
      expect(err.message).toEqual('Title, description and or type missing!')
    }
  })
})

describe('Testing update', () => {
  test('update by id - success', async () => {
    const formData = { _id: '123', title: 'Your Mum' }
    Model.findByIdAndUpdate.mockImplementationOnce(() => formData)
    const updateEntry = await updateJournal(Model)(formData)
    console.log('UpdateEntry:', updateEntry)
    expect(updateEntry).toEqual({ _id: '123', title: 'Your Mum' })
    expect(Model.findByIdAndUpdate).toBeCalledTimes(1)
  })
  test('updateEntry function is defined', async () => {
    const updateJournalEntry = updateJournal(Model)
    expect(updateJournalEntry).toBeDefined()
  })

  test('failed to update journal entry', async () => {
    expect.assertions(2)
    Model.findByIdAndUpdate.mockImplementationOnce(() => {
      throw new BadRequest('oops')
    })
    try {
      await updateJournal(Model)({})
    } catch (err) {
      expect(err).toBeDefined()
      expect(err.message).toEqual('oops')
    }
  })
})
