alert('connection');

const commentform = document.querySelector('#commentForm');
const comments = document.querySelector('#commentForm #commentInput');


hide_elements();

function hide_elements() { 
commentform.style.visibility = ("hidden");
comments.style.visibility = ("hidden");


// commentform.addEventListener("submit", function(e){
//     var minChar = /^[a-zA-z]{1,}$/
//     let commentsValue = comments.value.trim();

//     if(commentsValue === '') {
//         e.preventDefault();
//         console.log('NotV')
//     }
// });