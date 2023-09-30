const {
  AddJournal,
  UpdateJournal,
  GetJournals,
  GetJournalById,
  DeleteJournal,
} = require('../mongo/journal.model')
const _ = require('lodash')
const { bibleConnector } = require('../connector')

const createJournal = async formData => {
  try {
    const { bibleBook, bibleChapter, bibleVerse, bibleTranslation, hasBibleVerse } = formData

    const biblePayload = await bibleConnector({
      book: bibleBook,
      chapter: bibleChapter,
      verse: bibleVerse,
      translation: bibleTranslation
    })

    const newJournalEntry = await AddJournal({
      output: biblePayload,
      hasBibleVerse,
      ...formData
    })
    return newJournalEntry
  } catch (err) {
    console.log(err)
  }
}

const getJournals = async () => {
  try {
    const journals = await GetJournals()
    const transformedJournals = _.map(journals, journal => {
      return {
        _id: journal._id,
        title: journal.title,
        description: journal.description,
        journalType: journal.journalType,

        output: journal.output,
        createdAt: journal.createdAt,
        updatedAt: journal.updatedAt,
      }
    })
    return transformedJournals
  } catch (err) {
    console.log(err)
  }
}

const getJournalById = async id => {
  try {
    const getSingleEntry = await GetJournalById(id)
    return getSingleEntry
  } catch (err) {
    console.log(err)
  }
}

const updateJournal = async formData => {
  const { id, title } = formData
  try {
    const updateJournalEntry = await UpdateJournal({
      id,
      title,
    })
    return updateJournalEntry
  } catch (err) {
    console.log(err)
  }
}

const deleteJournal = async id => {
  try {
    const removeJournal = await DeleteJournal(id)
    return removeJournal
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  createJournal,
  updateJournal,
  getJournals,
  getJournalById,
  deleteJournal,
}
