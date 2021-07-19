fetch('http://localhost:3000/api/message/getmessage')
.then((response) => response.json())
.then((response) => {
    console.log(response)

    const messagesSection = document.getElementById('messages');
    
    for(let i = 0; i < response.messages.length; i++) {
        

        console.log(response.messages[i].content);



        let messageDiv = document.createElement('div');
        messageDiv.setAttribute('class', 'messages_card')
        messagesSection.appendChild(messageDiv);

        let content = document.createElement('h2');
        content.setAttribute('class', 'content');
        content.textContent = (response.messages[i].content);
        messageDiv.appendChild(content);

        let image = document.createElement('img');
        image.setAttribute('class', 'image_content');
        image.setAttribute('src', (response.messages[i].attachment));
        messageDiv.appendChild(image);
    }
});