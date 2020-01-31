const axios = require('axios')
const Curriculo = require('../models/CurriculoModel')
const fs = require('fs')

class CurriculoController {
    async github(req, res, next) {

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
            const { data } = await axios.get(`https://api.github.com/users/${process.env.GITHUB_USER}/repos`)

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
                return 0
            }).slice(0, 3)
        } catch (error) {
            console.log('error', error)
            return res.send(error)
        }

        const githubProfile = {
            name,
            html_url,
            bio,
            company,
            repositories: repos
        }

        res.send(githubProfile)
    }

    async facebook(req, res, next) {
        const FACEBOOK_URL = `https://graph.facebook.com/v5.0/me?fields=picture%2Cfirst_name%2Clast_name%2Caddress%2Cgender%2Cbirthday%2Cemail%2Clocation&access_token=${process.env.FACEBOOK_TOKEN}`

        let first_name, birthday, last_name, gender, email, location, picture

        try {
            const { data } = await axios.get(FACEBOOK_URL)

            first_name = data.first_name
            birthday = data.birthday
            last_name = data.last_name
            gender = data.gender
            email = data.email
            location = data.location
            picture = data.picture.data.url

            const facebookProfile = {
                first_name,
                birthday,
                last_name,
                gender,
                email,
                location,
                picture
            }

            res.send(facebookProfile)
        } catch (error) {
            console.log('error', error)
            return res.send(error)
        }
    }

    async text(req, res, next) {

        let path = req.params.path

        let dataPath = 'curriculo.json'

        fs.readFile(dataPath, 'utf8', (error, data) => {
            if (error) throw error
            res.send(data)
        })
    }
}

module.exports = new CurriculoController()