import {
  AddJournal,
  UpdateJournal,
  GetJournals,
  GetJournalById,
  DeleteJournal,
  getPrayerRequestForLoggedInUser,
} from '../../mongo/journal.model';
import _ from 'lodash';
import bibleConnector from '../../connector';

const createJournal = async (formData: any, session: any) => {
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
    let biblePayload = null

    if (payload)
      biblePayload = await bibleConnector(payload)

    const createNewJournal = await AddJournal({
      output: biblePayload,
      hasBibleVerse,
      userId,
      ...formData,
    })

    return createNewJournal
  } catch (err) {
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

const getJournalById = async (id: any) => {
  try {
    return await GetJournalById(id)
  } catch (err) {
    throw err
  }
}

const getMyJournalEntities = async (userInfo: any) => {
  try {
    return await getPrayerRequestForLoggedInUser(userInfo)
  } catch (err) {
    throw err
  }
}

const updateJournal = async (formData: any) => {
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

const deleteJournal = async (id: any) => {
  try {
    return await DeleteJournal(id)
  } catch (err) {
    throw err
  }
}

export {
  createJournal,
  updateJournal,
  getJournals,
  getJournalById,
  deleteJournal,
  getMyJournalEntities,
}
