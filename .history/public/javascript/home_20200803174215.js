var messageArea = document.querySelector('.inputMessage');

messageArea.addEventListener('input', autoResize, false) {
    var height = this.scrollHeight;
    this.styleMedia.height = height + "px"
}