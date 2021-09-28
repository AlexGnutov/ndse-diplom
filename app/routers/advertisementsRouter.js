//Router for main operatins

const express = require('express');
const router = express.Router();

const formData = require('express-form-data');
const authCheck = require('../middleware/auth');
const fileMiddleWare = require('../middleware/file');

const Advertisement = require('../models/advertisementSchema');
const AdvertisementsModule = require('../modules/advertisementsModule');


//Show all ADVs or find exact by query data
router.get('/', async (req, res) => {
    const params = req.query;
    console.log(params);

    try {
        const data = await AdvertisementsModule.find(params);   
        res.status(200).json(data);     
    } catch(e) {
        console.log(e.message) 
        res.status(404).json(`Server or Database error`);       
    }      
});

//Show an ADV by ID
router.get('/:id', 
    async (req, res) => {
        const {id} = req.params;
        try {
            const foundAdv = await AdvertisementsModule.find({id});
            res.status(200).json(foundAdv);            
        } catch(e) {
            console.log(e.message);
            res.status(404).json(`Server or Database error`);
        }        
});

//Add an advertisement
router.post('/',
    authCheck,
    fileMiddleWare.array('images', 3),
    async (req, res) => {
        
        let images = [];

        if (req.files) {
            req.files.forEach(file => {
                images.push(file.path);
            });
        }

        const {shortText, userId, createdAt, updatedAt, description, tags} = req.body;
        const data = {shortText, userId, createdAt, updatedAt, description, tags, images}; 
        
        const newAdvertisement = await AdvertisementsModule.create(data); 
        res.status(200).json(`Created: ${newAdvertisement}`);
        
    }  
);

//Delete an advertisement
router.post('/:id', 
    authCheck,
    async (req, res) => {
        const {id} = req.params;
        const isDeleted = await AdvertisementsModule.remove(id);
        res.status(200).json(isDeleted);
    }
);

module.exports = router;