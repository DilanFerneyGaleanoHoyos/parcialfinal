const express = require('express')
const app = express()
const PORT = 3001
const path = require('path')

//MiddleWare
app.use(express.json())
app.use(express.static(path.join(__dirname,'./public')))

//enrutamiento 
app.use('/', require('./routes/index'))


app.listen(PORT, ()=>{ console.log(`Listean at the port ${PORT}`)})