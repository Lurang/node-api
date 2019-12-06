const user = require('../model/user')

exports.getDe = (req, res) => {
    res.render('api-test.html');
}

exports.getUser = (req, res) => {
    user.fetchAll()
        .then(([rows,fields]) => {
            res.status(200).json({
                posts: rows
            });
        })
}

exports.addUser = (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const password = req.body.password;
    const n_user = new user(id, name, password);
    n_user.save()
        .then(() => {
                res.status(201).json({
                    "message": "user-add success",
                    "info": [{
                        "id": n_user.id,
                        "name": n_user.name
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
    const n_user = new user(id, name);
    n_user.updateById()
        .then(
            res.status(200).json({
                "message": "update success"
            })
        )
        .catch(err => console.log(err))
}

exports.deleteUser = (req, res) => {
    const id = req.body.c_id;
    const n_user = new user(id);
    n_user.deleteById()
        .then(
            res.status(200).json({
                "message": "update success"
            })
        )
        .catch(err => console.log(err))
}

exports.loginUser = (req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    user.login(id)
        .then(([rows]) => {
            user.verifyPassword(rows[0].password, password) 
                .then((result) => {
                    if(result === true) {
                        res.status(200).json({
                            "message": "loginSuccess",
                            "id" : id
                        })
                    } else {
                        res.status(200).json({
                            "message": "loginFail"
                        })
                    }
                    
                })
        })
}