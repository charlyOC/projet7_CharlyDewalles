
//LOGIN DE L'UTILISATEUR

const submit = document.getElementById('submit');


submit.addEventListener('click', () => {

    let user = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };


    fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        mode:'cors',
        body: JSON.stringify(user),
        }).then((response) => response.json()) 
        .then((response) => {
            if(response.error){
                console.log(response)
                alert(response.error)
            }else{
                console.log(response)
                sessionStorage.setItem('token', response.token);
                sessionStorage.setItem('userId', response.userId);
                sessionStorage.setItem('firstName', response.firstName);
                sessionStorage.setItem('lastName', response.lastName);
                sessionStorage.setItem('isAdmin', response.isAdmin);
                sessionStorage.setItem('imageUrl', response.imageUrl);
                window.location.href="home.html?id=" + response.userId;
            }

    }).catch(error => alert("Erreur : " + error));

});




