# Fly Away App

## Description
This application simulates a flight booking app, where users can create accounts and simulate the booking of a flight.

***
### Routes
- Costumer Controller "/costumer"
    - Search 
        - GET Request
    - Book Flight
        - POST Request
    - Cancel
        - DELETE(Reservation) and PUT(Seat) Request
    - Update User info
        - PUT Request
    - Update Seat
        - PUT Request
- Admin Controller
    - Create Airlines
        - POST request
    - Create Flights
        - POST Request
    - Create Seats
        - POST Request
    - Delete Flights/Seats/Airlines
        - DELETE Requests
    
- middleware
    - Role Authorization
    - Only Admin can create Admin users

### Models
-  Users
    - pk user_id UUID 
    - name string
    - last_name string
    - email string
    - pwd string
    - address string
    - city 
    - state
- Reservation
    - pk reservation_id UUID
    - fk user_id UUID
    - fk flight_id UUID
    - fk seat_id UUID
 - Airlines 
    - pk airline_id UUID
    - airline_name string
- Flights
    - pk flight_id UUID
    - fk airline_id
    - dep string
    - des string
    - dep_time time
    - des_time time
    - dep_date dateonly
    - des_date dateonly
    - flight_price integer
- Seats
    - pk seat_id UUID 
    - fk flight_id UUID
    - seat_number string
    - seat_available boolean
    - seat_type enum
    - seat_upcharge integer


### Technologies
 - NodeJS
 - Express
 - PostgreSQL | Sequelize ORM
 - Middle
    - Cors
    - JWT
    - Bcrypt