var socket = io.connect("http://localhost:5500");
var input_comments = document.getElementById("comments").value;
var btn = document.getElementById('send');

function userData() {
    return false;
}

socket.emit('chat', {
    comments: comments.value
});

return false;
}

socket.on("chat", function(data) {
    console.log(data);
})

btn.addEventListener("click", () => {
    socket.emit('chat', {
        comments: comments.value,

    })
    return false;
})

socket.on("chat", function(data) {
    console.log(input_comments);
})


// var comments = document.getElementById('comments');
// var handle = document.getElementById('username');
// var btn = document.getElementById('send');
// var output = document.getElementById('output');

// btn.addEventListener("click", () => {
//     socket.emit('chat', {
//         comments: comments.value,
//         username: username.value

//     });
//     return false;

// });


// socket.on('chat', function(data) {

//     output.innerHTML += '<P><strong>' + data.username + ': </strong>' + data.date + '</p>';
// })


// $.ajax({
//             url: socket + "/get_messages",
//             method: "GET",
//             success: function(response) {
//                     console.log(response);


//                     var string_results = JSON.parse(response);




//     }
// })
// function loadComments() {

//     var xhttp = new XMLHttpRequest();

//     xhttp.onreadystatechange = function() {
//             if (this.readyState == 4 && this.status == 200) {
//                 var result = this.responseText;
// var results = JSON.parse(results);


//                 results.forEach((comments) => {
//                     var node = document.createElement("div");
//                     var username = document.createElement("H5")
//                     var date = document.createElement("H6")
//                     var message = document.createElement("p");

//                     node.className = 'card-body';
//                     username.className = 'card-title';
//                     date.className = 'card-subtitle text-muted'

//                     var display_username = document.createTextNode(users.username);
//                     var display_date = document.createTextNode(users.date);
//                     var display_comments = document.createTextNode(users.comments);

//                     username.appendChild(display_username);
//                     date.appendChild(display_date);
//                     message.appendChild(display_comments);

//                     node.appendChild(username);
//                     node.appendChild(date);
//                     node.appendChild(message);

//                     document.getElementById('comments').appendChild(node);
//                 });
//             }