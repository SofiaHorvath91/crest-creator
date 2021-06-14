<?php include 'php_general/header.php';?>

<body id="home-bg" class="background">

    <?php include 'php_general/navbar.php';?>

    <div class="row container-row main">

        <div class="row container-row">
            <div class="col-xs-1 text-center">
                <br>
                <h1 class="display-6">CREATE YOUR CREST</h1>
                <br>
            </div>
        </div>

        <div class="row container-row left-right-divs">
            
            <div class="row container-left">

                <form class="infos" id="creationinfos" action="<?php echo htmlspecialchars("creator.php#creationinfos");?>" method="post">

                    <div class="row container-row">
                        <div class="symbol-select-div">
                            <label class="symbols_label info-label" for="crestname">NAME :</label>
                            <div class="row container-row">
                                <input class="text-input" type="text" id="crestname" name="crestname" autocomplete="off">
                            </div>
                        </div>
                    </div>

                    <div class="row container-row">
                        <div class="symbol-select-div">
                            <label class="symbols_label info-label" for="crestname">MOTTO :</label>
                            <div class="row container-row">
                                <input class="text-input" type="text" id="crestmotto" name="crestmotto" autocomplete="off">
                            </div>
                        </div>
                    </div>

                    <div class="row container-row">
                        <div class="symbol-select-div">
                            <label class="symbols_label info-label" for="crestbase-select">CREST BASE :</label>
                            <div class="row container-row">
                                <div class="row container-row" id="crestbase-select">
                                    <select id="crestShapes" name ="crestShapes"></select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row container-row">
                        <div class="symbol-select-div">
                            <label class="symbols_label info-label" for="fonttypelistDiv">FONT TYPE :</label>
                            <div class="row container-row" id="fonttypelistDiv">
                                <select id="fonttypelist" name="fonttypelist">
                                <option value="Algerian">Algerian</option>
                                <option value="Juice ITC" style="font-family:Juice ITC">Juice ITC</option>
                                <option value="Blackadder ITC" style="font-family:Blackadder ITC">Blackadder ITC</option>
                                <option value="Chiller" style="font-family:Chiller">Chiller</option>
                                <option value="Curlz MT" style="font-family:Curlz MT">Curlz MT</option>
                                <option value="High Tower Text" style="font-family:High Tower Text">High Tower Text</option>
                                <option value="Jokerman" style="font-family:Jokerman">Jokerman</option>
                                <option value="Matura MT Script Capitals" style="font-family:Matura MT Script Capitals">Matura MT Script Capitals</option>
                                <option value="Old English Text MT" style="font-family:Old English Text MT">Old English Text MT</option>
                                <option value="Onyx" style="font-family:Onyx">Onyx</option>
                                <option value="Papyrus" style="font-family:Papyrus">Papyrus</option>
                                <option value="Parchment" style="font-family:Parchment">Papyrus</option>
                                <option value="Playbill" style="font-family:Playbill">Playbill</option>
                                <option value="Viner Hand ITC" style="font-family:Viner Hand ITC">Viner Hand ITC</option>
                                <option value="Vivaldi" style="font-family:Vivaldi">Vivaldi</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="row container-row">
                        <div class="symbol-select-div">
                                <label id="symbolLabel" class="symbols_label info-label" for="symbol-btn">SYMBOL :</label>
                                <input type="button" class="btn btn-dark btn-md" id="symbol-btn" name="symbol-btn" value="SELECT SYMBOL">
                        </div>
                    </div>

                    <div class="row container-row">
                        <div class="symbol-select-div">
                                <label id="colorsymbolLabel" class="symbols_label info-label" for="color-symbol">SYMBOL COLOR :</label>
                                <input class="color-input" type="color" id="color-symbol" name="color-symbol">
                        </div>
                    </div>

                    <div class="row container-row">
                        <div class="symbol-select-div">
                            <label id="colorcrestLabel" class="symbols_label info-label" for="color-base">CREST COLOR :</label>
                            <input class="color-input" type="color" id="color-base" name="color-base">
                        </div>
                    </div>

                    <div class="row container-row">
                        <div class="symbol-select-div">
                            <label id="colorbannerLabel" class="symbols_label info-label" for="color-banner">BANNER COLOR :</label>
                            <input class="color-input" type="color" id="color-banner" name="color-banner">
                        </div>
                    </div>

                    <div class="row container-row">
                        <div class="symbol-select-div">
                            <label id="colorletterLabel" class="symbols_label info-label" for="color-letter">LETTER COLOR :</label>
                            <input class="color-input" type="color" id="color-letter" name="color-letter">
                        </div>
                    </div>

                    <div class="row container-row">
                        <div class="symbol-select-div">
                            <label id="colorbackgroundLabel" class="symbols_label info-label" for="color-background">BACKGROUND COLOR :</label>
                            <input class="color-input" type="color" id="color-background" name="color-background">
                        </div>
                    </div>

                    <input type="submit" class="btn btn-dark btn-lg" id="createbutton" name="createbutton" value="CREATE CREST">

                </form>

                <div class="colors-icons hidden" id="colors-icons-div">
                    <div class="colors-icons-container">
                        <div class="color-icon" id="symbol-color-icon" title="Symbol Color"></div>
                    </div>
                    <div class="colors-icons-container">
                        <div class="color-icon" id="base-color-icon" title="Base Color"></div>
                    </div>
                    <div class="colors-icons-container">
                        <div class="color-icon" id="banner-color-icon" title="Banner Color"></div>
                    </div>
                    <div class="colors-icons-container">
                        <div class="color-icon" id="letter-color-icon" title="Letter Color"></div>
                    </div>
                    <div class="colors-icons-container">
                        <div class="color-icon" id="back-color-icon" title="Back Color"></div>
                    </div>
                </div>
                <div class="image-container hidden" id="end-btns-div">
                    <input type="button" class="btn btn-dark btn-lg end-btns" id="newcrest-btn" name="newcrest-btn" value="NEW CREST">
                    <input type="button" class="btn btn-dark btn-lg end-btns" id="savecrest-btn" name="savecrest-btn" value="SAVE CREST">
                </div>

            </div>
            
            <div class="row container-right" id="crest-background">

                <div class="hidden" id="status-crest"></div>
                
                <div  class="crest-text" id="crest-name"></div>

                <div class="row container-row upper-banner-div">
                    <div class="image-container crest-banner" id="crest-banner-upper"></div>
                </div>

                <div class="crest-image symbol-image" id="crest-symbol"></div>
                <input type="hidden" id="crestsymbol" name="crestsymbol">

                <div class="crest-image" id="crest-base"></div>
                <input type="hidden" id="crest-base-show" name="crest-base-show">

                <div  class="crest-text" id="crest-motto"></div>

                <div class="row container-row lower-banner-div">
                    <div class="image-container crest-banner" id="crest-banner-lower"></div>    
                </div>

            </div>

        </div>

        <div id="color-icon-modal" class="modal">
            <span class="close-color-icon-modal close">&times;</span>
            <h1 class="modal-title" id="color-icon-modal-title"></h1>
            <div id="color-icon-caption" class="caption caption-colors"></div>
        </div>

        <canvas id="canvas" height="700" width="700" class="hidden"></canvas>

    </div>

    <script type="text/javascript" src="js/creator.js"></script>

</body>

</html>