const Advertisement = require('../models/advertisementSchema');

class Advertisements {

    static find = async function(params) {
      
        const {id} = params;
        if (id) {
            console.log('finding by ID');
            const foundById = await Advertisement.findById(id);
            if (foundById) {
                return foundById;
            } else {
                return [];
            }
        }

        console.log(params);
        //Select data and exclude empty fields from search
        const {shortText, description, userId} = params;
        
        let {tags} = params;
        if (tags) {
            tags = tags.split(',');
        }
               
        let filter = {
            userId: (userId)? userId : undefined,
            shortText: (shortText)? new RegExp(`${shortText}`): undefined, 
            description: (description)? new RegExp(`${description}`) : undefined,
            tags: (tags)? {$all: tags} : undefined,             
        };

        console.log(filter);

        for (let key in filter) {
            if (!filter[key]) {
                delete filter[key];
            }
        } 
        
        if (Object.keys(filter).length > 0) {
            console.log('Finding with filter');
            console.log(filter);
            const findBy = await Advertisement.find(filter);
            return findBy;
        } else {
            const findBy = await Advertisement.find();
            return findBy;
        }
    }
    
    //Create a new ADV
    static create = async function(data) {
        const {shortText, userId, createdAt, updatedAt} = data;
        const {description, images} = data;
        let {tags} = data;
        const isDeleted = false;

        if (tags) {
            tags = tags.split(',');
        }

        if (shortText && userId && createdAt && updatedAt) {
            const newAdvertisement = new Advertisement({
                shortText, 
                userId,
                createdAt,
                updatedAt,
                description,
                images,
                tags,
                isDeleted
            }); 

            try {
                await newAdvertisement.save();            
                return newAdvertisement;
            } catch(e) {
                console.error(e.message);
            };
        }
    }

    //Change ADV field "isDeleted" to "true"
    static remove = async function(id) {
        try {
            const isDeleted = await Advertisement.findByIdAndUpdate(id, {isDeleted: true}, {new: true});
            return isDeleted;
        } catch (e) {
            console.log(e);
            return null;
        }       
    }

}

module.exports = Advertisements;