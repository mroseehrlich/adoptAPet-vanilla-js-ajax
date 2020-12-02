/*********************
 Name: Mia Ehrlich
 Coding 04
 Purpose: This is a main.js file for client-side validation on a contact form
 **********************/
"use strict";

function validEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\ -0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function clearForm() {
    //clear inputs by setting values to empty strings
    document.getElementById("name").value = "";
    document.getElementById("email1").value = "";
    document.getElementById("email2").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";

    //clear msg above form
    document.getElementById("user-msg").innerHTML = "<p>Fill out your information and we'll be in touch shortly.</p>";
}

function validate(){
    var errorMsg = "";

    //save form inputs to variables
    var nameInput = document.getElementById("name");
    var email1Input = document.getElementById("email1");
    var email2Input = document.getElementById("email2");
    var subjectInput = document.getElementById("subject");
    var messageInput = document.getElementById("message");

    //trim input values and save to new variables
    var name = nameInput.value.trim();
    var email1 = email1Input.value.trim();
    var email2 = email2Input.value.trim();
    var subject = subjectInput.value.trim();
    var message = messageInput.value.trim();

    //update values in dom with trimmed values
    nameInput.value = name;
    email1Input.value = email1;
    email2Input.value = email2;
    subjectInput.value = subject;
    messageInput.value = message;

    //test inputs for errors
    if (name === "") {
        errorMsg += "Please enter your name.<br>";
    }
    if (subject === "") {
        errorMsg += "Please enter a subject.<br>";
    }
    if (message === "") {
        errorMsg += "Please enter your message.<br>";
    }
    if (!validEmail(email1)) {
        errorMsg += "Email must be valid.<br>";
    }
    if (!validEmail(email2)) {
        errorMsg += "Confirmation email must be valid.<br>";
    }
    if (email1 !== email2) {
        errorMsg += "Emails must match.<br>";
    }
    return errorMsg;
}

//Function to send form
function sendForm() {
    //Create XMLHttpRequest
    var XHR = new XMLHttpRequest();

    //Create form obj and pass form into formData obj
    var contactForm = document.getElementById("contactForm");
    var formData = new FormData(contactForm);
    var msg = document.getElementById("user-msg");

    //Add event listener for load evt
    XHR.addEventListener('load', function (response) {
        //If request loads successfully and email is sent
        if (response = 'okay') {
            clearForm();
            msg.innerHTML = "Sent!";
            //If request fails php validation
        } else {
            msg.innerHTML = "Uh oh! Looks like something went wrong. Please try again.";
        }
    });

    //Add event listener to error evt due to server side error
    XHR.addEventListener('error', function(response) {
        msg.innerHTML = "Uh oh! Looks like something went wrong. Please try again."
    });
    //Instantiate request object
    XHR.open('POST', "email.php");

    //Send request to server
    XHR.send(formData);
}

//Save send btn as js object
var sendBtn = document.getElementById("btn__send");
//add event handler to send btn
sendBtn.onclick = function() {
    //save message area to variable
    var msgBox = document.getElementById("user-msg");
    var msg = validate();
    //Decision structure to report errors or send form if validate function returns w/o errors
    if (msg === "") {
        // clearForm();
        msgBox.innerHTML = "<p>Sending...</p>";
        sendForm();
        return true;
    } else {
        msgBox.innerHTML = msg;
        return false;
    }
};

//save clear btn as js object
var clearBtn = document.getElementById("btn__clear");

//add event handler to clear btn
clearBtn.onclick = function() {
    // call clear function
    clearForm();
    return false;
};