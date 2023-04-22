import app from '../app'
import supertest from 'supertest'
// import { jest } from '@jest/globals'

describe('intergration test for save function', () => {
  // const api = supertest(app)
  const formData = {
    title: 'Ham Sandwich',
    description:
      "I want a nice grilled ham sandwich this weekend in Jesus' name",
    journalType: 'prayer',
  }

  test('should create an new journal entry - success', async () => {
    const response = await supertest(app)
      .post('/api/journal')
      .expect('Content-Type', /application\/json/)
      .send(formData)
      .expect(201)
    // console.log('...SaveJournal:', saveJournal.req)
    expect(response.body).toEqual(formData)
    expect(response && response.body.title).toContain('Ham Sandwich')
  })
})
