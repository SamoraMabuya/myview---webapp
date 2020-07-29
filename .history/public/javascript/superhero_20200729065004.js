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

            io.emit("new_message", comments.value)


            io.on("new_message", function(results) {
                console.log("Server says", results);

                data.forEach(function(user) {
                    output.innerHTML = '';

                    var newUser = document.createElement("div");
                    var newName = document.createElement("h5");
                    var newDate = document.createElement("h5");
                    var newMessage = document.createElement("h6");

                    var display_username = document.createTextNode(`${user.username}`);
                    var display_date = document.createTextNode(`${user.date}`);
                    var display_comments = document.createTextNode(`${user.comments}`);


                    newName.appendChild(display_username);
                    newDate.appendChild(display_date);
                    newMessage.appendChild(display_comments);

                    newUser.appendChild(newName);
                    newUser.appendChild(newDate);
                    newUser.appendChild(newMessage);
                    output.appendChild(newUser);

                    console.log(mess);

                }).catch(function(error) {
                    console.log(error)

                })
            })
        })
}

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
    loadcomments();
})