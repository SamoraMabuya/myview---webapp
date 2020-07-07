const commentform = document.querySelector('.messageBox');
const comments = document.querySelector('.messageBox .commentInput');
const submitbtn = document.querySelector('#submitbtn');


var server = "http://localhost:5500";
var io = io(server)

function sendMessage() {

    io.emit("new message", comment);

    return false;

}

io.emit("new_message", function (data) {
    console.log("Server says", data)

})

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