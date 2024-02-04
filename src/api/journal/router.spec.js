const app = require('../../app')
const supertest = require('supertest')
const { createJournal, getJournals, getJournalById, updateJournal, deleteJournal } = require('./service')
const { Journal } = require('../../mongo/journal.model')
const mongoose = require('mongoose')
const {
  initialJournalEntries,
  journalEntriesInDB,
} = require('../../__mock__/journalTestData')

beforeEach(async () => {
  await Journal.deleteMany()
  await Journal.insertMany(initialJournalEntries)
})

jest.mock('./service')

describe('intergration test for save router', () => {
  const formData = {
    _id: {
      inverse: false
    },
    title: 'Ham Sandwich',
    description:
      "I want a nice grilled ham sandwich this weekend in Jesus' name",
    completedAt: false,
    createdAt: expect.any(String),
    updatedAt: expect.any(String)
  }

  it('should create an new journal entry - success', async () => {
    createJournal.mockResolvedValue(formData)
    const response = await supertest(app)
      .post('/api/journal')
      .expect('Content-Type', /application\/json/)
      .send(formData)
      .expect(201)
    // expect(response.body).toEqual(formData)
    expect(response.statusCode).toEqual(201)
    expect(response.body.title).toContain('Ham Sandwich')
    expect(createJournal).toHaveBeenCalledTimes(1)
    // expect(createJournal).toHaveBeenCalledWith({
    //   title: 'Ham Sandwich',
    //   description:
    //     "I want a nice grilled ham sandwich this weekend in Jesus' name",
    // })
    console.log('...formData:', formData)
  })

  it('should throw error if req.body missing - 400', async () => {
    createJournal.mockImplementationOnce(() => {
      throw Error('Title is required, Description is required')
    })
    const response = await supertest(app)
      .post('/api/journal')
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
  it('should read all journal entries - success', async () => {
    getJournals.mockImplementationOnce(() => {
      return [
        {
          _id: '643db8c388f22f9d7395a0f5',
          title: 'Mum2',
          description: 'I want Mum to have a bacon cheese sandwich!',
          journalType: 'prayer',
          createdAt: '2023-04-17T21:23:15.901Z',
          updatedAt: '2023-04-18T19:37:19.642Z',
        },
        {
          _id: '643db8efcbc42d4aa4bc8d5b',
          title: 'Bacon Cheese',
          description: 'I want a bacon cheese sandwich!',
          journalType: 'prayer',
          createdAt: '2023-04-17T21:23:59.982Z',
          updatedAt: '2023-04-17T21:23:59.982Z',
        },
      ]
    })
    const response = await supertest(app).get('/api/journal').expect(200)
    expect(response.status).toEqual(200)
    expect(getJournals).toHaveBeenCalledTimes(1)
  })
})

describe('intergration test for getById router', () => {
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
    expect(getJournalById).toHaveBeenCalledWith(
      '643db8efcbc42d4aa4bc8d5b'
    )
  })
})

describe('intergration test for update router', () => {
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

describe('intergration test for delete router', () => {
  it('should delete a journal entry - success', async () => {
    const id = '643ef213dd37ba91d9487e97'
    deleteJournal.mockImplementationOnce(() => ({
      id,
    }))
    const response = await supertest(app)
      .delete(`/api/journal/${id}`)
      .expect(200)
    expect(response.status).toEqual(200)
    expect(response.body).toEqual({id: '643ef213dd37ba91d9487e97'})
    expect(deleteJournal).toHaveBeenCalledTimes(1)
    expect(deleteJournal).toHaveBeenCalledWith('643ef213dd37ba91d9487e97')
  })
})

afterAll(() => {
  mongoose?.connection?.close()
})
