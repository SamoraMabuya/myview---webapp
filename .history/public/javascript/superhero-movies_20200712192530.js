const commentform = document.querySelector('.messageBox');
const comments = document.querySelector('.messageBox .commentInput');
const submitbtn = document.querySelector('#submitbtn');


// var socket = io.connect("http://localhost:5500");

// var socket = io();


function loadComments() {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = this.responseText;
            var results = JSON.parse(result);


        }
    }

    results.forEach((comments) => {
        var node = document.createElement("div");
        var username = document.createElement("H5")
        var date = document.createElement("H6")
        var message = document.createElement("p");

        node.className = 'card-body';
        username.className = 'card-title';
        date.className = 'card-subtitle text-muted'

        var display_username = document.createTextNode('username: ' + users.username);
        var display_date = document.createTextNode('date: ' + users.date);
        var display_comments = document.createTextNode('comments: ' + users.comments);

        username.appendChild(display_username);
        date.appendChild(display_date);
        message.appendChild(display_comments);

        node.appendChild(username);
        node.appendChild(date);
        node.appendChild(message);

        document.getElementById('comments').appendChild(node);
    });
}

// xhttp.open("GET", "superhero-movies", true)
// xhttp.send();


commentform.addEventListener("submit", (e) => {
    message();

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
    }
});