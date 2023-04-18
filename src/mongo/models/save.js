import _ from 'lodash'
import BadRequest from '../../errors/badRequest'

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

const updateJournal = Model => async formData => {
  const journalId = _.get(formData, 'id')
  const title = _.get(formData, 'title')

  console.log('...formData:', formData)
  try {
    const journal = await Model.findByIdAndUpdate(
      journalId,
      {
        title,
      },
      { new: true }
    )
    console.log('...Journal:', journal)
    return journal
  } catch (err) {
    console.log(err)
    throw new BadRequest('Could not update title of the journal')
  }
}

export { saveJournal, updateJournal }
