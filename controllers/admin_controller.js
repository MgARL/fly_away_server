const express = require('express')
const db = require('../models')
const admin = express.Router()

const { User, Airline, Flight, Reservation, Seat } = db 

// Add Routes
admin.post('/add-airline', async (req, res) => {
  const { airline_name } = req.body

  try {
    const airline = await Airline.create({
      airline_name
    })
    res.status(200).json({
      message: `Airline ${airline.airline_name} created`
    })
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Something Went Wrong!'
    })
  }

})

admin.post('/add-flight', async (req,res) => {
  try {
    const flight = await Flight.create({
      ...req.body
    })
    res.status(200).json({
      message: `Flight from ${flight.departure} to ${flight.destination} created`
    })
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Something Went Wrong!'
    })
  }
})

admin.post('/add-seats', async (req, res) =>{
   const { all_seats } = req.body
  try {
    const seats = await Seat.bulkCreate(all_seats, { validate: true })
   res.status(200).json({
     messages: `${seats.length} seats created.`
   })
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Something Went Wrong!'
    })
  }
})

// Delete Routes
admin.delete('/remove-user', async (req, res) => {
  const { user_id } = req.body
  try {
    await User.destroy({
      where: {
        user_id
      }
    })
    res.status(200).json({
      message: 'Successfully Deleted'
    })
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Something Went Wrong!'
    })
  }
})

admin.delete('/remove-user-reservations', async (req, res) => {
  const { user_id } = req.body
  try {
    await Reservation.destroy({
      where: {
        user_id
      }  
    })
    res.status(200).json({
      message: 'Successfully Deleted'
    })
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Something Went Wrong!'
    })
  }
})

admin.delete('/remove-flight', async (req,res) =>{
  const { flight_id } = req.body
  try {
    await Flight.destroy({
      where: {
        flight_id
      } 
    })
    res.status(200).json({
      message: 'Successfully Deleted'
    })
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Something Went Wrong!'
    })
  }
})

admin.delete('/remove-flight-seats', async (req,res) =>{
  const { flight_id } = req.body
  try {
    await Seat.destroy({
      where:{
        flight_id
      }
    })
    res.status(200).json({
      message: 'Successfully Deleted'
    })
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Something Went Wrong!'
    })
  }
})

admin.delete('/remove-airline', async (req,res) =>{
  const { airline_id } = req.body
  try {
    await Airline.destroy({
      where: {
        airline_id
      }
    })
    res.status(200).json({
      message: 'Successfully Deleted'
    })
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Something Went Wrong!'
    })
  }
})

admin.delete('/remove-airline-flights', async (req,res) =>{
  const { airline_id } = req.body
  try {
    await Flight.destroy({
      where: {
        airline_id
      }
    })
    res.status(200).json({
      message: 'Successfully Deleted'
    })
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Something Went Wrong!'
    })
  }
})


module.exports = admin
