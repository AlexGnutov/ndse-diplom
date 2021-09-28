const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

function verify(username, password, done) {
  findByUsername(username, function (err, user) {
    
    if (err) { return done(err) }
    if (!user) { return done(null, false) }
    if (!verifyPassword(user, password)) { return done(null, false) }
    
    // `user` будет сохранен в `req.user`
    return done(null, user)

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
})
};

async function verifyPassword (user, password) {  
  
  console.log('Compare started');
  try {
    console.log('Now entering: ' + user.name + ' ' + password);
    const compare = bcrypt.compareSync(password, user.passwordHash);
    console.log('Password verification with bcrypt is: ' + compare);
    return compare;
  } catch(e) {
    console.log('bcrypt error: ', e.message);
      
  }
  //const compare = (password === user.password);
}

module.exports = {verify, findById};