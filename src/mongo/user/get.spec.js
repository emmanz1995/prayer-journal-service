const { getMultiple, get, getById } = require('./get')

const Model = jest.fn(() => ({ find, findOne, findById }))
Model.find = jest.fn()
Model.findOne = jest.fn()
Model.findById = jest.fn()

describe('test get multiple function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should get all users from db', async () => {
    Model.find.mockResolvedValue({
      json: 'momoa',
    })

    const getUsers = await getMultiple(Model)()

    expect(getUsers).toEqual({ json: 'momoa' })
    expect(Model.find).toHaveBeenCalledTimes(1)
    expect(Model.find).toHaveBeenCalled()
  })

  it('should fail to get all users from db', async () => {
    Model.find.mockImplementationOnce(() => {
      throw new Error('oops')
    })

    try {
      await getMultiple(Model)()
    } catch (err) {
      expect(err.message).toEqual('oops')
      expect(Model.find).toHaveBeenCalledTimes(1)
      expect(Model.find).toHaveBeenCalled()
    }
  })
})

describe('test get user by Id function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should get one user by Id from db', async () => {
    Model.findById.mockReturnValueOnce({
      select: jest.fn().mockResolvedValue({ json: 'momoa' }),
    })

    const getUser = await getById(Model)('1234')

    expect(getUser).toEqual({ json: 'momoa' })
    expect(Model.findById).toHaveBeenCalledTimes(1)
    expect(Model.findById).toHaveBeenCalledWith('1234')
  })

  it('should fail to get one user by Id from db', async () => {
    Model.findById.mockImplementationOnce(() => {
      throw new Error('oops')
    })

    try {
      await getMultiple(Model)('4321')
    } catch (err) {
      expect(err.message).toEqual('oops')
      expect(Model.findById).toHaveBeenCalledTimes(1)
      expect(Model.findById).toHaveBeenCalledWith('4321')
    }
  })
})

describe('test get user by email function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should get one user by email from db', async () => {
    Model.findOne.mockResolvedValue({
      json: 'momoa',
    })

    const getUsers = await get(Model)('www.emmanza2@gmail.com')

    expect(getUsers).toEqual({ json: 'momoa' })
    expect(Model.findOne).toHaveBeenCalledTimes(1)
    expect(Model.findOne).toHaveBeenCalledWith({
      email: 'www.emmanza2@gmail.com',
    })
  })

  it('should fail to get one user by email from db', async () => {
    Model.findOne.mockImplementationOnce(() => {
      throw new Error('oops')
    })

    try {
      await get(Model)('www.emmanza2@gmail.com')
    } catch (err) {
      expect(err.message).toEqual('oops')
      expect(Model.findOne).toHaveBeenCalledTimes(1)
      expect(Model.findOne).toHaveBeenCalledWith({
        email: 'www.emmanza2@gmail.com',
      })
    }
  })
})
