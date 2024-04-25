const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { signIn } = require('./service')
const { FindUser } = require('../../mongo/user.model')
const BadRequest = require('../../errors/badRequest')

jest.mock('bcryptjs')
jest.mock('jsonwebtoken')
jest.mock('../../mongo/user.model')

describe('testing auth service', () => {
  it('should get token and userInfo', async () => {
    process.env.SECRET_KEY = '123456'
    bcrypt.compareSync.mockImplementation(() => true)
    jwt.sign?.mockImplementation(
      () =>
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZWUxZmFiOTNkMTU1M2M4OWZiNDdhMiIsImVtYWlsIjoiZW9rdWNodWt3dTk1QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZW1tYW56OTUiLCJpYXQiOjE3MTAxODk5NTAsImV4cCI6MTcxMDE5MzU1MH0.XgBff_DNuX2dRQYQz7K5NpHGjxMcSRh5oDAqXPmGHmE',
    )
    FindUser.mockResolvedValue({
      id: '123',
      username: 'emmanz95',
      email: 'eokuchukwu95@gmail.com',
      password: '$2a$10$6RmWPM.Gai3ZphD6okhvg.Xxbumxh1lU3stoPGcidAOLxO2aH0Ygm',
      avatarUrl:
        'https://res.cloudinary.com/emmanuel-cloud-storage/image/upload/v1688214363/avatars/qsjrd3lvcduavnv1utyu.svg',
      coverPhotoUrl:
        'https://res.cloudinary.com/emmanuel-cloud-storage/image/upload/v1670593777/dvgncaorojmfob07w8ca.jpg',
      __v: 0,
    })

    const body = {
      email: 'test@example.com',
      password: 'Password@123?',
    }
    const currentUser = await signIn(body)

    expect(currentUser).toEqual({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZWUxZmFiOTNkMTU1M2M4OWZiNDdhMiIsImVtYWlsIjoiZW9rdWNodWt3dTk1QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZW1tYW56OTUiLCJpYXQiOjE3MTAxODk5NTAsImV4cCI6MTcxMDE5MzU1MH0.XgBff_DNuX2dRQYQz7K5NpHGjxMcSRh5oDAqXPmGHmE',
      userInfo: {
        email: 'eokuchukwu95@gmail.com',
        id: '123',
        username: 'emmanz95',
      },
    })
    expect(bcrypt.compareSync).toHaveBeenCalledTimes(1)
    expect(bcrypt.compareSync).toHaveBeenCalledWith(
      'Password@123?',
      '$2a$10$6RmWPM.Gai3ZphD6okhvg.Xxbumxh1lU3stoPGcidAOLxO2aH0Ygm',
    )
    expect(jwt.sign).toHaveBeenCalledTimes(1)
    expect(jwt.sign).toHaveBeenCalledWith(
      { email: 'eokuchukwu95@gmail.com', id: '123', username: 'emmanz95' },
      process.env.SECRET_KEY,
      { expiresIn: 3600 },
    )
  })

  it('should FAIL to retrieve token and userInfo', async () => {
    expect.assertions(1)
    process.env.SECRET_KEY = ''
    bcrypt.compareSync.mockImplementation(() => {
      throw new BadRequest('oops')
    })
    jwt.sign?.mockImplementation(() => '')
    FindUser.mockImplementation(() => {
      throw new BadRequest('oops')
    })

    const body = {
      email: 'test@example.com',
      password: 'Password@123?',
    }

    try {
      await signIn(body)
    } catch (err) {
      expect(err.message).toEqual('oops')
    }
  })
})
