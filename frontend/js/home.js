
const url = window.location.search;
let params = new URLSearchParams (url);
let idUser = params.get('id');
const token = sessionStorage.getItem('token');

const names = document.getElementById('names');


const firstNameUser = document.createElement('h2');
firstNameUser.textContent = sessionStorage.getItem('firstName');
names.appendChild(firstNameUser);

const lastNameUser = document.createElement('h3');
lastNameUser.textContent = sessionStorage.getItem('lastName');
names.appendChild(lastNameUser);


function handleLogout(){
    window.sessionStorage.clear();
    window.location.href='login.html'
};

document.getElementById('logout').addEventListener('click', () => {
    handleLogout();
});



const messagesSection = document.getElementById('messages');

const createMessage = document.getElementById('create_message');


let toggleCreate = document.querySelector('div#toggle_post button');
let menu = document.getElementById('inputs');



function toggleDown(){
    toggleCreate.classList.toggle("animation_down");
};

function toggleUp(){
    toggleCreate.classList.toggle("animation_up");
};

function menuUp(){
    menu.classList.toggle('menu_down')
}

function menuDown(){
    menu.classList.toggle('menu_up')
}



toggleCreate.addEventListener('click', () => {
    toggleDown();
    toggleUp();
    menuUp();
    menuDown();
})




     



fetch('http://localhost:3000/api/message/getmessage', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer' + ' ' + token,
    },
}).then((response) => response.json())
.then((response) => {

    for(let i = 0; i < response.messages.length; i++) {
        

        const firstName = response.messages[i].User.firstName;
        const lastName = response.messages[i].User.lastName;

        let idMessage = response.messages[i].id;
        let idUserMessage = response.messages[i].User.id;
        
        let messageDiv = document.createElement('div');
        messageDiv.setAttribute('class', 'messages_card');
        messagesSection.appendChild(messageDiv);

        let userDiv = document.createElement('div');
        userDiv.setAttribute('class', 'user_div');
        messageDiv.appendChild(userDiv);

        let userName = document.createElement('h2');
        userName.setAttribute('class', 'user_id');
        userName.textContent = firstName + ' ' + lastName ;
        userDiv.appendChild(userName);

        let avatar = document.createElement('img');
        avatar.setAttribute('src', response.messages[i].User.avatar);
        avatar.setAttribute('class', 'avatar');
        userDiv.appendChild(avatar);

        const link = document.createElement('a');
        link.setAttribute('class', 'link');
        link.setAttribute('href', '#modify_message');
        userDiv.appendChild(link);

        const edit = document.createElement('button');
        edit.setAttribute('class', 'edit_message');
        edit.textContent = 'Modifier';
        link.appendChild(edit);
        
        edit.addEventListener('click', () => {
            const displayEdit = document.getElementById('modify_message');
            displayEdit.style.display="block";
        });



        const report = document.createElement('button');
        report.setAttribute('class', 'report');
        report.textContent = 'Signaler';
        userDiv.appendChild(report);

        const erase = document.createElement('button');
        erase.setAttribute('class', 'erase');
        erase.textContent = 'Supprimer';
        userDiv.appendChild(erase);

        erase.addEventListener('click', () => {

            window.location.href="home.html?id=" + idUser + "?idmessage=" + idMessage + "?idusermessage=" + idUserMessage;

            function fail(){
                alert('vous ne pouvez pas supprimer ce message');
                window.location.href="home.html?id=" + idUser; 
                location.reload();
            };

            function checkIsAdmin(){
                let isAdmin = false;
                if(idUser == 1){
                    isAdmin = true
                }else {
                    isAdmin = false
                }

                return isAdmin
            };

        
            function checkIds(){
                let matchingIds = false;

                if (idUser == idUserMessage){
                    matchingIds = true
                } else {
                    matchingIds = false
                }

                return matchingIds
            };
            console.log(checkIds());
            console.log(checkIsAdmin());

            checkIds();
            if(checkIds() == true){
                fetch('http://localhost:3000/api/message/deletemessage/' + idMessage, {
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer' + ' ' + token,
                    },
                }).then((response) => response.json())
                .then((response) => {
                        console.log(response)       
                }).catch(error => alert("Erreur : " + error));
                    
                window.location.href="home.html?id=" + idUser; 
                location.reload();
            }else{
                checkIsAdmin();
                if(checkIsAdmin() == true){
                    fetch('http://localhost:3000/api/message/deletemessage/' + idMessage, {
                        method: "DELETE",
                        headers: {
                            'Authorization': 'Bearer' + ' ' + token,
                        },
                    }).then((response) => response.json())
                    .then((response) => {
                            console.log(response)       
                    }).catch(error => alert("Erreur : " + error));
                        
                    window.location.href="home.html?id=" + idUser; 
                    location.reload();
                }else {
                    return fail()
                }
            };
            
        })

        const cancel = document.getElementById('cancel')
        cancel.addEventListener('click', () => {
            const cancelEdit = document.getElementById('modify_message');
            cancelEdit.style.display="none"
        });


        let content = document.createElement('h3');
        content.setAttribute('class', 'content');
        content.textContent = (response.messages[i].content);
        messageDiv.appendChild(content);

        let image = document.createElement('img');
        image.setAttribute('class', 'image_content');
        image.setAttribute('src', (response.messages[i].attachment));
        messageDiv.appendChild(image);
    }
});





function imageFile(){
    var filename = document.getElementById('image').value;
    document.getElementById('get_image').value = filename;
    document.getElementById("image").files[0].path
    alert(filename);
}


const post = document.getElementById('post');

post.addEventListener('click', () => {

    let message = {
        content: document.getElementById('message').value,
        //imageUrl: document.getElementById('image').value,
    };


    fetch("http://localhost:3000/api/message/postmessage/" + idUser, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer' + ' ' + token,
            'Content-type': 'application/json'
        },
        mode:'cors',
        body: JSON.stringify(message),
    }).then((response) => response.json()) 
        .then((response) => {
            console.log(response)
            location.reload();
        }).catch(error => alert("Erreur : " + error));

});

const postModified = document.getElementById('post_modified');
console.log(postModified)
postModified.addEventListener('click', () => {

    
    let editMessageResponse = {
        content: document.getElementById('message_modified').value,
        //imageUrl: document.getElementById('image_modified').value, 
    }

    fetch('http://localhost:3000/api/message/editmessage/' + idMessage, {
        method: "PUT",
        headers: {
            'Authorization': 'Bearer' + ' ' + token,
        },
        mode:'cors',
        body: JSON.stringify(editMessageResponse),
    }).then((response) => response.json())
    .then((response) => {
            console.log(response)       
    }).catch(error => alert("Erreur : " + error));
        
    //window.location.href="home.html?id=" + idUser; 
    //location.reload();

})







