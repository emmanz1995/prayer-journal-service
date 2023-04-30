jest.mock('./service')

import { jest } from '@jest/globals'
import app from '../app'
import supertest from 'supertest'
import { service } from './service'
import { Journal } from '../mongo/journal.model'
import mongoose from 'mongoose'
import {
  initialJournalEntries,
  journalEntriesInDB,
} from '../__mock__/journalTestData'

service.createJournal = jest.fn()
service.getJournals = jest.fn()
service.getJournalById = jest.fn()
service.updateJournal = jest.fn()
service.deleteJournal = jest.fn()

beforeEach(async () => {
  await Journal.deleteMany()
  await Journal.insertMany(initialJournalEntries)
})

describe('intergration test for save router', () => {
  const formData = {
    title: 'Ham Sandwich',
    description:
      "I want a nice grilled ham sandwich this weekend in Jesus' name",
    journalType: 'prayer',
  }

  test('should create an new journal entry - success', async () => {
    service.createJournal.mockImplementationOnce(() => formData)
    const response = await supertest(app)
      .post('/api/journal')
      .expect('Content-Type', /application\/json/)
      .send(formData)
      .expect(201)
    expect(response.body).toEqual(formData)
    expect(response.body.title).toContain('Ham Sandwich')
    expect(service.createJournal).toHaveBeenCalledTimes(1)
    expect(service.createJournal).toHaveBeenCalledWith(formData)
  })

  test('should throw error if req.body missing - 400', async () => {
    service.createJournal.mockImplementationOnce(() => {
      new Error(
        'Title is required, Description is required, Journal Type is required'
      )
    })
    const response = await supertest(app)
      .post('/api/journal')
      .expect('Content-Type', /application\/json/)
      .send({})
      .expect(400)
    expect(response.body.errorMessage).toContain(
      'Title is required, Description is required, Journal Type is required'
    )
    expect(response.body.errorCode).toContain('JC01')
    expect(response.status).toEqual(400)
  })
})

describe('intergration test for get router', () => {
  test('should read all journal entries - success', async () => {
    service.getJournals.mockImplementationOnce(() => {
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
    expect(service.getJournals).toHaveBeenCalledTimes(1)
  })
})

describe('intergration test for getById router', () => {
  test('should get a single journal entry - success', async () => {
    const id = '643db8efcbc42d4aa4bc8d5b'
    service.getJournalById.mockImplementationOnce(() => ({
      id: '643db8efcbc42d4aa4bc8d5b',
    }))
    const journalsAtEnd = await journalEntriesInDB()
    const title = journalsAtEnd && journalsAtEnd.map(j => j.title)

    const response = await supertest(app).get(`/api/journal/${id}`).expect(200)
    expect(response.status).toEqual(200)
    expect(response.body.id).toContain('643db8efcbc42d4aa4bc8d5b')
    expect(title).toContain('Mum2')
  })
})

describe('intergration test for update router', () => {
  test('should update a journal entry - success', async () => {
    const journals = await journalEntriesInDB()
    const journal = journals[0]
    const formData = {
      id: '643db8c388f22f9d7395a0f5',
      title: 'Mum3',
    }
    service.updateJournal.mockImplementationOnce(() => formData)
    const response = await supertest(app)
      .put(`/api/journal/${journal.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .send(formData)
    const journalsAtEnd = await journalEntriesInDB()
    expect(response.body.title).toContain('Mum3')
    expect(journalsAtEnd).toHaveLength(initialJournalEntries.length)
    expect(response.body.id).toContain('643db8c388f22f9d7395a0f5')
    expect(response.status).toEqual(200)
    expect(service.updateJournal).toHaveBeenCalledTimes(1)
    expect(service.updateJournal).toHaveBeenCalledWith(formData)
  })
})

describe('intergration test for delete router', () => {
  test('should delete a journal entry - success', async () => {
    const id = '643ef213dd37ba91d9487e97'
    service.deleteJournal.mockImplementationOnce(() => ({
      id,
    }))
    const response = await supertest(app)
      .delete(`/api/journal/${id}`)
      .expect(200)
    expect(response.status).toEqual(200)
    expect(service.deleteJournal).toHaveBeenCalledTimes(1)
    expect(service.deleteJournal).toHaveBeenCalledWith(id)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
