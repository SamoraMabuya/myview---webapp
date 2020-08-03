const messageArea = document.querySelector('#inputMessage');

messageArea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
})