//Router for authentification
const express = require('express');
const router = express.Router();

const formData = require('express-form-data');

const {passport} = require('../passport/index');

router.post('/', 

    function(req, res, next) {
        
        if (req.body.password && req.body.email) {

            passport.authenticate('local', function(err, user, info) {
                if (err) { 
                    return res.status(500).json({
                        error: info,
                        status:"error"
                    });
                }
                if (!user) { 
                    return res.status(400).json({
                        error: "Неверный логин или пароль",
                        status:"error"
                    });
                }
                req.logIn(user, function(err) {                
                    if (err) {
                        return next(err); 
                    }
                    return res.status(200).json({
                        data: getUserData(user),
                        status: "Ok"
                    }); 
                });
            })(req, res, next);  

        } else {
            res.status(400).json({
                error: "Неверный логин или пароль",
                status:"error"
            });
        }
    }    
);

//Added for testing only
router.get('/me',
    function (req, res) {
        if (req.user) {
            res.status(200).json(getUserData(req.user));                
        } else {
            res.status(200).json({
                reply: 'No user logged in',
                status: "error"
            });
        }
    }
);

//Added for testing only
router.get('/logout',
    function (req, res) {
        if (req.user) {
            req.logout();
            res.status(200).json({
                reply: "Logged out",
                status: "Ok"
            });               
        } else {
            res.status(400).json({
                reply: "No user logged in",
                status: "Bad request"
            });
        }
    }
);

function getUserData(user) {
    const {_id, email, name, contactPhone} = user;
    return {
        _id,
        email,
        name,
        contactPhone: (contactPhone === undefined)? "not defined": contactPhone,
    }
}

module.exports = router;

