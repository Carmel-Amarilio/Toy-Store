import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { addToyToCart, getToyById, getToysInCart, removeToyFromCart, updateToyInCart } from './cart.controller.js'

export const cartRoutes = express.Router()

cartRoutes.get('/', requireAuth, getToysInCart)
cartRoutes.get('/:id', requireAuth, getToyById)
cartRoutes.post('/', requireAuth, addToyToCart)
cartRoutes.put('/', requireAuth, updateToyInCart)
cartRoutes.delete('/:id', requireAuth, removeToyFromCart)