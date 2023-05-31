const createJournal = jest.fn()
const getJournals = jest.fn()
const getJournalById = jest.fn()
const updateJournal = jest.fn()
const deleteJournal = jest.fn()

export default () => ({
  createJournal,
  getJournals,
  getJournalById,
  updateJournal,
  deleteJournal,
})
