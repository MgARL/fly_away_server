const auth = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('json-web-token')

const { User } = db

// password_digest = await bcrypt.hash(pw, 12)
auth.post('/sign-up', async (req,res) => {
    let  { password, ...rest } = req.body
    try {
        const user = await User.create({
            ...rest,
            user_id: crypto.randomUUID(),
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

auth.post('/log-in', async (req, res) =>{
    let user = await User.findOne({
        where: {email: req.body.email}
    })

    if (!user || !await bcrypt.compare(req.body.password, user.password_digest)){
        res.status(404).json({
            message: "Not user found with provided credentials"
        })
    }else{
        const result = await jwt.encode(process.env.JWT_SECRET, {id: user.user_id})
        console.log(user.user_id)
        res.status(200).json({
            token: result.value
        })
    }
})


module.exports = auth