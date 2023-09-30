import { logger } from "../../services/logger.service.js"
import { authService } from "../auth/auth.service.js";
import { cartService } from "./cart.service.js"

export async function getToysInCart(req, res) {
    const { loggedinUser } = req
    try {
        const toys = await cartService.query(loggedinUser)
        res.json(toys)
    } catch (err) {
        logger.error('Failed to get toys', err)
        res.status(500).send({ err: 'Failed to get toys' })
    }
}

export async function getToyById(req, res) {
    const { loggedinUser } = req
    try {
        const toyId = req.params.id
        const toy = await cartService.getById(loggedinUser, toyId)
        res.json(toy)
    } catch (err) {
        logger.error('Failed to get toy', err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
}

export async function addToyToCart(req, res) {
    const { loggedinUser } = req
    try {
        const toy = req.body
        const user = await cartService.add(loggedinUser, toy)
        const loginToken = authService.getLoginToken(user)
        res.cookie('loginToken', loginToken)
        res.json(toy)
    } catch (err) {
        logger.error('Failed to add toy', err)
        res.status(500).send({ err: 'Failed to add toy' })
    }
}

export async function updateToyInCart(req, res) {
    const { loggedinUser } = req
    try {
        const toy = req.body
        const user = await cartService.update(loggedinUser, toy)
        const loginToken = authService.getLoginToken(user)
        res.cookie('loginToken', loginToken)
        res.json(toy)
    } catch (err) {
        logger.error('Failed to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })
    }
}

export async function removeToyFromCart(req, res) {
    const { loggedinUser } = req
    try {
        const toyId = req.params.id
        const user = await cartService.remove(loggedinUser, toyId)
        const loginToken = authService.getLoginToken(user)
        res.cookie('loginToken', loginToken)
        res.json(toyId)
    } catch (err) {
        logger.error('Failed to remove toy', err)
        res.status(500).send({ err: 'Failed to remove toy' })
    }
}
