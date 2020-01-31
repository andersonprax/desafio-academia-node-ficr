const Router = require('express')
const CurriculoController  = require('./controllers/CurriculoController')
const NotFound = require('./middlewares/NotFound')

const routes = Router()

routes.get('/curriculo', CurriculoController.curriculo)

routes.use(NotFound)

module.exports = routes