const express = require('express')
const { StatusCodes } = require('http-status-codes')
const BadRequest = require('../errors/badRequest')
// import NotFound from '../errors/notFound'
const service = require('./service')
const { check, validationResult } = require('express-validator')

const router = express.Router()

router.post(
  '/',
  [
    check('title', 'Title is required').not().notEmpty(),
    check('description', 'Description is required').not().notEmpty(),
  ],
  async (req, res, next) => {
    // const { title, description, } = req.body

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

    const newJournal = await service.createJournal(req.body)

    res.status(StatusCodes.CREATED).json(newJournal)
  }
)

router.get('/', async (req, res, next) => {
  const journals = await service.getJournals()
  res.status(StatusCodes.OK).json(journals)
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  const journal = await service.getJournalById(id)
  res.status(StatusCodes.OK).json(journal)
})

router.put('/:id', async (req, res, next) => {
  // const title = req.body.title
  const { params: { id }, body: { title } } = req
  if (!title) next(new BadRequest('Title is missing!'))

  // if (!id) next(new NotFound('Id is not found!'))

  const updated = await service.updateJournal({ title, id })
  res.status(StatusCodes.OK).json(updated)
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const journal = await service.deleteJournal(id)
  res.status(StatusCodes.OK).json(journal)
})

module.exports = router
