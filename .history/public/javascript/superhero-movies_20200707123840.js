alert('connection');

const commentform = document.querySelector('.comment-form');
const comments = document.querySelector('.comment-wrapper .commentInput');


// hide();
commentform.addEventListener("submit", function (e) {
    var minChar = /^[a-zA-z]{1,}$/
    // let commentsValue = comments.value.trim();

    if (commentform === '') {
        // e.preventDefault();
        console.log('NotV')
    }
});

// function hide() {
//     comments.style.visibility = ('hidden')

// }