// const { response } = require("express");
// const uniqid = require('uniq');

var server = "http://localhost:5500";
var io = io(server);


var output = document.getElementById('output');
var username = document.querySelector('#username');
var date = document.querySelector('#date');
var submitbtn = document.querySelector('#submitbtn');
var commentOutput = document.querySelector('#message');
var form = document.querySelector('#form');
var comments = document.querySelector('#comments');





// $.ajax({
//     url: server + "/get_messages",
//     method: "GET",
//     succees: function(response) {
//         console.log(response);

//         var messages = JSON.parse(response);
//         for (var a = 0; a < messages.length; a++) {

//             var newName = document.createElement("h5");
//             var newDate = document.createElement("h5");
//             var newMessage = document.createElement("h6");

//             newName.textContent = messages.username[a];
//             newDate.textContent = message.date[a];
//             newMessage.textContent = messages.comments[a];

// newName = document.createTextNode(user.username);
// newDate = document.createTextNode(object.date);
// newMessage = document.createTextNode(object.comments);
// console.log(newName, newDate, newMessage)

//     output.appendChild(newName);
//     output.appendChild(newDate);
//     output.appendChild(newMessage);

// }

function sendMessage() {
    // send message from client

    fetch('/superhero-movies', {
        method: 'POST',
        body: JSON.stringify(comments)
    }).then(response => response.text().then(response => {
        console.log(text);

    }))

    var newName = document.createElement("h5");
    var newDate = document.createElement("h5");
    var newMessage = document.createElement("h6");

    newName.textContent = comments.value;
    newDate.textContent = comments.value;
    newMessage.textContent = comments.value;


    output.appendChild(newName);
    output.appendChild(newDate);
    output.appendChild(newMessage);
}
submitbtn.addEventListener('click', sendMessage, false);

form.addEventListener('onsubmit', sendMessage, false);