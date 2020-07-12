const commentform = document.querySelector('.messageBox');
const comments = document.querySelector('.messageBox .commentInput');
const submitbtn = document.querySelector('#submitbtn');


// var socket = io.connect("http://localhost:5500");

// var socket = io();





commentform.addEventListener("submit", (e) => {
    message();

});

function message() {
    let commentsValue = comments.value.trim();
    if (commentsValue === '') {
        // e.preventDefault();
        console.log('Box is empty');

    }
}
comments.addEventListener("keyup", function(e) {
    let commentsValue = comments.value.trim();
    if (e.keyCode === 13) {
        submitbtn.click();
        console.log('Is Valid')
    } else if (commentsValue === '') {
        // e.preventDefault();
        console.log('NotValid')
    }
})

submitbtn.addEventListener('click', (e) => {
    let commentsValue = comments.value.trim();
    if (commentsValue === '') {
        // e.preventDefault();
        console.log('Write something')
        console.log('NotV');
    }
});