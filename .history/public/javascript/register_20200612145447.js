// Join form elements
const JoinOverlay = document.querySelector(".FormOverlay2");
const Joinbox = document.querySelector(".Joinbox");
const closeJoin = document.querySelector(".closeJoinform i");

const UsernameJoin = document.querySelector(".Joinbox .Username");
const EmailJoin = document.querySelector(".Joinbox .Email");
const PasswordJoin = document.querySelector(".Joinbox .Password");
const ConfirmPassword = document.querySelector(".Joinbox .ConfirmPassword");

// Join password eye toggle
const hidejoinpassword = document.querySelector(".hideJoinPW");
const showjoinpassword = document.querySelector(".showJoinPW");

// Join confirm password eye toggle
const hideconfirmpassword = document.querySelector(".hideconfirmPW");
const showconfirmpassword = document.querySelector(".showconfirmPW");

// Icon and error text
var messageError = document.querySelectorAll(".Errors");
var redAlert = document.querySelectorAll(".redErrors");
var checkmark = document.querySelectorAll(".checkmark");
var messageIcon = document.querySelectorAll('.Errors i');
// error text
var alerttext = document.querySelectorAll('.Joinbox small');



hide_elements();


closeJoin.addEventListener("click", function () {

});


function hide_elements() { 
    for (var d = 0; d < redAlert.length; d ++) {
        redAlert[0].style.visibility = ("hidden");
    }
    for (var o = 0; o < messageError.length; o ++) {
        messageError[o].style.visibility = ("hidden");

    }


    for (var e = 0; e < checkmark.length; e ++) {
        checkmark[e].style.visibility = ("hidden");

}
}

function togglePW() {
    if(PasswordJoin.type === 'password') {
        PasswordJoin.type = 'text';
        showjoinpassword.style.visibility = ("visible");
        hidejoinpassword.style.visibility = ("hidden");
    } else {
        PasswordJoin.type = "password";
            hidejoinpassword.style.visibility = ("visible");
            showjoinpassword.style.visibility = ("hidden");
    }
}

function toggleConfirmEye() {
    if(ConfirmPassword.type === 'password') {
        ConfirmPassword.type = 'text';
        showconfirmpassword.style.visibility = ("visible");
        hideconfirmpassword.style.visibility = ("hidden");
    } else {
        ConfirmPassword.type = "password";
        hideconfirmpassword.style.visibility = ("visible");
        showconfirmpassword.style.visibility = ("hidden");
    }
}
// Joinform errors
Joinbox.addEventListener('submit',(e) => {
    UsernameChecking(e);
    EmailChecking(e);
    PasswordChecking(e);
    ConfirmPasswordchecking(e);


}); 

function UsernameChecking(e) {
    let usernamevalue = UsernameJoin.value.trim();
    var characters = (/^[\S\s]{6,25}$/);

    if(usernamevalue === '') {
        setUsernameError(e);
    } else if (usernamevalue.search(characters)) {
        messageIcon[0].style.visibility = ("visible");
        alerttext[0].style.visibility = ("visible");
        alerttext[0].innerText = "Username must be between 6-25 characters";
        redAlert[0].style.visibility = ("visible");
        checkmark[0].style.visibility = ("hidden");
        e.preventDefault();
    } else if (usernamevalue.match(characters)) {
        messageIcon[0].style.visibility = ("hidden");
        alerttext[0].style.visibility = ("hidden");
        redAlert[0].style.visibility = ("hidden");
        checkmark[0].style.visibility = ("visible");
        
        
    }
}

function setUsernameError(e) {
    messageIcon[0].style.visibility = ("visible");
    alerttext[0].style.visibility = ("visible");
    alerttext[0].innerText = "Create your username";
    redAlert[0].style.visibility = ("visible");
    e.preventDefault();



}


function EmailChecking(e) {
    let emailvalue = EmailJoin.value.trim();
    let emailReg = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    
    
    if(emailvalue === '') {
        setEmailAlert(e);
    } else if(emailvalue.match(emailReg)) {
        messageIcon[1].style.visibility = ("hidden");
        alerttext[1].style.visibility = ("hidden");
        redAlert[1].style.visibility = ("hidden");
        checkmark[1].style.visibility = ("visible");  
        // return true;     
    } else if(emailvalue.search(emailReg)) {
        messageIcon[1].style.visibility = ("visible");
        alerttext[1].style.visibility = ("visible");
        alerttext[1].innerText = "Please enter a valid email";
        redAlert[1].style.visibility = ("visible");
        checkmark[1].style.visibility = ("hidden");
        return false;

    }
}

function setEmailAlert(e) {
    messageIcon[1].style.visibility = ("visible");
    alerttext[1].style.visibility = ("visible");
    alerttext[1].innerText = "Email field cannot be blank";
    redAlert[1].style.visibility = ("visible");
    e.preventDefault();


}

function passwordvaluetemp() {
    var password = PasswordJoin.value.trim();
    return password;
 
}
function PasswordChecking(e) {
    var passwordvalue = passwordvaluetemp();
    var uppercase = (/^(.*[A-Z].*)$/);
    var lowercase = (/^(.*[a-z].*)$/);
    var special = (/^(.*[!@#$%^&*\.].*)$/);
    var characters = (/^(?=.*\d)(?=.*\D).{4,15}$/);

    if(passwordvalue === '') {
    setPasswordAlert(e);
    } else if(passwordvalue.search(uppercase)) {
        messageIcon[2].style.visibility = ("visible");
        alerttext[2].style.visibility = ("visible");
        redAlert[2].style.visibility = ("visible");
        alerttext[2].innerText = "Password must contain an uppercase letter";
        checkmark[2].style.visibility = ("hidden");
        e.preventDefault();
    } else if(passwordvalue.search(lowercase)) {
        messageIcon[2].style.visibility = ("visible");
        alerttext[2].style.visibility = ("visible");
        redAlert[2].style.visibility = ("visible");
        alerttext[2].innerText = "Password must contain an lowercase letter";
        checkmark[2].style.visibility = ("hidden");    
        e.preventDefault();
    // } else if(passwordvalue.search(special)) {
    //     messageIcon[2].style.visibility = ("visible");
    //     alerttext[2].style.visibility = ("visible");
    //     redAlert[2].style.visibility = ("visible");
    //     alerttext[2].innerText = "Password must contain a special character";
    //     checkmark[2].style.visibility = ("hidden");
    //     e.preventDefault();
    } else if(passwordvalue.search(characters)) {
        messageIcon[2].style.visibility = ("visible");
        alerttext[2].style.visibility = ("visible");
        redAlert[2].style.visibility = ("visible");
        alerttext[2].innerText = "Password must be between 4-15 characters";
        checkmark[2].style.visibility = ("hidden");
        e.preventDefault();
    } else {
        messageIcon[2].style.visibility = ("hidden");
        alerttext[2].style.visibility = ("hidden");
        redAlert[2].style.visibility = ("hidden");
        checkmark[2].style.visibility = ("visible");
        // return true;    
    }   

}

function setPasswordAlert(e) {
    messageIcon[2].style.visibility = ("visible");
    alerttext[2].style.visibility = ("visible");
    alerttext[2].innerText = "Password field cannot be blank";
    redAlert[2].style.visibility = ("visible");
    e.preventDefault();



}


function ConfirmPasswordchecking(e) {
    var passwordvaluehold = passwordvaluetemp();
    let confirmpasswordvalue = ConfirmPassword.value.trim();

    var uppercase = (/^(.*[A-Z].*)$/);
    var lowercase = (/^(.*[a-z].*)$/);
    var special = (/^(.*[!@#$%^&*\.].*)$/);
    var characters = (/^(?=.*\d)(?=.*\D).{4,15}$/);


    if(confirmpasswordvalue === '') {
        confirmPasswordAlert(e);
    } else if(confirmpasswordvalue !== passwordvaluehold) {    
        messageIcon[3].style.visibility = ("visible");
        alerttext[3].style.visibility = ("visible");
        redAlert[3].style.visibility = ("visible");
        alerttext[3].innerText = "Confirm password must match above password";
        checkmark[3].style.visibility = ("hidden");
        e.preventDefault();
    } else if(confirmpasswordvalue.search(uppercase)) {
        messageIcon[3].style.visibility = ("visible");
        alerttext[3].style.visibility = ("visible");
        redAlert[3].style.visibility = ("visible");
        alerttext[3].innerText = "Password must contain an uppercase letter";
        checkmark[3].style.visibility = ("hidden");
        e.preventDefault();
    } else if(confirmpasswordvalue.search(lowercase)) {
        messageIcon[3].style.visibility = ("visible");
        alerttext[3].style.visibility = ("visible");
        redAlert[3].style.visibility = ("visible");
        alerttext[3].innerText = "Password must contain an lowercase letter";
        checkmark[3].style.visibility = ("hidden");
        e.preventDefault();
    // } else if(confirmpasswordvalue.search(special)) {
    //     messageIcon[3].style.visibility = ("visible");
    //     alerttext[3].style.visibility = ("visible");
    //     redAlert[3].style.visibility = ("visible");
    //     alerttext[3].innerText = "Password must contain a special character";
    //     checkmark[3].style.visibility = ("hidden");    
    //     e.preventDefault();
    } else if(confirmpasswordvalue.search(characters)) {
        messageIcon[3].style.visibility = ("visible");
        alerttext[3].style.visibility = ("visible");
        redAlert[3].style.visibility = ("visible");
        alerttext[3].innerText = "Password must be between 4-15 characters";
        checkmark[3].style.visibility = ("hidden");    
        e.preventDefault();
    } else {
        messageIcon[3].style.visibility = ("hidden");
        alerttext[3].style.visibility = ("hidden");
        redAlert[3].style.visibility = ("hidden");
        checkmark[3].style.visibility = ("visible");
  
    }
}
function confirmPasswordAlert(e) {
    messageIcon[3].style.visibility = ("visible");
    alerttext[3].style.visibility = ("visible");
    alerttext[3].innerText = "Password field cannot be blank";
    redAlert[3].style.visibility = ("visible");
    e.preventDefault();


}



