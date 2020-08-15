var server = "http://localhost:5502";
var io = io(server);

var messageArea = document.getElementById('inputMessage');

var output = document.getElementById('output');
const form = document.querySelector('.inputBox');
const postbtn = document.querySelector('.PostButton');
var optionAppear = document.querySelector('.options');



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
                        <div class="options" id="options">
                            <button class="edit"><i class="fas fa-pencil-alt editIcon"></i> </button>
                            <button data-id="1234" class="delete"><i class="fas fa-trash deleteIcon"></i> </button>
                        </div>
                    </h6>
                    <p class="comments">${user.comments}</p>
                </div>`


                })

            })
        })
}


function removeMessage() {

    output.addEventListener('click', function(event) {
        let editButton = event.target.className === "edit";
        let deleteButton = event.target.className === "delete";
        let icon = event.target.className === "fas fa-ellipsis-v icon";
        let options = event.target.id === "options";



        if (deleteButton) {
            let id = event.target.parentElement.dataset.id;
            fetch(`http://localhost:5502/${id}`, {
                    method: 'DELETE',
                })
                .then(response => response.json())
                .then(data => console.log(data))
            console.log(id);
        } else if (icon) {
            console.log('happening');
            options.style.visibility = ("hidden");

        }

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