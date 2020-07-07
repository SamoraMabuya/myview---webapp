alert('connection');

const commentform = document.querySelector('.messageBox');
const comments = document.querySelector('.messageBox .commentInput');
const submitbtn = document.querySelector('#submitbtn');



// hide();
commentform.addEventListener("submit", (e) => {
    MessageValidate(e);


function MessageValidate() {
    let commentsValue = comments.Value.trim();

}
    if (commentsValue === '') {
        console.log('NotV')
    }
});
comments.addEventListener("keyup", function(event) {
    let commentsValue = comments.Value;

    if (event.keyCode === 13) {
        if (commentsValue == '') {
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