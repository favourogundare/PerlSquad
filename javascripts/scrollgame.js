/**
 * @function eventScrollGame
 * Mini-game portion of the game. Players collect objects
 * that belong to the biome and avoid ones that don't.
 */
var bgrnd;
function eventScrollGame() {
    /** standard canvas and stage variables */
    var canvas;
    var stage;
    /** background image*/
    var bg;
    /** keeps track of player score */
    var score;
	var points_lost = 0;
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
		defaults to normal
		*/
    
    /**
     * @function onMouseDown
     * Handles a click down.
     */
    var onMouseDown = function(){
        if(!e){var e = window.event;}
        clicked = true;
    }
    /**
     * @function onMouseUp
     * Handles a click release.
     */
    var onMouseUp = function (){
        clicked = false;
    }
    
    canvas = document.getElementById("main");
    //stage = new game.getStage();
    stage = new createjs.Container();
    score = 0;
    
    canvas.onmousedown = onMouseDown;
    canvas.onmouseup = onMouseUp;
    
    bg = new Image();
    bg.src = "rainforest.jpg";
    bg.onload = setBG;
    
    var toucan = new Image();
    toucan.src = "toucan.png";
    toucan.name = "toucan";
    toucan.onload = createAnimals;
    
    var sheep = new Image();
    sheep.src = "sheep.png";
    sheep.name = "sheep";
    sheep.onload = createAnimals;
	
	var start_contain = new createjs.Container();
   
    /**
     * @function setBG
     * Sets the background for the mini-game.
     */
    function setBG(event){
        bgrnd = new createjs.Bitmap(bg);
        game.getStage().addChild(bgrnd, stage);
		var start_text = new createjs.Text("Please select difficulty: \n", "32px Arial", "white");
		start_text.x = game.getStage().width/2 - 135;
		start_text.y = game.getStage().height/3 - 10;
		start_text.align = "center"
		var start_box = new createjs.Shape();
		start_box.graphics.beginFill("#212121").drawRect(canvas.width/2 - 185, canvas.height/3 - 15, 410, 170);
		var easy_button = new CircleButton("Easy", "24px Arial", 0, 0, "#00e676", game.getStage().width/2 - 120, game.getStage().height/3 + 80, 55, false, "#212121", "click", pick_easy);
		var med_button = new CircleButton("Medium", "24px Arial", 0, 0, "#ff9100", game.getStage().width/2 + 20, game.getStage().height/3 + 80, 55, false, "#212121", "click", pick_medium);
		var hard_button = new CircleButton("Hard", "24px Arial", 0, 0, "#00b0ff", game.getStage().width/2 + 160, game.getStage().height/3 + 80, 55, false, "212121", "click", pick_hard);
        start_contain.addChildAt(start_box, start_text, easy_button.container, med_button.container, hard_button.container, 0);
		stage.addChild(start_contain);
		game.getStage().update();
    }
	
	var anim_contain = new createjs.Container();
	
	function pick_easy () {
		difficulty = 1;
		play = true;
		stage.addChild(anim_contain);
		stage.removeChild(start_contain);
	}
	
	function pick_medium () {
		difficulty = 2;
		play = true;
		stage.addChild(anim_contain);
		stage.removeChild(start_contain);
	}
	
	function pick_hard () {
		difficulty = 4;
		play = true;
		stage.addChild(anim_contain);
		stage.removeChild(start_contain);
	}
    
    /**
     * @function createAnimals
     * Creates animal objects and enables clicking on them.
     */
	 
	 var anim_contain = new createjs.Container();
	 
    function createAnimals(event){
        var image = event.target;
		var l = 4;
        for (var i=0; i<l; i++){
            bitmap = new createjs.Bitmap(image);
            anim_contain.addChild(bitmap);
            bitmap.name=image.name;
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
        animal.speed = (Math.random()*4)+ 2 + difficulty;
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
            if (tempText=="sheep" && play == true){
                resetAnimal(mouseTarget);
                score-=50*difficulty;
				points_lost +=50*difficulty;
                if (score < 0){ /** prevent negative score */
                    score = 0;
                }
                clicked=false;
            }
            else if (tempText=="toucan"&& play == true){
                resetAnimal(mouseTarget);
                score+=50*difficulty;
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
                    if (bmp.name == "toucan"){
                        gameOver();
                        console.log("game over");
                    }
                    else{
                        resetAnimal(bmp);
                    }
                }
            }
        }
        //txt.text = "Score: "+score;
        game.getStage().update();
    }
    /**
     * @function gameOver
     * Ends game and displays "Game Over" text.
     */
    function gameOver(){
        stage.removeAllChildren();
		var scoreBox = new createjs.Shape();
		scoreBox.graphics.beginFill("#212121").drawRect(canvas.width/2 - 225, canvas.height/3 - 30, 450, 150);
		stage.addChild(scoreBox);
        gameTxt = new createjs.Text("Game Over\n", "36px Arial", "white");
		gameTxt.text += "Score: " + score + "\n";
        gameTxt.text += "Click to Try Another Biome\n";
		if (points_lost > 6*50*difficulty){
			gameTxt.text += "\n\n Hint: click on animals that belong in the rainforest!"
		}
        gameTxt.textAlign = "center";
        gameTxt.x = canvas.width/2;
        gameTxt.y = canvas.height/3;
        stage.addChild(gameTxt);
        play=false;
        var l=bmpList.length;
        for(var i=0; i<l; i++){
            var bmp = bmpList[i];
            resetAnimal(bmp);
        }
        game.getStage().update();
        stage.on("click", function(event) {
            console.log("Clicked!");
            game.getStage().removeChild(stage);
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
        stage.removeChild(gameTxt);
        score=0;
        
        play=true;
    }
}
