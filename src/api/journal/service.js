const {
  AddJournal,
  UpdateJournal,
  GetJournals,
  GetJournalById,
  DeleteJournal,
  getPrayerRequestForLoggedInUser,
} = require('../../mongo/journal.model')
const _ = require('lodash')
const bibleConnector = require('../../connector')

const createJournal = async (formData, session) => {
  try {
    const {
      bibleBook,
      bibleChapter,
      bibleVerse,
      bibleTranslation,
      hasBibleVerse,
    } = formData

    const userId = session?._id

    const payload = {
      book: bibleBook,
      chapter: bibleChapter,
      verse: bibleVerse,
      translation: bibleTranslation,
    }

    const biblePayload = await bibleConnector(payload)

    const createNewJournal = await AddJournal({
      output: biblePayload,
      hasBibleVerse,
      ...formData,
    })

    createNewJournal.postedBy = userId
    createNewJournal.save()

    return createNewJournal
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
      postedBy: journal.postedBy,
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

const getMyJournalEntities = async userInfo => {
  try {
    return await getPrayerRequestForLoggedInUser(userInfo)
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
  getMyJournalEntities,
}
