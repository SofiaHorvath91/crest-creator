var feedbackStars = document.getElementById("feedback-stars");
var feedbackTitle = document.getElementById("feedback-title");
var commentDiv = document.getElementById("comment-div");
var commentYesNoBtns = document.getElementById("comment-yesno-buttons");
var commentElements = document.getElementById("comment-elements");

/* Execute when side is loaded (document.ready) */
$(function () {
    if (sessionStorage.getItem('ratingvalue')) {
        feedbackStars.classList.add("hidden");
        commentDiv.classList.remove("hidden");
        commentYesNoBtns.classList.remove("hidden");
        feedbackTitle.innerHTML = "THANK YOU FOR YOUR RATING";

        if (sessionStorage.getItem('nocomment')) {
            commentYesNoBtns.classList.add("hidden");
            feedbackTitle.innerHTML = "THANK YOU FOR YOUR FEEDBACK";
        }
        if (sessionStorage.getItem('yescomment')) {
            feedbackTitle.innerHTML = "SEND AN OWL WITH YOUR COMMENT";
            commentYesNoBtns.classList.add("hidden");
            commentElements.classList.remove("hidden");

            if (sessionStorage.getItem('finishfeedback')) {
                commentElements.classList.add("hidden");
                feedbackTitle.innerHTML = "THANK YOU FOR YOUR FEEDBACK";
            }
        }
    }
});

/* Send rating at select of star */
$(".star-rating").click(function () {
    var value = $(this).attr('value');
    rating(value);
});

/* Send decision if user wishes to comment */
$(".comment-radiobtn").click(function () {
    var id = $(this).attr('id');
    comment(id);
});

/* Send comment */
$("#commentbutton").click(function () {
    submitComment();
});

/* Handle star rating */
function rating(value) {
    var hr = new XMLHttpRequest();
    var result = value;
    sessionStorage.setItem('ratingvalue', result);
    var url = "feedback.php";
    var vars = "ratingvalue=" + result;
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function () {
        console.log(hr);

        if (hr.readyState == 4 && hr.status == 200) {
            var return_data = hr.responseText;
            document.getElementById("ratingstatus").innerHTML = return_data;
        }
    }
    hr.send(vars);
    document.getElementById("ratingstatus").innerHTML = "processing...";
    document.getElementById('ratingform').submit();
}

/* Handle if user wnats to leave comment */
function comment(value) {
    var hr = new XMLHttpRequest();
    var result = value;
    if (value == "yescomment") {
        sessionStorage.setItem('yescomment', value);
    }
    else {
        sessionStorage.setItem('nocomment', value);
    }
    var url = "feedback.php";
    var vars = "comment=" + result;
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function () {
        console.log(hr);

        if (hr.readyState == 4 && hr.status == 200) {
            var return_data = hr.responseText;
            document.getElementById("ratingstatus").innerHTML = return_data;
        }
    }
    hr.send(vars);
    document.getElementById("ratingstatus").innerHTML = "processing...";
    document.getElementById('ratingform').submit();
}

/* Handle user comment */
function submitComment() {
    var comment = document.getElementById('usercomment').value;
    if (comment != "") {
        var regex = /[0-9@#\$%\^\&*\)\(+=_-]/g;
        var result = comment.match(regex);

        if (comment.length <= 50 && result == null) {
            var hr = new XMLHttpRequest();
            sessionStorage.setItem('finishfeedback', 'finish');
            var url = "feedback.php";
            var vars = "finishfeedback=" + comment;
            hr.open("POST", url, true);
            hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            hr.onreadystatechange = function () {
                console.log(hr);

                if (hr.readyState == 4 && hr.status == 200) {
                    var return_data = hr.responseText;
                    document.getElementById("ratingstatus").innerHTML = return_data;
                }
            }
            hr.send(vars);
            document.getElementById("ratingstatus").innerHTML = "processing...";
            document.getElementById('ratingform').submit();
        } else {
            alert("The comment should be max. 50 characters and should contain only alphabetic letters, whitespaces and punctuation marks!");
        }
    }
    else {
        alert("Comment field should not be empty!");
    }
}