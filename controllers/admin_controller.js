const express = require('express')
const db = require('../models')
const admin = express.Router()
const { Flight, Passenger, Reservation, Seat } = db

// ALL FLIGHT ROUTES /////////////////////////////////

// GET ROUTE FOR ALL FLIGHTS
admin.get('/index', async (req, res) => {
  res.status(201).json({ message: 'Got Flights' })
})

// CREATE A SINGLE FLIGHT ROUTE
admin.post('/index', async (req, res) => {


  res.status(201).json({ message: 'New flight created' })
})

// UPDATE FLIGHT ROUTE
admin.post('/update-flight/:flightId', async (req, res) => {
  const updateFlight = await findById(req.params.id).then((flight) => {
    Seat.create(req.body)
      .then((seat) => {
        flight.seat.push(seat.id)
        flight.save()
      })
      .catch((err) => {
        res.status('error404')
      })
  })

  res
    .status(201)
    .json({ message: `Flight number ${req.params.id} was updated` })
})

// DELETE FLIGHT ROUTE
admin.delete('/index/:id', async (req, res) => {
  res
    .status(201)
    .json({ message: `Flight number ${req.params.id} was deleted` })
})

// ALL SEAT ROUTES /////////////////////////////////

// GET ROUTE FOR ALL SEATS THAT BELONG TO A PARTICULAR FLIGHT
admin.get('/seats/:id', async (req, res) => {
})

// CREATE A SEAT ROUTE
admin.post('/seats', async (req, res) => {
  res.status(201).json({ message: 'New seat created' })
})

// UPDATE SEATS ROUTE
admin.put('/seats/:id', async (req, res) => {
  res.status(201).json({ message: `Seat number ${req.params.id} was updated` })
})

admin.delete('/seats/:id', async (req, res) => {
  res.status(201).json({ message: `Seat number ${req.params.id} was deleted` })
})
module.exports = admin
