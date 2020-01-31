const { Router } = require('express')

const routes = Router()

routes.get('/', (req, res, next) => res.send('Hello, desafio Nodejs'))

module.exports = routes 