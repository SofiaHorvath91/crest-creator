var statusXML = document.getElementById("status-crest");
var crestShapesList = document.getElementById("crestShapes");
var colors = document.getElementsByClassName("color-symbol");
var canvas = document.getElementById('canvas');

//Left side
var creatorForm = document.getElementById("creationinfos");
var colorsIcons = document.getElementById("colors-icons-div");
var enBtnsDiv = document.getElementById("end-btns-div");

// Color selectors
var colorSymbolSelector = document.getElementById("color-symbol");
var colorBaseSelector = document.getElementById("color-base");
var colorLetterSelector = document.getElementById("color-letter");
var colorBackgroundSelector = document.getElementById("color-background");
var colorBannerSelector = document.getElementById("color-banner");

//List Fields
var crestName = document.getElementById("crestname");
var crestMotto = document.getElementById("crestmotto");
var symbolBtn = document.getElementById("symbol-btn");

// Crest elements
var backgroundDiv = document.getElementById("crest-background");
var upperBannerSVG = document.getElementById("crest-banner-upper");
var lowerBannerSVG = document.getElementById("crest-banner-lower");
var crestBaseSVG = document.getElementById("crest-base");
var crestSymbolSVG = document.getElementById("crest-symbol");
var crestNameLabel = document.getElementById("crest-name");
var crestMottoLabel = document.getElementById("crest-motto");

// Selected colors icons
var iconColorSymbol = document.getElementById("symbol-color-icon");
var iconColorBase = document.getElementById("base-color-icon");
var iconColorLetter = document.getElementById("letter-color-icon");
var iconColorBackground = document.getElementById("back-color-icon");
var iconColorBanner = document.getElementById("banner-color-icon");

// Modal elements
var modalColorIcon = document.getElementById("color-icon-modal");
var modalTitleColorIcon = document.getElementById("color-icon-modal-title");
var captionTextColorIcon = document.getElementById("color-icon-caption");

$(function () {
    fillCrestShapesList();
    setSelectedValues();
    setColorsLocalStorage();

    if (isMobileDevice()) {
        crestNameLabel.classList.add("mobile");
        crestMottoLabel.classList.add("mobile");
        upperBannerSVG.classList.add("mobile");
        lowerBannerSVG.classList.add("mobile");
        crestBaseSVG.classList.add("mobile");
        backgroundDiv.classList.add("mobile");
        document.getElementsByClassName("symbol-image")[0].classList.add("mobile");
        document.getElementsByClassName("svg-style-base")[0].classList.add("mobile");
    }
    else {
        removeClassName(crestNameLabel, "mobile");
        removeClassName(crestMottoLabel, "mobile");
        removeClassName(upperBannerSVG, "mobile");
        removeClassName(lowerBannerSVG, "mobile");
        removeClassName(crestBaseSVG, "mobile");
        removeClassName(backgroundDiv, "mobile");
        removeClassName(document.getElementsByClassName("symbol-image")[0], "mobile");
        removeClassName(document.getElementsByClassName("svg-style-base")[0], "mobile");
    }

    if (sessionStorage.getItem("finishcrest")) {
        finishCreation();
    }
});

$(document).on('change', '#crestname', function () {
    var value = this.value;
    setCrestTexts(value, 20, 'crestname', crestNameLabel);
});

$(document).on('change', '#crestmotto', function () {
    var value = this.value;
    setCrestTexts(value, 25, 'crestmotto', crestMottoLabel);
});

$(document).on('change', '#crestShapes', function () {
    var crestFolder = $(this).attr('id');
    var shape = this.options[this.selectedIndex].text.toLowerCase();
    var selectedBase = shape + "_" + crestFolder;
    sessionStorage.setItem('base-to-show', selectedBase);

    var hr = new XMLHttpRequest();
    var url = "creator.php";
    var vars = "crestbase=" + selectedBase;
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function () {
        if (hr.readyState == 4 && hr.status == 200) {
            document.getElementById("crest-base-show").value = sessionStorage.getItem('base-to-show');
            sessionStorage.setItem('crestbase', hr.responseText);
            crestBaseSVG.innerHTML = sessionStorage.getItem('crestbase');
        }
    }
    hr.send(vars);
    statusXML.innerHTML = "processing...";
});

$(document).on('change', '#fonttypelist', function () {
    var font = this.options[this.selectedIndex].text;
    sessionStorage.setItem('crestfont', font);

    var hr = new XMLHttpRequest();
    var url = "creator.php";
    var vars = "crestfont=" + font;
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function () {
        if (hr.readyState == 4 && hr.status == 200) {
            crestNameLabel.style.fontFamily = sessionStorage.getItem('crestfont');
            crestMottoLabel.style.fontFamily = sessionStorage.getItem('crestfont');
        }
    }
    hr.send(vars);
    statusXML.innerHTML = "processing...";
});

$(document).on('click', '#symbol-btn', function () {
    window.location.href = "symbols.php";
});

$(document).on('change', '.color-input', function () {
    var id = $(this).attr('id'); //ex. color-symbol
    var subject = id.split("-")[1]; //ex. symbol
    var value = this.value; //ex. #ffffff
    var value_close = closestColor(hexToRGB(value).toString())
    var session = "crest-" + subject + "-color"; //ex. crest-symbol-color

    setColor(session, value, value_close, subject);
});

$('#creationinfos').on('submit', function (e) {
    if (sessionStorage.getItem('selectedsymbolsvg') &&
        sessionStorage.getItem('crestbase') &&
        sessionStorage.getItem('crestfont') &&
        sessionStorage.getItem('crest-symbol-color') &&
        sessionStorage.getItem('crest-base-color') &&
        sessionStorage.getItem('crest-banner-color') &&
        sessionStorage.getItem('crest-letter-color') &&
        sessionStorage.getItem('crest-background-color')) {

        var hr = new XMLHttpRequest();
        var url = "creator.php";
        var vars = "finishcrest=finished";
        hr.open("POST", url, true);
        hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        hr.onreadystatechange = function () {
            if (hr.readyState == 4 && hr.status == 200) {
                sessionStorage.setItem("finishcrest", "finished");
                finishCreation();
            }
        }
        hr.send(vars);
        statusXML.innerHTML = "processing...";
    }
    else {
        e.preventDefault();
        alert("All fields must be set for creation!")
        return;
    }
});

$(".color-icon").click(function () {
    var id = $(this).attr('id');
    var color = id.split("-")[3];
    var local = localStorage.getItem(color).toString();

    modalColorIcon.style.display = "block";
    modalTitleColorIcon.innerHTML = color.toUpperCase();
    captionTextColorIcon.innerHTML = local.split("_")[2];

    if (color == "black") {
        modalTitleColorIcon.style.color = "white";
        captionTextColorIcon.style.color = "white";
    }
    else {
        modalTitleColorIcon.style.color = color;
        captionTextColorIcon.style.color = color;
    }
});

$("#savecrest-btn").click(function () {
    saveCrestToPNG();
});

$("#newcrest-btn").click(function () {
    var hr = new XMLHttpRequest();
    var url = "creator.php";
    var vars = "newcrest=newcrest";
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function () {
        console.log(hr);

        if (hr.readyState == 4 && hr.status == 200) {
            sessionStorage.clear();
            location.reload();
        }
    }
    hr.send(vars);
    statusXML.innerHTML = "processing...";
});

var spanModalColorIcon = document.getElementsByClassName("close-color-icon-modal")[0];
spanModalColorIcon.onclick = function () {
    modalColorIcon.style.display = "none";
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function removeClassName(element, classname) {
    if (element.classList.contains(classname)) {
        element.classList.remove(classname);
    }
}

function fillCrestShapesList() {
    for (var i = 2; i < crestShapes.length; ++i) {
        var opt = document.createElement('option');
        var shape = crestShapes[i].split(".")[0].toUpperCase();
        opt.value = shape;
        opt.innerHTML = shape;
        crestShapesList.appendChild(opt);
    }
}

function setColorsLocalStorage() {
    for (var i = 0; i < colors.length; i++) {

        if (!localStorage.getItem(colors[i].id)) {
            var coloredInput = document.getElementById(colors[i].id);
            coloredInput.style.color = colors[i].id;
            var nameRGBdescription = colors[i].id + "_"
                + window.getComputedStyle(coloredInput).color.split("(")[1].split(")")[0] + "_"
                + colors[i].value;
            localStorage.setItem(colors[i].id, nameRGBdescription);
        }
    }
}

function setBanners() {
    var hr = new XMLHttpRequest();
    var url = "creator.php";
    var vars = "banner=banner";
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function () {
        if (hr.readyState == 4 && hr.status == 200) {
            sessionStorage.setItem('crestbanner', hr.responseText);
            lowerBannerSVG.innerHTML = sessionStorage.getItem('crestbanner');
            upperBannerSVG.innerHTML = sessionStorage.getItem('crestbanner');
        }
    }
    hr.send(vars);
    statusXML.innerHTML = "processing...";
}

function setCrestTexts(value, limit, sessionName, label) {
    var regex = /[0-9!@#\$%\^\*\)\(+=.;_]/g;
    var result = value.match(regex);

    if (value.length <= limit && result == null) {
        sessionStorage.setItem(sessionName, value);
        label.innerHTML = sessionStorage.getItem(sessionName);
    }
    else {
        alert("The input should be max. " + limit + " characters and should contain only alphabetic letters and whitespaces!");
    }
}

function setColor(session, value, close, subject) {
    var hr = new XMLHttpRequest();
    var url = "creator.php";
    var vars = session + "=" + subject + "_" + value + "_" + close;
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function () {
        if (hr.readyState == 4 && hr.status == 200) {
            sessionStorage.setItem(session, value);

            switch (subject) {
                case "banner":
                    var newBanner = hr.responseText.toString().split("<svg")[1].split("</svg>")[0];
                    sessionStorage.setItem('crestbanner', "<svg" + newBanner + "</svg>");
                    lowerBannerSVG.innerHTML = sessionStorage.getItem('crestbanner');
                    upperBannerSVG.innerHTML = sessionStorage.getItem('crestbanner');
                    colorBannerSelector.defaultValue = sessionStorage.getItem(session);
                    break;
                case "letter":
                    crestNameLabel.style.color = sessionStorage.getItem(session);
                    crestMottoLabel.style.color = sessionStorage.getItem(session);
                    colorLetterSelector.defaultValue = sessionStorage.getItem(session);
                    break;
                case "background":
                    backgroundDiv.style.backgroundColor = sessionStorage.getItem(session);
                    colorBackgroundSelector.defaultValue = sessionStorage.getItem(session);
                    break;
                case "base":
                    if (hr.responseText.toString().includes("</svg>")) {
                        var newBase = hr.responseText.toString().split("<svg")[1].split("</svg>")[0];
                        sessionStorage.setItem('crestbase', "<svg" + newBase + "</svg>");
                        crestBaseSVG.innerHTML = sessionStorage.getItem('crestbase');
                        colorBaseSelector.defaultValue = sessionStorage.getItem(session);
                    }
                    else {
                        colorBaseSelector.defaultValue = sessionStorage.getItem(session);
                    }
                    break;
                case "symbol":
                    if (hr.responseText.toString().includes("</svg>")) {
                        var newSymbol = hr.responseText.toString().split("<svg")[1].split("</svg>")[0];
                        sessionStorage.setItem('selectedsymbolsvg', "<svg" + newSymbol + "</svg>");
                        crestSymbolSVG.innerHTML = sessionStorage.getItem('selectedsymbolsvg');
                        colorSymbolSelector.defaultValue = sessionStorage.getItem(session);
                    }
                    else {
                        colorSymbolSelector.defaultValue = sessionStorage.getItem(session);
                    }
                    break;
            }
        }
    }
    hr.send(vars);
    statusXML.innerHTML = "processing...";
}

function setSelectedValues() {
    if (!sessionStorage.getItem('crest-banner-color')) {
        setBanners();
    }
    else {
        lowerBannerSVG.innerHTML = sessionStorage.getItem('crestbanner');
        upperBannerSVG.innerHTML = sessionStorage.getItem('crestbanner');
        colorBannerSelector.defaultValue = sessionStorage.getItem('crest-banner-color');
    }

    if (sessionStorage.getItem('crestbase')) {
        crestBaseSVG.innerHTML = sessionStorage.getItem('crestbase');
    }
    if (sessionStorage.getItem('crest-base-color')) {
        colorBaseSelector.defaultValue = sessionStorage.getItem('crest-base-color');
    }

    if (sessionStorage.getItem('selectedsymbolsvg')) {
        crestSymbolSVG.innerHTML = sessionStorage.getItem('selectedsymbolsvg');
        var symbolID = document.getElementsByClassName("svg-style-symbol")[0].id.toUpperCase();
        symbolBtn.value = symbolID;
    }
    if (sessionStorage.getItem('crest-symbol-color')) {
        colorSymbolSelector.defaultValue = sessionStorage.getItem('crest-symbol-color');
    }

    if (sessionStorage.getItem('crestname')) {
        crestNameLabel.innerHTML = sessionStorage.getItem('crestname');
        crestName.placeholder = sessionStorage.getItem('crestname');
        crestNameLabel.style.fontFamily = sessionStorage.getItem('crestfont');
        crestNameLabel.style.color = sessionStorage.getItem('crest-letter-color');
    }
    if (sessionStorage.getItem('crestmotto')) {
        crestMottoLabel.innerHTML = sessionStorage.getItem('crestmotto');
        crestMotto.placeholder = sessionStorage.getItem('crestmotto');
        crestMottoLabel.style.fontFamily = sessionStorage.getItem('crestfont');
        crestMottoLabel.style.color = sessionStorage.getItem('crest-letter-color');
    }
    if (sessionStorage.getItem('crestmotto') || sessionStorage.getItem('crestname')) {
        colorLetterSelector.defaultValue = sessionStorage.getItem('crest-letter-color');
    }

    if (sessionStorage.getItem('crest-background-color')) {
        backgroundDiv.style.backgroundColor = sessionStorage.getItem('crest-background-color');
        colorBackgroundSelector.defaultValue = sessionStorage.getItem('crest-background-color');
    }
}

function finishCreation() {
    creatorForm.classList.add("hidden");
    colorsIcons.classList.remove("hidden");
    enBtnsDiv.classList.remove("hidden");

    if (isMobileDevice()) {
        removeClassName(crestNameLabel, "mobile");
        removeClassName(crestMottoLabel, "mobile");
        removeClassName(upperBannerSVG, "mobile");
        removeClassName(lowerBannerSVG, "mobile");
        removeClassName(crestBaseSVG, "mobile");
        removeClassName(backgroundDiv, "mobile");
        removeClassName(document.getElementsByClassName("symbol-image")[0], "mobile");
        removeClassName(document.getElementsByClassName("svg-style-base")[0], "mobile");

        crestNameLabel.classList.add("finish-mobile");
        crestMottoLabel.classList.add("finish-mobile");
        upperBannerSVG.classList.add("finish-mobile");
        lowerBannerSVG.classList.add("finish-mobile");
        crestBaseSVG.classList.add("finish-mobile");
        backgroundDiv.classList.add("finish-mobile");
        document.getElementsByClassName("symbol-image")[0].classList.add("finish-mobile");
        document.getElementsByClassName("svg-style-base")[0].classList.add("finish-mobile");
    }
    else {
        removeClassName(crestNameLabel, "finish-mobile");
        removeClassName(crestMottoLabel, "finish-mobile");
        removeClassName(upperBannerSVG, "finish-mobile");
        removeClassName(lowerBannerSVG, "finish-mobile");
        removeClassName(crestBaseSVG, "finish-mobile");
        removeClassName(backgroundDiv, "finish-mobile");
        removeClassName(document.getElementsByClassName("symbol-image")[0], "finish-mobile");
        removeClassName(document.getElementsByClassName("svg-style-base")[0], "finish-mobile");
    }

    setIconColor(iconColorSymbol, closestColor(hexToRGB(sessionStorage.getItem('crest-symbol-color')).toString()));
    setIconColor(iconColorBase, closestColor(hexToRGB(sessionStorage.getItem('crest-base-color')).toString()));
    setIconColor(iconColorBanner, closestColor(hexToRGB(sessionStorage.getItem('crest-banner-color')).toString()));
    setIconColor(iconColorLetter, closestColor(hexToRGB(sessionStorage.getItem('crest-letter-color')).toString()));
    setIconColor(iconColorBackground, closestColor(hexToRGB(sessionStorage.getItem('crest-background-color')).toString()));
}

function setIconColor(icon, color) {
    icon.id = icon.id.toString() + "-" + color;
    icon.style.backgroundColor = color;
    icon.style.color = color;
    icon.innerHTML = icon.title.toUpperCase();
}

function closestColor(color) {
    var colorsList = allColorsList();
    var differences = [];
    var colorsDiffs = [];
    for (var i = 0; i < colorsList.length; i++) {
        var colorBase = colorsList[i].split("_")[1];
        var diff = colorDifference(color, colorBase).toString();
        var colorDiff = colorsList[i].split("_")[0] + "_" + diff.split(".")[0];
        differences.push(Number(diff.split(".")[0]));
        colorsDiffs.push(colorDiff);
    }

    var minDiff = Math.min.apply(Math, differences);
    var minColor = [];
    for (var i = 0; i < differences.length; i++) {
        if (minDiff == colorsDiffs[i].split("_")[1]) {
            minColor.push(colorsDiffs[i].split("_")[0]);
        }
    }

    return minColor[0].toLowerCase().trim();
}

function hexToRGB(hex) {
    return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
}

function allColorsList() {
    var allStorage = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        allStorage.push(localStorage.getItem(keys[i]));
    }

    var listFinal = [];
    for (var i = 0; i < allStorage.length; i++) {
        if (allStorage[i].includes("_") && !allStorage[i].includes("%")) {
            listFinal.push(allStorage[i]);
        }
    }

    return listFinal;
}

function colorDifference(color1, color2) {
    var colorElement = color1.replace(/ /g, "");
    var colorBase = color2.replace(/ /g, "");
    var colorElementRGB = colorElement.split(",");
    var colorBaseRGB = colorBase.split(",");
    var r1 = colorBaseRGB[0];
    var g1 = colorBaseRGB[1];
    var b1 = colorBaseRGB[2];
    var r2 = colorElementRGB[0];
    var g2 = colorElementRGB[1];
    var b2 = colorElementRGB[2];

    redDifference = Math.abs(r1 - r2);
    greenDifference = Math.abs(g1 - g2);
    blueDifference = Math.abs(b1 - b2);

    return redDifference + greenDifference + blueDifference;
}

function saveCrestToPNG() {
    var lowerbannerSVG = document.getElementsByClassName("svg-style-banner")[0];
    var upperbannerSVG = document.getElementsByClassName("svg-style-banner")[1];
    var basechosenSVG = document.getElementsByClassName("svg-style-base")[0];
    var symbolselectedSVG = document.getElementsByClassName("svg-style-symbol")[0];

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = sessionStorage.getItem('crest-background-color');
    ctx.fillRect(0, 0, 1000, 1000);

    svgToCanvas(upperbannerSVG, 100, 10, 500, 250);
    svgToCanvas(lowerbannerSVG, 100, 430, 500, 250);
    if (isMobileDevice()) {
        svgToCanvas(basechosenSVG, 200, 180, 300, 310);
    }
    else {
        svgToCanvas(basechosenSVG, 200, 180, 300, basechosenSVG.clientHeight);
    }
    if (document.getElementsByClassName("symbol-small").length == 0) {
        svgToCanvas(symbolselectedSVG, 250, 270, 200, symbolselectedSVG.clientHeight);
    }
    else {
        svgToCanvas(symbolselectedSVG, 300, 270, 100, symbolselectedSVG.clientHeight);
    }

    setTimeout(downloadCrest, 1000);
}

function svgToCanvas(svg, x, y, width, height) {

    svg.setAttribute("width", width);
    svg.setAttribute("height", height);

    var svgString = new XMLSerializer().serializeToString(svg);
    var ctx = canvas.getContext("2d");
    var DOMURL = self.URL || self.webkitURL || self;
    var img = new Image();
    var blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    var url = DOMURL.createObjectURL(blob);
    img.onload = function () {
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(img, x, y);
        ctx.font = "28pt " + sessionStorage.getItem("crestfont");
        ctx.fillStyle = sessionStorage.getItem("crest-letter-color");
        ctx.textAlign = "center";
        var nameLength = sessionStorage.getItem("crestname").length;
        ctx.fillText(sessionStorage.getItem("crestname"), ((canvas.width - nameLength) / 2), 165);
        ctx.font = "20pt " + sessionStorage.getItem("crestfont");
        ctx.fillStyle = sessionStorage.getItem("crest-letter-color");
        var mottoLength = sessionStorage.getItem("crestmotto").length;
        ctx.fillText(sessionStorage.getItem("crestmotto"), ((canvas.width - mottoLength) / 2), 580);
    };
    img.src = url;
}

function downloadCrest() {
    if (!isCanvasBlank()) {
        let downloadLink = document.createElement('a');
        downloadLink.setAttribute('download', 'mycrest.png');
        canvas.toBlob(function (blob) {
            let url = URL.createObjectURL(blob);
            downloadLink.setAttribute('href', url);
            downloadLink.click();
        });
    }
}

function isCanvasBlank() {
    const context = canvas.getContext('2d');
    const pixelBuffer = new Uint32Array(
        context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );
    return !pixelBuffer.some(color => color !== 0);
}