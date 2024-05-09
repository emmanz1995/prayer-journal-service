const { saveUser } = require('./save')

const save = jest.fn()
const Model = jest.fn(() => ({
  save,
}))

describe('test save db func', () => {
  it('should save new user into db', async () => {
    save.mockResolvedValue({
      username: 'emmanz95',
      password: 'abc1234',
      createdAt: '2024-05-05',
      updatedAt: '2024-05-05',
    })

    const response = await saveUser(Model)({
      username: 'emmanz95',
      email: 'emmanz95@gmail.com',
      password: 'abc1234',
    })

    expect(response).toEqual({
      username: 'emmanz95',
      password: 'abc1234',
      createdAt: '2024-05-05',
      updatedAt: '2024-05-05',
    })
    expect(save).toHaveBeenCalled()
  })

  it('should fail to save user to db', async () => {
    expect.assertions(2)
    save.mockImplementation(() => {
      throw new Error('oops')
    })

    try {
      await saveUser(Model)({})
    } catch (err) {
      expect(err.message).toEqual('oops')
      expect(save).toHaveBeenCalled()
    }
  })
})
