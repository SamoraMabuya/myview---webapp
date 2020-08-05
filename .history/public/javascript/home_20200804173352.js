var server = "http://localhost:5502";
var io = io(server);

var messageArea = document.getElementById('inputMessage');

const output = document.getElementById('output')
const form = document.querySelector('.inputBox');


messageArea.addEventListener('keyup', function(e) {
    e.preventDefault(e);
    if (e.keyCode === 13 &&
        !e.shiftKey) {
        document.getElementById('PostButton').click();
    }
})
messageArea.addEventListener('input', function() {
    messageArea.style.height = 'auto';
    messageArea.style.height = this.scrollHeight + 0 + 'px';


})

function loadcomments() {
    fetch('http://localhost:5502' + '/get_messages')
        .then(response => {
            if (response.ok) {
                console.log('success')
                console.log(response);
            } else {
                console.log('failure')
            }
            return response.json();
        })
        .then(function(data) {

            io.emit("new_message", data)
            io.on("new_message", function(data) {
                console.log("Server says", data);
                output.innerHTML = '';
                data.forEach(function(user) {

                    var newUser = document.createElement("div");
                    var newName = document.createElement("h6");
                    var newDate = document.createElement("h6");
                    var newMessage = document.createElement("p");
                    var newOptions = document.createElement("button")
                    var newI = document.createElement("i")

                    newUser.className = 'output';
                    newName.className = 'username';
                    newDate.className = 'date';
                    newMessage.className = 'comments';
                    newIcon.className = 'fas fa-ellipsis-v';
                    newBtn.className = 'btnOptions';



                    var display_username = document.createTextNode(user.username);
                    var display_date = document.createTextNode(user.date);
                    var display_comments = document.createTextNode(user.comments);


                    newName.appendChild(display_username);
                    newDate.appendChild(display_date);
                    newMessage.appendChild(display_comments);

                    newUser.appendChild(newName);
                    newUser.appendChild(newDate);
                    newUser.appendChild(newMessage);
                    newUser.appendChild(newIcon);
                    newUser.appendChild(newBtn)
                    output.appendChild(newUser);
                    console.log(data);

                }).catch(function(error) {
                    console.log(error)

                })
            })
        })
}

form.addEventListener('submit', function(e) {

    e.preventDefault(e);
    loadcomments();

    let formMessage = new FormData(form);

    formMessage.append('api-key', 'myApiKey');


    fetch('http://localhost:5502', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ comments: messageArea.value })

    }).then(function(response) {
        console.log(response)
        console.log(JSON.stringify({ comments: messageArea.value }))
        return response.json()
    }).then(function(data) {
        console.log(data);
    }).catch(function(error) {
        console.log(error);
    });
})

document.getElementById('PostButton')
    .addEventListener('click', function() {
        loadcomments();
    })