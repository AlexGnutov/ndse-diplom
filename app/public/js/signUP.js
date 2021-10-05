// Sign UP function

function signUP() {
    const req = new XMLHttpRequest();
    const data = {
        email: signupEmail.value,
        password: signupPassword.value,
        name: signupName.value,
        contactPhone: signupContactPhone.value
    };
    //console.log('Front end sends: ');
    //console.log(JSON.stringify(data));
  
    req.open('POST', URL + '/api/signup');
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(data));
    
    signupEmail.value = '';
    signupPassword.value = '';
    signupName.value = '';
    signupContactPhone.value = '';

    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            const reply = JSON.parse(req.response);
            saveAndPublishResponse(reply);                                 
        }
    }   
}