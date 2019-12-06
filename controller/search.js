const User = require('../model/user')

exports.getSearch = (req, res, next) =>{
    res.render('search');
}

/* //post
exports.postSearch = (req, res, next) => {
    const c_id = req.body.id;
    

    User.findById(c_id)
        .then( ([rows, fieldData]) => {
            if(rows[0] === undefined){
                res.render('404', {
                    message: 'undefined user'
                })
            } else {
                res.render('userDetail',{
                    user:rows
                })
            }
        })
        .catch( err => console.log(err) );

    
    // restapi
    User.findById(c_id)
        .then( ([rows, fieldData]) => {
            if(rows[0] === undefined){
                res.status(404).json({
                    "message": "undefined user"
                })
            } else {
                res.status(201).json({
                    user:rows
                })
            }
        })
        .catch( err => console.log(err));
}
*/