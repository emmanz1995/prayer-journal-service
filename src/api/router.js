import express from 'express'
import { StatusCodes } from 'http-status-codes'
import BadRequest from '../errors/badRequest'
import _ from 'lodash'
import { service } from './service'
const router = express.Router()

router.post('/', async (req, res) => {
  console.log('...REQ.BODY:', req.body)
  const owner = _.get(req, 'body.owner')
  const pin = _.get(req, 'body.pin')
  const movements = _.get(req, 'body.movements')

  if (!owner || !pin) {
    throw new BadRequest('Name and pin of the account are missing!')
  }
  const newAccount = await service.createAccount({ owner, pin, movements })
  console.log(newAccount)
  res.status(StatusCodes.CREATED).json(newAccount)
})

export default router
