const { Router } = require('express')
const axios = require('axios')

const routes = Router()

routes.get('/', (req, res, next) => res.send('Hello World Nodejs'))

routes.get('/github', async (req, res, next) => {
    
    // extraindo dados do github
    let repos = []
    let name, bio, company
    
    try {
        const { data } = await axios.get('https://api.github.com/users/andersonprax');

        company = data.company
        name = data.name
        bio = data.bio

    } catch (error) {
        console.log('error', error)
        return res.send(error);
    }
        try {
        const { data } = await axios.get('https://api.github.com/users/andersonprax/repos');

        repos = data.map(repo => {
            let r = {
                size: repo.size,
                name: repo.name,
                url: repo.url
            }
            return r
        }).sort((a, b) => {
            if (a.size < b.size)
                return 1
            if (a.size > b.size)
                return -1
            return 0;
        }).slice(0, 3)
    } catch (error) {
        console.log('error', error)
        return res.send(error);
    }
})

module.exports = routes 