import { get, getById } from './get.js'

const Model = jest.fn(() => ({ find, findById }))
Model.find = jest.fn()
Model.findById = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

describe('test get function', () => {
  const payload = [
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

  test('should get all journal entries from db', async () => {
    Model.find.mockImplementationOnce(() => payload)
    const getJournalEntries = await get(Model)({})
    expect(getJournalEntries).toStrictEqual(payload)
    expect(Model.find).toBeCalledTimes(1)
    expect(Model.find).toBeCalledWith({})
    expect(getJournalEntries[0]).toStrictEqual({
      _id: '643db8c388f22f9d7395a0f5',
      title: 'Mum2',
      journalType: 'prayer',
      createdAt: '2023-04-17T21:23:15.901Z',
      updatedAt: '2023-04-18T19:37:19.642Z',
    })
    expect(getJournalEntries[0].title).toStrictEqual('Mum2')
    expect(getJournalEntries[0].createdAt).toStrictEqual(expect.any(String))
    expect(getJournalEntries[0].updatedAt).toStrictEqual(expect.any(String))
    expect(getJournalEntries).toBeTruthy()
  })
  test('get function is defined', async () => {
    const getJournalEntries = get(Model)({})
    expect(getJournalEntries).toBeDefined()
  })
  test('failed to save new account - 500', async () => {
    Model.find.mockImplementationOnce(() => {
      const error = new Error('Internal server error!')
      error.statusCode = 500
    })
    try {
      await get(Model)({})
    } catch (err) {
      expect(err.message).toEqual('Internal server error!')
      expect(err.statusCode).toEqual(500)
    }
  })
})

describe('test getById function', () => {
  test('should get all journal entries from db', async () => {
    Model.findById.mockImplementationOnce(() => ({
      _id: '643ee3b946deec1b1cea4019',
      title: 'Bacon Cheese2',
      journalType: 'prayer',
      createdAt: '2023-04-18T18:38:49.601Z',
      updatedAt: '2023-04-18T19:44:31.229Z',
    }))
    const id = '643ee3b946deec1b1cea4019'
    const getJournalEntry = await getById(Model)(id)
    expect(getJournalEntry).toEqual({
      _id: '643ee3b946deec1b1cea4019',
      title: 'Bacon Cheese2',
      journalType: 'prayer',
      createdAt: '2023-04-18T18:38:49.601Z',
      updatedAt: '2023-04-18T19:44:31.229Z',
    })
    expect(Model.findById).toBeCalledTimes(1)
    expect(Model.findById).toBeCalledWith('643ee3b946deec1b1cea4019')
    expect(getJournalEntry).toBeTruthy()
    expect(getJournalEntry.title).toEqual('Bacon Cheese2')
    expect(getJournalEntry.createdAt).toEqual(expect.any(String))
    expect(getJournalEntry.updatedAt).toEqual(expect.any(String))
  })
  test('getById function is defined', async () => {
    const id = '643ee3b946deec1b1cea4019'
    const getJournalEntry = get(Model)(id)
    expect(getJournalEntry).toBeDefined()
  })
  test('failed to save new account - 500', () => {
    Model.find.mockImplementationOnce(() => {
      const error = new Error('Internal server error!')
      error.statusCode = 500
    })
    get(Model)({})
      .then(item => {
        console.log(item)
      })
      .catch(err => {
        expect(err.message).toEqual('Internal server error')
        expect(err.statusCode).toEqual(500)
      })
  })
})
