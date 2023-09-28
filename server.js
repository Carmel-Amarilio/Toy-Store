import express from 'express'
import cors from 'cors'
import { toyStoreService } from './services/toy-store.service.js'

import { logger } from './services/logger.service.js';
import { toyRoutes } from './api/toy/toy.routes.js';

const app = express()


const corsOptions = {
    origin: [
        'http://127.0.0.1:8080',
        'http://localhost:8080',
        'http://127.0.0.1:5173',
        'http://localhost:5173',
        'http://127.0.0.1:5174',
        'http://localhost:5174',
    ],
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json()) // for req.body
app.use(express.static('public'))

// routes
app.use('/api/toy', toyRoutes)

// // List
// app.get('/api/toy', (req, res) => {
//     const filterBy= req.query
//     console.log(filterBy);
//     toyStoreService.query(filterBy)
//         .then(toys => {
//             res.send(toys)
//         })
//         .catch(err => {
//             logger.error('Cannot load toys', err)
//             res.status(400).send('Cannot load toys')
//         })
// })

// app.post('/api/toy', (req, res) => {

//     const { name, price, labels, _id, createdAt, inStock } = req.body

//     const toy = {
//         name,
//         price: +price,
//         labels,
//         createdAt,
//         inStock,
//     }
//     console.log(toy);
//     toyStoreService.save(toy)
//         .then(savedToy => {
//             res.send(savedToy)
//         })
//         .catch(err => {
//             logger.error('Cannot add toy', err)
//             res.status(400).send('Cannot add toy')
//         })
// })

// // Edit
// app.put('/api/toy', (req, res) => {

//     const { name, price, _id, inStock, labels } = req.body
//     const toy = {
//         _id,
//         name,
//         price: +price,
//         inStock,
//         labels
//     }
//     toyStoreService.save(toy)
//         .then((savedToy) => {
//             res.send(savedToy)
//         })
//         .catch(err => {
//             logger.error('Cannot update toy', err)
//             res.status(400).send('Cannot update toy')
//         })

// })

// // Read - getById
// app.get('/api/toy/:toyId', (req, res) => {
//     const { toyId } = req.params
//     toyStoreService.get(toyId)
//         .then(toy => {
//             res.send(toy)
//         })
//         .catch(err => {
//             logger.error('Cannot get toy', err)
//             res.status(400).send(err)
//         })
// })

// // Remove
// app.delete('/api/toy/:toyId', (req, res) => {

//     const { toyId } = req.params
//     toyStoreService.remove(toyId)
//         .then(msg => {
//             res.send({ msg, toyId })
//         })
//         .catch(err => {
//             logger.error('Cannot delete toy', err)
//             res.status(400).send('Cannot delete toy, ' + err)
//         })
// })


// const port = 3030
const port = process.env.PORT || 3030
app.listen(port, () => {
    logger.info(`Server listening on port http://127.0.0.1:${port}/`)
})