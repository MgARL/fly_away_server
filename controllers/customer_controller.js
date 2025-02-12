const customer = require('express').Router()
const db = require('../models')

const { Flight, Passenger, Reservation, Seat } = db

// Search Flights GET
customer.get('/search', async (req, res) => {
  try {
    const { departure, destination, departureDate, numberOfSeats } = req.query

    const flights = await Flight.findOne({
      departure,
      destination,
      departureDate,
    })
      .where('totalSeats')
      .gte(numberOfSeats)

    if (flights.length > 0) {
      res.status(200).json({
        message: 'Flights Found',
        flights: flights,
      })
    } else {
      res.status(404).json({
        message: 'No Flights Found',
      })
    }
  } catch (error) {
    res.status(500).json({
      message: `wow hey there ${error}`,
    })
  }
})

// Book Flights POST
customer.post('/book', async (req, res) => {
  const { firstName, lastName, age, address, city, state, reservationNumber } =
    req.body
  const { flightNumberId, seatNumberId, passengerId } = req.body
  try {
    const passengerInfo = await Passenger.create({
      firstName,
      lastName,
      age,
      address,
      city,
      state,
      reservationNumber,
    })

    const reservation = await Reservation.create({
      flightNumberId,
      seatNumberId,
      passengerId: passengerInfo._id.toString(),
    })

    res.status(200).json({ passengerInfo, reservation })
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

// Update Records and flights all affect reservation Model
// reservation info GET req.
customer.get('/reservations/:reservationId', async (req, res) => {
  const checkForReservation = await Reservation.findById(
    req.params.reservationId
  )

  if (!checkForReservation) {
    return res
      .status(400)
      .json({ Message: `Reservation ${req.params.reservationId} Not Found` })
  }
  try {
    const reservation = await Reservation.findById(
      req.params.reservationId
    ).populate([
      { path: 'passengerId', model: 'Passenger' },
      { path: 'flightNumberId', model: 'Flight' },
      { path: 'seatNumberId', model: 'Seat' },
    ])

    res.status(201).json(reservation)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

// Get all available seats
customer.get('/search/flight/available-seats/:flightId', async (req, res) => {
  //   const { flightId } = req.body
  //   console.log(flightId)
  try {
    const flight = await Flight.findById(req.params.flightId).populate([
      { path: 'seats', model: 'Seat' },
    ])
    res.status(200).json(flight)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

// Handles passenger information update
customer.put('/update-passenger/:id', async (req, res) => {
  const passenger = await Passenger.findById(req.params.id)
  if (!passenger) {
    res.status(400)
    throw new Error('Passenger not found')
  }

  try {
    const updateCustomerInfo = await Passenger.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
    res.status(200).json(updateCustomerInfo)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

// Handles seat information update
customer.put('/update-seat', async (req, res) => {
  try {
    console.log('PUT request on update-flight')

    const { reservationId, seatId, newSeatId } = req.body
    // get and Update current Seat
    const currentSeat = await Seat.findById(seatId)
    currentSeat.available = true
    await currentSeat.save()

    // // get and update new seat
    const newSeat = await Seat.findById(newSeatId)
    newSeat.available = false
    await newSeat.save()

    // get reservation and update
    const reservation = await Reservation.findById(reservationId)
    reservation.seatNumberId = newSeatId
    await reservation.save()

    // ,{"flightNumberId": newFlightId, "seatNumber": newSeatId}

    console.log('PUT Completed')

    res.status(200).json({
      message: 'Flight updated',
      updatedReservation: reservation,
    })
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

// Handles **OLD** seat information update
customer.put('/update-old-seat', async (req, res) => {
  try {
    const seatStatus = await Seat.findByIdAndUpdate(
      req.body.oldSeatId,
      req.body,
      {
        new: true,
      }
    )
    //   const newSeat = await Seat.findByIdAndUpdate(req.params.newSeatId)

    res.status(200).json(seatStatus)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})

// Cancel Flights DELETE(reservation)
customer.delete(
  '/reservations/cancellation/:reservationId/:passengerId',
  async (req, res) => {
    const reservation = await Reservation.findById(req.params.reservationId)
    const passenger = await Passenger.findById(req.params.passengerId)
    if (!reservation) {
      return res.status(400).json('Reservation not found')
    }
    if (!passenger) {
      return res.status(400).json('Passenger not found')
    }
    try {
      await reservation.deleteOne()
      await passenger.deleteOne()
      res.status(200).json(`Reservation ${reservation._id.toString()} Deleted`)
    } catch (error) {
      res.status(500).json({
        message: 'Reservation Not Deleted',
      })
    }
  }
)

// REMOVE AFTER TESTING !!!!!!!!!!!
customer.get('/search/seats', async (req, res) => {
  try {
    const seat = await Seat.find()
    res.status(200).json(seat)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})
// REMOVE AFTER TESTING !!!!!!!!!!!
customer.get('/search/seats/:id', async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id)
    res.status(200).json(seat)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
})
module.exports = customer
