import { saveJournal, updateJournal } from './save'
import { jest } from '@jest/globals'
import BadRequest from '../../errors/badRequest'

const save = jest.fn()
const Model = jest.fn(() => ({
  save,
}))

Model.findByIdAndUpdate = jest.fn(() => item => ({
  toObject: jest.fn(() => item),
}))

describe('Testing save', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('should save an account to db', async () => {
    save.mockImplementationOnce(() => {
      return {
        title: 'Bacon Cheese',
        description:
          "I want a Bacon Cheese sandwich this weekend in Jesus' name.",
        journalType: 'Prayer',
      }
    })
    const formData = {
      title: 'Bacon Cheese',
      description:
        "I want a Bacon Cheese sandwich this weekend in Jesus' name.",
      journalType: 'Prayer',
    }
    const createJournalEntry = await saveJournal(Model)(formData)
    expect(createJournalEntry).toEqual(formData)
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
  // TODO: Solve this issue
  test('update by id - success', async () => {
    const formData = { id: '123', title: 'Your Mum' }
    Model.findByIdAndUpdate.mockImplementationOnce(() => formData)
    const updateEntry = await updateJournal(Model)(formData)
    console.log('UpdateEntry:', updateEntry)
    expect(updateEntry).toEqual({ id: '123', title: 'Your Mum' })
    expect(Model.findByIdAndUpdate).toBeCalledTimes(1)
    // expect(Model.findOneAndUpdate).toBeCalledWith({
    //   title: 'Your Mum',
    // })
  })
})
