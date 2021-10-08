// Functions to work with LocalStorage and related data

// Get data from local storage
function localStorageDataLoad() {
    const userData = localStorage.getItem('user');
    if (userData) {
        user = JSON.parse(userData);        
    } else { user = {}; }

    const responseData = localStorage.getItem('lastReqResponse')
    if (responseData) {
        lastReqResponse = JSON.parse(responseData);
    } else { lastReqResponse = {}; }
}

// Clear LocalStorage 
function localStorageClean() {
    localStorage.removeItem('user');
    localStorage.removeItem('lastReqResponse');
}

// Save and Publish response data 
function saveAndPublishResponse(resp) {
    resContainer.innerHTML = publishAsText(resp);
    lastReqResponse = resp;
    localStorage.setItem('lastReqResponse', JSON.stringify(resp));    
}
    
// Save and Publish user data 
function saveAndPublishUserData(resp) {
    user.name = resp.data.name;
    user.email = resp.data.email;
    user.id = resp.data._id;
    localStorage.setItem('user', JSON.stringify(user));     
}

// Clear user data
function clearUserData() {    
    user = {};  
    localStorage.setItem('user', JSON.stringify(user));   
}
