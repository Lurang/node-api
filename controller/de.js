const User = require('../model/user')

exports.getDe = (req,res,next) =>{
    res.render('index')
}

/* //post
exports.postDe = (req,res,next) =>{
    const c_id = req.body.c_id;
    const c_name = req.body.c_name;
    
    const user = new User(c_id,c_name);

    user.save()
        .then(res.status(302).redirect('/feed'))
        .catch(err=>console.log(err));
 
    //restapi
    //user.save()
    //    .then(
    //        res.status(201).json({
    //            "message" : "user-add success",
    //            "info" : [{
    //                "id" : user.id,
    //                "name": user.name
    //            }]
    //        })
    //    )
    //    .catch(err=>console.log(err));
    
}
*/