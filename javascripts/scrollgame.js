var timestamp;
/**
 * @function eventScrollGame
 * Mini-game portion of the game. Players collect objects
 * that belong to the biome and avoid ones that don't.
 */
var bgrnd;
function eventScrollGame() {
	timestamp = new Date();
    /** standard canvas and stage variables */
    var canvas;
    var stage;
    /** background image*/
    var bg;
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
		defaults to easy so that first objects generated are slower to ease player into the game

		*/
    
    /**
     * @function onMouseDown
     * Handles a click down.
     */
    var onMouseDown = function(){
        if(!e){var e = window.event;}
        clicked = true;
    };
    /**
     * @function onMouseUp
     * Handles a click release.
     */
    var onMouseUp = function (){
        clicked = false;
    };
    
    canvas = document.getElementById("main");
    big_contain = new createjs.Container();
    
    canvas.onmousedown = onMouseDown;
    canvas.onmouseup = onMouseUp;
    
    bg = new Image();
    bg.src = "rainforest.jpg";
    bg.onload = setBG;
	
	var start_contain = new createjs.Container();
	
	var anim_contain = new createjs.Container();
	
	var bioindex = game.currentBiome.num - 1;
	console.log("biome num: " + bioindex);
	if (bioindex > 0){
		var bad_bio = bioindex - 1;
	}
	else{
		var bad_bio = bioindex + 1;
	}	
	var good1 =  new createjs.Bitmap(game.assets[bioindex][1].result);
	good1.name = "good1";
	var good1bounds = good1.getBounds();
	var maxgood1 = Math.max(good1bounds.height, good1bounds.width);
	good1.scaleX = good1.scaleBackX = 130/maxgood1;
	good1.scaleY = good1.scaleBackY = 130/maxgood1;
    createAnimals(good1);
    
    var bad1 = new createjs.Bitmap(game.assets[bad_bio][1].result);
	bad1.name = "bad1";
	var bad1bounds = bad1.getBounds();
	var maxbad1 = Math.max(bad1bounds.height, bad1bounds.width);
	bad1.scaleX = bad1.scaleBackX = 130/maxbad1;
	bad1.scaleY = bad1.scaleBackY = 130/maxbad1;
	createAnimals(bad1);
	
	var good2 = new createjs.Bitmap(game.assets[bioindex][2].result);
	var good2bounds = good2.getBounds();
	var maxgood2 = Math.max(good2bounds.height, good2bounds.width);
	good2.scaleX = good2.scaleBackX = 130/maxgood2;
	good2.scaleY = good2.scaleBackY = 130/maxgood2;
	good2.name = "good2";
	createAnimals(good2);
	
	var bad2 = new createjs.Bitmap(game.assets[bad_bio][2].result);
	var bad2bounds = bad2.getBounds();
	var maxbad2 = Math.max(bad2bounds.height, bad2bounds.width);
	bad2.scaleX = bad2.scaleBackX = 130/maxbad2;
	bad2.scaleY = bad2.scaleBackY = 130/maxbad2;
	bad2.name = "bad2";
	createAnimals(bad2);
   
    /**
     * @function setBG
     * Sets the background for the mini-game.
     */
    function setBG(event){
        bgrnd = new createjs.Bitmap(bg);
        game.getStage().addChild(bgrnd, big_contain);
		var start_text = new createjs.Text("Please select difficulty: \n", "32px Arial", "white");
		start_text.x = game.getStage().width/2 - 135;
		start_text.y = game.getStage().height/3 - 10;
		start_text.align = "center";
		var start_box = new createjs.Shape();
		start_box.graphics.beginFill("#000000").drawRect(canvas.width/2 - 185, canvas.height/3 - 15, 410, 170);
		var easy_button = new CircleButton("Easy", "24px Arial", 0, 0, "#00e676", game.getStage().width/2 - 120, game.getStage().height/3 + 80, 55, "#bdbdbd", "click", pick_easy);
		var med_button = new CircleButton("Medium", "24px Arial", 0, 0, "#ff9100", game.getStage().width/2 + 20, game.getStage().height/3 + 80, 55, "#bdbdbd", "click", pick_medium);
		var hard_button = new CircleButton("Hard", "24px Arial", 0, 0, "#00b0ff", game.getStage().width/2 + 160, game.getStage().height/3 + 80, 55, "#bdbdbd", "click", pick_hard);
        start_contain.addChildAt(start_box, start_text, easy_button.container, med_button.container, hard_button.container, 0);
		big_contain.addChild(start_contain);
		game.getStage().update();
    }
	
	/**
	 *  @function pick_easy
	 *  Sets the minigame to the easiest settings
	 */
	function pick_easy () {
		difficulty = 1;
		play = true;
		big_contain.addChild(anim_contain);
		big_contain.removeChild(start_contain);
	}
	
	/**
	 *  @function pick_medium
	 *  Sets the minigame to the medium settings
	 */
	function pick_medium () {
		difficulty = 2;
		play = true;
		big_contain.addChild(anim_contain);
		big_contain.removeChild(start_contain);
	}
	
	/**
	 *  @function pick_hard
	 *  Sets the minigame to the hardest settings
	 */
	function pick_hard () {
		difficulty = 4;
		play = true;
		big_contain.addChild(anim_contain);
		big_contain.removeChild(start_contain);
	}
    
    /**
     * @function createAnimals
     * Creates animal objects and enables clicking on them.
     */
	 
    function createAnimals(bitmp){
		var l = 2;
        for (var i=0; i<l; i++){
            bitmap = bitmp;
            anim_contain.addChild(bitmap);
			resetAnimal(bitmap);
            bitmap.regX = bitmap.image.width/2|0;
            bitmap.regY = bitmap.image.height/2|0;
            bitmap.mouseEnabled = true;
            bmpList.push(bitmap);
        }
        
        createjs.Ticker.addEventListener("tick", tick);
    }
  
    /**
     * @function resetAnimal
     * Places animals randomly into the mini-game to be clicked/not clicked.
     */	 
    function resetAnimal(animal){
        animal.x = canvas.width + Math.random()*500;
        animal.y = canvas.height * Math.random()|0;
		// speed calculated based on difficulty setting - default is decently slow for younger kids (easy to tweak)
        animal.speed = (Math.random()*3)+ 1.5 + difficulty;
    }
    
    /**
     * @function tick
     * Ticker function for animation.
     */
    function tick(){
        /** check for clicking */
        if (!clicked && game.getStage().mouseX && game.getStage().mouseY){
            mouseTarget = game.getStage().getObjectUnderPoint(game.getStage().mouseX, game.getStage().mouseY);
        }
        if (clicked && mouseTarget){
            var tempText = String(mouseTarget.name);
            if ((tempText== "bad1" || tempText== "bad2") && play == true){
                resetAnimal(mouseTarget);
                incorrect++;
                clicked=false;
            }
            else if ((tempText== "good1" || tempText=="good2" )&& play == true){
                resetAnimal(mouseTarget);
                correct++;
                clicked=false;
            }
        }
        /** moving the animals */
        if (play == true){
            var l=bmpList.length;
            for(var i=0; i<l; i++){
                var bmp = bmpList[i];
                if (bmp.x > -200){
                    bmp.x -= bmp.speed;
                }else{
                    if (bmp.name == "good1" || bmp.name == "good2"){
                        gameOver();
                        console.log("game over");
                    }
                    else{
                        resetAnimal(bmp);
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
		scoreBox.graphics.beginFill("#212121").drawRect(canvas.width/2 - 245, canvas.height/3 - 30, 485, 210);
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
        game.getStage().update();
        big_contain.on("click", function(event) {
		var additionalInfo = {};
	    additionalInfo["biome"] = "rain-forest";
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
    }
}
