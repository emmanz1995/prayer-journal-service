import mongoose from 'mongoose'
import { saveJournal, updateJournal } from './models/save'

const journalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: Array, required: false },
    journalType: {
      type: String,
      enum: ['Prayer', 'Bible', 'Habit'],
      required: false,
    },
    reminder: { type: Date, required: false },
  },
  { timestamps: true }
)

const Journal = mongoose.model('journal', journalSchema)

export const AddJournal = saveJournal(Journal)
export const UpdateJournal = updateJournal(Journal)
