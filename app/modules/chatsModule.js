const Chat = require('../models/chatSchema');
const Message = require('../models/messageSchema');

class ChatsModule {

    static find = async function(author, receiver) {
        
        const filter = {users: {$all: [author, receiver]}}
        //console.log(filter);
        
        try {
            const foundChat = await Chat.findOne(filter).exec();
            //console.log('Found chat is: ', foundChat);
            if (foundChat) {
                return foundChat;
            } else {
                return null;
            }; 
        } catch(e) {    
            console.log('Chat finding error: ', e.message);
            return (e);
        }
       
    }

    static sendMessage = async function(author, receiver, message) {
        console.log('Function sendMessage:', author, '/', receiver, '/', message); //*

        //Message creating
        const newMessage = new Message ({ // Create new message 
            author,
            sentAt: new Date(),
            text: message
        });           
        
        let messageId; //To get ID from try-catch
        
        //Save the new messsage in Messages DB
        try {
            const savedMessage = await newMessage.save();
            //console.log('The following message created: '); //*
            //console.log(savedMessage); //*
            messageId = savedMessage.id;
            //console.log('Message Id: ', messageId); //*
                try {
                    const foundChat = await ChatsModule.find(author, receiver);
                    if (foundChat) { // The chat exist...
                        await chatUpdate(foundChat.id, foundChat.messages, messageId); //...save and update   
                        return {
                            message: savedMessage,
                            chatId: foundChat.id
                        };
                    } else {
                        // The chat needs to be created...
                        const newChat = new Chat({
                            users: [author, receiver],
                            createdAt: new Date(), 
                            messages: [], 
                        });                         
                        try { // ...saved...
                            const savedChat = await newChat.save();
                            await chatUpdate(savedChat.id, [], messageId); //...and updated 
                            return {
                                message: savedMessage,
                                chatId: savedChat.id
                            };
                        } catch(e) {
                            console.log('Chat saving error', e.message);
                            return (e);
                        }
                    }   
                } catch (e) {
                    console.log('Chat finding error', e.message);
                    return (e);                                     
                }
        } catch(e) {
            console.log('Message saving error', e.message);
            return (e);
        }
        
        // Chat update
        async function chatUpdate(chatId, messages, messageId) {
            messages.push(messageId);
            try {
                //console.log('Chat needs to be updated', chatId, ' ', messageId);
                const update = {messages: messages};
                await Chat.findByIdAndUpdate(chatId, update, {new: true});
            } catch(e) {
                console.log('Adding message to chat error: ', e.message);
                return (e);
            }            
        }
    }

        
    static subscribe = async function(socket) {
        
        const userId = socket.request.user.id;
        
        try {
            const chatList = await Chat.find({users: userId});
            console.log('***Упомянут в чатах: ');
            console.log(chatList);

            if (chatList) {
                chatList.forEach(chat => {
                    socket.join(chat.id);
                    console.log(socket.request.user.id, ' joined to room: ', chat.id);
                });
            }
        } catch(e) {
            console.log('Chat list error: ', e.message);
            return (e);
        }        
    }

    static getHistory = async function(chatId, chatMessages) {
        
        console.log('Get history starts with: ', chatId, ' ', chatMessages);

        let chatHistory = [];

        for (const msgId of chatMessages) {
            try {
                const msg = await Message.findOne({_id: msgId}).exec();
                console.log('Found: ');
                console.log(msg);
                chatHistory.push(msg);
            } catch(e) {
                console.log('Error find chat messages: ', e.message);
                return (e);
            }
        }    

        console.log('Get history finishes with: ');
        console.log(chatHistory);
        return chatHistory;
        
    }

}

module.exports = ChatsModule;