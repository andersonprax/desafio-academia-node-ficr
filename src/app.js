const express = require('express')
const router = require('./routes')
const dotenv = require('dotenv')

class App {
    constructor() {
        this.express = express()
        this.middlewares()
        this.routes()
    }


    middlewares() {
        this.express.use(express.json())
        dotenv.config()
    }

    routes() {
        this.express.use(router)
    }
}

module.exports = new App().express