alert('connection');

const commentform = document.querySelector('.messageBox');
const comments = document.querySelector('.commentInput');


// hide();
comments.addEventListener("submit", (e) => {

    if (e.comments === '') {
        // e.preventDefault();
        console.log('NotV')
    }
});

// function hide() {
//     comments.style.visibility = ('hidden')

// }