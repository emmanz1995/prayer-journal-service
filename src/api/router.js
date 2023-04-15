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
    throw new BadRequest('Name and pin of the account are missing!')
  }
  const newAccount = await service.createAccount({
    title,
    description,
    journalType,
  })
  console.log(newAccount)
  res.status(StatusCodes.CREATED).json(newAccount)
})

export default router
