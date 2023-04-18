import { AddJournal, UpdateJournal } from '../mongo/journal.model'

const createJournal = async formData => {
  try {
    const newJournalEntry = await AddJournal(formData)
    return newJournalEntry
  } catch (err) {
    return err
  }
}

const updateJournal = async formData => {
  const { id, title } = formData
  console.log('...FORMDATA2:', formData)
  try {
    const updateJournalEntry = await UpdateJournal({
      id,
      title,
    })
    return updateJournalEntry
  } catch (err) {
    return err
  }
}

export const service = { createJournal, updateJournal }
