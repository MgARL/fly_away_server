const express = require('express')
const crypto = require('crypto')
const db = require('../models')
const admin = express.Router()

const { User, Airline, Flight, Reservation, Seat } = db 

admin.post('/add-airline', async (req, res) => {
  const { airline_name } = req.body

  try {
    const airline = await Airline.create({
      airline_id: crypto.randomUUID(),
      airline_name
    })
    res.status(200).json({
      message: `Airline ${airline.airline_name} created`
    })
  } catch (error) {
    res.status(500).json({
      error: JSON.stringify(error),
      message: 'Something Went Wrong!'
    })
  }

})

admin.post('/add-flight', async (req,res) => {
  try {
    const flight = await Flight.create({
      flight_id: crypto.randomUUID(),
      ...req.body
    })
    res.status(200).json({
      message: `Flight from ${flight.departure} to ${flight.destination} created`
    })
  } catch (error) {
    res.status(500).json({
      error: JSON.stringify(error),
      message: 'Something Went Wrong!'
    })
  }
})

admin.post('/add-seats', async (req, res) =>{
   const { all_seats } = req.body
  //  console.log(all_seats)
   seats_with_id = []
   if (all_seats){
      all_seats.map(seat => {
       seat.seat_id = crypto.randomUUID()
       seats_with_id.push(seat)
      })
   }
  try {
    const seats = await Seat.bulkCreate(seats_with_id, { validate: true })
   res.status(200).json({
     messages: `${seats.length} seats created.`
   })
  } catch (error) {
    res.status(500).json({
      error: JSON.stringify(error),
      message: 'Something Went Wrong!'
    })
  }
})

module.exports = admin
