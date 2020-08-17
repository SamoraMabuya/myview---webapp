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
                output.innerHTML = '';
                data.forEach(function(user) {

                    var newUser = document.createElement("div");
                    var newName = document.createElement("h6");
                    var newDate = document.createElement("h6");

                    var newIcon = document.createElement("i");
                    var NewIconOptions = document.createElement("div")

                    var newEditIcon = document.createElement("i");
                    var newDeleteIcon = document.createElement("i");
                    var newEdit = document.createElement("button");
                    var newDelete = document.createElement("button");

                    var newMessage = document.createElement("p");


                    newUser.className = 'output';
                    newUser.setAttribute('data-id', `${user.id}`);

                    newName.className = 'username';
                    newName.setAttribute('data-id', `${user.username}`);

                    newDate.className = 'date';
                    newDate.setAttribute('data-id', `${user.date}`);


                    newIcon.setAttribute("class", "fas fa-ellipsis-v icon");
                    NewIconOptions.className = 'options';

                    newEditIcon.setAttribute("class", "fas fa-pencil-alt editIcon");
                    newDeleteIcon.setAttribute("class", "fas fa-trash deleteIcon")

                    newEdit.id = 'edit';
                    newEdit.setAttribute('data-id', `${user.id}`);

                    newDelete.id = 'delete';
                    newDelete.setAttribute('data-id', `${user.id}`);

                    newMessage.className = 'comments';
                    newMessage.setAttribute('data-id', `${user.comments}`);


                    var display_username = document.createTextNode(user.username);
                    var display_date = document.createTextNode(user.date);
                    var display_comments = document.createTextNode(user.comments);

                    newName.appendChild(display_username);
                    newDate.appendChild(display_date);
                    newMessage.appendChild(display_comments);

                    newUser.appendChild(newName);
                    newUser.appendChild(newDate);
                    newUser.appendChild(newMessage);

                    newDate.appendChild(newIcon);
                    newDate.appendChild(NewIconOptions);

                    newEdit.appendChild(newEditIcon);
                    newDelete.appendChild(newDeleteIcon);

                    NewIconOptions.appendChild(newEdit);
                    NewIconOptions.appendChild(newDelete);

                    output.appendChild(newUser);

                    newIcon.onmouseover = () => NewIconOptions.classList.add('is-visible');
                    newIcon.onmouseleave = () => NewIconOptions.classList.remove('is-visible');
                    NewIconOptions.onmousemove = () => NewIconOptions.classList.add('is-visible');
                    NewIconOptions.onmouseleave = () => NewIconOptions.classList.remove('is-visible');

                    newEdit.onclick = function() {
                        editBox();
                    }
                    console.log(data);


                }).catch(function(error) {
                    console.log(error)
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

function outputEvents() {

    editMessage(e);

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

function editBox() {
    const updateComment = document.querySelector('#updateBox');
    const discard = document.querySelector('#Discard');
    updateComment.hidden = false;


    discard.onclick = function() {
        updateComment.hidden = true;
        alert('discard');
    }
}

function editMessage(e) {
    const grand = e.target.parentNode.parentNode;
    if (e.target.id == 'edit') {
        let thisComment = grand.querySelector('.comments').textContent;
        console.log(thisComment);

    }
}

// function save(e) {
//     if (e.target.id === 'edit') {
//         editMessage(e.target.dataset.id);
//         console.log(editMessage);
//         editMessage(id);
//     }
// }

// function editMessage(id) {
//     const save = document.querySelector('#Save').dataset.id = id;

//     save.addEventListener('click', function() {
//         const updateMessage = document.querySelector('#updateMessage');

//         fetch('http://localhost:5502/update', {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             },
//             body: JSON.stringify({
//                     id: updateMessage.dataset.id,
//                     comments: updateMessage.value
//                 }).then(response => response.json())
//                 .then(data => {
//                     console.log('saved')
//                 })
//         })
//     })
// }