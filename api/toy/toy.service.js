import mongodb from 'mongodb'
const { ObjectId } = mongodb

import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import { utilService } from '../../services/util.service.js'


export const toyService = {
    remove,
    query,
    getById,
    add,
    update,
    addToyRev,
    removeToyReview
}

async function query({ txt, labels }) {
    try {
        const criteria = {
            name: { $regex: txt, $options: 'i' },
        }
        if (labels) criteria.labels = { $all: labels }
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria).toArray()
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ _id: ObjectId(toyId) })
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

async function update({ name, price, _id, inStock, labels, reviews }) {
    try {
        const toyToSave = { name, price, inStock, labels, reviews }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(_id) }, { $set: toyToSave })
        return toyToSave
    } catch (err) {
        logger.error(`cannot update toy ${_id}`, err)
        throw err
    }
}

async function addToyRev(toyId, review) {
    try {
        review.id = utilService.makeId()
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $push: { reviews: review } })
        return review
    } catch (err) {
        logger.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}

async function removeToyReview(toyId, reviewId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $pull: { reviews: {id: reviewId} } })
        return reviewId
    } catch (err) {
        logger.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}