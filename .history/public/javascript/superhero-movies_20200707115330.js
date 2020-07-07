alert('connection');

const commentform = document.querySelector('.comment-form');
const comments = document.querySelector('.comment-input');

commentform.addEventListener("keyup", function(e){
    var minChar = /^[a-zA-z]{1,}$/
    let commentsValue = comments.value.trim();

    if(commentsValue === '') {
        // e.preventDefault();
        console.log('NotV')
    }
});