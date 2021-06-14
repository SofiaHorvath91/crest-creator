<?php include 'php_general/header.php';?>

<body id="colors-bg" class="background">

    <?php include 'php_general/navbar.php';?>

    <div class="row container-row main">

        <div class="col-xs-1 text-center">
            <br>
            <h1 class="display-6">SYMBOLISM OF COLORS</h1>
            <br>
        </div>
        <div class="row container-row">
            <div class="image-container">
                <img class="main-image" id="home-main-image" src="img/colors-icon.png">
            </div>
        </div>
        <div class="row container-row color-div" id="color-div">
            <div class="image-container color-container">
                <ul class="color-icons-list" id="color-list"></ul>
            </div>
        </div>

        <div id="colors-modal" class="modal">
            <span class="close-colors-modal close">&times;</span>
            <h1 class="modal-title" id="color-modal-title"></h1>
            <div id="colors-caption" class="caption caption-colors"></div>
        </div>
        
    </div>

    <script type="text/javascript" src="js/colors.js"></script>

</body>

</html>