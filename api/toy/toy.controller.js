import { logger } from "../../services/logger.service.js"
import { socketService } from "../../services/socket.service.js"
import { toyService } from "./toy.service.js"

export async function getToys(req, res) {
    try {
        const filterBy = {
            txt: req.query.txt || '',
            labels: req.query.labels,
        }
        logger.debug('Getting Toys', filterBy)
        const toys = await toyService.query(filterBy)
        res.json(toys)
    } catch (err) {
        logger.error('Failed to get toys', err)
        res.status(500).send({ err: 'Failed to get toys' })
    }
}

export async function getToyById(req, res) {
    
    try {
        const toyId = req.params.id
        const toy = await toyService.getById(toyId)
        
        res.json(toy)
    } catch (err) {
        logger.error('Failed to get toy', err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
}

export async function addToy(req, res) {
    const { loggedinUser } = req
    try {
        const toy = req.body
        const addedToy = await toyService.add(toy)
        socketService.broadcast({ type: 'toy-added', data: toy, userId: loggedinUser._id })
        res.json(addedToy)
    } catch (err) {
        logger.error('Failed to add toy', err)
        res.status(500).send({ err: 'Failed to add toy' })
    }
}

export async function updateToy(req, res) {
    try {
        const toy = req.body
        const updatedToy = await toyService.update(toy)
        res.json(updatedToy)
    } catch (err) {
        logger.error('Failed to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })
    }
}

export async function removeToy(req, res) {
    const { loggedinUser } = req
    try {
        const toyId = req.params.id
        await toyService.remove(toyId)
        socketService.broadcast({ type: 'toy-remove', data: toyId, userId: loggedinUser._id })
        res.send()
    } catch (err) {
        logger.error('Failed to remove toy', err)
        res.status(500).send({ err: 'Failed to remove toy' })
    }
}

export async function addToyRev(req, res) {
    const { loggedinUser } = req
    try {
        const toyId = req.params.id
        const { txt, at, rating } = req.body
        console.log(req.body);
        const review = {
            txt,
            rating,
            at,
            by: loggedinUser,
        }
        const savedReview = await toyService.addToyRev(toyId, review)
        res.json(savedReview)
    } catch (err) {
        logger.error('Failed to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })
    }
}

export async function removeToyRev(req, res) {
    try {
        const toyId = req.params.id
        const { reviewId } = req.params

        const removedId = await toyService.removeToyReview(toyId, reviewId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove toy msg', err)
        res.status(500).send({ err: 'Failed to remove toy review' })
    }
}