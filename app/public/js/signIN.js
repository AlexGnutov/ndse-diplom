
function signIN() {

    if (Object.keys(user).length === 0) {

        const req = new XMLHttpRequest();
        const data = {
            email: signinEmail.value,
            password: signinPassword.value
        };
        console.log('Front end sends: ');
        console.log(JSON.stringify(data));
        req.open('POST', URL + '/api/signin');
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify(data));

        signinEmail.value = '';
        signinPassword.value = '';
        
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                const reply = JSON.parse(req.response);
                saveAndPublishResponse(reply);
                saveAndPublishUserData(reply);
                location.reload();
            }
        }   
    } else {
        window.alert('Please, logout first!');
    }
}