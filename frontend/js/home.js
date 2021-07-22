const url = window.location.search;
let params = new URLSearchParams (url);
let idUser = params.get('id');
const token = sessionStorage.getItem('token');



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
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer' + ' ' + token,
    },
}).then((response) => response.json())
.then((response) => {

    let firstName = sessionStorage.getItem('firstName');

    for(let i = 0; i < response.messages.length; i++) {
        
        let messageDiv = document.createElement('div');
        messageDiv.setAttribute('class', 'messages_card');
        if(firstName === null){
            messageDiv.style.display = 'none'
        };
        messagesSection.appendChild(messageDiv);

        let userDiv = document.createElement('div');
        userDiv.setAttribute('class', 'user_div');
        messageDiv.appendChild(userDiv);


        let userName = document.createElement('h2');
        userName.setAttribute('class', 'user_id');
        userName.textContent = firstName;
        userDiv.appendChild(userName);

        let avatar = document.createElement('img');
        avatar.setAttribute('src', response.messages[i].User.avatar);
        avatar.setAttribute('class', 'avatar');
        userDiv.appendChild(avatar);

        let edit = document.createElement('button');
        edit.setAttribute('class', 'edit_message');
        edit.textContent = 'Modifier';
        userDiv.appendChild(edit);

        let report = document.createElement('button');
        report.setAttribute('class', 'report');
        report.textContent = 'Signaler';
        userDiv.appendChild(report);

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


const post = document.getElementById('post');

post.addEventListener('click', () => {

    let message = {
        content: document.getElementById('message').value,
        imageUrl: document.getElementById('image').value,
    };


    fetch("http://localhost:3000/api/message/postmessage/" + idUser, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer' + ' ' + token,
        },
        mode:'cors',
        body: JSON.stringify(message),
        }).then((response) => response.json()) 
        .then((response) => {
            console.log(response)
        }).catch(error => alert("Erreur : " + error));

});

//fetch('http://localhost:3000/api/auth/me/' + idUser)
//.then((response) => response.json())
//.then((response) => {

//    console.log(response)

//    const divNames = document.getElementById('names');

//    divNames.textContent = response.User.firstName + response.User.lastName;

//    let avatarUser = document.getElementById('avatar_user');
//    avatarUser.setAttribute('src', response.User.avatar);

//   if(avatarUser === null){
//        avatarUser.setAttribute('src', 'images/avatar.svg')
//    }
//})

