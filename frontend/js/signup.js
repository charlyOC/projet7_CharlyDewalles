
const submitPost = document.getElementById('submit');

submitPost.addEventListener('click', () => {

    let user = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        firstName: document.getElementById('firstname').value,
        lastName: document.getElementById('name').value,
        isAdmin: false
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
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('userId', response.userId);
            sessionStorage.setItem('firstName', response.firstName);
            sessionStorage.setItem('lastName', response.lastName);
            sessionStorage.setItem('isAdmin', response.isAdmin);
            window.location.href="home.html?id=" + response.userId;
        }).catch(error => alert("les valeurs rentrées ne sont pas bonnes"));

});


