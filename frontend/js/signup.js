
const submitPost = document.getElementById('submit');

submitPost.addEventListener('click', () => {

    let user = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        firstName: document.getElementById('firstname').value,
        lastName: document.getElementById('name').value,
    };


    fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        mode:'cors',
        body: JSON.stringify(user),
        }).then((response) => response.json()) 
        .then((response) => {
            console.log(response)
            window.location.href="home.html";
        }).catch(error => alert("Erreur : " + error));

});


