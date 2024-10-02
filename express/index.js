const express = require('express')
const app = express()
const port =  3000
const hostname = '127.0.0.1'

app.get('/', (req, res) => {
    res.send('Strona glowna')
})



app.listen(3000, () => {
    console.log('Strona http://localhost:3000')
})