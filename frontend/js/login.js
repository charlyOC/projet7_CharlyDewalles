
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
            console.log(response)
            window.location.href="home.html";
        }).catch(error => alert("Erreur : " + error));

});


