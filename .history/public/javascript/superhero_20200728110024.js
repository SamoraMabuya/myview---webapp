// const { response } = require("express");
// const uniqid = require('uniq');

// const { load } = require("dotenv/types");


// const { json } = require("express");

// const { body } = require("express-validator/check");

// const { response } = require("express");

// const { response } = require("express");

// const { response } = require("express");

// const e = require("express");

// const { response } = require("express");

var server = "http://localhost:5502";
var io = io(server);

const output = document.getElementById('output');
const username = document.querySelector('#username');
const date = document.querySelector('#date');
const submitbtn = document.querySelector('#submitbtn');
const commentOutput = document.querySelector('#message');
const form = document.querySelector('#form');
const comments = document.getElementById('message');

// loadcomments();

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
            document.getElementById('output').innerHTML = '';

            data.forEach(function(user) {


                var newUser = document.createElement("div");
                var newName = document.createElement("h5");
                var newDate = document.createElement("h5");
                var newMessage = document.createElement("h6");

                var display_username = document.createTextNode(user.username);
                var display_date = document.createTextNode(user.date);
                var display_comments = document.createTextNode(user.comments);

                newName.appendChild(display_username);
                newDate.appendChild(display_date);
                newMessage.appendChild(display_comments);

                newUser.appendChild(newName);
                newUser.appendChild(newDate);
                newUser.appendChild(newMessage);

                output.appendChild(newUser);

                console.log(data);

            }).catch(function(error) {
                console.log(error)

            })
        })
}



// function sendMessage() {

//     io.emit("new_message", comments.value);

//     return false;
// }


// io.on("new_message", function(message) {
//     console.log("Server says", message);
// })



form.addEventListener('submit', function(e) {
    e.preventDefault(e);
    loadcomments();



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