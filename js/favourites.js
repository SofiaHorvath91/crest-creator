var statusFavsXML = document.getElementById("status-favs");
var emptyDBmsg = document.getElementById("empty-db-message");
var smallIcons = document.getElementById("small-icons-div");
var bigIcons = document.getElementById("big-icons-div");

var favSymbol = document.getElementById("symbol-favourite");
var favCategory = document.getElementById("category-favourite");
var favBase = document.getElementById("base-favourite");
var favFont = document.getElementById("font-favourite");
var favSymbolColor = document.getElementById("symbol-color-favourite");
var favBaseColor = document.getElementById("base-color-favourite");
var favFontColor = document.getElementById("font-color-favourite");
var favBannerColor = document.getElementById("banner-color-favourite");
var favBackColor = document.getElementById("back-color-favourite");

var modalFavs = document.getElementById("favs-modal");
var modalTitleFavs = document.getElementById("favs-modal-title");
var captionTextFavs = document.getElementById("favs-caption");

$(function () {
    var hr = new XMLHttpRequest();
    var url = "favourites.php";
    var vars = "favourites=favs";
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function () {
        if (hr.readyState == 4 && hr.status == 200) {

            if (hr.responseText != "empty") {
                if (!emptyDBmsg.classList.contains("hidden")) {
                    emptyDBmsg.classList.add("hidden");
                }
                if (bigIcons.classList.contains("hidden")) {
                    bigIcons.classList.remove("hidden");
                }
                if (smallIcons.classList.contains("hidden")) {
                    smallIcons.classList.remove("hidden");
                }

                var favs = hr.responseText.split("&&");
                sessionStorage.setItem("fav-symbol", favs[0]);
                sessionStorage.setItem("fav-symbol-dark", favs[1]);
                sessionStorage.setItem("fav-symbol-name", favs[2]);
                sessionStorage.setItem("fav-base", favs[3]);
                sessionStorage.setItem("fav-base-dark", favs[4]);
                sessionStorage.setItem("fav-base-name", favs[5]);
                sessionStorage.setItem("fav-category", favs[6]);
                sessionStorage.setItem("fav-font", favs[7]);
                sessionStorage.setItem("fav-symbol-color", favs[8]);
                sessionStorage.setItem("fav-base-color", favs[9]);
                sessionStorage.setItem("fav-font-color", favs[10]);
                sessionStorage.setItem("fav-banner-color", favs[11]);
                sessionStorage.setItem("fav-back-color", favs[12]);

                setFavElements();
                setFavColors();
            }
            else {
                if (emptyDBmsg.classList.contains("hidden")) {
                    emptyDBmsg.classList.remove("hidden");
                }
                if (!bigIcons.classList.contains("hidden")) {
                    bigIcons.classList.add("hidden");
                }
                if (!smallIcons.classList.contains("hidden")) {
                    smallIcons.classList.add("hidden");
                }
            }
        }
    }
    hr.send(vars);
    statusFavsXML.innerHTML = "processing...";
});

$("#symbol-favourite").hover(function (e) {
    this.innerHTML = sessionStorage.getItem("fav-symbol-dark");
}, function (e) {
    setFavElements();
});

$("#base-favourite").hover(function (e) {
    this.innerHTML = sessionStorage.getItem("fav-base-dark");
}, function (e) {
    setFavElements();
});

$(".smalls").hover(function (e) {
    var id = $(this).attr('id');
    this.classList.remove("fav-icon-small");
    this.classList.add("fav-icon-small-hover");
    var color = sessionStorage.getItem("fav-" + id.split("-")[0] + "-color");
    this.style.color = color;
    this.innerHTML = color.toUpperCase();
}, function (e) {
    var id = $(this).attr('id');
    this.classList.remove("fav-icon-small-hover");
    this.classList.add("fav-icon-small");
    setFavColors();
});

$(".smalls").click(function () {
    var id = $(this).attr('id');
    var element = id.split("-")[0];
    var color = sessionStorage.getItem("fav-" + element + "-color");

    modalFavs.style.display = "block";
    modalTitleFavs.innerHTML = color.toUpperCase();
    captionTextFavs.innerHTML = document.getElementById(color).value;

    if (color == "black") {
        modalTitleFavs.style.color = "white";
        captionTextFavs.style.color = "white";
    }
    else {
        modalTitleFavs.style.color = color;
        captionTextFavs.style.color = color;
    }

});

var spanModalColors = document.getElementsByClassName("close-favs-modal")[0];
spanModalColors.onclick = function () {
    modalFavs.style.display = "none";
}

$(document).on('click', '#creator-btn', function () {
    window.location.href = "creator.php";
});

function setFavElements() {
    favSymbol.innerHTML = sessionStorage.getItem("fav-symbol-name").toUpperCase();
    favCategory.innerHTML = sessionStorage.getItem("fav-category").toUpperCase();
    favBase.innerHTML = sessionStorage.getItem("fav-base-name").toUpperCase();
    favFont.innerHTML = sessionStorage.getItem("fav-font");
    favFont.style.fontFamily = sessionStorage.getItem("fav-font");
}

function setFavColors() {
    favSymbolColor.style.backgroundColor = sessionStorage.getItem("fav-symbol-color");
    favSymbolColor.innerHTML = "TOP<br>SYMBOL<br>COLOR";
    favBaseColor.style.backgroundColor = sessionStorage.getItem("fav-base-color");
    favBaseColor.innerHTML = "TOP<br>BASE<br>COLOR";
    favFontColor.style.backgroundColor = sessionStorage.getItem("fav-font-color");
    favFontColor.innerHTML = "TOP<br>FONT<br>COLOR";
    favBannerColor.style.backgroundColor = sessionStorage.getItem("fav-banner-color");
    favBannerColor.innerHTML = "TOP<br>BANNER<br>COLOR";
    favBackColor.style.backgroundColor = sessionStorage.getItem("fav-back-color");
    favBackColor.innerHTML = "TOP<br>BACK<br>COLOR";
}