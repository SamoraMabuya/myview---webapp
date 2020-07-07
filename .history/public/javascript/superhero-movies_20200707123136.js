alert('connection');

const commentform = document.querySelector('.comments');
const comments = document.querySelector('.comment-form .commentInput');

comments.style.visibility = ('hidden;')
commentform.addEventListener("keyup", function(e){
    var minChar = /^[a-zA-z]{1,}$/
    // let commentsValue = comments.value.trim();

    if(comments === '') {
        e.preventDefault();
        console.log('NotV')
    }
});