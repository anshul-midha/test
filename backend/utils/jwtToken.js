const jwt = require('jsonwebtoken');
const jsonPrivateKey = process.env.JWT_SECRET;


exports.jwtToken = function (body) {
    return new Promise(function (resolve, reject) {
        jwt.sign(body, jsonPrivateKey, { expiresIn: process.env.JWT_EXPIRES_IN }, function (err, token) {
            console.log(err);
            if (err) reject('invalid token');
            else resolve(token);
        });
    })
}

exports.verifyjwtToken = function (body) {
    return new Promise(function (resolve, reject) {
        jwt.verify(body, jsonPrivateKey, function (err, decoded) {
            if (err) {
                reject('invalid token')
            } else {
                //console.log("decodedddd",decoded);
                //check user is active or not
                if (decoded.is_admin) {
                    const queryText = `select isactive from tbl_admin_login where id=$1`;
                    query(queryText, [decoded.user_id]).then((result) => {
                        if (result.rows[0].isactive) {
                            resolve(decoded)
                        }
                        else {
                            reject('user is not active')
                        }

                    });
                }
                else {
                    resolve(decoded)
                }

            };
        });
    })
}

exports.jwtTokenForRegiserLink = function (body) {
    return new Promise(function (resolve, reject) {
        jwt.sign(body, jsonPrivateKey, { expiresIn: '1d'}, function (err, token) {
            console.log(err);
            if (err) reject('invalid token');
            else resolve(token);
        });
    })
}

