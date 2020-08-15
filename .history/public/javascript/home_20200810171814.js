var server = "http://localhost:5502";
var io = io(server);

var messageArea = document.getElementById('inputMessage');

var output = document.querySelector('.output');
const form = document.querySelector('.inputBox');
const postbtn = document.querySelector('.PostButton');

clear();
outputEvents();
loadcomments();
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
                 <div class="output">
                    <h6 class="username">${user.username}</h6>
                    <h6 class="date"> ${user.date}
                        <i class="fas fa-ellipsis-v icon"></i>
                        <div class="options">
                        <button class="edit"><i class="fas fa-pencil-alt editIcon"></i> </button> 
                        <button class="delete"><i class="fas fa-trash deleteIcon"></i> </button> 
                        </div>
                    </h6>
                    <p class="comments">${user.comments}
                    </p>
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

// function outputEvents() {
//     output.addEventListener('click', function(e) {
//         let icon = e.target.class == 'fas fa-ellipsis-v icon';
//         let deletebtnPressed = e.target.id == 'delete';
//         let editbtnPressed = e.target.id == 'edit';

//         if (deletebtnPressed) {
//             console.log('removed');
//         } else if (icon) {
//             console.log('options is now visible');
//         }
//     })
// }