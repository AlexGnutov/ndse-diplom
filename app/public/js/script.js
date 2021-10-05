// Local Storage used with:
let user;                     // user object: id, name, email
let lastReqResponse;          // last request response object  


// Global varibles and objects attachements
const URL = location.origin;
const statusString = document.getElementById('current-user');
const resContainer = document.getElementById('res'); //Container for all server responses

const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupName = document.getElementById('signup-name');
const signupContactPhone = document.getElementById('signup-contactphone');
const signupButton = document.getElementById('signup-button');

const signinEmail = document.getElementById('signin-email');
const signinPassword = document.getElementById('signin-password');
const signinButton = document.getElementById('signin-button');

const meButton = document.getElementById('me-button')
const logoutButton = document.getElementById('logout-button');

window.onload = () => {

    localStorageDataLoad(); 
    statusStringUpdate();    

    signupButton.addEventListener('click', signUP);

    signinButton.addEventListener('click', signIN);

    meButton.addEventListener('click', me);
    
    logoutButton.addEventListener('click', logout);

} 
 

