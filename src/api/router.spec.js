jest.mock('./service')

import { jest } from '@jest/globals'
import app from '../app'
import supertest from 'supertest'
import { service } from './service'

service.createJournal = jest.fn()
service.getJournals = jest.fn()
service.getJournalById = jest.fn()
service.updateJournal = jest.fn()
service.deleteJournal = jest.fn()

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
      new Error('Title, description and or type missing!')
    })
    const response = await supertest(app)
      .post('/api/journal')
      .expect('Content-Type', /application\/json/)
      .send({})
      .expect(400)
    expect(response.body.errorMessage).toContain(
      'Title, description and or type missing!'
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
          journalType: 'prayer',
          createdAt: '2023-04-17T21:23:15.901Z',
          updatedAt: '2023-04-18T19:37:19.642Z',
        },
        {
          _id: '643db8efcbc42d4aa4bc8d5b',
          title: 'Bacon Cheese',
          journalType: 'prayer',
          createdAt: '2023-04-17T21:23:59.982Z',
          updatedAt: '2023-04-17T21:23:59.982Z',
        },
        {
          _id: '643ee3b946deec1b1cea4019',
          title: 'Bacon Cheese2',
          journalType: 'prayer',
          createdAt: '2023-04-18T18:38:49.601Z',
          updatedAt: '2023-04-18T19:44:31.229Z',
        },
        {
          _id: '643ef213dd37ba91d9487e97',
          title: 'Bacon Cheese',
          journalType: 'prayer',
          createdAt: '2023-04-18T19:40:03.145Z',
          updatedAt: '2023-04-18T19:40:03.145Z',
        },
        {
          _id: '6440297fc458494f873521e2',
          title: 'Bacon Cheese',
          journalType: 'prayer',
          createdAt: '2023-04-19T17:48:47.332Z',
          updatedAt: '2023-04-19T17:48:47.332Z',
        },
        {
          _id: '644042b5b4f2a0cb235a1084',
          title: 'Bacon Cheese',
          journalType: 'prayer',
          createdAt: '2023-04-19T19:36:21.101Z',
          updatedAt: '2023-04-19T20:35:26.648Z',
        },
        {
          _id: '644048d48c4fcbd9d45b959b',
          title: 'Bacon Cheese',
          journalType: 'prayer',
          createdAt: '2023-04-19T20:02:28.735Z',
          updatedAt: '2023-04-19T20:02:28.735Z',
        },
        {
          _id: '64404dac02112e27efbdb03d',
          title: 'Bacon Cheese',
          journalType: 'prayer',
          createdAt: '2023-04-19T20:23:08.456Z',
          updatedAt: '2023-04-19T20:23:08.456Z',
        },
        {
          _id: '644050534ab70ea7f122183b',
          title: 'Bacon Cheese',
          journalType: 'prayer',
          createdAt: '2023-04-19T20:34:27.625Z',
          updatedAt: '2023-04-19T20:34:27.625Z',
        },
        {
          _id: '64405083ab0f26aee8ee264f',
          title: 'Bacon Cheese',
          journalType: 'prayer',
          createdAt: '2023-04-19T20:35:15.998Z',
          updatedAt: '2023-04-19T20:35:15.998Z',
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
    const id = '64405083ab0f26aee8ee264f'
    service.getJournalById.mockImplementationOnce(() => ({
      id,
      title: 'Bacon Cheese',
      journalType: 'prayer',
    }))

    const response = await supertest(app).get(`/api/journal/${id}`).expect(200)
    expect(response.status).toEqual(200)
    expect(response.body.title).toContain('Bacon Cheese')
  })
})

describe('intergration test for update router', () => {
  const id = '643db8c388f22f9d7395a0f5'
  const formData = {
    id,
    title: 'Mum3',
  }
  test('should update a journal entry - success', async () => {
    service.updateJournal.mockImplementationOnce(() => formData, id)
    const response = await supertest(app)
      .put(`/api/journal/${id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .send(formData)
    expect(response.body.title).toContain('Mum3')
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
      title: 'Bacon Cheese',
      journalType: 'prayer',
    }))
    const response = await supertest(app)
      .delete(`/api/journal/${id}`)
      .expect(200)
    expect(response.status).toEqual(200)
    expect(response.body.title).toContain('Bacon Cheese')
    expect(service.deleteJournal).toHaveBeenCalledTimes(1)
    expect(service.deleteJournal).toHaveBeenCalledWith(id)
  })
})
