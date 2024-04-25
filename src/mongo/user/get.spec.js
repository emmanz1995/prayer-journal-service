const { getMultiple, get, getById } = require('./get')

const Model = jest.fn(() => ({ find, findOne }))
Model.find = jest.fn()
Model.findOne = jest.fn()

describe('test', () => {
  it('should work', async () => {
    Model.find.mockResolvedValue({
      json: 'momoa',
    })

    const getUsers = await getMultiple(Model)()

    expect(getUsers).toEqual({ json: 'momoa' })
    expect(Model.find).toHaveBeenCalledTimes(1)
    expect(Model.find).toHaveBeenCalled()
  })
})
