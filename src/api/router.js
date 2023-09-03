import express from 'express'
import { StatusCodes } from 'http-status-codes'
import BadRequest from '../errors/badRequest.js'
// import NotFound from '../errors/notFound'
import { service } from './service.js'
import { check, validationResult } from 'express-validator'

const router = express.Router()

router.post(
  '/',
  [
    check('title', 'Title is required').not().notEmpty(),
    check('description', 'Description is required').not().notEmpty(),
  ],
  async (req, res, next) => {
    const { title, description } = req.body

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
    const newJournal = await service.createJournal({
      title,
      description,
    })
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
  const {
    body: { title, description, completedAt },
    params: { id },
  } = req

  if (!title) next(new BadRequest('Title is missing!'))
  if (!description) next(new BadRequest('Description is missing!'))

  const updated = await service.updateJournal({
    title,
    description,
    completedAt,
    id,
  })
  res.status(StatusCodes.OK).json(updated)
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const journal = await service.deleteJournal(id)
  res.status(StatusCodes.OK).json(journal)
})

export default router
