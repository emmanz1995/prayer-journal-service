import mongoose from 'mongoose'
import { saveJournal, updateJournal } from './journals/save'
import { get, getById } from './journals/get'
import { deleteJounalEntry } from './journals/delete'

const journalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    journalType: {
      type: String,
      enum: ['prayer', 'bible', 'habit'],
      required: false,
    },
    reminder: { type: Date, required: false },
  },
  { timestamps: true }
)

journalSchema.set('toJSON', {
  transform: (doc, object) => {
    object.id = object._id
    delete object._id
  },
})

export const Journal = mongoose.model('journal', journalSchema)

export const AddJournal = saveJournal(Journal)
export const UpdateJournal = updateJournal(Journal)
export const GetJournals = get(Journal)
export const GetJournalById = getById(Journal)
export const DeleteJournal = deleteJounalEntry(Journal)
