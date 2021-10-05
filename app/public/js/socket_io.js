//********// Socket IO code //********//

// Get Socket related elements
const receiverId = document.getElementById('receiver-id');
const messageText = document.getElementById('message-text');
const chatId = document.getElementById('chat-id');

const sendButton = document.getElementById('send-button');
const getHistoryButton = document.getElementById('gethistory-button');

const ioOutput = document.getElementById('io-output');

// Socket inititalization
const socket = io();

sendButton.addEventListener('click', (e) => {
    if (user.id) {
        socket.emit('sendMessage', {
            receiver: receiverId.value || null, 
            text: messageText.value || null
        });       
    }
})

getHistoryButton.addEventListener('click', (e) => {
    if (user.id) {
        socket.emit('getHistory', {
            receiver: receiverId.value || null, 
        })
    }
});


socket.on('newMessage', (msg) => {
    console.log('newMessage event from server: ');
    try {
        const textObj = JSON.parse(msg.text);
        ioOutput.innerHTML = publishAsText(textObj);
    } catch(e) {
        console.log(e.message);        
    }   
})

socket.on('chatHistory', (msg) => {
    console.log('chatHistory event from server: ');
    try {
        const textObj = msg.text;
        ioOutput.innerHTML = textObj;
    } catch(e) {
        console.log(e.message);        
    }   
})


