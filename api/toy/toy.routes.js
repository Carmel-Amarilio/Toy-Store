import express from 'express'
// import { requireAuth, requireAdmin } from '../../middlewares/requireAuth.middleware.js'
import { addToy, getToyById, getToys, removeToy, updateToy } from './toy.controller.js'

export const toyRoutes = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)
toyRoutes.get('/',  getToys)
toyRoutes.get('/:id', getToyById)
toyRoutes.post('/', addToy)
toyRoutes.put('/:id', updateToy)
toyRoutes.delete('/:id', removeToy)

// // router.delete('/:id', requireAuth, requireAdmin, removeToy)

// toyRoutes.post('/:id/msg', requireAuth, addToyMsg)
// toyRoutes.delete('/:id/msg/:msgId', requireAuth, removeToyMsg)