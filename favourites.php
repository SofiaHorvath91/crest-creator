<?php include 'php_general/header.php';?>

<body id="home-bg" class="background">

    <?php include 'php_general/navbar.php';?>

    <div class="row container-row main">

        <div class="col-xs-1 text-center">
            <br>
            <h1 class="display-6">CREATOR FAVOURITES</h1>
            <br>
        </div>
        <div class="row container-row hidden" id="empty-db-message">
            <div class="col-xs-1 text-center">
                <h4>
                    Hm, looks like there is nothing to show...be the first to add a crest and set favourites!
                </h4>
            </div>
            <div class="image-container">
                <input type="button" class="btn btn-dark btn-lg" id="creator-btn" name="creator-btn" value="START CREATING">
            </div>
        </div>
        <div class="row container-row" id="big-icons-div">
            <div class="image-container">
                <div class="fav-color-icon fav-icon-big" id="symbol-favourite" title="Top Symbol"></div>
                <div class="fav-color-icon fav-icon-big" id="category-favourite" title="Top Category"></div>
                <div class="fav-color-icon fav-icon-big" id="base-favourite" title="Top Base"></div>
                <div class="fav-color-icon fav-icon-big" id="font-favourite" title="Top Font"></div>
            </div>
        </div>
        <div class="row container-row" id="small-icons-div">
            <div class="image-container">
                <div class="fav-color-icon smalls fav-icon-small" id="symbol-color-favourite" title="Top Symbol Color"></div>
                <div class="fav-color-icon smalls fav-icon-small" id="base-color-favourite" title="Top Base Color"></div>
                <div class="fav-color-icon smalls fav-icon-small" id="banner-color-favourite" title="Top Banner Color"></div>
                <div class="fav-color-icon smalls fav-icon-small" id="font-color-favourite" title="Top Font Color"></div>
                <div class="fav-color-icon smalls fav-icon-small" id="back-color-favourite" title="Top Back Color"></div>
            </div>
        </div>

        <div class="hidden" id="status-favs"></div>
        
        <div id="favs-modal" class="modal">
            <span class="close-favs-modal close">&times;</span>
            <h1 class="modal-title" id="favs-modal-title"></h1>
            <div id="favs-caption" class="caption caption-colors"></div>
        </div>

    </div>

    <script type="text/javascript" src="js/favourites.js"></script>

</body>

</html>