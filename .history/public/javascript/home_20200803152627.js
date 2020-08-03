const inputBox = document.getElementsByClassName('inputMessage');



function auto_expand(inputBox) {

    inputBox.style.height = "5px";
    inputBox.style.heigh = (inputBox.scrollHeight) + "px";

}