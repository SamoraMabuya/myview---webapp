var server = "http://localhost:5500";
var io = io(server);


const output = document.getElementById('output');
let username = document.querySelector('#username');
let date = document.querySelector('#date');
let comments = document.querySelector('#comments');
let submitbtn = document.querySelector('#submitbtn');
let commentOutput = document.querySelector('#message');


function sendMessage() {

    io.emit("new_message", message)

    // return false
}
io.emit("new_message", "Hello server");
io.on("new_message", function(message) {
    console.log("Server says ", message);
})

submitbtn.addEventListener('click', function() {
    var newName = document.createElement("h5");
    var newDate = document.createElement("h5");
    var newMessage = document.createElement("h6");

    newName.innerHTML = comments.value;
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