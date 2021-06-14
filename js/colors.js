var list = document.getElementById("color-list");
var colors = document.getElementsByClassName("color-symbol");
var items = document.getElementsByClassName("list-item");
var colorDiv = document.getElementById("color-div");

var modalColors = document.getElementById("colors-modal");
var modalTitle = document.getElementById("color-modal-title");
var captionTextColors = document.getElementById("colors-caption");

$(function () {
    for (var i = 0; i < colors.length; i++) {
        var color = colors[i].id.toString();

        var li = document.createElement("li");
        li.style.backgroundColor = color;
        li.setAttribute("id", color + "-icon");
        li.classList.add("list-item");
        list.appendChild(li);

        if (!localStorage.getItem(colors[i].id)) {
            var nameRGBdescription = colors[i].id + "_"
                + window.getComputedStyle(li).backgroundColor.split("(")[1].split(")")[0] + "_"
                + colors[i].value;
            localStorage.setItem(colors[i].id, nameRGBdescription);
        }

        addColorIcon(items);
    }

    if ($(this).width() <= 780) {
        resizeCircle();
    }
    else {
        if (list.classList.contains("color-icons-list-small")) {
            list.classList.remove("color-icons-list-small");
        }
        if (colorDiv.classList.contains("color-div-mobile")) {
            colorDiv.classList.remove("color-div-mobile");
        }
    }

    $("li").on("click", function () {
        var id = this.id;
        var color = id.split("-")[0];
        var local = localStorage.getItem(color).toString();
        var description = local.split("_")[2];

        modalColors.style.display = "block";
        modalTitle.innerHTML = color.toUpperCase();
        captionTextColors.innerHTML = description;

        if (color == "black") {
            modalTitle.style.color = "white";
            captionTextColors.style.color = "white";
        }
        else {
            modalTitle.style.color = color;
            captionTextColors.style.color = color;
        }
    });
});

$(window).on("resize", function (e) {
    if ($(this).width() <= 780) {
        resizeCircle();
    }
    else {
        if (colorDiv.classList.contains("color-div-mobile")) {
            colorDiv.classList.remove("color-div-mobile");
        }
        if (list.classList.contains("color-icons-list-small")) {
            list.classList.remove("color-icons-list-small");
            addColorIcon(items);
        }
    }
});

var spanModalColors = document.getElementsByClassName("close-colors-modal")[0];
spanModalColors.onclick = function () {
    modalColors.style.display = "none";
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function addColorIcon(listItems) {
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].classList.contains("list-item-small")) {
            listItems[i].classList.remove("list-item-small");
        }
        var offsetAngle = 360 / listItems.length;
        var rotateAngle = offsetAngle * i;
        $(listItems[i]).css("transform", "rotate(" + rotateAngle + "deg) translate(0, -325px) rotate(-" + rotateAngle + "deg)")
    };
}

function resizeCircle() {
    if (isMobileDevice()) {
        colorDiv.classList.add("color-div-mobile");
    }
    list.classList.add("color-icons-list-small");
    for (var i = 0; i < items.length; i++) {
        items[i].classList.add("list-item-small");
        var offsetAngle = 360 / items.length;
        var rotateAngle = offsetAngle * i;
        $(items[i]).css("transform", "rotate(" + rotateAngle + "deg) translate(0, -200px) rotate(-" + rotateAngle + "deg)")
    };
}