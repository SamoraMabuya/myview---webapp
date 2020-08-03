document.querySelector('#inputMessage').
addEventListener("input", function() {
    var height = this.scrollHeight;
    this.styleMedia.height = height + "px";
})