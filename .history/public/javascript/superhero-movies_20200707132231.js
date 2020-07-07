alert('connection');

const commentform = document.querySelector('.messageBox');
const comments = document.querySelector('.messageBox .commentInput');
const submitbtn = document.querySelector('#submitbtn');



// hide();
commentform.addEventListener("submit", (e) => {
    MessageValidate(e);
    e.preventDefault();


function MessageValidate(e) {
    var commentsValue = comments.Value();
    if (commentsValue === '') {
        console.log('Message cannot be empty')
        e.preventDefault();

    }
}
comments.addEventListener("keyup", function(event) {
    var commentsValue = comments.Value();

    if (event.keyCode === 13) {
        if (commentsValue === '') {
            console.log('Messagebox is empty');
            e.preventDefault();

//         }
//     }
// })

// submitbtn.addEventListener('click', (e) => {
//     var commentsValue = comments.Value();

//     if (commentsValue === '') {
//     e.preventDefault();
//     console.log('Write something');
//     }
// });
// });
        
