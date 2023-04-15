import { saveJournal } from './save'
import { jest } from '@jest/globals'

const save = jest.fn()
const Model = jest.fn(() => ({
  save,
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
  test('failed to save new account', async () => {})
})
