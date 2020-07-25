var output = document.querySelector('#output');
var username = document.querySelector('#username');
var date = document.querySelector('#date');
var comments = document.querySelector('#comments');
var submitbtn = document.querySelector('#submitbtn');
var commentOutput = document.querySelector('#message')


submitbtn.addEventListener("click", function() {

    var newUser = document.createElement("div");
    var newName = document.createElement("h5");
    var newDate = document.createElement("h5");
    var newMessage = document.createElement("p");

    newName.innerHTML = comments.value;
    newDate.innerHTML = comments.value;
    newMessage.innerHTML = comments.value;

    commentOutput.appendChild(newName);
    commentOutput.appendChild(newDate);
    commentOutput.appendChild(newMessage);
    output.appendChild(newUser);


})






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