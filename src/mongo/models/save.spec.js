import { saveAccount } from './save'
import { jest } from '@jest/globals'

const save = jest.fn()
const Model = jest.fn(() => ({
  save,
}))

describe('Testing save', () => {
  test('should save an account to db', async () => {
    save.mockImplementationOnce(() => {
      return {
        owner: 'Bacon Cheese',
        movements: [],
        interestRate: 1.2,
        pin: 1111,
      }
    })
    const formData = {
      owner: 'Bacon Cheese',
      movements: [],
      interestRate: 1.2,
      pin: 1111,
    }
    const createAccount = await saveAccount(Model)(formData)
    expect(createAccount).toEqual(formData)
  })
  test('saveAccount function is defined', async () => {
    const createAccount = saveAccount(Model)
    expect(createAccount).toBeDefined()
  })
  test('failed to save new account', async () => {})
})
