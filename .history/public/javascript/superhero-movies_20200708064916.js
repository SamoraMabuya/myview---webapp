const commentform = document.querySelector('.messageBox');
const comments = document.querySelector('.messageBox #message');
const submitbtn = document.querySelector('#submitbtn');


var server = "http://localhost:5500";
var io = io(server);

sendMessage();
function sendMessage() {
    var message = document.querySelector('.messageBox .commentInput');

    io.emit("new_message", message.value);
    
    return false;
}
$.ajax({
    url: server + "/superhero-movies",
    method: "GET",
    success: function(response) {
        ;console.log(response)
    }
});
    
io.on("new_message", function (data) {
    console.log("Server says", data);

    var displaydata = document.querySelector('.user-comments #messages');
    displaydata.innerHTML = data;

    var message = document.querySelector('#message');
    message.appendChild(displaydata);


});

commentform.addEventListener("submit", (e) => {
    e.preventDefault();
    message(e);

});
function message(e) {
    let commentsValue = comments.value.trim();
    if (commentsValue === '') {
        e.preventDefault();
        console.log('Box is empty');
        
    }
}
comments.addEventListener("keyup", function (e) {
    let commentsValue = comments.value.trim();
    if (e.keyCode === 13) {
        submitbtn.click();
    } else if (commentsValue === '') {
            e.preventDefault();
            console.log('NotValid')
        }
    })

submitbtn.addEventListener('click', (e) => {
    let commentsValue = comments.value.trim();
    if (commentsValue === '') {
        e.preventDefault();
        console.log('Write something')
    console.log('NotV');
}
});