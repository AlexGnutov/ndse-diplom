const {Chat} = require('../models/chatSchema');

class Advertisements {

    static find = async function(users) {
        if (Array.isArray(users)) {
            const filter = {
                users: {$all: users}
            }

            try {
                const foundChat = await Chat.find(filter);
                if (foundChat.length > 0) {
                    return foundChat;
                } else {
                    return null;
                }; 
            } catch(e) {    
                console.log('Чат не найден из-за ошибки БД.');
                return null;
            }
        }
    }

    static sendMessage = async function(data) {

    }

    static subscribe = async function(id) {

    }

    static getHistory = async function(id) {
        
    }

}

module.exports = Advertisements;