const express = require('express')
const cors = require('cors')
require('dotenv').config()

const audioRoutes = require('./routes/audio')
const promotionsRoutes = require('./routes/promotions')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/audios', audioRoutes)
app.use('/api/promotions', promotionsRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`)
})