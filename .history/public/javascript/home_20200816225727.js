var server = "http://localhost:5502";
var io = io(server);

var messageArea = document.getElementById('inputMessage');

var output = document.querySelector('.output');
const form = document.querySelector('.inputBox');
const postbtn = document.querySelector('.PostButton');



clear();
outputEvents();
messageArea.addEventListener('keyup', function(e) {
    // e.preventDefault(e);
    if (e.keyCode === 13 &&
        !e.shiftKey) {
        postbtn.click();
        clear();

    }
})



messageArea.addEventListener('input', function() {
    messageArea.style.height = 'auto';
    messageArea.style.height = this.scrollHeight + 0 + 'px';


})

postbtn.addEventListener('click', function() {
    loadcomments();

})


function loadcomments() {
    let Messages = '';

    fetch('http://localhost:5502' + '/get_messages')
        .then(response => {
            if (response.ok) {
                console.log('success')
                console.log(response);
            } else {
                console.log('failure')
            }
            return response.json()
        })
        .then(function(data) {

            io.emit("new_message", data)
            io.on("new_message", function(data) {
                console.log("Server says", data);
                data.forEach(function(user) {

                    var newUser = document.createElement("div");
                    var newName = document.createElement("h6");
                    var newDate = document.createElement("h6");
                    var newIcon = document.createElement("i");
                    var newMessage = document.createElement("p");
                    var NewIconOptions = document.createElement("div")
                    var newEdit = document.createElement("button");
                    // var newEditIcon = document.createElement("i");
                    var newDelete = document.createElement("button");

                    newUser.className = 'output';
                    newUser.setAttribute('data-id', `${user.id}`)
                    newName.className = 'username';
                    newDate.className = 'date';
                    newIcon.className = "icon";
                    NewIconOptions.className = 'options';
                    newEdit.id = 'edit';
                    newDelete.id = 'delete';
                    newDelete.setAttribute('data-id', `${user.id}`)
                    newMessage.className = 'comments';


                    var display_username = document.createTextNode(user.username);
                    var display_date = document.createTextNode(user.date);
                    var display_comments = document.createTextNode(user.comments);

                    newName.appendChild(display_username);
                    newDate.appendChild(display_date);
                    newMessage.appendChild(display_comments);

                    newUser.appendChild(newName);
                    newUser.appendChild(newDate);
                    newUser.appendChild(newMessage);


                    NewIconOptions.appendChild(newEdit);
                    NewIconOptions.appendChild(newDelete);

                    newMessage.appendChild(NewIconOptions);


                    NewIconOptions.appendChild(newIcon);
                    output.appendChild(newUser);

                    console.log(data);
                })

            })
        })
}


form.addEventListener('submit', function(e) {

    e.preventDefault(e);
    loadcomments();

    let formMessage = new FormData(form);

    formMessage.append('api-key', 'myApiKey');


    fetch('http://localhost:5502', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ comments: messageArea.value })

    }).then(function(response) {
        console.log(response)
        console.log(JSON.stringify({ comments: messageArea.value }))
        return response.json()
    }).then(function(data) {
        console.log(data);
    }).then(clear());
}).catch(function(error) {
    console.log(error);
});




function clear() {
    document.getElementById('inputMessage').value = '';
    document.getElementById('inputMessage').style.height = "68px";
}

function outputEvents(e) {
    output.addEventListener('click', function(e) {
        const id = e.target.dataset.id;
        if (e.target.id === "delete") {
            fetch('http://localhost:5502/delete/' + id, {
                method: 'DELETE'
            }).then(function(response) {
                response.json()
                console.log(response)
            }).then(function(data) {
                console.log(data);
            }).catch(function(error) {
                console.log(error);
            })
        }
    })
}

//     let IconPressed = e.target.id = 'icon';


//     if (IconPressed) {
//         let id = 0;

//         document.getElementById('options').classList.add('is-hidden');
//         console.log(document.getElementById('options').classList.add('is-hidden') + id++);
//     }
// })




// const Icon = document.querySelectorAll('#icon');
// const Options = document.querySelectorAll('#options');

// Icon.forEach(function( item))
//     var i = 0;
//     i < Options.length;
//     i++;

//     for (var i = 0; i < Icon.length; i++) {
//         Options[i].classList.add('is-hidden');

//         console.log(Icon);
//         console.log(Options);
//     }
// }


// let iconPressed = e.target.id == "icon";
// let optionsPressed = e.target.id == "options";

// if (iconPressed) {
//     let d = optionsPressed.style.visibility = 'hidden';

//     d;




// output.innerHTML = '';
// data.forEach(function(user) {

// var newUser = document.createElement("div");
// var newName = document.createElement("h6");
// var newDate = document.createElement("h6");
// var newIcon = document.createElement("i");
// var newMessage = document.createElement("p");
// var newEdit = document.createElement("button");
// var newDelete = document.createElement("button");
// var NewIconOptions = document.createElement("div")
// newIcon.addEventListener('click', function() {
//     console.log('clicked');

// })


// newUser.className = 'output' ;
// newName.className = 'username';
// newDate.className = 'date';
// newIcon.setAttribute("class", "fas fa-ellipsis-v icon");
// NewIconOptions.className = 'options';
// newEdit.className = 'edit';
// newDelete.className = 'delete';
// newMessage.className = 'comments';

// var display_username = document.createTextNode(user.username);
// var display_date = document.createTextNode(user.date);
// var display_comments = document.createTextNode(user.comments);

// newName.appendChild(display_username);
// newDate.appendChild(display_date);
// newMessage.appendChild(display_comments);

// newUser.appendChild(newName);
// newUser.appendChild(newDate);
// newUser.appendChild(newMessage);


// NewIconOptions.appendChild(newEdit);
// NewIconOptions.appendChild(newDelete);

// newMessage.appendChild(NewIconOptions);


// newDate.appendChild(newIcon);
// output.appendChild(newUser);

// console.log(data);