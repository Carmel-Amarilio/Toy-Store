import http from 'http'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { toyStoreService } from './services/toy-store.service.js'

import { logger } from './services/logger.service.js';
import { toyRoutes } from './api/toy/toy.routes.js';
import { authRoutes } from './api/auth/auth.routes.js';
import { cartRoutes } from './api/cart/cart.routes.js';
import { setupSocketAPI } from './services/socket.service.js';


const app = express()
const server = http.createServer(app)

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



app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json()) // for req.body
app.use(express.static('public'))


// routes
app.use('/api/toy', toyRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/cart', cartRoutes)
setupSocketAPI(server)

// const port = 3030
const port = process.env.PORT || 3030
server.listen(port, () => {
    logger.info(`Server listening on port http://127.0.0.1:${port}/`)
})