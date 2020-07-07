alert('connection');

const commentform = document.querySelector('#commentForm');
const comments = document.querySelector('#commentInput');

commentform.addEventListener("submit", function(e){
    var minChar = /^[a-zA-z]{1,}$/
    let commentsValue = comments.value.trim();

    if(commentsValue === '') {
        e.preventDefault();
        console.log('NotV')
    }
});