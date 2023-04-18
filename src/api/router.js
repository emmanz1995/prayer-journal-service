import express from 'express'
import { StatusCodes } from 'http-status-codes'
import BadRequest from '../errors/badRequest'
import _ from 'lodash'
import { service } from './service'

const router = express.Router()

router.post('/', async (req, res) => {
  console.log('...REQ.BODY:', req.body)
  const title = _.get(req, 'body.title')
  const description = _.get(req, 'body.description')
  const journalType = _.get(req, 'body.journalType')

  if (!title || !description || !journalType) {
    throw new BadRequest('Title, description and or type missing!')
  }
  const newJournal = await service.createJournal({
    title,
    description,
    journalType,
  })
  console.log(newJournal)
  res.status(StatusCodes.CREATED).json(newJournal)
})

router.put('/:id', async (req, res) => {
  const title = req.body.title
  const id = req.params.id

  console.log('ID:', req.params.id)

  const updated = await service.updateJournal({ title, id })

  console.log(updated)

  res.status(StatusCodes.OK).json(updated)
})

export default router
