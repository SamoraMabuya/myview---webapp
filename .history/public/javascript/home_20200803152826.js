const inputBox = document.getElementsByClassName('inputMessage');

auto_expand();

function auto_expand(inputBox) {

    inputBox.style.height = "5px";
    inputBox.style.heigh = (inputBox.scrollHeight) + "px";

}