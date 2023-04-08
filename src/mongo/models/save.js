import BadRequest from '../../errors/badRequest'
import _ from 'lodash'

const saveAccount = Model => async doc => {
  const newAccount = new Model({
    ...doc,
    interestRate: 1.2,
  })
  try {
    return await newAccount.save()
  } catch (err) {
    console.log(err)
    return err
  }
}

const update = Model => async (doc, id) => {
  const name = _.get(doc, 'doc.owner')
  try {
    const account = Model.findByIdAndUpdate(id, { name }, { new: true })
    return account
  } catch (err) {
    console.log(err)
    throw new BadRequest('Could not update name of the Account')
  }
}

export { saveAccount, update }
