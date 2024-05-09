const { GetRoles, CountRoles } = require('./roles')

const save = jest.fn()
const Model = jest.fn(() => ({ find, save, estimatedDocumentCount }))
Model.find = jest.fn()
Model.estimatedDocumentCount = jest.fn()

describe('test GetRoles func', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should get roles', async () => {
    Model.find.mockResolvedValue([{ name: 'user' }])

    const response = await GetRoles(Model)('user')
    expect(response).toEqual([{ name: 'user' }])
    expect(Model.find).toHaveBeenCalledTimes(1)
    expect(Model.find).toHaveBeenCalledWith({ name: { $in: ['user'] } })
  })

  it('should fail to get roles', async () => {
    expect.assertions(2)
    Model.find.mockImplementation(() => {
      throw new Error('oops')
    })

    try {
      await GetRoles(Model)('user')
    } catch (err) {
      expect(err.message).toEqual('oops')
      expect(Model.find).toHaveBeenCalled()
    }
  })
})

describe('test CountRoles func', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should get estimated document count for roles', async () => {
    Model.estimatedDocumentCount.mockResolvedValue(3)

    const response = await CountRoles(Model)()
    expect(response).toEqual(3)
    expect(Model.estimatedDocumentCount).toHaveBeenCalled()
  })

  it('should fail to get estimated document count for roles', async () => {
    expect.assertions(2)
    Model.estimatedDocumentCount.mockImplementation(() => {
      throw new Error('oops')
    })

    try {
      await CountRoles(Model)()
    } catch (err) {
      expect(err.message).toEqual('oops')
      expect(Model.estimatedDocumentCount).toHaveBeenCalled()
    }
  })
})
