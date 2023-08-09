var User = require('../models/user');

/**user login */

exports.userLogin = async (req, res, next) => {
    User.findOne({email:req.body.email},function(err,data){
		if(data){
			if(data.password==req.body.password){
				res.send({"message":"Success!"});
			}else{
				res.send({"message":"Wrong password!"});
			}
		}else{
			res.send({"message":"This Email Is not regestered!"});
		}
	});
};

/** user signup */
exports.userSignup = async (req, res, next) => {
    try {
    console.log(req.body);
	var personInfo = req.body;
	if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf){
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {
			User.findOne({email:personInfo.email},function(err,data) {
				if(!data) {
						var newPerson = new User({
							email:personInfo.email,
							username: personInfo.username,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

				} else {
					res.send({"message":"Email is already used."});
				}
				});
			} else {
				res.send({"message":"password is not matched"});
			}
		}
    } catch (err) {
        console.log(err)
        res.status(200).json({
            "status": false,
            "error": "error",
            "message": "Please try again and contact support if the problem persists",
        });
    }
}


