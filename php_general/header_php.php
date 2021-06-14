<?php 

    // Create DB connection
    function createConnection (){
        $dbuser = '--YOUR DATA--';
        $dbpass = '--YOUR DATA--';
        $dbhost = --YOUR DATA--
        $connection = mysqli_connect($dbhost, $dbuser, $dbpass) or die("Unable to connect to '$dbhost'");

        $dbname = '--YOUR DATA--';
        mysqli_select_db($connection, $dbname) or die("Could not open the database '$dbname'");

        return $connection;
    }

    // List of symbol categories + crest shapes from folder img
    $crestsArray = scandir("img/crestShapes/");

    $artsMusicArray = scandir("img/artsMusic/");
    $clothesStuffsArray = scandir("img/clothesStuffs/");
    $fantasyMythologyArray = scandir("img/fantasyMythology/");
    $foodDrinkArray = scandir("img/foodDrink/");
    $naturePlantsArray = scandir("img/naturePlants/");
    $scienceTechnologyArray = scandir("img/scienceTechnology/");
    $signsSymbolsArray = scandir("img/signsSymbols/");
    $sportsGamesArray = scandir("img/sportsGames/");
    $travelPlacesArray = scandir("img/travelPlaces/");
    $weaponToolsArray = scandir("img/weaponTools/");
    $wildsPetsArray = scandir("img/wildsPets/");
    
    // Start user session
    session_start();
    $_SESSION['post-data'] = $_POST;

    // Show symbol for user choice (symbols.php)
    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['selected'])){

        $svgpic = explode("_", $_SESSION['post-data']['selected']);
        $svg = file_get_contents("img/" . $svgpic[1] . "/" . $svgpic[0] . ".svg");

        $old = '<svg';
        $new = '';
        if(strpos($svg, 'width') !== false){
            $width_svg = substr($svg, strpos($svg,'width="') + 7);
            $height_svg = substr($svg, strpos($svg,'height="') + 8);
            $width = explode(".", $width_svg)[0];
            $height = explode(".", $height_svg)[0];
    
            if((int)$width < (int)$height - 200) {
                $new = '<svg class="svg-style svg-style-small"';
            }
            else{
                $new = '<svg class="svg-style svg-style-normal"';
            }   
        }
        else{
            $new = '<svg class="svg-style svg-style-normal"';
        }

        $svgWClass = str_replace($old,$new,$svg);
        $_SESSION["selectedsvg"] = $svgWClass;   
        echo $_SESSION["selectedsvg"];
        exit;
    }

    // Set selected symbol from symbols.php to creator.php
    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['selectedsymbol'])){
    
        $symbolFolder = explode("_", $_SESSION['post-data']['selectedsymbol']);
        $_SESSION['finalsymbol'] = $symbolFolder[0];
        $_SESSION['finalcategory'] = $symbolFolder[1];
        $svgSymbol = file_get_contents("img/" . $symbolFolder[1] . "/" . strtolower($symbolFolder[0]) . ".svg");

        $oldSymbol = '<svg';
        $svgSymbolWClass = '';
        if(strpos($svgSymbol, 'fill') !== false){

            $width_svg = substr($svgSymbol, strpos($svgSymbol,'width="') + 7);
            $height_svg = substr($svgSymbol, strpos($svgSymbol,'height="') + 8);
            $width = explode(".", $width_svg)[0];
            $height = explode(".", $height_svg)[0];

            $newSymbol = '';
            if((int)$width < (int)$height - 200) {
            
                $newSymbol = '<svg id="' . $symbolFolder[0] . '" class="svg-style-symbol symbol-small" ';
            }
            else{
                $newSymbol = '<svg id="' . $symbolFolder[0] . '" class="svg-style-symbol symbol-normal" ';
            }
            
            $newSymbolcolor = '';
            if(!empty($_SESSION['crest-symbol-color'])){
                $newSymbolcolor = 'fill="' . $_SESSION['crest-symbol-color'] . '"';   
            }
            else{
                $newSymbolcolor = 'fill="white"';
            }
            $svgSymbolRecolored = preg_replace('/fill=.{9}/', $newSymbolcolor,  $svgSymbol);
            $svgSymbolWClass = str_replace($oldSymbol,$newSymbol,$svgSymbolRecolored);

        }else{
            $newSymbol = '';
            if(!empty($_SESSION['crest-symbol-color'])){
                $newSymbol = '<svg id="' . $symbolFolder[0] . '" class="svg-style-symbol symbol-normal" fill="' . $_SESSION['crest-symbol-color'] . '"';
            }else{
                $newSymbol = '<svg id="' . $symbolFolder[0] . '" class="svg-style-symbol symbol-normal" fill="white" ';
            }
            $svgSymbolWClass = str_replace($oldSymbol,$newSymbol,$svgSymbol);
        }
        $_SESSION["crestsymbol"] = $svgSymbolWClass;
        echo $_SESSION["crestsymbol"];
        exit;
    }

    // Set crest upper/lower banners (creator.php)
    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['banner'])){

        $banner = $_SESSION['post-data']['banner'];
        $bannerSVG = file_get_contents("img/" . $banner . ".svg");
        
        $old = '<svg';
        $new = '<svg class="svg-style svg-style-banner"';
        $bannerWClass = str_replace($old,$new,$bannerSVG);
        $_SESSION["banner"] = $bannerWClass;  
        echo $_SESSION["banner"];
        exit;
    }

    // Set crest base (creator.php)
    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['crestbase'])){

        $basepic = explode("_", $_SESSION['post-data']['crestbase']);
        $base = file_get_contents("img/" . $basepic[1] . "/" . strtolower($basepic[0]) . ".svg");
        $_SESSION["crestshape"] = strtolower($basepic[0]);

        $old = '<svg';
        $new = '<svg class="svg-style svg-style-base"';
        $baseWClass = '';
        if(!empty($_SESSION['crest-base-color'])){
            $newColor = 'fill="' . $_SESSION['crest-base-color'] . '"';
            $svgRecolored = preg_replace('/fill=.{9}/', $newColor,  $base);
            $baseWClass = str_replace($old,$new,$svgRecolored);
        }
        else{
            $baseWClass = str_replace($old,$new,$base);
        }
        $_SESSION["crestbase"] = $baseWClass;  
        echo $_SESSION["crestbase"];
        exit;
    }

    // Get crest font type
    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['crestfont'])){
        $_SESSION["crestfont"] = $_SESSION['post-data']['crestfont'];
        echo $_SESSION["crestfont"];    
        exit;
    }

    // Get/set letter color (creator.php)
    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['crest-letter-color'])){
        $elementColor = explode("_", $_SESSION['post-data']['crest-letter-color']);
        $_SESSION["crest-letter-color"] = $elementColor[1];
        $_SESSION["crest-letter-color-db"] = $elementColor[2];
        echo $_SESSION["crest-letter-color"];
        exit;
    }

    // Get/set background color (creator.php)
    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['crest-background-color'])){
        $elementColor = explode("_", $_SESSION['post-data']['crest-background-color']);
        $_SESSION["crest-background-color"] = $elementColor[1];
        $_SESSION["crest-background-color-db"] = $elementColor[2];
        echo $_SESSION["crest-background-color"];
        exit;
    }

    // Get/set banners color (creator.php)
    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['crest-banner-color'])){

        $bannerColor = explode("_", $_SESSION['post-data']['crest-banner-color']);
        $color = $bannerColor[1];
        $_SESSION['crest-banner-color-db'] = $bannerColor[2];
        $_SESSION['crest-banner-color'] = $color;

        $svg = $_SESSION["banner"];
        $oldSymbol = '<svg';
        $newColor = 'fill="' . $color . '"';
        $svgRecolored = preg_replace('/fill=.{9}/', $newColor,  $svg);

        $_SESSION["banner"] = $svgRecolored;
        echo $_SESSION["banner"];
        exit;
    }

    // Get/set base color (creator.php)
    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['crest-base-color'])){
        
        $baseColor = explode("_", $_SESSION['post-data']['crest-base-color']);
        $color = $baseColor[1];
        $_SESSION['crest-base-color-db'] = $baseColor[2];
        $_SESSION['crest-base-color'] = $color;

        if(!empty($_SESSION["crestbase"])){
            $svg = $_SESSION["crestbase"];
            $oldSymbol = '<svg';
            $newColor = 'fill="' . $color . '"';
            $svgRecolored = preg_replace('/fill=.{9}/', $newColor,  $svg);
    
            $_SESSION["crestbase"] = $svgRecolored;
            echo $_SESSION["crestbase"];
            exit;
        }
        else{
            echo $_SESSION['crest-base-color'];
            exit;
        }
    }

    // Get/set symbol color (creator.php)
    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['crest-symbol-color'])){
        $symbolColor = explode("_", $_SESSION['post-data']['crest-symbol-color']);
        $color = $symbolColor[1];
        $_SESSION['crest-symbol-color-db'] = $symbolColor[2];
        $_SESSION['crest-symbol-color'] = $color;

        if(!empty($_SESSION["crestsymbol"])){
            $svg = $_SESSION["crestsymbol"];
            $oldSymbol = '<svg';
            $newColor = 'fill="' . $color . '"';
            $svgRecolored = preg_replace('/fill=.{9}/', $newColor,  $svg);
    
            $_SESSION["crestsymbol"] = $svgRecolored;
            echo $_SESSION["crestsymbol"];
            exit;
        }
        else{
            echo $_SESSION['crest-symbol-color'];
            exit;
        }
    }

    // Send crest details to database (creator.php)
    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['finishcrest'])){

        $connect = createConnection();
        
        $symbol = $_SESSION['finalsymbol'];
        $category = $_SESSION['finalcategory'];
        $shape = $_SESSION['crestshape'];
        $fonttype = $_SESSION['crestfont'] ;
        $crestcolor = $_SESSION['crest-base-color-db'];
        $bannercolor = $_SESSION['crest-banner-color-db'];
        $symbolcolor =  $_SESSION['crest-symbol-color-db'];
        $lettercolor =  $_SESSION['crest-letter-color-db'];
        $backgroundcolor = $_SESSION['crest-background-color-db'];

        $query_string = "INSERT INTO crest_details (symbol, symbol_category, crest_base, font_type, color_symbol, color_base, color_banner, color_letter, color_background) 
        VALUES('" . $symbol . "', '" . $category . "', '" . $shape . "', '" . $fonttype ."', '" . $symbolcolor . "', '" . $crestcolor . "', '" 
        . $bannercolor . "', '" . $lettercolor . "', '" . $backgroundcolor . "')";
        mysqli_query($connect, $query_string) 
        or die("Could not insert crest information in database.");
        exit;
    }

    // Create new crest
    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['newcrest'])){
        session_destroy();
        $_POST = array();
        exit;
    }

    // Send rating/comment to database
    if(isset($_POST['ratingvalue'])){

        $userRating = explode("_", $_SESSION['post-data']['ratingvalue']);
        $_SESSION['rating'] = $userRating[0];
        $_SESSION['point'] = $userRating[1];
        exit;
    }

    if(isset($_POST['comment'])){

        $userComment = $_SESSION['post-data']['comment'];
        $_SESSION['comment'] = $userComment;

        $connect = createConnection();

        if($_SESSION['comment'] == 'nocomment'){
            
            $query_string = "INSERT INTO feedback (rating, feedback) 
            VALUES('" . $_SESSION['rating'] . "', '" . $_SESSION['point'] . "')";
            mysqli_query($connect, $query_string);    
            exit;
        }
    }

    if(isset($_POST['finishfeedback']) && !empty($_SESSION['comment'])){
        $connect = createConnection();

        $userCommentText = $_SESSION['post-data']['finishfeedback'];
        $_SESSION['finishfeedback'] = $userCommentText;   

        $query_string = "INSERT INTO feedback (rating, feedback, comment) 
        VALUES('" . $_SESSION['rating'] . "', '" . $_SESSION['point'] . "', '" . $_SESSION['finishfeedback'] . "')";
        mysqli_query($connect, $query_string);    
        exit;
    }

    // Get favourites
    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['favourites'])){
        
        $connect = createConnection();
        $query_string = "SELECT COUNT(*) FROM crest_details;";
        $rows = mysqli_query($connect, $query_string);
        $row = mysqli_fetch_array($rows);

        if($row[0] == 0 || $row[0] == "0"){
            $SESSION['favourites'] = "empty";
            echo $SESSION['favourites'];
            exit;
        }
        else{
            // MOST POPULAR SYMBOL
            $symbol_string = "SELECT symbol, symbol_category FROM crest_details GROUP BY symbol, symbol_category ORDER BY COUNT(symbol) DESC LIMIT 1";
            $symbol_row = mysqli_query($connect, $symbol_string) or die("Could not call symbol from the db");
            $symbol = mysqli_fetch_array($symbol_row);
            $_SESSION["favourite-symbol-name"] = $symbol[0];

            $svg = file_get_contents("img/" . $symbol[1] . "/" . strtolower($symbol[0]) . ".svg");
            $old = '<svg';
            $svgSymbolWClass = '';
            $svgSymbolWClassDark = '';
            if(strpos($svg, 'fill') !== false){

                $width_svg = substr($svg, strpos($svg,'width="') + 7);
                $height_svg = substr($svg, strpos($svg,'height="') + 8);
                $width = explode(".", $width_svg)[0];
                $height = explode(".", $height_svg)[0];

                $newSymbol = '';
                if((int)$width < (int)$height - 200) {
                
                    $newSymbol = '<svg id="fav-symbol-svg" class="svg-style-symbol symbol-small" ';
                }
                else{
                    $newSymbol = '<svg id="fav-symbol-svg" class="svg-style-symbol symbol-normal" ';
                }
                $newSymbolcolorDark = 'fill="#212529"';
                $newSymbolcolor = 'fill="white"';
                $svgSymbolRecoloredDark = preg_replace('/fill=.{9}/', $newSymbolcolorDark,  $svg);
                $svgSymbolRecolored = preg_replace('/fill=.{9}/', $newSymbolcolor,  $svg);
                $svgSymbolWClassDark = str_replace($old,$newSymbol,$svgSymbolRecoloredDark);
                $svgSymbolWClass = str_replace($old,$newSymbol,$svgSymbolRecolored);

            }else{
                $newSymbol = '<svg id="fav-symbol-svg" class="svg-style-symbol symbol-normal" fill="white" ';
                $newSymbolDark = '<svg id="fav-symbol-svg" class="svg-style-symbol symbol-normal" fill="#212529" ';
                $svgSymbolWClassDark = str_replace($old,$newSymbolDark,$svgSymbolRecoloredDark);
                $svgSymbolWClass = str_replace($old,$newSymbol,$svg);
            }
            $_SESSION["favourite-symbol"] = $svgSymbolWClass;
            $_SESSION["favourite-symbol-dark"] = $svgSymbolWClassDark;

            // MOST POPULAR SHAPE
            $crestshape_string = "SELECT crest_base FROM crest_details GROUP BY crest_base ORDER BY COUNT(*) DESC LIMIT 1";
            $crestshape_row = mysqli_query($connect, $crestshape_string) or die("Could not call shape from the db");
            $crestshape = mysqli_fetch_array($crestshape_row);
            $_SESSION["favourite-base-name"] = $crestshape[0];

            $base = file_get_contents("img/crestShapes/" . strtolower($crestshape[0]) . ".svg");
            $old = '<svg';
            $baseWClass = '';
            $baseWClassDark = '';
            if(strpos($svg, 'fill') !== false){

                $newColorDark = 'fill="#212529"';
                $newColor = 'fill="white"';
                $svgRecoloredDark = preg_replace('/fill=.{9}/', $newColorDark,  $base);
                $svgRecolored = preg_replace('/fill=.{9}/', $newColor,  $base);
                $new = '<svg class="svg-style-symbol symbol-small" ';
                $baseWClassDark = str_replace($old,$new,$svgRecoloredDark);
                $baseWClass = str_replace($old,$new,$svgRecolored);

            }else{
                $newDark = '<svg class="svg-style-symbol symbol-small" fill="#212529" ';
                $new = '<svg class="svg-style-symbol symbol-small" fill="white" ';
                $baseWClassDark = str_replace($old,$newDark,$base);
                $baseWClass = str_replace($old,$new,$base);
            }
            $_SESSION["favourite-base"] = $baseWClass;  
            $_SESSION["favourite-base-dark"] = $baseWClassDark;  

            // MOST POPULAR CATEGORY
            $category_string = "SELECT symbol_category FROM crest_details GROUP BY symbol_category ORDER BY COUNT(*) DESC LIMIT 1";
            $category_row = mysqli_query($connect, $category_string) or die("Could not call category from the db");
            $category = mysqli_fetch_array($category_row);
            $categoryArray = preg_split('#([A-Z][^A-Z]*)#', $category[0], null, PREG_SPLIT_DELIM_CAPTURE | PREG_SPLIT_NO_EMPTY);
            $_SESSION["favourite-category"] = $categoryArray[0] . "<br> & <br>" . $categoryArray[1];

            // MOST POPULAR FONT TYPE
            $lettertype_string = "SELECT font_type FROM crest_details GROUP BY font_type ORDER BY COUNT(*) DESC LIMIT 1";
            $lettertype_row = mysqli_query($connect, $lettertype_string) or die("Could not call font type from the db");
            $lettertype = mysqli_fetch_array($lettertype_row);
            $_SESSION["favourite-font"] = $lettertype[0];

            // MOST POPULAR SYMBOL COLOR
            $colorsymbol_string = "SELECT color_symbol FROM crest_details GROUP BY color_symbol ORDER BY COUNT(*) DESC LIMIT 1";
            $colorsymbol_row = mysqli_query($connect, $colorsymbol_string) or die("Could not call symbol color from the db");
            $colorsymbol = mysqli_fetch_array($colorsymbol_row);
            $_SESSION["favourite-color-symbol"] = $colorsymbol[0];

            // MOST POPULAR CREST COLOR
            $colorcrest_string = "SELECT color_base FROM crest_details GROUP BY color_base ORDER BY COUNT(*) DESC LIMIT 1";
            $colorcrest_row = mysqli_query($connect, $colorcrest_string) or die("Could not call crest color from the db");
            $colorcrest = mysqli_fetch_array($colorcrest_row);
            $_SESSION["favourite-color-base"] = $colorcrest[0];

            // MOST POPULAR FONT COLOR
            $colorletter_string = "SELECT color_letter FROM crest_details GROUP BY color_letter ORDER BY COUNT(*) DESC LIMIT 1";
            $colorletter_row = mysqli_query($connect, $colorletter_string) or die("Could not call font color from the db");
            $colorletter = mysqli_fetch_array($colorletter_row);
            $_SESSION["favourite-color-font"] = $colorletter[0];

            // MOST POPULAR BANNER COLOR
            $colorbanner_string = "SELECT color_banner FROM crest_details GROUP BY color_banner ORDER BY COUNT(*) DESC LIMIT 1";
            $colorbanner_row = mysqli_query($connect, $colorbanner_string) or die("Could not call banner color from the db");
            $colorbanner = mysqli_fetch_array($colorbanner_row);
            $_SESSION["favourite-color-banner"] = $colorbanner[0];

            // MOST POPULAR BACK COLOR
            $colorback_string = "SELECT color_background FROM crest_details GROUP BY color_background ORDER BY COUNT(*) DESC LIMIT 1";
            $colorback_row = mysqli_query($connect, $colorback_string) or die("Could not call banner color from the db");
            $colorback = mysqli_fetch_array($colorback_row);
            $_SESSION["favourite-color-back"] = $colorback[0];

            $SESSION['favourites'] = 
                        $_SESSION["favourite-symbol"] . "&&"
                        . $_SESSION["favourite-symbol-dark"] . "&&"
                        . $_SESSION["favourite-symbol-name"] . "&&"
                        . $_SESSION["favourite-base"] . "&&"
                        . $_SESSION["favourite-base-dark"] . "&&"
                        . $_SESSION["favourite-base-name"] . "&&"
                        . $_SESSION["favourite-category"] . "&&"
                        . $_SESSION["favourite-font"] . "&&"
                        . $_SESSION["favourite-color-symbol"] . "&&"
                        . $_SESSION["favourite-color-base"] . "&&" 
                        . $_SESSION["favourite-color-font"] . "&&"
                        . $_SESSION["favourite-color-banner"] . "&&"
                        . $_SESSION["favourite-color-back"];
            
            echo $SESSION['favourites'];
            exit;
        }
    }


?>