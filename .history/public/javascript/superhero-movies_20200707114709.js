const commentform = document.querySelector('.comments');
const comments = document.querySelector('.comment-input');

commentform.addEventListener('keyup', function(e){
    var minChar = /^[a-zA-z]{1,}$/
    if(comments != (minChar)) {
        e.preventDefault();
    }
});