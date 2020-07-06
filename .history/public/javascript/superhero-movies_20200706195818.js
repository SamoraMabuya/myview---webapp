var server = "http://localhost5500";
var io = io(server);

function sendcomment() {
    var message = document.querySelector('#message');

    io.emit("new_message", message.value);

    return false;
}

io.on("new message", function (data) {
    console.log("Server says", data);

    var messages = element('messages')
});