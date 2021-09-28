//Call MongoDB Schema - Book
const Message = require('../models/messageSchema.js');

module.exports = (io) => {
    


    const getHistory = function(msg) {

    }

    const sendMessage = function(msg) {
        
    }

    const comment = function (msg) {
        const socket = this;

        const user = socket.request.user;

        //console.log(`${msg.username} / ${msg.bookId} / ${msg.text}`)

        const newMessage = new Message ({
             username: user.username,
             text: msg.text,
             date: new Date(),
             bookId: msg.bookId
        });

        async function Save() {
            try {
                await newMessage.save();            
            } catch(e) {
                console.error(e.message);
            }
        };

        Save();

    };
     
    return {
        comment
    }
  }