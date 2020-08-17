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
                    Messages += `       
                 <div class="output" data-id=${user.id}>
                    <h6 class="username">${user.username}</h6>
                    <h6 class="date"> ${user.date}
                    <a href="#"><i class="fas fa-ellipsis-v icon" id="icon" data-id=${user.id}></i></a>
                    <div                 
                    class="options" id="options" data-id=${user.id}>
                        <a href="#"><button id="edit" data-id=${user.id}><i class="fas fa-pencil-alt editIcon"></i> </button> </a>
                        <a href="#"><button id="delete" data-id=${user.id}><i class="fas fa-trash deleteIcon"></i> </button> </a>
                        </div>
                    </h6>
                    <p class="comments">${user.comments}</p>
                 </div>
                    `;
                });
                output.innerHTML = Messages;
                console.log(data);


            }).catch(function(error) {
                console.log(error)

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
            let iconPressed = e.target.id == "icon";
            let options = e.target.id == "options";


            if (iconPressed) {
                if (options) {
                    options.classList.add('hide');
                    console.log(options);


                }



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

    // output.innerHTML = '';
    // data.forEach(function(user) {

    //     var newUser = document.createElement("div");
    //     var newName = document.createElement("h6");
    //     var newDate = document.createElement("h6");
    //     var newIcon = document.createElement("i");
    //     var newMessage = document.createElement("p");
    //     var newEdit = document.createElement("button");
    //     var newDelete = document.createElement("button");
    //     var NewIconOptions = document.createElement("div")
    //     newIcon.addEventListener('click', function() {
    //         console.log('clicked');

    //     })


    //     newUser.className = 'output' ;
    //     newName.className = 'username';
    //     newDate.className = 'date';
    //     newIcon.setAttribute("class", "fas fa-ellipsis-v icon");
    //     NewIconOptions.className = 'options';
    //     newEdit.className = 'edit';
    //     newDelete.className = 'delete';
    //     newMessage.className = 'comments';

    //     var display_username = document.createTextNode(user.username);
    //     var display_date = document.createTextNode(user.date);
    //     var display_comments = document.createTextNode(user.comments);

    //     newName.appendChild(display_username);
    //     newDate.appendChild(display_date);
    //     newMessage.appendChild(display_comments);

    //     newUser.appendChild(newName);
    //     newUser.appendChild(newDate);
    //     newUser.appendChild(newMessage);


    //     NewIconOptions.appendChild(newEdit);
    //     NewIconOptions.appendChild(newDelete);

    //     newMessage.appendChild(NewIconOptions);


    //     newDate.appendChild(newIcon);
    //     output.appendChild(newUser);

    //     console.log(data);