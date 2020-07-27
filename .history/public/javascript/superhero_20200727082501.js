// const { response } = require("express");
// const uniqid = require('uniq');

// const { body } = require("express-validator/check");

// const { response } = require("express");

// const { response } = require("express");

// const { response } = require("express");

// const e = require("express");

// const { response } = require("express");

var server = "http://localhost:5502";
var io = io(server);






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


//     console.log("Server says ", message);
const output = document.getElementById('output');
const username = document.querySelector('#username');
const date = document.querySelector('#date');
const submitbtn = document.querySelector('#submitbtn');
const commentOutput = document.querySelector('#message');
const form = document.querySelector('#form');
const comments = document.getElementById('message')

function sendMessage() {

    io.emit("new_message", comments.value);

    return false;
}


io.on("new_message", function(message) {
    console.log("Server says", message);
})

form.addEventListener('submit', function(e) {
    e.preventDefault(e);
    sendMessage();


    let formMessage = new FormData(form);

    formMessage.append('api-key', 'myApiKey');


    fetch('http://localhost:5502/superhero', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ comments: comments.value })

    }).then(function(response) {
        console.log(response)
        console.log(JSON.stringify({ comments: comments.value }))
        return response.json()
    }).then(function(data) {
        console.log(data);
    }).catch(function(error) {
        console.log(error);
    });
})



submitbtn.addEventListener('click', function() {
    fetch('http://localhost:5502/superhero')
        .then(response => {
            if (response.ok) {
                console.log('success')
            } else {
                console.log('failure')
            }
            console.log(response.json());
        })
        .then(data =>
            console.log(data))
        .catch(error => console.log('Error'))


    var newUser = document.createElement("div");
    var newName = document.createElement("h5");
    var newDate = document.createElement("h5");
    var newMessage = document.createElement("h6");

    newName.textContent = comments.value;
    newDate.textContent = message.value;
    newMessage.textContent = message.value;

    output.appendChild(newName);
    output.appendChild(newDate);
    output.appendChild(newMessage);

    output.appendChild(newUser);
})