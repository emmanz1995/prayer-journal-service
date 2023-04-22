import { jest } from '@jest/globals'

const saveJournal = jest.fn()
const updateJournalModel = jest.fn()
const getJournalsModel = jest.fn()
const getJournalModel = jest.fn()

export default () => ({
  saveJournal,
  updateJournalModel,
  getJournalsModel,
  getJournalModel,
})
