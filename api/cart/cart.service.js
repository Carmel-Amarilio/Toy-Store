import mongodb from 'mongodb'
const { ObjectId } = mongodb

import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import { utilService } from '../../services/util.service.js'
import { userService } from '../user/user.service.js'

export const cartService = {
    remove,
    query,
    getById,
    add,
    update,
}

function query(user) {
    return user.cart
}

function getById(user, toyId) {
    const toys = user.cart
    return toys.find(toy => toy._id === toyId)
}

async function remove(user, toyId) {
    user.cart = user.cart.filter(toy => toy._id !== toyId)
    try {
        const updateUser = await userService.update(user)
        return updateUser
    } catch (err) {
        logger.error(`cannot remove from cart `, err)
        throw err
    }
}

async function add(user, toy) {
    const toyExists = user.cart.find(toyExists => toyExists._id === toy._id)
    if (toyExists) {
        toyExists.quantity++
        return await update(user, toyExists)
    }
    else user.cart.push(toy)
    try {
        const updateUser = await userService.update(user)
        return updateUser
    } catch (err) {
        logger.error(`cannot add to cart `, err)
        throw err
    }
}

async function update(user, newToy) {
    user.cart = user.cart.map(toy => toy._id === newToy._id ? newToy : toy)
    try {
        const updateUser = await userService.update(user)
        return updateUser
    } catch (err) {
        logger.error(`cannot update toy in cart `, err)
        throw err
    }
}