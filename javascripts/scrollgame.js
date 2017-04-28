/**
 * @function eventScrollGame
 * Mini-game portion of the game. Players click animals
 * that belong to the biome and avoid ones that don't.
 */
function eventScrollGame() {
	"use strict";
	var timestamp = new Date();
    /** standard canvas variable */
    var canvas;
    /** background image*/
    var bg, bgrnd;
    /** keeps track of correctly and incorrectly clicked objects */
    var correct = 0;
	var incorrect = 0;
	
    /** stores ship bitmaps */
    var bmpList = [];
    var bitmap;
    /** text display */
    var txt;
    // is the game currently in play?
    var play;
    /** game over text */
    var gameTxt;
    /** the mouse's current target */
    var mouseTarget;
    // is the mouse being clicked?
    var clicked;
    /** initializes the ship game */
	
	var difficulty = 1;
	/** difficulty of the minigame - 1 is easy, 3 is normal, 5 is hard 
		defaults to easy so that first objects generated are slower to ease player into the game*/
	
	/** big container for elements of scroll game */
	var big_contain = new createjs.Container();
	
	
	var check = new createjs.Bitmap("./Pictures/icons/checkmark.png");
	check.shadow = new createjs.Shadow("#000000", 5, 5, 10);
	check.scaleX = check.scaleY = 0.9;
	var not_check = new createjs.Bitmap("./Pictures/icons/no.png");
	not_check.shadow = new createjs.Shadow("#000000", 5, 5, 10);
	not_check.scaleX = not_check.scaleY = 0.9;
	
	canvas = document.getElementById("main");
	
	/** pre game info screen */
	var start_contain = new createjs.Container();
	
	/** container for animals */
	var anim_contain = new createjs.Container();
	
	/** get index for biome from the game class */
	var bioindex = game.currentBiome.num - 1;
	
	/** picks a "bad" index that isn't the same as current biome */
	var bad_bio;
	if (bioindex > 0){
		bad_bio = bioindex - 1;
	}
	else{
		bad_bio = bioindex + 1;
	}	
	
	/** get background image */
	bg = new Image();
	switch(bioindex){
		case 0:
			bg.src = "./Pictures/Background/deciduous.jpg";
			break;
		case 1:
			bg.src = "./Pictures/Background/desert.jpg";
			break;
		case 2:
			bg.src = "./Pictures/Background/grassland.jpg";
			break;
		case 3:
			bg.src = "./Pictures/Background/rainforest.jpg";
			break;
		case 4:
			bg.src = "./Pictures/Background/tundra.jpg";
			break;
	}
    bg.onload = setBG;
	
	/**
	 *  @function HandleBadClicked
	 *  Handler function for whenever an image
	 *  is clicked that does not belong to the 
	 *  biome. Moves image clicked back to right
	 *  of screen, increments incorrect count, 
	 *  and accelerates image movement.
	 *  @param e
	 */
	function HandleBadClicked(e) {
		e = e || window.event; // get window.event if e argument missing (in IE)
		resetAnimal(e.currentTarget);
		speed_up += 0.05 + difficulty*difficulty*0.02;
		e.currentTarget.speed += speed_up;
		if (difficulty == 1){
			if (big_contain.contains(check)){
				big_contain.removeChild(check);
			}
			big_contain.addChild(not_check);
			game.getStage().update();
		}
		incorrect++;
	}
	
	/**
	 *  @function HandleGoodClicked
	 *  Handler function for whenever an image
	 *  is clicked that does not belong to the 
	 *  biome. Moves image clicked back to right
	 *  of screen, increments correct count, and 
	 *  accelerates image movement.
	 *  @param e
	 */
	function HandleGoodClicked(e) {
		e = e || window.event; // get window.event if e argument missing (in IE)
		resetAnimal(e.currentTarget);
		speed_up += 0.05 + difficulty*difficulty*0.02;
		e.currentTarget.speed += speed_up;
		if (difficulty == 1){
			if (big_contain.contains(not_check)){
				big_contain.removeChild(not_check);
			}
			big_contain.addChild(check);
			game.getStage().update();
		}
		correct++;
	}
	
	/** "good" animal is retreived from the assets array */
	var good1 = new createjs.Bitmap(game.assets[bioindex][0].result);
	good1.shadow = new createjs.Shadow("#000000", 3, 3, 5);
	good1.name = "good1";
	/** scales the image to be roughly the same size as the others */
	/** height or width (whichever is bigger) is used to scale dimensions */
	var good1bounds = good1.getBounds();
	var maxgood1 = Math.max(good1bounds.height, good1bounds.width);
	good1.scaleX = good1.scaleBackX = 140/maxgood1;
	good1.scaleY = good1.scaleBackY = 140/maxgood1;
	good1.addEventListener("click", HandleGoodClicked);
    
	/** "bad" animal retrieved */
    var bad1 = new createjs.Bitmap(game.assets[bad_bio][0].result);
	bad1.shadow = new createjs.Shadow("#000000", 3, 3, 5);
	bad1.name = "bad1";
	var bad1bounds = bad1.getBounds();
	var maxbad1 = Math.max(bad1bounds.height, bad1bounds.width);
	bad1.scaleX = bad1.scaleBackX = 140/maxbad1;
	bad1.scaleY = bad1.scaleBackY = 140/maxbad1;
	bad1.addEventListener("click", HandleBadClicked);
	
	var good2 = new createjs.Bitmap(game.assets[bioindex][1].result);
	good2.shadow = new createjs.Shadow("#000000", 3, 3, 5);
	var good2bounds = good2.getBounds();
	var maxgood2 = Math.max(good2bounds.height, good2bounds.width);
	good2.scaleX = good2.scaleBackX = 140/maxgood2;
	good2.scaleY = good2.scaleBackY = 140/maxgood2;
	good2.name = "good2";
	good2.addEventListener("click", HandleGoodClicked);
	
	var bad2 = new createjs.Bitmap(game.assets[bad_bio][1].result);
	bad2.shadow = new createjs.Shadow("#000000", 3, 3, 5);
	var bad2bounds = bad2.getBounds();
	var maxbad2 = Math.max(bad2bounds.height, bad2bounds.width);
	bad2.scaleX = bad2.scaleBackX = 140/maxbad2;
	bad2.scaleY = bad2.scaleBackY = 140/maxbad2;
	bad2.name = "bad2";
	bad2.addEventListener("click", HandleBadClicked);
   
	/**
	 * @function setBG
	 * Sets the background for the mini-game.
	 * Also creates a selection screen for difficulty as well as some brief info about the rules
	 * of the game
	 * @param event
	 */
	function setBG(event){
		bgrnd = new createjs.Bitmap(bg);
		game.getStage().addChild(bgrnd, big_contain);
		
		var instruct_text = new createjs.Text("Click on the Animals that belong in the biome!\n"+
											  "The animals will speed up over time\n", "32px Arial", "black");
			instruct_text.x = game.getStage().width/2;
			instruct_text.y = 60;
			instruct_text.textAlign = "center";
		var instruct_textInner = instruct_text.clone();
			instruct_textInner.color = "white";
			instruct_textInner.shadow = undefined;
			instruct_textInner.outline = false;
			instruct_text.shadow = new createjs.Shadow("#000", -3, -3, 25);
			instruct_text.outline = 3;
		
		var start_text = new createjs.Text("Please select difficulty:\n", "32px Arial", "black");
			start_text.x = game.getStage().width/2;
			start_text.y = game.getStage().height/3 - 10;
			start_text.textAlign = "center";
		var start_textInner = start_text.clone();
			start_textInner.color = "white";
			start_textInner.shadow = undefined;
			start_textInner.outline = false;
			start_text.shadow = new createjs.Shadow("#000", -3, -3, 25);
			start_text.outline = 3;
		
		if (game.speechOn) {
			responsiveVoice.speak(instruct_text.text, 'UK English Female', {onend: function() {
				responsiveVoice.speak(start_text.text);
			}});
		}
		
		var start_box = new createjs.Shape();
		start_box.shadow = new createjs.Shadow("#000000", 5, 5, 10);
		start_box.graphics.beginFill("#000000").drawRect(canvas.width/2 - 205, canvas.height/3 - 15, 410, 170);
		var easy_button = new CircleButton("Easy", "24px Arial", 0, 0, "#00e676", game.getStage().width/2 - 140, game.getStage().height/3 + 80, 55, "#bdbdbd", "click", pick_easy);
		var med_button = new CircleButton("Medium", "24px Arial", 0, 0, "#ff9100", game.getStage().width/2, game.getStage().height/3 + 80, 55, "#bdbdbd", "click", pick_medium);
		var hard_button = new CircleButton("Hard", "24px Arial", 0, 0, "#00b0ff", game.getStage().width/2 + 140, game.getStage().height/3 + 80, 55, "#bdbdbd", "click", pick_hard);
        start_contain.addChild(start_box, start_text, start_textInner, instruct_text, instruct_textInner, easy_button.container, med_button.container, hard_button.container);
		big_contain.addChild(start_contain);
		game.getStage().update();
    }
	
	/**
	 *  @function pick_easy
	 *  Sets the minigame to the easiest settings
	 */
	function pick_easy () {
		difficulty = 1;
		createAnimals(good1);
		createAnimals(good2);
		createAnimals(bad1);
		createAnimals(bad2);
		play = true;
		check.x = 0;
		check.y = 0;
		not_check.x = check.x;
		not_check.y = check.y;
		big_contain.addChild(anim_contain);
		big_contain.removeChild(start_contain);
	}
	
	/**
	 *  @function pick_medium
	 *  Sets the minigame to the medium settings
	 */
	function pick_medium () {
		difficulty = 2;
		createAnimals(good1);
		createAnimals(good2);
		createAnimals(bad1);
		createAnimals(bad2);
		play = true;
		big_contain.addChild(anim_contain);
		big_contain.removeChild(start_contain);
	}
	
	/**
	 *  @function pick_hard
	 *  Sets the minigame to the hardest settings
	 */
	function pick_hard () {
		difficulty = 3;
		createAnimals(good1);
		createAnimals(good2);
		createAnimals(bad1);
		createAnimals(bad2);
		play = true;
		big_contain.addChild(anim_contain);
		big_contain.removeChild(start_contain);
	}
	
	createjs.Ticker.addEventListener("tick", tick);
	createjs.Ticker.setFPS(30);
	
	/**
	 *  @function createAnimals
	 *  Generates two animals using the bitmap given 
	 *  @param bitmp
	 */
	function createAnimals(bitmp){
		var l = 2;
		for (var i=0; i<l; i++){
			bitmap = bitmp;
			anim_contain.addChild(bitmap);
			resetAnimal(bitmap);
			bitmap.mouseEnabled = true;
			bmpList.push(bitmap);
		}
	}
	
	/** gradually speeds up animals */
	var speed_up = 0.0;
	
	/**
	 * @function resetAnimal
	 * Places animals randomly into the mini-game to be clicked/not clicked.
	 * @param animal
	 */
    function resetAnimal(animal){
		console.log(animal);
		console.log(canvas.height);
        animal.x = canvas.width + Math.random()*500;
        animal.y = Math.floor((canvas.height-(animal.scaleX*animal.image.height)) * Math.random());
		console.log("Y: " + animal.y);
		// speed calculated based on difficulty setting - default is decently slow for younger kids (easy to tweak)
        animal.speed = Math.random()*0.8 + difficulty;
    }
    
    /**
     * @function tick
     * Ticker function for animation.
	 * speed up increases by difficulty^2 times 0.02 plus 0.05 on every object clicked
	 * whenever an animal is reset, it's speed is increased by speed_up
     */
    function tick(){
        /** moving the animals */
        if (play === true){
            var l=bmpList.length;
            for(var i=0; i<l; i++){
                var bmp = bmpList[i];
                if (bmp.x > -150){
                    bmp.x -= bmp.speed;
                }else{
                    if (bmp.name == "good1" || bmp.name == "good2"){
                        gameOver();
                        console.log("game over");
                    }
                    else{
                        resetAnimal(bmp);
						bmp.speed += speed_up;
                    }
                }
            }
        }
        game.getStage().update();
    }
    /**
     * @function gameOver
     * Ends game and displays "Game Over" text.
     */
    function gameOver(){
        big_contain.removeAllChildren();
		var scoreBox = new createjs.Shape();
		scoreBox.graphics.beginFill("#212121").drawRect(canvas.width/2 - 275, canvas.height/3 - 30, 550, 210);
		scoreBox.shadow = new createjs.Shadow("#000000", 5, 5, 10);
		big_contain.addChild(scoreBox);
        gameTxt = new createjs.Text("Game Over\n", "36px Arial", "white");
		gameTxt.text += "You clicked: " + correct + " correct animals";
		gameTxt.text += "\nAnd " + incorrect + " incorrect animals";
        gameTxt.text += "\nClick to Try Another Biome\n";
        gameTxt.textAlign = "center";
        gameTxt.x = canvas.width/2;
        gameTxt.y = canvas.height/3;
        big_contain.addChild(gameTxt);
        play=false;
        var l=bmpList.length;
        for(var i=0; i<l; i++){
            var bmp = bmpList[i];
            resetAnimal(bmp);
        }

		var infoText = new createjs.Text();
		var infoTextInner;
	
		/**
		 * @function setImg
		 *  Used to set images on post-game info
		 *  screen.
		 * @param img
		 * @param imgX
		 * @param imgY
		 */
		function setImg (img, imgX, imgY) {
			var bounds = img.getBounds();
			var maxBound = Math.max(bounds.height, bounds.width);
			img.scaleX = img.scaleBackX = 140/maxBound;
			img.scaleY = img.scaleBackY = 140/maxBound;
			img.x = imgX-img.image.width*img.scaleX/2;
			img.y = imgY-img.image.height*img.scaleX/2;
		}
		
		/**
		 *  @function setHoverEffects
		 *  Used to set the hover effects of images
		 *  on the post-game info screen.
		 *  @param img
		 *  @param index
		 *  @param i
		 */
		function setHoverEffects(img, index, i) {
			img.on("rollover", function (event) {
				this.scaleX = this.scaleBackX * 1.1;
				this.scaleY = this.scaleBackY * 1.1;
				infoText.text = game.imageText[index][i][0];
				infoText.font = "28px Arial";
				infoText.color = "black";
				infoText.x = 250;
				infoText.y = 10;
				infoTextInner = infoText.clone();
				infoTextInner.color = "white";
				infoTextInner.shadow = undefined;
				infoTextInner.outline = false;
				infoText.shadow = new createjs.Shadow("#000", -3, -3, 25);
				infoText.outline = 3;
				if (game.speechOn) {
					responsiveVoice.speak(infoText.text);
				}
				big_contain.addChild(infoText, infoTextInner);
				game.getStage().update();
			});
			
			img.on("rollout", function (event) {
				this.scaleX = this.scaleBackX;
				this.scaleY = this.scaleBackY;
				if (game.speechOn) {
					responsiveVoice.cancel();
				}
				big_contain.removeChild(infoText, infoTextInner);
				game.getStage().update();
			});
		}
		
		/**
		 *  @function setBiomeInfo
		 *  Handles setting up all the post-game
		 *  info screen info.
		 */
		function setBiomeInfo() {
			for (var i=0; i<2; i++) {
				var newImage = new createjs.Bitmap(game.assets[bioindex][i].result);
				big_contain.addChild(newImage);
				setImg(newImage, 100, 140 + 180 * i );
				setHoverEffects(newImage, bioindex, i);
			}
			for (var i=0; i<2; i++) {
				var newImage = new createjs.Bitmap(game.assets[bad_bio][i].result);
				big_contain.addChild(newImage);
				setImg(newImage, 860, 140 + 180 * i );
				setHoverEffects(newImage, bad_bio, i);
			}

			game.getStage().update();
		}

		setBiomeInfo();
		
        big_contain.on("click", function(event) {
	    var additionalInfo = {};
	    additionalInfo["biome"] = game.currentBiome.name;
	    additionalInfo["correct"] = correct;
	    additionalInfo["incorrect"] = incorrect;
	    sendUserTimeInfo("scroll-game", timestamp, additionalInfo);
	    
            console.log("Clicked!");
            game.getStage().removeChild(big_contain);
            game.getStage().removeChild(bgrnd);
            game.progress();
        });
    }
    
    /**
     * @function handleClick
     * Handles a click after a game over
     */
    var handleClick = function(){
        canvas.onclick=null;
        big_contain.removeChild(gameTxt);
        score=0;
        
        play=true;
    };
}
