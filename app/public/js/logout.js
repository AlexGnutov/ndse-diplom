function logout() {
    const req = new XMLHttpRequest();
        
    req.open('GET', URL + '/api/signin/logout');
    req.send();
    
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            const reply = JSON.parse(req.response);
            clearUserData();
            saveAndPublishResponse(reply);
            location.reload();
        }
    }   
};

function me() {
    const req = new XMLHttpRequest();
        
    req.open('GET', URL + '/api/signin/me');
    req.send();
    
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            const reply = JSON.parse(req.response);
            saveAndPublishResponse(reply);
        }   
    }
}   