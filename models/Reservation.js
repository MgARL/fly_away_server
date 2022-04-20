const mongoose = require('mongoose')
const reservationSchema = new mongoose.Schema({
  flightNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true,
  },
  seatNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seat',
    required: true,
  },
  passenger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Passenger',
    required: true,
  },
})

const ID = mongoose.Schema.Types.ObjectId

const Reservation = mongoose.model('Reservation', reservationSchema)
module.exports = Reservation