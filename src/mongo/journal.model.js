const mongoose = require('mongoose')
const { saveJournal, updateJournal } = require('./journals/save')
const { get, getById, GetMyPRs } = require('./journals/get')
const { deleteJounalEntry } = require('./journals/delete')

const journalSchema = new mongoose.Schema(
  {
    _id: String,
    title: { type: String, required: true },
    description: { type: String, required: true },
    completedAt: {
      type: Boolean,
      required: false,
      default: false,
    },
    reminder: { type: Date, required: false },
    hasBibleVerse: {
      type: Boolean,
      required: false,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    bibleBook: { type: String, required: false },
    bibleChapter: { type: String, required: false },
    bibleVerse: { type: String, required: false },
    bibleTranslation: { type: String, required: false },
    output: Object,
  },
  { timestamps: true },
)

journalSchema.set('toJSON', {
  transform: (doc, object) => {
    delete object.__v
  },
})

const Journal = mongoose.model('journal', journalSchema)

const AddJournal = saveJournal(Journal)
const UpdateJournal = updateJournal(Journal)
const GetJournals = get(Journal)
const GetJournalById = getById(Journal)
const DeleteJournal = deleteJounalEntry(Journal)
const getPrayerRequestForLoggedInUser = GetMyPRs(Journal)

module.exports = {
  Journal,
  AddJournal,
  UpdateJournal,
  GetJournals,
  GetJournalById,
  DeleteJournal,
  getPrayerRequestForLoggedInUser,
}
