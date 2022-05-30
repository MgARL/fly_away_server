const db = require('../models')
const jwt = require('json-web-token')

const { User } = db

async function authenticateUser(req,res,next){
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = await jwt.decode(process.env.JWT_SECRET, token)
        const { id } = decodedToken.value
        let user = await User.findOne({
            where: { user_id: id}
        })
        req.currentUser = user
        next()
    } catch (error) {
        res.code(403).json({
            message: 'Invalid Token please Log In again'
        })
    }
}

module.exports = authenticateUser