const auth = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const { User } = db

// pwword_diges = await bcrypt.hash(pw, 12)
auth.post('/sign-up', async (req,res) => {
    let  { password, ...rest } = req.body
    try {
        const user = await User.create({
            ...rest,
            user_id: await crypto.randomUUID(),
            password_digest: await bcrypt.hash(password, 12),
            createdAt: new Date(),
            updatedAt: new Date()

        })
        if(user){
            res.status(200).json({
                message: 'User Created'
            })
            return
        }
    } catch (error) {
        res.status(500).json({
            error: JSON.stringify(error),
            message: 'Something went wrong, please try again.'
        })
    }
})

auth.get('/log-in', async (req, res) =>{

})


module.exports = auth