alert('connection');

const commentform = document.querySelector('.messageBox');
const comments = document.querySelector('.messageBox .commentInput');
const submitbtn = document.querySelector('#submitbtn');



// hide();
commentform.addEventListener("submit", (e) => {
    MessageValidate(e);


function MessageValidate() {
    let commentsValue = comments.nodeValue.trim();

}
    if (commentsValue === '') {
        console.log('NotV')
    }
});
comments.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      console.log('NotV')
    }
})

submitbtn.addEventListener('click', (e) => {
    if (comments === 0) {
        console.log('NotV')
    // e.preventDefault();
    // console.log('NotV');
}
});