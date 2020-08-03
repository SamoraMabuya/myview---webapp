var messageArea = document.querySelector('.inputMessage');

messageArea.addEventListener('input', autoResize, false);


autoResize();

function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}