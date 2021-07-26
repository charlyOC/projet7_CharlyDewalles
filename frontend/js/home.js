

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


let icon = document.getElementById('icon');
let menuUser = document.getElementById('menu_user')


function menuUserUp() {
    menuUser.classList.toggle('menu_user_up')
};

function menuUserDown() {
    menuUser.classList.toggle('menu_user_down')
}

console.log(icon)

icon.addEventListener('click', () => {
    menuUserDown();
});



let eraseAccount = document.getElementById('erase');
eraseAccount.addEventListener('click', () => {
    console.log('click');
    fetch('http://localhost:3000/api/auth/delete/' + idUser, {
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer' + ' ' + token,
        },
    }).then((response) => response.json())
    .then((response) => {
        console.log(response)
    })
    handleLogout();

});


let cancelUserUpdate = document.getElementById('cancel_user_modified');
cancelUserUpdate.addEventListener('click', () => {
    document.getElementById('modify_user').style.display="none"
})

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

        
        console.log(response.messages[i])
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
        avatar.setAttribute('src', 'media/avatar.svg');
        avatar.setAttribute('class', 'avatar');
        userDiv.appendChild(avatar);

        const report = document.createElement('button');
        report.setAttribute('class', 'report');
        report.textContent = 'Signaler';
        userDiv.appendChild(report);

        report.addEventListener('click', () => {

            window.location.href="home.html?id=" + idUser + "?idmessage=" + idMessage;
            let reportedMessage = reported = true
            fetch('http://localhost:3000/api/message/report/' + idMessage,  {
                method: "PUT",
                headers: { Authorization: "Bearer " + token },
                body: reportedMessage,
              })
                .then(function (response) {
                  return response.json();
                })
                .then(
                    window.location.href="home.html?id=" + idUser,
                  alert("message signalé")
                )
                .catch((error) => {
                  console.log(error);
            });
        })

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
            
        });


        let content = document.createElement('h3');
        content.setAttribute('class', 'content');
        content.textContent = (response.messages[i].content);
        messageDiv.appendChild(content);

        let image = document.createElement('img');
        image.setAttribute('class', 'image_content');
        image.setAttribute('src', (response.messages[i].imageUrl));
        messageDiv.appendChild(image);

        if(response.messages[i].reported == true){
            messageDiv.style.border="1px red solid"
        }
    }
});

const fileTypes = [
    "image/apng",
    "image/bmp",
    "image/gif",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/svg+xml",
    "image/tiff",
    "image/webp",
    "image/x-icon"
  ];
  
  function validFileType(file) {
    return fileTypes.includes(file.type);
}

function returnFileSize(number) {
    if(number < 1024) {
      return number + 'bytes';
    } else if(number >= 1024 && number < 1048576) {
      return (number/1024).toFixed(1) + 'KB';
    } else if(number >= 1048576) {
      return (number/1048576).toFixed(1) + 'MB';
    }
  }

function updateImageDisplay() {
    while(preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }
  
    const curFiles = input.files;

    if(curFiles.length === 0) {
      const para = document.createElement('p');
      para.textContent = '';
      preview.appendChild(para);
    } else {
      const list = document.createElement('ol');
      preview.appendChild(list);
  
      for(const file of curFiles) {
        const listItem = document.createElement('li');
        const para = document.createElement('p');
        if(validFileType(file)) {
          para.textContent = ``;
          const image = document.createElement('img');
          image.src = URL.createObjectURL(file);
  
          listItem.appendChild(image);
          listItem.appendChild(para);
        } else {
          para.textContent = `Le fichier ${file.name}: n'est pas un format valide.`;
          listItem.appendChild(para);
        }
  
        list.appendChild(listItem);
      }
    }
  }

const input = document.querySelector('#imageurl');
const preview = document.querySelector('.preview');

input.addEventListener('change', updateImageDisplay);


function imageFile(){
    var filename = document.getElementById('image').value;
    document.getElementById('get_image').value = filename;
    document.getElementById("image").files[0].path
    alert(filename);
}


const post = document.getElementById('post');

post.addEventListener('click', () => {

    let content = document.getElementById('message').value;
    let imageUrl = document.getElementById('imageurl')
    const formDataMessage = new FormData();

    formDataMessage.append("content", content);
    formDataMessage.append("image", imageUrl.files[0]);
  

    console.log(formDataMessage)
    fetch('http://localhost:3000/api/message/postmessage/' + idUser,  {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
        body: formDataMessage,
      })
        .then(function (response) {
          return response.json();
        })
        .then(
            window.location.href="home.html?id=" + idUser,
          alert("message ajouté")
        )
        .catch((error) => {
          console.log(error);
    });

});









