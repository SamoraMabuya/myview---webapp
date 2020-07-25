var socket = io.connect("http://localhost:5500");

var comments = document.getElementById('comments');
handle = document.getElementById('handle');
btn = document.getElementById('send');
output = document.getElementById('output');

btn.addEventListener("click", () => {
    socket.emit('chat', {
        comments: comments.value,
        handle: handle.value,

    });

    return false;

});

socket.on('chat', function(data) {

    output.innerHTML += '<P><strong>' + data.handle + ': </strong>' + data.comments + '</p>';
})

$.ajax({
        url: socket + "/get_messages",
        method: "GET",
        success: function(response) {
            console.log(response);


            var results = JSON.parse(results);


            output.innerHTML += '<P><strong>' + handle.username + ': </strong>' + data.comments + '</p>';



        }
    })
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