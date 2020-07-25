var server = "http://localhost:5500";
var io = io(server);


const output = document.getElementById('output');
let username = document.querySelector('#username');
let date = document.querySelector('#date');
let comments = document.querySelector('#comments');
let submitbtn = document.querySelector('#submitbtn');
let commentOutput = document.querySelector('#message');
let form = document.querySelector('.inputs');



function sendMessage() {
    // send message from client
    io.emit("new_message", comments.value);
    return false
}

$.ajax({
    url: server + "/get_messages",
    method: "GET",
    succees: function(response) {
        console.log(response);

        var messages = JSON.parse(response);
        for (var a = 0; a < messages.length; a++) {

            var newName = document.createElement("h5");
            var newDate = document.createElement("h5");
            var newMessage = document.createElement("h6");

            newName.textContent = messages.username[a];
            newDate.textContent = message.date[a];
            newMessage.textContent = messages.comments[a];

            // newName = document.createTextNode(user.username);
            // newDate = document.createTextNode(object.date);
            // newMessage = document.createTextNode(object.comments);
            // console.log(newName, newDate, newMessage)

            output.appendChild(newName);
            output.appendChild(newDate);
            output.appendChild(newMessage);

        }
    }
})

io.on("new_message", function(message) {
    console.log("Server says ", message);
})

submitbtn.addEventListener('click', function() {
    sendMessage();
    var newName = document.createElement("h5");
    var newDate = document.createElement("h5");
    var newMessage = document.createElement("h6");

    newName.textContent = comments.value;
    newDate.textContent = comments.value;
    newMessage.textContent = comments.value;

    // newName = document.createTextNode(user.username);
    // newDate = document.createTextNode(object.date);
    // newMessage = document.createTextNode(object.comments);
    // console.log(newName, newDate, newMessage)

    output.appendChild(newName);
    output.appendChild(newDate);
    output.appendChild(newMessage);
})