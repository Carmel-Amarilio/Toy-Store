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

// const port = 3030
const port = process.env.PORT || 3030
app.listen(port, () => {
    logger.info(`Server listening on port http://127.0.0.1:${port}/`)
})