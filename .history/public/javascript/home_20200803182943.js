alert('go')

const messageArea = document.querySelector('#inputMessage');

messageArea.addEventListener('input', function() {
    messageArea.style.height = 'auto';
    messageArea.style.height = this.scrollHeight + 'px';
})