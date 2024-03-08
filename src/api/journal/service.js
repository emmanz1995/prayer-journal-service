const {
  AddJournal,
  UpdateJournal,
  GetJournals,
  GetJournalById,
  DeleteJournal,
} = require('../../mongo/journal.model')
const _ = require('lodash')
const bibleConnector = require('../../connector')

const createJournal = async formData => {
  try {
    const {
      bibleBook,
      bibleChapter,
      bibleVerse,
      bibleTranslation,
      hasBibleVerse,
    } = formData

    const biblePayload = await bibleConnector({
      book: bibleBook,
      chapter: bibleChapter,
      verse: bibleVerse,
      translation: bibleTranslation,
    })

    return await AddJournal({
      output: biblePayload,
      hasBibleVerse,
      ...formData,
    })
  } catch (err) {
    console.log(err)
    throw err
  }
}

const getJournals = async () => {
  try {
    const journals = await GetJournals()
    return _.map(journals, journal => ({
      id: journal._id,
      title: journal.title,
      description: journal.description,
      journalType: journal.journalType,
      output: journal.output,
      createdAt: journal.createdAt,
      updatedAt: journal.updatedAt,
    }))
  } catch (err) {
    throw err
  }
}

const getJournalById = async id => {
  try {
    return await GetJournalById(id)
  } catch (err) {
    throw err
  }
}

const updateJournal = async formData => {
  const { id, title } = formData
  try {
    return await UpdateJournal({
      id,
      title,
    })
  } catch (err) {
    throw err
  }
}

const deleteJournal = async id => {
  try {
    return await DeleteJournal(id)
  } catch (err) {
    throw err
  }
}

module.exports = {
  createJournal,
  updateJournal,
  getJournals,
  getJournalById,
  deleteJournal,
}
