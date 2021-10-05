const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

function verify(username, password, done) {
  findByUsername(username, function (err, user) {
    if (err) { return done(err) }
    if (!user) { return done(null, false) }
    
    if (!verifyPassword(user, password)) { 
      console.log('Проверка не прошла!!!');
      return done(null, false) 
    }
    return done(null, user) //saves user in req.
  })
};

function findById (id, cb) {
  process.nextTick(async function () {
    try {
      const user = await User.findById(id);
      if (user) {
        cb(null, user)
      } else {
        cb(new Error('User ' + id + ' does not exist'))
      }
    } catch(e) {
      console.log(e.message);      
    }        
  });
};

function findByUsername (username, cb) {
  process.nextTick(async function () {
    try {
      const user = await User.findOne({email: username});      
      if (user) {
        return cb(null, user)
      }
    } catch (e) {
      console.log(e.message);
    }
    
    return cb(null, null)
  });
};

function verifyPassword (user, password) {  
  try {
    const comp = bcrypt.compareSync(password, user.passwordHash);
    return comp;
  } catch(e) {
    console.log('bcrypt error: ', e.message);      
  } 
};

module.exports = {verify, findById};