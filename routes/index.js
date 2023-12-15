const route = require('express').Router()

const path = require('path')

route.get('/', (req, res)=>res.sendFile(path.join(__dirname,'./../views/index.html')))
route.get('/add-dish', (req, res)=>res.sendFile(path.join(__dirname,'./../views/add.html')))
route.get('/remove-dish', (req, res)=>res.sendFile(path.join(__dirname,'./../views/remove.html')))

module.exports = route