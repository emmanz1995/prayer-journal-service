const express = require('express')
const { check, validationResult } = require('express-validator')
const _ = require('lodash')
const BadRequest = require('../../errors/badRequest')
// import NotFound from '../errors/notFound'
const {
  createJournal,
  getJournalById,
  getJournals,
  getMyJournalEntities,
  updateJournal,
  deleteJournal,
} = require('./service')
const authJwt = require('../../middleware/authJwt')

const router = express.Router()

router.post(
  '/',
  [
    check('title', 'Title is required').not().notEmpty(),
    check('description', 'Description is required').not().notEmpty(),
  ],
  authJwt,
  async (req, res, next) => {
    const result = validationResult(req)

    if (!result.isEmpty())
      return next(
        new BadRequest(
          `${result
            .array()
            .map(x => x.msg)
            .join(', ')}`,
        ),
      )

    const newJournal = await createJournal({ ...req.body, userInfo: req.user })

    res.status(201).json(newJournal)
  },
)

router.get('/all', authJwt, async (req, res, next) => {
  const journals = await getJournals()
  res.status(200).json(journals)
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  const journal = await getJournalById(id)
  res.status(200).json(journal)
})

router.get('/', authJwt, async (req, res, next) => {
  const myPrayerRequests = await getMyJournalEntities(req.user)
  res.status(200).json(myPrayerRequests)
})

// router.get('/myprayers', authJwt, async (req, res, next) => {
//   console.log('...userId:', _id)
//   console.log('...userInfo:', req.user)
//   console.log('1')
//
//   try {
//     const myPrayerRequests = await getMyJournalEntities(req.user)
//     console.log('...prayers:', myPrayerRequests)
//     res.status(200).json(myPrayerRequests)
//   } catch(err) {
//     next(err);
//   }
// })

router.put('/:id', async (req, res, next) => {
  // const title = req.body.title
  const {
    params: { id },
    body: { title },
  } = req
  if (!title) next(new BadRequest('Title is missing!'))

  // if (!id) next(new NotFound('Id is not found!'))

  const updated = await updateJournal({ title, id })
  res.status(200).json(updated)
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const journal = await deleteJournal(id)
  res.status(200).json(journal)
})

module.exports = router
