<?php include 'php_general/header.php';?>

<body id="home-bg" class="background">
    <?php include 'php_general/navbar.php';?>

    <div class="row container-row main">

        <div class="row container-row">
            <div class="col-xs-1 text-center">
                <br>
                <h1 class="display-6">SELECT YOUR SYMBOL</h1>
                <br>
            </div>
        </div>

        <div class="row container-row left-right-divs">
            
            <div class="row container-left">
                <form id="symbols-form" action="<?php echo htmlspecialchars("creator.php");?>" method="post">
                    
                    <?php include 'php_general/symbols_options.php';?>
                    
                    <input type="submit" class="btn btn-dark btn-lg" id="createbutton" name="createbutton" value="SELECT SYMBOL">
                    
                </form>
            </div>
            
            <div class="row container-right">
                <div class="hidden" id="status"></div>
                <input type="hidden" id="selectedsymbol" name="selectedsymbol">
                <div class="image-container" id="selected-symbol-svg"></div>
            </div>

        </div>

    </div>

    <script type="text/javascript" src="js/symbols.js"></script>

</body>

</html>