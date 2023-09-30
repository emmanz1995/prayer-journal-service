const { Journal } = require('../mongo/journal.model')

const initialJournalEntries = [
  {
    _id: '643db8c388f22f9d7395a0f5',
    title: 'Mum2',
    description: 'I want Mum to have a bacon cheese sandwich!',
    journalType: 'prayer',
    createdAt: '2023-04-17T21:23:15.901Z',
    updatedAt: '2023-04-18T19:37:19.642Z',
  },
  {
    _id: '643db8efcbc42d4aa4bc8d5b',
    title: 'Bacon Cheese',
    description: 'I want a bacon cheese sandwich!',
    journalType: 'prayer',
    createdAt: '2023-04-17T21:23:59.982Z',
    updatedAt: '2023-04-17T21:23:59.982Z',
  },
]

const journalEntriesInDB = async () => {
  const journals = await Journal.find()
  return journals && journals.map(journal => journal.toJSON())
}

module.exports = { initialJournalEntries, journalEntriesInDB }
