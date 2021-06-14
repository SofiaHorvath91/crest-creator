var divs = document.getElementsByClassName("symboldiv");

$(".symbols_radio").click(function () {
    var id = $(this).attr('id');
    var idSplit = id.split("_")[0];

    var divID = idSplit + "_div";
    var divShow = document.getElementById(divID);
    var selectlist = document.getElementById(idSplit);

    divShow.classList.remove("hidden");
    for (var i = 2; i < window[idSplit].length; ++i) {
        var opt = document.createElement('option');
        var name = window[idSplit][i].split(".")[0];
        opt.value = firstLetterUpperCase(name);
        opt.innerHTML = firstLetterUpperCase(name);
        selectlist.appendChild(opt);
    }

    for (var i = 0; i < divs.length; i++) {
        if (divs[i].id != divID && !divs[i].classList.contains("hidden")) {
            divs[i].classList.add("hidden");
        }
    }
});

$(document).on('change', '.symbol-select', function () {
    var symbolGroup = $(this).attr('id');
    var symbol = this.options[this.selectedIndex].text.toLowerCase();
    var selectedSymbol = symbol + "_" + symbolGroup;
    sessionStorage.setItem('selectedsymbol', selectedSymbol);

    var hr = new XMLHttpRequest();
    var url = "symbols.php";
    var vars = "selected=" + selectedSymbol;
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function () {
        if (hr.readyState == 4 && hr.status == 200) {
            document.getElementById("selectedsymbol").value = sessionStorage.getItem('selectedsymbol');
            document.getElementById("selected-symbol-svg").innerHTML = hr.responseText;
        }
    }
    hr.send(vars);
    document.getElementById("status").innerHTML = "processing...";
});

$('#symbols-form').on('submit', function (e) {
    if (!sessionStorage.getItem('selectedsymbol')) {
        e.preventDefault();
        alert("Please choose a symbol!");
        return;
    }
    else {
        var hr = new XMLHttpRequest();
        var url = "creator.php";
        var vars = "selectedsymbol=" + sessionStorage.getItem('selectedsymbol');
        hr.open("POST", url, true);
        hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        hr.onreadystatechange = function () {
            if (hr.readyState == 4 && hr.status == 200) {
                var symbol = hr.responseText.toString().split("<svg")[1].split("</svg>")[0];
                sessionStorage.setItem('selectedsymbolsvg', "<svg" + symbol + "</svg>");
            }
        }
        hr.send(vars);
        document.getElementById("status").innerHTML = "processing...";
    }
});

function firstLetterUpperCase(word) {
    var newWord = word[0].toUpperCase();
    for (var i = 1; i < word.length; i++) {
        newWord += word[i];
    }
    return newWord;
}