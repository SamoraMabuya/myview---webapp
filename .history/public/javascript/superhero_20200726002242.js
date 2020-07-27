// const { response } = require("express");
// const uniqid = require('uniq');

// const e = require("express");

// const { response } = require("express");

// var server = "http://localhost:5502";
// var io = io(server);






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

// send message from client
//     io.emit("new_message", comments.value);
// }

// io.on("new_message", function(message) {

//     console.log("Server says ", message);
const output = document.getElementById('output');
const username = document.querySelector('#username');
const date = document.querySelector('#date');
const submitbtn = document.querySelector('#submitbtn');
const commentOutput = document.querySelector('#message');
const form = document.querySelector('#form');
const message = document.getElementById('message')


form.addEventListener('submit', function(e) {
    e.preventDefault(e);


    let formMessage = new FormData(form);

    formMessage.append('api-key', 'myApiKey');


    fetch('http://localhost:5502/superhero', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ comments: message.value })

    }).then(function(response) {
        console.log(response)
        console.log(JSON.stringify(comments))
        return response.text();
    }).then(function(text) {
        console.log(text);
        console.log(JSON.stringify(comments))
    }).catch(function(error) {
        console.log(JSON.stringify(comments))
        console.log(error);
    });
})

var newUser = document.createElement("div");
var newName = document.createElement("h5");
var newDate = document.createElement("h5");
var newMessage = document.createElement("h6");

newName.textContent = comments.value;
newDate.textContent = comments.value;
newMessage.textContent = comments.value;

output.appendChild(newName);
output.appendChild(newDate);
output.appendChild(newMessage);

output.appendChild(newUser);