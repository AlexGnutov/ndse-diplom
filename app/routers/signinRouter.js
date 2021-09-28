//Router for authentification
const express = require('express');
const router = express.Router();

const formData = require('express-form-data');

const {passport} = require('../passport/index');

router.post('/', 
    formData.parse(),
    function(req, res, next) {

        if (req.body.password && req.body.email) {
            passport.authenticate('local', function(err, user, info) {
            if (err) { 
                return res.status(400).json({
                    "error": info,
                    "status":"error"
                });
            }
            if (!user) { 
                return res.status(401).json({
                    "error": "Неверный логин или пароль",
                    "status":"error"
                });
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                    const {_id, email, name, contactPhone} = user;
                    return res.status(200).json({
                        "data": {
                            "id": _id,
                            "email": email,
                            "name": name,
                            "contactPhone": ((contactPhone === undefined)? "не указан": contactPhone)
                        },
                        "status": "ok"
                    });
                 });
            })(req, res, next);  

        } else {
            res.status(200).json({
                "error": "Неверный логин или пароль",
                "status":"error"
            });
        }
    }    
);

router.get('/me',
    function (req, res) {
        if (req.user) {
            res.status(200).json(req.user);
        } else {
            res.status(200).json('No user signedin');
        }
    }
);

router.get('/logout',
    function (req, res) {
        req.logout();
        res.status(200).json('Successfully logged out!');
    }
);

module.exports = router;

