const User = require('../model/user')

exports.getPa = (req, res, next) => {
    res.render('test');

    /*
    User.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('test',{
                user: rows
            })
        })
        .catch( err => console.log(err))
*/

     //restapi
     /*
    User.fetchAll()
        .then(([rows,fields]) => {
            //js.memeber.push({"id": element.c_id, "name": element.c_name})
            res.status(200).json({
                posts: rows
            });
            //res.render('test');
        })
    
    */
};


//search
exports.getSe = (req, res, next) =>{
    const c_id = req.params.id;
    // save는 new User해서 user로해야하는데
    // fetchAll은 User로 바로해야함
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
        .catch( err => console.log(err));

    

     
    /* //restapi
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
    */
};
