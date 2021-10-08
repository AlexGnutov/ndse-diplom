/*Get advs list*/
const getAdvsButton = document.getElementById('get-advs-button');

getAdvsButton.addEventListener('click', (e) => {
    
    const req = new XMLHttpRequest();
    req.open('GET', URL + '/api/advertisements');
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send();

    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            const reply = JSON.parse(req.response);
            saveAndPublishResponse(reply);            
        }
    }     
})

/*Get adv data by ID*/
const getAdvDataButton = document.getElementById('get-advdata-button');
const advDataId = document.getElementById('id-to-show');

getAdvDataButton.addEventListener('click', (e) => {
    
    const req = new XMLHttpRequest();
    const advId = advDataId.value.trim();
    
    const link = URL + '/api/advertisements/' + advId;
    req.open('GET', link);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(null);

    advDataId.value = "";

    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            const reply = JSON.parse(req.response);
            saveAndPublishResponse(reply);            
        }
    }     
});


/*Post adv*/
const postAdvForm = document.getElementById('post-adv-form');
postAdvForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

const postAdvButton = document.getElementById('post-adv-button');

postAdvButton.addEventListener('click', (e) => {

    const req = new XMLHttpRequest();
    const formData = new FormData(postAdvForm);

    req.open('POST', URL + '/api/advertisements');
    req.send(formData);
    
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            const reply = JSON.parse(req.response);
            saveAndPublishResponse(reply);            
        }
    }     
});


/*Delete adv*/
const advDeleteButton = document.getElementById('post-delete-button');
const advDeleteId = document.getElementById('id-to-delete');

advDeleteButton.addEventListener('click', (e) => {
   
    const req = new XMLHttpRequest();
    const advId = advDeleteId.value.trim();

    req.open('POST', URL + '/api/advertisements/' + advId);
    req.send();

    advDeleteId.value = "";

    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            const reply = JSON.parse(req.response);
            saveAndPublishResponse(reply);            
        }
    }     

});