//Router for registration
const express = require('express');
const router = express.Router();

const formData = require('express-form-data');

const UsersModule = require('../modules/usersModule');

router.post('/', 
    async (req, res) => {

        if (req.user) { // Can't create user, if signed IN
            res.status(400).json({
                "reply": "Please, log out first",
                "status": "error"
            })
        } else {
            
            const newUser = await UsersModule.create(req.body);
            if (newUser) {
                res.status(200).json({
                    data: getUserData(newUser),
                    status: "ok"
                });
            } else { 
                res.status(500).json({
                    error: "Не удалось зарегистрировать пользователя",
                    status: "error"
                });              
            }
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