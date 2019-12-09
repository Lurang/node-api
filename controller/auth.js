const jwt = require('jsonwebtoken');

const user = require('../model/user')

exports.login = (req, res) => {
    const {c_id, password} = req.body;
    const secret = req.app.get('jwt-secret');

    const check = (user) => {
        if(!user) {
            throw new Error('login failed');
        } else {
            if(user.verify(password)) {
                const p = new Promise((res, rej) => {
                    jwt.sign(
                        {
                            _id: user.id,
                        },
                        secret,
                        {
                            expiresIn: '7d',
                            issuer: 'velopert.com',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if(err) rej(err)
                            res(token)
                        }
                    )
                })
                return p
            } else {
                throw new Error('login failed');
            }
        }
    }

    const respond = ((token) => {
        res.json({
            message: 'logged in successfully',
            token
        })
    })

    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }

    user.login(c_id)
        .then(check)
        .then(respond)
        .then(onError)
}