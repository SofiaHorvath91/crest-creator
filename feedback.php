<?php include 'php_general/header.php';?>

<body id="home-bg" class="background">

    <?php include 'php_general/navbar.php';?>

    <div class="row container-row main">

        <div class="col-xs-1 text-center">
            <br>
            <h1 id="feedback-title" class="display-6">HAPPY TO HAVE YOUR FEEDBACK</h1>
            <br>
        </div>
        <div class="row container-row">
            <div class="image-container">
                <img class="main-image" id="feedback-main-image" src="img/cc-main.png">
            </div>
        </div>

        <div class="row container-row" id="feedback-stars">
            <div class="image-container">
                <fieldset id="ratingstars" class="rating">
                    <input class="star-rating" type="radio" id="star5" name="rating" value="Awesome_5" />
                    <label class="full" for="star5" title="Awesome - 5 stars"></label>
                    <input class="star-rating" type="radio" id="star4half" name="rating" value="Pretty good_4.5" />
                    <label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
                    <input class="star-rating" type="radio" id="star4" name="rating" value="Pretty good_4" />
                    <label class="full" for="star4" title="Pretty good - 4 stars"></label>
                    <input class="star-rating" type="radio" id="star3half" name="rating" value="Okay_3.5" />
                    <label class="half" for="star3half" title="Okay - 3.5 stars"></label>
                    <input class="star-rating" type="radio" id="star3" name="rating" value="Okay_3" />
                    <label class="full" for="star3" title="Okay - 3 stars"></label>
                    <input class="star-rating" type="radio" id="star2half" name="rating" value="Kinda bad_2.5" />
                    <label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
                    <input class="star-rating" type="radio" id="star2" name="rating" value="Kinda bad_2" />
                    <label class="full" for="star2" title="Kinda bad - 2 stars"></label>
                    <input class="star-rating" type="radio" id="star1half" name="rating" value="Simply bad_1.5" />
                    <label class="half" for="star1half" title="Simply bad - 1.5 stars"></label>
                    <input class="star-rating" type="radio" id="star1" name="rating" value="Simply bad_1" />
                    <label class="full" for="star1" title="Simply bad - 1 star"></label>
                    <input class="star-rating" type="radio" id="starhalf" name="rating" value="Horrible_0.5" />
                    <label class="half" for="starhalf" title="Horrible - 0.5 stars"></label>
                </fieldset>
            </div>
        </div>

        <div class="hidden" id="ratingstatus"></div>

        <div class="row container-row hidden" id="comment-div">
            <div class="row container-row hidden" id="comment-yesno-buttons">
                <div class="col-xs-1 text-center">
                    <br>
                    <h3>FEEL FREE TO LEAVE A COMMENT AS WELL - IMPROVEMENT IDEAS ARE ALSO WELCOMED!
                        <br>WOULD YOU LIKE TO LEAVE A COMMENT?</h3>
                    <br>
                </div>
                <div class="image-container">
                    <form id="radiosYesNo">
                        <input class="comment-radiobtn" type="radio" id="yescomment" name="yescomment" value="yes">
                        <label class="comment-yesno" id="yescomment-label" for="yes">YES</label>
                        <input class="comment-radiobtn" type="radio" id="nocomment" name="nocomment" value="no">
                        <label class="comment-yesno" id="nocomment-label" for="no">NO</label>
                    </form>
                </div>
            </div>
            <div class="row container-row hidden" id="comment-elements">
                <div class="row container-row">
                    <div class="image-container">
                        <textarea id="usercomment" class="feedback-txt" autocomplete="off"></textarea>
                    </div>
                </div>
                <div class="image-container">
                    <input type="submit" class="btn btn-dark btn-lg" id="commentbutton" name="commentbutton"
                        value="SEND COMMENT">
                    <form id="ratingform" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
                    </form>
                </div>
            </div>
        </div>

    </div>

    <script type="text/javascript" src="js/feedback.js"></script>

</body>

</html>