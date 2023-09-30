const { deleteJounalEntry } = require('./delete')

const Model = jest.fn()
Model.findByIdAndDelete = jest.fn()

describe('deletes journal', () => {
  test('should delete journal entry - successfully', async () => {
    const id = '643ee3b946deec1b1cea4019'
    Model.findByIdAndDelete.mockImplementationOnce(() => 'journal deleted')

    const deleteJournal = await deleteJounalEntry(Model)(id)
    expect(deleteJournal).toEqual('journal deleted')
    expect(deleteJournal).toBeDefined()
  })

  test('should throw 500 error when trying to delete journal - failure', async () => {
    Model.findByIdAndDelete.mockImplementationOnce(() => {
      const error = new Error('Internal server error!')
      error.statusCode = 500
      error.message = 'Internal server error!'
    })
    const id = '643ee3b946deec1b1cea4019'

    try {
      await deleteJounalEntry(Model)(id)
    } catch (err) {
      expect(err.statusCode).toEqual(500)
      expect(err.message).toEqual('Internal server error!')
    }
  })
})
