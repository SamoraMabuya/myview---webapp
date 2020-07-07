alert('connection');

const commentform = document.querySelector('.messageBox');
const comments = document.querySelector('.comment-wrapper .commentInput');


// hide();
commentform.addEventListener("submit", (e) => {

    if (comments === '') {
        // e.preventDefault();
        console.log('NotV')
    }
});

// function hide() {
//     comments.style.visibility = ('hidden')

// }