const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const formData = require('express-form-data');

const mongoose = require('mongoose'); // Init mongoose for MongoDB operations
mongoose.set('useNewUrlParser', true); //Adding these according to Mongoose documentation recommendations
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//
const chatsModule = require('./modules/chatsModule');

//Get routers + middlewares
const signinRouter = require('./routers/signinRouter'); //Authentification router
const signupRouter = require('./routers/signupRouter'); //Registration router
const advertisementsRouter = require('./routers/advertisementsRouter'); //Main functions router
const errorMiddleware = require('./middleware/error');

//*** PASSPORT ***//
const {passport} = require('./passport/index.js');

//*** EXPRESS in SocketIO configuration***//
const app = express();              //Get and init express object
const server = http.Server(app);    //Get server 
const io = socketIO(server);  //Init socket IO

//Add JSON middleware
app.use(express.json());

//Add session module
const {sessionMiddleware, session} = require('./middleware/session');
app.use(sessionMiddleware);

////Passport initialization
app.use(passport.initialize()); 
app.use(passport.session());

//Static for test browser interface
app.use(express.static('public'));


//Routers - application operations + errors
app.use('/api/signin', signinRouter);
app.use('/api/signup', signupRouter);
app.use('/api/advertisements', advertisementsRouter);

app.use('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/index.html'));    
});

app.use(errorMiddleware); //No reply processing

//*** SOCKET IO ***/
const {sendMessage, getHistory} = require('./io/ioHandlers')(io);
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));


const onConnection = (socket) => {

    if (!socket.request.isAuthenticated || !socket.request.isAuthenticated()) {
        console.log("Пользователь неавторизован ", socket.id);
    } else { 
        console.log("Пользователь авторизован - чат доступен ", socket.request.user.id);
        chatsModule.subscribe(socket);              
        
        socket.on('getHistory', getHistory);
        socket.on('sendMessage', sendMessage);
    }
};

io.on('connection', onConnection);


/////////////////////////////////////////
///*** SERVER start and DB connection***/
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'qwerty12345';
const NameDB = process.env.DB_NAME || 'todos';
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/';

//Connections and server launch
async function start() {
    try {

        const options = {
            "user": UserDB,
            "pass": PasswordDB,
            "dbName": NameDB,
            "useNewUrlParser": true,
            "useUnifiedTopology": true};

        await mongoose.connect(HostDb, options);
        
        server.listen(SERVER_PORT, console.log(`Server has started on port: ${SERVER_PORT}`));

    } catch (e) {
        console.log(e);
    }
}

start();


