alert('connection');

const commentform = document.querySelector('.messageBox');
const comments = document.querySelector('.commentInput');
const submitbtn = document.querySelector('#submitbtn');



// hide();
commentform.addEventListener("submit", (e) => {
    e.preventDefault();

    if (comments === '') {
        console.log('NotV')
    }
});
comments.addEventListener("keyup", function(event) {
    event.preventDefault();

    if (event.comments === 0) {
      // Cancel the default action, if needed
      console.log('NotV')
    }
})

submitbtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('NotV');
});