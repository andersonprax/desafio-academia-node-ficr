const { Router } = require('express')
const axios = require('axios')

const routes = Router()

routes.get('/', (req, res, next) => res.send('Hello World Nodejs'))

routes.get('/github', async (req, res, next) => {
    
    // extraindo dados do github
    let repos = []
    let name, bio, company, html_url
    
    try {
        const { data } = await axios.get(`https://api.github.com/users/${process.env.GITHUB_USER}`);
        company = data.company
        name = data.name
        bio = data.bio
        html_url = data.html_url
    } catch (error) {
        console.log('error', error)
        return res.send(error);
    }
    try {
        const { data } = await axios.get(`https://api.github.com/users/${process.env.GITHUB_USER}/repos`);

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

    const githubProfile = {
        name,
        html_url,
        bio,
        company,
        repositories: repos
    }

    res.send(githubProfile)
})

routes.get('/facebook', async (req, res, next) => {
    const FACEBOOK_URL = `https://graph.facebook.com/v5.0/me?fields=id%2Cname%2Cgender%2Cbirthday%2Cemail%2Cpicture&access_token=${process.env.FACEBOOK_TOKEN}`
    try {
        const { data } = await axios.get(FACEBOOK_URL)
        res.send(data)
    } catch (error) {
        console.log('error', error)
        return res.send(error)
    }
})

module.exports = routes 