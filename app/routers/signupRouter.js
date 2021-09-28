//Router for registration
const express = require('express');
const router = express.Router();

const formData = require('express-form-data');

const UsersModule = require('../modules/usersModule');

router.post('/', 
    formData.parse(),

    async (req, res) => {
        console.log(`Requested to register: ${req.body}`);
        const newUser = await UsersModule.create(req.body);
        res.status(200).json(`Registered: ${newUser}`);  
    }
);

module.exports = router;