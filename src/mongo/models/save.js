import _ from 'lodash'

const saveJournal = Model => async doc => {
  const newJournalEntry = new Model({
    ...doc,
    interestRate: 1.2,
  })
  try {
    return await newJournalEntry.save()
  } catch (err) {
    console.log(err)
    return err
  }
}

const updateJournal = Model => async (doc, id) => {
  // const name = _.get(doc, 'owner')
  // try {
  //   const account = Model.findByIdAndUpdate(id, { name }, { new: true })
  //   return account
  // } catch (err) {
  //   console.log(err)
  //   throw new BadRequest('Could not update name of the Account')
  // }
}

export { saveJournal, updateJournal }
