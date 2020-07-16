const commentform = document.querySelector('#main-content');
const comments = document.querySelector('.form-group .form-control');
const sendbtn = document.querySelector('#sendbtn');
var message = document.querySelector('#message');

var socket = io.connect("http://localhost:5500");

var socket = io();


commentform.addEventListener("submit", (e) => {
    message();
    console.log('form is submitted')

});

function message() {
    let commentsValue = comments.value.trim();
    if (commentsValue === '') {
        // e.preventDefault();
        console.log('Box is empty');

    }
}
comments.addEventListener("keyup", function(e) {
    let commentsValue = comments.value.trim();
    if (e.keyCode === 13) {
        submitbtn.click();
        console.log('Is Valid')
    } else if (commentsValue === '') {
        // e.preventDefault();
        console.log('NotValid')
    }
})

submitbtn.addEventListener('click', (e) => {
    let commentsValue = comments.value.trim();
    if (commentsValue === '') {
        // e.preventDefault();
        console.log('Write something')
        console.log('NotV');
    } else {
        socket.emit('user_comment', {
            message: message.value
        })
        console.log('comments sent')
    }
});


socket.on('user_comment', function(data) {
    oup
})


function loadComments() {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var result = this.responseText;
                var results = JSON.parse(results);


                results.forEach((comments) => {
                    var node = document.createElement("div");
                    var username = document.createElement("H5")
                    var date = document.createElement("H6")
                    var message = document.createElement("p");

                    node.className = 'card-body';
                    username.className = 'card-title';
                    date.className = 'card-subtitle text-muted'

                    var display_username = document.createTextNode(users.username);
                    var display_date = document.createTextNode(users.date);
                    var display_comments = document.createTextNode(users.comments);

                    username.appendChild(display_username);
                    date.appendChild(display_date);
                    message.appendChild(display_comments);

                    node.appendChild(username);
                    node.appendChild(date);
                    node.appendChild(message);

                    document.getElementById('comments').appendChild(node);
                });
            }