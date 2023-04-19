import express from 'express'
import { StatusCodes } from 'http-status-codes'
import BadRequest from '../errors/badRequest'
// import NotFound from '../errors/notFound'
import { service } from './service'

const router = express.Router()

router.post('/', async (req, res, next) => {
  const { title, description, journalType } = req.body

  if (!title || !description || !journalType)
    next(new BadRequest('Title, description and or type missing!'))

  const newJournal = await service.createJournal({
    title,
    description,
    journalType,
  })
  console.log(newJournal)
  res.status(StatusCodes.CREATED).json(newJournal)
})

router.get('/', async (req, res, next) => {
  const journals = await service.getJournals()
  res.status(StatusCodes.OK).json(journals)
})

router.put('/:id', async (req, res, next) => {
  const title = req.body.title
  const { id } = req.params
  if (!title) next(new BadRequest('Title is missing!'))

  // if (!id) next(new NotFound('Id is not found!'))

  const updated = await service.updateJournal({ title, id })
  res.status(StatusCodes.OK).json(updated)
})

export default router
