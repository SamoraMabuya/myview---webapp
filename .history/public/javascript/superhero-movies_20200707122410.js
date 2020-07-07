alert('connection');

const commentform = document.querySelector('#allcomments-container .user-comments').style.visibility = 'hidden';
const comments = document.querySelector('#commentForm .commentInput');

var hide = document.getElementsByClassName('.commentInput');


hide_elements();

function hide_elements() { 
hide.style.visibility = ("hidden");
hide.style.visibility = "hidden";
}

// commentform.addEventListener("submit", function(e){
//     var minChar = /^[a-zA-z]{1,}$/
//     let commentsValue = comments.value.trim();

//     if(commentsValue === '') {
//         e.preventDefault();
//         console.log('NotV')
//     }
// });