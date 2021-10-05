// Update StatusString and ResponseBox
function statusStringUpdate() {
    if (Object.keys(user).length > 0) {
        statusString.textContent = `LOGGED as: name: ${user.name}, email: ${user.email}, id: ${user.id}`;
    } else {
        statusString.textContent = 'Not logged in / no data in local storage';
    }

    if (Object.keys(lastReqResponse).length > 0) {
        resContainer.innerHTML = publishAsText(lastReqResponse);
    } else {
        resContainer.textContent = 'no data stored';
    }
}

//Returns "texted" object
function publishAsText(object) {
    let output = "<br>{";
    console.table(object);
    for (let key in object) {
        output += `<br>${key} : ${
            (object[key] instanceof Object)? publishAsText(object[key]):object[key]
        }`;  
    }
    return output + '<br>}';
}