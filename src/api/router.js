import express from 'express'
import { StatusCodes } from 'http-status-codes'
import BadRequest from '../errors/badRequest'
import NotFound from '../errors/notFound'
import _ from 'lodash'
import { service } from './service'

const router = express.Router()

router.post('/', async (req, res, next) => {
  console.log('...REQ.BODY:', req.body)
  const title = _.get(req, 'body.title')
  const description = _.get(req, 'body.description')
  const journalType = _.get(req, 'body.journalType')

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
  console.log('...Journals:', journals)
  res.status(StatusCodes.OK).json(journals)
})

router.put('/:id', async (req, res, next) => {
  const title = req.body.title
  const { id } = req.params

  if (!id) next(new NotFound('Id is not found!'))

  console.log('ID:', req.params.id)

  const updated = await service.updateJournal({ title, id })

  console.log(updated)

  res.status(StatusCodes.OK).json(updated)
})

export default router
