// import { jest } from '@jest/globals'
// import { service } from './service'

// const db = {
//   saveJournal: jest.fn(),
//   updateJournalModel: jest.fn(),
//   getJournalsModel: jest.fn(),
//   getJournalModel: jest.fn(),
// }

// describe('test save service', () => {
//   beforeEach(() => {
//     jest.clearAllMocks()
//     jest.unmock('./service')
//   })
//   test('save journal', async () => {
//     db.saveJournal.mockImplementationOnce(() => ({
//       title: 'Bacon Cheese',
//       description:
//         "I want a Bacon Cheese sandwich this weekend in Jesus' name.",
//       journalType: 'Prayer',
//     }))
//     const save = service.createJournal({
//       title: 'Bacon Cheese',
//       description:
//         "I want a Bacon Cheese sandwich this weekend in Jesus' name.",
//       journalType: 'Prayer',
//     })
//     expect(save).toBeDefined()
//     expect(save).toContain({
//       title: 'Bacon Cheese',
//       description:
//         "I want a Bacon Cheese sandwich this weekend in Jesus' name.",
//       journalType: 'Prayer',
//     })
//   })
// })
