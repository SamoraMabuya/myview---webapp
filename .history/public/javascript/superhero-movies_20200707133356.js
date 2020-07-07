alert('connection');

const commentform = document.querySelector('.messageBox');
const comments = document.querySelector('.messageBox .commentInput');
const submitbtn = document.querySelector('#submitbtn');



// hide();
commentform.addEventListener("submit", (e) => {
    e.preventDefault(;)
    let commentsValue = comments.Value.trim();
    if (commentsValue === '') {
        console.log('Box is empty')
    }
})
comments.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        if (commentsValue === '') {
      console.log('NotV')
    }
}
})

// submitbtn.addEventListener('click', (e) => {
//     if (comments === 0) {
//         console.log('NotV')
//     // e.preventDefault();
//     // console.log('NotV');
// }
// });