alert('connection');

const commentform = document.querySelector('.messageBox');
const comments = document.querySelector('.commentInput');


// hide();
commentform.addEventListener("submit", (e) => {

    if (e.comments === '') {
        // e.preventDefault();
        console.log('NotV')
    }
});
comments.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.comments === 0) {
      // Cancel the default action, if needed
      event.preventDefault();
// function hide() {
//     comments.style.visibility = ('hidden')

// }