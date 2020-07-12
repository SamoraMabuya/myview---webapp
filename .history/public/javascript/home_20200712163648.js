const loginbutton = document.querySelector(".loginbutton");
const loginForm = document.querySelector(".loginbox");

var io = req("socket.io");

let socket = io.connect("http://localhost:5500");

socket.on("welcome", (data) => {
    console.log("received:", data)
});


const post = document.querySelector(".post");
const postOverlay = document.querySelector(".postOverlay");
const postform = document.querySelector(".postcontent");
const post_submitbtn = document.querySelector(".post_submitbtn");
const closePostcontent = document.querySelector(".postcontent i");
const aboutreview = document.querySelector(".aboutreview");




const AppLink = 'http://localhost:5500';

hide_elements();

loginbutton.addEventListener("click", function() {
    show_login_elements();
    hide_join_elements();
    closePost();

});

joinbutton.addEventListener("click", function() {
    show_join_elements();
    hide_login_elements();
    closePost();

});

postOverlay.addEventListener("click", function() {
    closePost();
    window.location.reload(true);



});

closeLogin.addEventListener("click", function() {
    hide_login_elements();

});

closeJoin.addEventListener("click", function() {
    hide_join_elements();

});

closePostcontent.addEventListener("click", function() {
    closePost();
    window.location.reload(true);


})

post.addEventListener("click", function() {
    createpost();


});

function hide_elements() {
    JoinOverlay.classList.add("hide");
    Joinbox.classList.add("hide");
    loginOverlay.classList.add("hide");
    loginForm.classList.add("hide");
    postOverlay.classList.add("hide");
    postform.classList.add("hide");
    aboutreview.style.visibility = ("hidden");

}
for (var all = 0; all < texterror.length; all++) {
    texterror[all].style.visibility = ("hidden");

}

for (var rederrors = 0; rederrors < redError.length; rederrors++) {
    redError[rederrors].style.visibility = ("hidden");

}
for (var o = 0; o < messageError.length; o++) {
    messageError[o].style.visibility = ("hidden");

}

for (var d = 0; d < redAlert.length; d++) {
    redAlert[0].style.visibility = ("hidden");
}

for (var c = 0; c < check.length; c++) {
    check[c].style.visibility = ("hidden");

}

for (var e = 0; e < checkmark.length; e++) {
    checkmark[e].style.visibility = ("hidden");

}

function show_login_elements() {
    loginOverlay.classList.remove("hide");
    loginForm.classList.remove("hide");
    loginOverlay.classList.add("show");
    loginForm.classList.add("show");
    JoinOverlay.classList.add("hide");
    Joinbox.classList.add("hide");
    showpassword.style.visibility = ("hidden");
    hidepassword.style.visibility = ("visible");

}

function hide_login_elements() {
    for (var i = 0; i < errortext.length; i++) {
        errortext[i].style.visibility = ("hidden");
    }
    for (var i = 0; i < icon.length; i++) {
        icon[i].style.visibility = ("hidden");
    }
    for (var i = 0; i < redError.length; i++) {
        redError[i].style.visibility = ("hidden");
    }
    for (var c = 0; c < check.length; c++) {
        check[c].style.visibility = ("hidden");

    }

    loginOverlay.classList.add("hide");
    loginForm.classList.add("hide");
    loginOverlay.classList.remove("show");
    loginForm.classList.remove("show");
    showpassword.style.visibility = ("hidden");
    hidepassword.style.visibility = ("hidden");

}

function show_join_elements() {
    JoinOverlay.classList.remove("hide");
    Joinbox.classList.remove("hide");
    JoinOverlay.classList.add("show");
    Joinbox.classList.add("show");
    showjoinpassword.style.visibility = ("visible");
    hidejoinpassword.style.visibility = ("visible");
    showconfirmpassword.style.visibility = ("visible");
    hideconfirmpassword.style.visibility = ("visible");


}

function hide_join_elements() {
    for (var i = 0; i < alerttext.length; i++) {
        alerttext[i].style.visibility = ("hidden");
    }
    for (var i = 0; i < messageIcon.length; i++) {
        messageIcon[i].style.visibility = ("hidden");
    }
    for (var i = 0; i < redAlert.length; i++) {
        redAlert[i].style.visibility = ("hidden");
    }

    for (var e = 0; e < checkmark.length; e++) {
        checkmark[e].style.visibility = ("hidden");

    }
    JoinOverlay.classList.add("hide");
    Joinbox.classList.add("hide");
    JoinOverlay.classList.remove("show");
    Joinbox.classList.remove("show");
    showjoinpassword.style.visibility = ("hidden");
    hidejoinpassword.style.visibility = ("hidden");
    showconfirmpassword.style.visibility = ("hidden");
    hideconfirmpassword.style.visibility = ("hidden");

}

function createpost() {
    postOverlay.classList.add("show");
    postform.classList.add("show");
    postOverlay.classList.remove("hide");
    postform.classList.remove("hide");
}

function closePost() {
    postOverlay.classList.add("hide");
    postform.classList.add("hide");
    postOverlay.classList.remove("show");
    postform.classList.remove("show");
    aboutreview.style.visibility = ("hidden");
}

function toggleType() {
    var type = document.querySelector('select[name="type"]').value;

    if (type == 'Review') {
        aboutreview.style.visibility = ('visible');
        document.querySelector('.writecontent').disabled = true;
        document.querySelector('.writecontent').placeholder = "Not available in Review";
    } else if (type == 'Discussion' || type == '') {
        aboutreview.style.visibility = ('hidden');
        document.querySelector('.writecontent').disabled = false;

    }
}

postform.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(postform);
    const title = formData.get("title");
    const type = formData.get("type");
    const topic = formData.get("topic");
    const writecontent = formData.get("writecontent");

    const OpinUserData = {
        title,
        type,
        writecontent,
        topic,
    };
    console.log(OpinUserData);


});