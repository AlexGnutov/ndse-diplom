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
        res.status(500).json(`Server or Database error`);       
    }      
});

//Show an ADV by ID
router.get('/:id', 
    async (req, res) => {
        const {id} = req.params;
        console.log(id);

        try {
            const foundAdv = await AdvertisementsModule.find({id});
            console.log(foundAdv);
            res.status(200).json({
                data: foundAdv,
                status: "Ok"
            });            
        } catch(e) {
            console.log(e.message);
            res.status(500).json({
                error: "Server or Database error",
                status: "error"
            });
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

        const userId = req.user._id;
        const createdAt = new Date();
        const updatedAt = createdAt;

        const {shortText, description, tags} = req.body;

        const data = {shortText, userId, createdAt, updatedAt, description, tags, images}; 
        
        try {
            const newAdvertisement = await AdvertisementsModule.create(data); 
            
            res.status(200).json({
                data: newAdvertisement,
                status: "Ok"
            });

        } catch(e) {
            if (e.message === 'Недостаточно данных') {
                console.log(e.message);
                res.status(400).json({
                    error: e.message,
                    status: "error"
                });
            } else {
                console.log(e.message);
                res.status(500).json({
                    error: e.message,
                    status: "error"
                });
            }            
        }                
    }  
);

//Delete an advertisement
router.post('/:id', 
    authCheck,
    async (req, res) => {
        
        const {id} = req.params;
        let authorId;        

        // Find the ADV to get author ID
        try {
            const foundAdv = await AdvertisementsModule.find({id: id});
            if (foundAdv) {
                authorId = foundAdv.userId;
            } else {
                res.status(400).json({
                    error: "Объявление не найдено",
                    status: "error"
                });
            }
        } catch(e) {
            console.log(e.message)
            res.status(500).json({
                error: e.message,
                status: "error"
            });
        }

        //console.log(authorId, typeof authorId, " ", req.user._id, typeof req.user._id);

        // Compare user ID and author ID - if true - set status to DELETED
        if (authorId == req.user._id) {
            try {
                const isDeleted = await AdvertisementsModule.remove(id);
                res.status(200).json({
                    data: isDeleted,
                    status: "Ok"
                });
            } catch(e) {
                res.status(500).json({
                    error: e.message,
                    status: "error"
                });
            }
        } else {
            res.status(403).json({
                error: "Нет доступа",
                status: "error"
            });
        }        
    }
);

module.exports = router;