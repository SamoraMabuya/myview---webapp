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
// var io = io(server);

var socket = io();







const output = document.getElementById('output');
const username = document.querySelector('#username');
const date = document.querySelector('#date');
const submitbtn = document.querySelector('#submitbtn');
const commentOutput = document.querySelector('#message');
const form = document.querySelector('#form');
const comments = document.getElementById('message')


socket.on('broadcast', function(data) {
    document.body.innerHTML = '';
    document.write(data.description);

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
    sendMessage();
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
            var newUser = document.createElement("div");
            var newName = document.createElement("h5");
            var newDate = document.createElement("h5");
            var newMessage = document.createElement("h6");

            data.forEach(function(user) {

                newName.textContent = `${user.username}`;
                newDate.textContent = `${user.date}`;
                newMessage.textContent = data;

                newUser.appendChild(newName);
                newUser.appendChild(newDate);
                newUser.appendChild(newMessage);

                output.appendChild(newUser);

                console.log(data);

            }).catch(function(error) {
                console.log(error)

            })
        })
})