const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const app = require('../../app')
const {
  createJournal,
  getJournals,
  getJournalById,
  updateJournal,
  deleteJournal,
} = require('./service')
const { Journal } = require('../../mongo/journal.model')
const { AddNewUser, User } = require('../../mongo/user.model')
const {
  initialJournalEntries,
  journalEntriesInDB,
} = require('../../__mock__/journalTestData')

beforeEach(async () => {
  await Journal.deleteMany()
  await Journal.insertMany(initialJournalEntries)
})

jest.mock('./service')

describe('integration test for save router', () => {
  let token = null

  beforeEach(async () => {
    await User.deleteMany({})
    const salt = await bcrypt.genSalt(12)
    const hash = bcrypt.hashSync('Password123', salt)

    const user = await AddNewUser({
      username: 'John.Doe',
      email: 'john.doe@gmail.com',
      password: hash,
      denomination: 'Protestant Reformed',
    })

    user.save()

    const response = await supertest(app)
      .post('/api/auth')
      .send({ email: 'john.doe@gmail.com', password: 'Password123' })

    token = response.body.token
  })
  const payload = {
    _id: {
      inverse: false,
    },
    postedBy: 'd443343432dr34f',
    title: 'Ham Sandwich',
    description:
      "I want a nice grilled ham sandwich this weekend in Jesus' name",
    completedAt: false,
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  }

  // TODO: create a test login helper to be able to get access to the access_token and store it in the headers
  it('should create an new journal entry - success', async () => {
    createJournal.mockResolvedValue(payload)
    const response = await supertest(app)
      .post('/api/journal')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)
      .send({
        title: 'Ham Sandwich',
        description:
          "I want a nice grilled ham sandwich this weekend in Jesus' name",
        completedAt: false,
      })
      .expect(201)

    expect(response.body).toEqual({
      _id: { inverse: false },
      completedAt: false,
      createdAt: { inverse: false },
      description:
        "I want a nice grilled ham sandwich this weekend in Jesus' name",
      postedBy: 'd443343432dr34f',
      title: 'Ham Sandwich',
      updatedAt: { inverse: false },
    })
    expect(response.statusCode).toEqual(201)
    expect(response.body.title).toContain('Ham Sandwich')
    expect(createJournal).toBeCalled()
    // expect(createJournal).toHaveBeenCalledTimes(1)
    // expect(createJournal).toHaveBeenCalledWith({
    //   completedAt: false,
    //   description:
    //     "I want a nice grilled ham sandwich this weekend in Jesus' name",
    //   title: 'Ham Sandwich',
    //   userInfo: {
    //     __v: 0,
    //     _id: expect.any(String),
    //     avatarUrl:
    //       'https://res.cloudinary.com/emmanuel-cloud-storage/image/upload/v1688214363/avatars/qsjrd3lvcduavnv1utyu.svg',
    //     coverPhotoUrl:
    //       'https://res.cloudinary.com/emmanuel-cloud-storage/image/upload/v1670593777/dvgncaorojmfob07w8ca.jpg',
    //     denomination: 'Protestant Reformed',
    //     email: 'john.doe@gmail.com',
    //     username: 'John Doe',
    //   },
    // })
  })

  it('should throw error if req.body missing - 400', async () => {
    createJournal.mockImplementationOnce(() => {
      throw Error('Title is required, Description is required')
    })
    const response = await supertest(app)
      .post('/api/journal')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)
      .send({})
      .expect(400)
    expect(response.body.errorMessage).toContain(
      'Title is required, Description is required'
    )
    expect(response.body.errorCode).toContain('JC01')
    expect(response.status).toEqual(400)
  })
})

describe('integration test for get router', () => {
  let token = null
  beforeEach(async () => {
    await User.deleteMany()

    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hashSync('Password123', salt)

    const user = await AddNewUser({
      username: 'Jane.Doe',
      email: 'john.doe@gmail.com',
      password: hash,
      denomination: 'Protestant Reformed',
    })
    user.save()

    const response = await supertest(app).post('/api/auth')
    token = response.body.token
  })

  it('should read all journal entries - success', async () => {
    getJournals.mockImplementationOnce(() => [
      {
        _id: '643db8c388f22f9d7395a0f5',
        title: 'Mum2',
        description: 'I want Mum to have a bacon cheese sandwich!',
        createdAt: '2023-04-17T21:23:15.901Z',
        updatedAt: '2023-04-18T19:37:19.642Z',
      },
      {
        _id: '643db8efcbc42d4aa4bc8d5b',
        title: 'Bacon Cheese',
        description: 'I want a bacon cheese sandwich!',
        createdAt: '2023-04-17T21:23:59.982Z',
        updatedAt: '2023-04-17T21:23:59.982Z',
      },
    ])
    const response = await supertest(app)
      .get('/api/journal/all')
      .expect(200)
      .set('Authorization', `Bearer ${token}`)
    expect(response.body).toEqual([
      {
        _id: '643db8c388f22f9d7395a0f5',
        createdAt: '2023-04-17T21:23:15.901Z',
        description: 'I want Mum to have a bacon cheese sandwich!',
        title: 'Mum2',
        updatedAt: '2023-04-18T19:37:19.642Z',
      },
      {
        _id: '643db8efcbc42d4aa4bc8d5b',
        createdAt: '2023-04-17T21:23:59.982Z',
        description: 'I want a bacon cheese sandwich!',
        title: 'Bacon Cheese',
        updatedAt: '2023-04-17T21:23:59.982Z',
      },
    ])
    expect(response.status).toEqual(200)
    expect(getJournals).toHaveBeenCalled()
  })
})

describe('integration test for getById router', () => {
  it('should get a single journal entry - success', async () => {
    const id = '643db8efcbc42d4aa4bc8d5b'
    getJournalById.mockImplementationOnce(() => ({
      _id: '643db8efcbc42d4aa4bc8d5b',
      title: 'Bacon Cheese',
      description: 'I want a bacon cheese sandwich!',
      journalType: 'prayer',
      createdAt: '2023-04-17T21:23:59.982Z',
      updatedAt: '2023-04-17T21:23:59.982Z',
    }))
    const journalsAtEnd = await journalEntriesInDB()
    const title = journalsAtEnd && journalsAtEnd.map(j => j.title)

    const response = await supertest(app).get(`/api/journal/${id}`).expect(200)
    expect(response.status).toEqual(200)
    expect(response.body._id).toContain('643db8efcbc42d4aa4bc8d5b')
    expect(title).toContain('Mum2')
    expect(getJournalById).toHaveBeenCalledTimes(1)
    expect(getJournalById).toHaveBeenCalledWith('643db8efcbc42d4aa4bc8d5b')
  })
})

describe('integration test for update router', () => {
  it('should update a journal entry - success', async () => {
    const journals = await journalEntriesInDB()
    const journal = journals[0]
    const formData = {
      _id: '643db8c388f22f9d7395a0f5',
      title: 'Mum3',
    }
    updateJournal.mockImplementationOnce(() => formData)
    const response = await supertest(app)
      .put(`/api/journal/${journal._id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .send(formData)
    const journalsAtEnd = await journalEntriesInDB()
    expect(response.body.title).toContain('Mum3')
    expect(journalsAtEnd).toHaveLength(initialJournalEntries.length)
    expect(response.body._id).toContain('643db8c388f22f9d7395a0f5')
    expect(response.status).toEqual(200)
    expect(updateJournal).toHaveBeenCalledTimes(1)
  })
})

describe('integration test for delete router', () => {
  it('should delete a journal entry - success', async () => {
    const id = '643ef213dd37ba91d9487e97'
    deleteJournal.mockImplementationOnce(() => ({
      id,
    }))
    const response = await supertest(app)
      .delete(`/api/journal/${id}`)
      .expect(200)
    expect(response.status).toEqual(200)
    expect(response.body).toEqual({ id: '643ef213dd37ba91d9487e97' })
    expect(deleteJournal).toHaveBeenCalledTimes(1)
    expect(deleteJournal).toHaveBeenCalledWith('643ef213dd37ba91d9487e97')
  })
})

afterAll(() => {
  mongoose?.connection?.close()
})
