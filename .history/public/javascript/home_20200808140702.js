var server = "http://localhost:5502";
var io = io(server);

var messageArea = document.getElementById('inputMessage');

var output = document.getElementById('output');
const form = document.querySelector('.inputBox');
const postbtn = document.querySelector('.PostButton');



removeMessage();

messageArea.addEventListener('keyup', function(e) {
    e.preventDefault(e);
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

})

clear();

function loadcomments() {
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

            io.emit("new_message", data)
            io.on("new_message", function(data) {
                console.log("Server says", data);
                data.forEach(function(user) {
                    output.innerHTML += `                    
                <div class="output" id="output" data-id=${user.id}>
                    <h6 class="username">${user.username}</h6>
                    <h6 class="date"> ${user.date}
                        <i class="fas fa-ellipsis-v icon"></i>
                        <div class="options">
                            <button class="edit"><i class="fas fa-pencil-alt editIcon"></i> </button>
                            <button data-id="1234" class="delete"><i class="fas fa-trash deleteIcon"></i> </button>
                        </div>
                    </h6>
                    <p class="comments">${user.comments}</p>
                </div>`


                    //     var newName = document.createElement("h6");
                    //     var newDate = document.createElement("h6");
                    //     var newIcon = document.createElement("i");
                    //     var newMessage = document.createElement("p");
                    //     var newEdit = document.createElement("button");
                    //     var newDelete = document.createElement("button");
                    //     var NewIconOptions = document.createElement("div")
                    //     var NewEditIcon = document.createElement("i");
                    //     var NewDeleteIcon = document.createElement("i")



                    //     newUser.className = "output";
                    //     newName.className = 'username';
                    //     newDate.className = 'date';
                    //     newIcon.setAttribute("class", "fas fa-ellipsis-v icon");
                    //     NewIconOptions.className = 'options';
                    //     newEdit.className = 'edit';
                    //     NewEditIcon.setAttribute("class", "fas fa-pencil-alt editIcon");
                    //     newDelete.className = 'delete';
                    //     NewDeleteIcon.setAttribute("class", "fas fa-trash deleteIcon");
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

                    //     newDate.appendChild(newIcon);
                    //     newDate.appendChild(NewIconOptions);

                    //     NewIconOptions.appendChild(newEdit);
                    //     NewIconOptions.appendChild(newDelete);

                    //     newEdit.appendChild(NewEditIcon);
                    //     newDelete.appendChild(NewDeleteIcon);

                    //     output.appendChild(newUser);

                    //     newIcon.addEventListener('click', function() {
                    //         NewIconOptions.style.visibility = ("visible");
                    //         console.log('clicked');

                    //     })

                    //     console.log(data);

                    // }).catch(function(error) {
                    //     console.log(error)

                })

            })
        })
}

function removeMessage() {

    output.addEventListener('click', function(event) {
        let editButton = event.target.className === "edit";
        let deleteButton = event.target.className === "delete";
        let icon = event.target.className === "fas fa-ellipsis-v icon";
        let IconOptions = event.target.className === "options";



        if (deleteButton) {
            let id = event.target.parentElement.dataset.id;
            fetch(`http://localhost:5502/${id}`, {
                    method: 'DELETE',
                })
                .then(response => response.json())
                .then(data => console.log(data))
        } else if (icon) {
            IconOptions.style.visibility = ("visible");

        }
        // console.log(id);

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
        body: ({ comments: messageArea.value })

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