auto_expand();

function auto_expand() {

    inputBox.style.boxSizing = 'border-box';
    var offset = inputBox.offsetHeight - inputBox.clientHeight;


    inputBox.addEventListener('input', function(event) {
        event.target.style.heigt = 'auto';
        event.target.style.height = event.target.scrollHeight + offset + 'px';
    })
}