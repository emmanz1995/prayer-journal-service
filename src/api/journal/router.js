const express = require('express');
const { check, validationResult } = require('express-validator');
const _ = require('lodash');
const BadRequest = require('../../errors/badRequest');
// import NotFound from '../errors/notFound'
const { createJournal, getJournalById, getJournals, updateJournal, deleteJournal } = require('./service')

const router = express.Router()

router.post(
  '/',
  [
    check('title', 'Title is required').not().notEmpty(),
    check('description', 'Description is required').not().notEmpty(),
  ],
  async (req, res, next) => {
    const result = validationResult(req)

    if (!result.isEmpty())
      return next(
        new BadRequest(
          `${result
            .array()
            .map(x => x.msg)
            .join(', ')}`
        )
      )

    const newJournal = await createJournal(req.body)

    res.status(201).json(newJournal)
  }
)

router.get('/', async (req, res, next) => {
  const journals = await getJournals()
  res.status(200).json(journals)
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  const journal = await getJournalById(id)
  res.status(200).json(journal)
})

router.put('/:id', async (req, res, next) => {
  // const title = req.body.title
  const { params: { id }, body: { title } } = req
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
