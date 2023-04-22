import mongoose from 'mongoose'
import { saveJournal, updateJournal } from './models/save'
import { get, getById } from './models/get'
import { deleteJounalEntry } from './models/delete'

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

const Journal = mongoose.model('journal', journalSchema)

export const AddJournal = saveJournal(Journal)
export const UpdateJournal = updateJournal(Journal)
export const GetJournals = get(Journal)
export const GetJournalById = getById(Journal)
export const DeleteJournal = deleteJounalEntry(Journal)
