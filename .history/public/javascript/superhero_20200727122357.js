// const { response } = require("express");
// const uniqid = require('uniq');


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
const comments = document.getElementById('message')

function sendMessage() {

    io.emit("new_message", comments.value);

    return false;
}


io.on("new_message", function(message) {
    console.log("Server says", message);




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
        fetch('http://localhost:5502' + '/get_messages')
            .then(response => {
                // var data = JSON.parse(response);
                for (var a = 0; a < data.length; a++) {

                    var newUser = document.createElement("div");
                    var newName = document.createElement("h5");
                    var newDate = document.createElement("h5");
                    var newMessage = document.createElement("h6");

                    newName.textContent = data[a];
                    newDate.textContent = data[a];
                    newMessage.textContent = data[a];

                    output.appendChild(newName);
                    output.appendChild(newDate);
                    output.appendChild(newMessage);

                    output.appendChild(newUser);
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                    .catch(error => console.log('Error'))
            })
    })
})