import express from 'express'
import { addToy, addToyRev, getToyById, getToys, removeToy, removeToyRev, updateToy } from './toy.controller.js'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'

export const toyRoutes = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)
toyRoutes.get('/',  getToys)
toyRoutes.get('/:id', getToyById)
toyRoutes.post('/',requireAuth, addToy)
toyRoutes.put('/',requireAuth, updateToy)
toyRoutes.delete('/:id', requireAuth,removeToy)

// // router.delete('/:id', requireAuth, requireAdmin, removeToy)

toyRoutes.post('/:id/review', requireAuth, addToyRev)
toyRoutes.delete('/:id/review/:reviewId', requireAuth, removeToyRev)