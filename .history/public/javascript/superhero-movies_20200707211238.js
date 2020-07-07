const commentform = document.querySelector('.messageBox');
const comments = document.querySelector('.messageBox .commentInput');
const submitbtn = document.querySelector('#submitbtn');

var server = "http://localhost:5500";
io = SocketIO(server);

io.emit("new message", "Hello server");

commentform.addEventListener("submit", (e) => {
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
    if (event.keyCode === 13) {
        if (commentsValue === '') {
            e.preventDefault();
            console.log('NotV')
        }
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