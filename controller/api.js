const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const user = require('../model/user')

exports.getDe = (req, res) => {
    res.render('api-test.html');
}

exports.getUser = (req, res) => {
    if(req.session.count){
        req.session.count++;
        console.log(req.session.count)
    } else {

    console.log('session Id => ' + req.session.id);
    console.log('session user => ' + req.session.user);
    if(req.session.user) {
        console.log('yy user from getUser => ' + req.session.user);
    }
    
    user.fetchAll()
        .then(([rows,fields]) => {
            res.status(200).json({
                posts: rows
            });
        })
    }
}

exports.addUser = (req, res) => {
    const { id, name, password } = req.body;
    const newUser = new user(id, name, password);
    newUser.save()
        .then(() => {
                res.status(201).json({
                    "message": "user-add success",
                    "info": [{
                        "id": newUser.id,
                        "name": newUser.name
                    }]
                })
            })
        .catch(err => console.log(err));    
}

exports.postSearch = (req, res) => {
    const c_id = req.params.id;
    user.findById(c_id)
        .then(([rows]) => {
            if(rows[0] === undefined){
                res.status(200).json({
                    "message": "undefined user"
                })
            } else {
                res.status(201).json({
                    user: rows
                })
            }
        })
        .catch(err => console.log(err));
}

exports.updateUser = (req, res) => {
    const id = req.body.c_id;
    const name = req.body.c_name;
    const newUser = new user(id, name);
    newUser.updateById()
        .then(
            res.status(200).json({
                "message": "update success"
            })
        )
        .catch(err => console.log(err))
}

exports.deleteUser = (req, res) => {
    const id = req.body.c_id;
    const newUser = new user(id);
    newUser.deleteById()
        .then(
            res.status(200).json({
                "message": "update success"
            })
        )
        .catch(err => console.log(err))
}

exports.loginUser = (req, res) => {
    const { id, password } = req.body;
    user.login(id)
        .then(([rows]) => {
            if(rows[0]){
                user.verifyPassword(rows[0].password, password) 
                .then((result) => {
                    if(result === true) {
                        //session create
                        let admin = false;
                        if(id === '1') admin = true;
                        req.session.user = {
                            "id": id,
                            "isValid": true,
                            "admin": admin
                        }
                        req.session.count = 1;
                        //console.log
                        console.log('se => ', req.session)
                        console.log('id from logUser => ' + req.session.id);
                        console.log('id from logUser2 => ' + req.session.cookie);
                        console.log('session from brw => s%3ALPNkypFnv0AUXe92DU5HEASLi_ovEER-.0XMUj8tKI%2B%2Fz%2FmXw98YGmljtESL5Vw4CFkZZw4p%2F5Ww')
                        req.session.save(() => { 
                            console.log('saved => '+req.session.id) 
                            //res.redirect('/api/getUser')
                            res.json(req.session.user)
                        })
                    } else {
                        res.status(200).json({
                            "message": "loginFail"
                        })
                    }
                    
                })
            } else {
                console.log('error');
            }            
        })

    /*
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
    */
}