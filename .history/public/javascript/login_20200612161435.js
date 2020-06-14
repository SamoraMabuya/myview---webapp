const loginbutton = document.querySelector(".loginbutton");
const loginOverlay = document.querySelector(".FormOverlay");
const loginForm = document.querySelector(".loginbox");
const closeLogin = document.querySelector(".closewindow i");

const EmailLogin = document.querySelector(".loginbox .Email");
const PasswordLogin = document.querySelector(".loginbox .Password");

// Login password eye toggle
const hidepassword = document.querySelector(".hideLoginPW");
const showpassword = document.querySelector(".showLoginPW");

// Icon and error text
var texterror = document.querySelectorAll(".Error");
var redError = document.querySelectorAll(".redError");
var check = document.querySelectorAll(".check");
var icon = document.querySelectorAll('.Error i');
// error text
var errortext = document.querySelectorAll('.loginbox small');
// Join form elements

// post form elements
const post = document.querySelector(".post");
const postOverlay = document.querySelector(".postOverlay");
const postform = document.querySelector(".postcontent");
const post_submitbtn = document.querySelector(".post_submitbtn");
const closePostcontent = document.querySelector(".postcontent i");
const aboutreview = document.querySelector(".aboutreview");

const AppLink = 'http://localhost:5500';

hide_elements();

closeLogin.addEventListener("click", function () {
    hide_login_elements();

});

function hide_elements() {
    for (var all = 0; all < texterror.length; all ++) {
        texterror[all].style.visibility = ("hidden");

    }

    for (var rederrors = 0; rederrors < redError.length; rederrors ++) {
        redError[rederrors].style.visibility = ("hidden");

    }

    for (var c = 0; c < check.length; c ++) {
        check[c].style.visibility = ("hidden");

    }

}

function show_login_elements() {
    showpassword.style.visibility = ("hidden");
    hidepassword.style.visibility = ("visible");    
    
}

function hide_login_elements() {
    for (var i = 0; i < errortext.length; i ++) {
        errortext[i].style.visibility = ("hidden");
    }
    for (var i = 0; i < icon.length; i ++) {
        icon[i].style.visibility = ("hidden");
    }
    for (var i = 0; i < redError.length; i ++) {
        redError[i].style.visibility = ("hidden");
    }
    for (var c = 0; c < check.length; c ++) {
        check[c].style.visibility = ("hidden");

    }


    showpassword.style.visibility = ("hidden");
    hidepassword.style.visibility = ("hidden");    

}

loginForm.addEventListener('submit', (e) => {
    EmailValidate(e);
    passwordValidate(e);
}); 

function EmailValidate(e) {
    let emailvalue = EmailLogin.value.trim();
    var emailformat = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    
    if(emailvalue === '') {
        setEmailError(e);
    } else if(emailvalue.match(emailformat)) {
        check[0].style.visibility = ("visible");
        icon[0].style.visibility = ("hidden");
        errortext[0].style.visibility = ("hidden");
        redError[0].style.visibility = ("hidden");
    } else if(!emailvalue.match(emailformat)) {
        icon[0].style.visibility = ("visible");
        errortext[0].style.visibility = ("visible");
        errortext[0].innerText = "Please enter a valid email";
        redError[0].style.visibility = ("visible");
        check[0].style.visibility = ("hidden");
        e.preventDefault();

    }
}
       

function setEmailError(e) {
    icon[0].style.visibility = ("visible");
    errortext[0].style.visibility = ("visible");
    errortext[0].innerText = "Email field cannot be blank";
    redError[0].style.visibility = ("visible");
    event.preventDefault();


}


function passwordValidate(e) {
    let passwordvalue = PasswordLogin.value.trim();

    var uppercase = (/^(.*[A-Z].*)$/);
    var lowercase = (/^(.*[a-z].*)$/);
    // var special = (/^(.*[!@#$%^&*\.].*)$/);
    var characters = /^(?=.*\d)(?=.*\D).{4,15}$/;

    if(passwordvalue === '') {
    setPasswordError();
    } else if(passwordvalue.search(uppercase)) {
        icon[1].style.visibility = ("visible");
        errortext[1].style.visibility = ("visible");
        redError[1].style.visibility = ("visible");
        errortext[1].innerText = "Password must contain an uppercase letter";
        e.preventDefault();
    } else if(passwordvalue.search(lowercase)) {
        icon[1].style.visibility = ("visible");
        errortext[1].style.visibility = ("visible");
        redError[1].style.visibility = ("visible");
        errortext[1].innerText = "Password must contain an lowercase letter";
        e.preventDefault();
    } else if(passwordvalue.search(characters)) {
        icon[1].style.visibility = ("visible");
        errortext[1].style.visibility = ("visible");
        redError[1].style.visibility = ("visible");
        errortext[1].innerText = "Password must be between 4-15 characters";
        e.preventDefault();
    } else {
        check[1].style.visibility = ("visible");
        icon[1].style.visibility = ("hidden");
        errortext[1].style.visibility = ("hidden");
        redError[1].style.visibility = ("hidden");

}

function setPasswordError(e) {
    icon[1].style.visibility = ("visible");
    errortext[1].style.visibility = ("visible");
    errortext[1].innerText = "Password field cannot be blank";
    redError[1].style.visibility = ("visible");
    e.preventDefault();

}
}
function togglePassword() {
    if(PasswordLogin.type === 'password') {
        PasswordLogin.type = 'text';
        showpassword.style.visibility = ("visible");
        hidepassword.style.visibility = ("hidden");
    } else {
        PasswordLogin.type = "password";
            hidepassword.style.visibility = ("visible");
            showpassword.style.visibility = ("hidden");
     
}
}
