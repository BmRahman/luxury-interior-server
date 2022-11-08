const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('luxury interior server running')
})

app.listen(port, (req, res) => {
    console.log(`luxury interior server running on port ${port}`)
})