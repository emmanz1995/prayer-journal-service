import { AddAccount, UpdateAccount } from '../mongo/account.model'

const createAccount = async formData => {
  try {
    const newAccount = await AddAccount(formData)
    return newAccount
  } catch (err) {
    return err
  }
}

export const service = { createAccount }
