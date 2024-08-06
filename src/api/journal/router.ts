import express, { Response, Request, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import _ from 'lodash';
import BadRequest from '../../errors/badRequest';
// import NotFound from '../errors/notFound'
import {
  createJournal,
  getJournalById,
  getJournals,
  getMyJournalEntities,
  updateJournal,
  deleteJournal,
} from './service';
import authJwt from '../../middleware/authJwt';

const router = express.Router()

router.post(
  '/',
  [
    check('title', 'Title is required').not().notEmpty(),
    check('description', 'Description is required').not().notEmpty(),
  ],
  authJwt,
  async (req: Request, res: Response, next: NextFunction) => {
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
    try {
      const newJournal = await createJournal(req.body, req.user)
      res.status(201).json(newJournal)
    } catch(err) {
      console.log('err', err)
      next(err)
    }
  }
)

router.get('/all', authJwt, async (req: Request, res: Response, next: NextFunction) => {
  const journals = await getJournals()
  res.status(200).json(journals)
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const journal = await getJournalById(id)
  res.status(200).json(journal)
})

router.get('/', authJwt, async (req: Request, res: Response, next: NextFunction) => {
  const myPrayerRequests = await getMyJournalEntities(req.user)
  res.status(200).json(myPrayerRequests)
})

// router.get('/myprayers', authJwt, async (req: Request, res: Response, next: NextFunction) => {
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

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
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

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const journal = await deleteJournal(id)
  res.status(200).json(journal)
})

export default router
