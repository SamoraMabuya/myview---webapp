const output = document.getElementById('output');
let username = document.querySelector('#username');
let date = document.querySelector('#date');
let comments = document.querySelector('#comments');
let submitbtn = document.querySelector('#submitbtn');
let commentOutput = document.querySelector('#message');

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var object = JSON.parse(this.responseText);
        console.log(object);


        document.getElementById('output').innerHTML = '';



        var results = JSON.parse(object);

        results.forEach((user) =>

            {



                var newName = document.createElement("h5");
                var newDate = document.createElement("h5");
                let newMessage = document.createElement("h6");

                // newName.textContent = comments.value;
                // newDate.textContent = comments.value;
                // newMessage.textContent = comments.value;

                newName = document.createTextNode(user.username);
                newDate = document.createTextNode(user.date);
                newMessage = document.createTextNode(user.comments);

                output.appendChild(newName);
                output.appendChild(newDate);
                output.appendChild(newMessage);
            });
    }
}

xmlhttp.open("GET", "/superhero-movies", true);
xmlhttp.send();

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