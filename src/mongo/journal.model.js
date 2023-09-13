import mongoose from 'mongoose'
import { saveJournal, updateJournal } from './journals/save'
import { get, getById } from './journals/get'
import { deleteJounalEntry } from './journals/delete'

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
  },
  { timestamps: true }
)

journalSchema.set('toJSON', {
  transform: (doc, object) => {
    delete object.__v
  },
})

export const Journal = mongoose.model('journal', journalSchema)

export const AddJournal = saveJournal(Journal)
export const UpdateJournal = updateJournal(Journal)
export const GetJournals = get(Journal)
export const GetJournalById = getById(Journal)
export const DeleteJournal = deleteJounalEntry(Journal)
