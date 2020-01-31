const { Router } = require('express')
const axios = require('axios')

const routes = Router()

routes.get('/', (req, res, next) => res.send('Hello World Nodejs'))

routes.get('/github/user', async (req, res, next) => {
    // requisição da api publica do github utilizando axios
    try {
        const { data } = await axios.get('https://api.github.com/users/andersonprax');
        return res.send(data);
    } catch (error) {
        console.log('error', error)
        return res.send(error);
    }
})

routes.get('/github/repos', async (req, res, next) => {
    // requisição da api publica do github utilizando axios
    try {
        const { data } = await axios.get('https://api.github.com/users/andersonprax/repos');
        return res.send(data);
    } catch (error) {
        console.log('error', error)
        return res.send(error);
    }
})

module.exports = routes 