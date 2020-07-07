const commentform = document.querySelector('.comments');
const comments = document.querySelector('.comment-input');

comments.addEventListener("keyup", function(e){
    var minChar = /^[a-zA-z]{1,}$/
    if(comments.match(minChar)) {
        e.preventDefault();
        console.log('NotV')
    }
});