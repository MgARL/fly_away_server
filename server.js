// Import Dependencies
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const portNumber = process.env.PORT || 3000

// Middleware
const corsOptions = {
  origin: '*'
}
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Controllers
app.use('/admin', require('./controllers/admin_controller'))

const costumerController = require('./controllers/customer_controller')
app.use('/customers', costumerController)

app.use('/auth', require('./controllers/auth'))

// Root
app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Not Found',
  })
})
// Start server

app.listen(portNumber, () => console.log(`Listening to port ${portNumber}`))
