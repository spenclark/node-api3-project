const express = require('express')
const helmet = require('helmet')

const logger = require(`./middleware/logger`);

const userRouter = require('../users/userRouter')

const server = express()

// middleware
server.use(helmet())
server.use(logger)

server.use(`/api/users`, userRouter);

server.get('/', (req, res) => res.send('<h1> API </h1>'))

module.exports = server