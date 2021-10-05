//Router for registration
const express = require('express');
const router = express.Router();

const formData = require('express-form-data');

const UsersModule = require('../modules/usersModule');

router.post('/', 
    //formData.parse(),    
    async (req, res) => {
        console.log(req.body);
        console.log(`Requested to register: ${req.body}`);
        const newUser = await UsersModule.create(req.body);
        if (newUser) {
            const {_id, email, name, contactPhone} = newUser;
            res.status(200).json({
                data: {
                    id: _id,
                    email: email,
                    name: name,
                    contactPhone: ((contactPhone === undefined)? "not defined": contactPhone)
                },
                status: "ok"
            });
        } else { 
            res.status(200).json({
                error: "Не удалось зарегистрировать пользователя",
                status: "error"
            });  
        }
    }
);

module.exports = router;