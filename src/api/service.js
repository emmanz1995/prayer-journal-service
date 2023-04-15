import { AddJournal, UpdateJournal } from '../mongo/journal.model'

const createJournal = async formData => {
  try {
    const newJournalEntry = await AddJournal(formData)
    return newJournalEntry
  } catch (err) {
    return err
  }
}

export const service = { createJournal }
