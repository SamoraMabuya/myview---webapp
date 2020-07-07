alert('connection');

const commentform = document.querySelector('.comments');
const comments = document.querySelector('.comment-form .commentInput');

commentform.addEventListener("keyup", function(e){
    var minChar = /^[a-zA-z]{1,}$/
    // let commentsValue = comments.value.trim();

    if(commentsValue === '') {
        e.preventDefault();
        console.log('NotV')
    }
});