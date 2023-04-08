import mongoose from 'mongoose'
import { saveAccount, update } from './models/save'

const accountSchema = new mongoose.Schema(
  {
    // _id: String,
    owner: { type: String, required: true },
    movements: { type: Array, required: false },
    interestRate: { type: Number, require: true },
    pin: { type: Number, required: true },
  },
  { timestamps: true }
)

const Account = mongoose.model('accounts', accountSchema)

export const AddAccount = saveAccount(Account)
export const UpdateAccount = update(Account)
