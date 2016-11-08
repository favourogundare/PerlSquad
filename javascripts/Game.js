// Global variable for game object
var game = new Game();
const GAME_WIDTH = 960;
const GAME_HEIGHT = 444;

function init() {
  var stage = new createjs.Stage("main");
  game.setStage(stage);
  game.start();
}

// This is a container for a single-player (for now), linear story based game. 
// A game is seen as a series of "Game Events," represented by the GameEvent object.
// Each GameEvent has two function pointers, moveFunc and actionFunc. The first is 
// meant to handle the transition between the last GameEvent and the current one.
// The second is meant to setup what actually happens at this point in the game.
// This includes rendering shapes and setting up EventListeners for user interaction.
// Meaning, what actually makes the game unique is the series of GameEvents and the code
// their function pointers point to.
// 
// To create custom GameEvent objects and add them to the sequence of events, create
// a priviledged member class (really a function obj) to Game.loadStory. This object should
// contain constructor code, which will be triggered when it is the current GameEvent; 
// eventListeners for user interaction and game progression, and any other data members needed  to do
// what you want at that point in the game. All eventListeners should be public functions such that
// CreateJS can launch them.
//
// Now, to assign one or more GameEvent's function pointers to point to this new function object,
// simply make the assignment in the body of Game.loadStory(). A simple example is provided.
// Each GameEvent will have to trigger Game.progress() at some point (most likely a listener function)
// to conclude the current GameEvent and trigger the next one. This will continue until there are no
// more GameEvent objects. Populate Game.start() and Game.finish() with code to handle
// the beginning and ending of the game.
function Game(easelStage) {
  //-- Private --//
  var stage = easelStage; // Reference to EaselJS Stage object
  var story = Array(); // Array of GameEvent objects
  var currentGameEvent; // A reference to the most recently visited GameEvent
  // Turn counter, and with single-player it's'also the position in the story
  var currentTurn;
  // For now, there is only one player in the game
  var player = new Player(new createjs.Bitmap("images/player.png"));
  // A reference to the player with the current turn. Can be an array
  // for multiplayer / teams. 
  var currentPlayer = player;
  // EaselJS Container object. Shape objects attached to this using 
  // Game.getContainer.addChild(Shape) can be manipulated as a collection.
  // Can be useful for encapsulating the main "playing field" from temporary
  // graphics or mini-games. 
  var mainGameContainer = new createjs.Container();

  // Private function called by Game.progress() when the end of the game is reached
  // Do anything to finish the game such as announce the winner, release
  // resources, ask if they'd like to play again, change graphics, etc...
  var finish = function() {
    var doneText = new createjs.Text("Game Finished!!", "20px Arial", "#ff7700");
    doneText.x = 100;
    doneText.y = 100;
    mainGameContainer.addChild(doneText);
    stage.update;
  }

  //-- Public --//
	
  // A generic container for game-scope data. Meaning, if it is needed
  // throughout different parts of the game, put it here. If the data is
  // needed for only one segment (i.e., GameEvent), bundle it with the object pointed to
  // by the GameEvent's moveFunc() or actionFunc() member. 
  this.globalData = {};

  // This is the most important function. Calling this transitions to the
  // next GameEvent. 
  this.progress = function() {
    if (++currentTurn >= story.length) finish();
    else {
      currentGameEvent = story[currentTurn];
      currentPlayer.updateGamePosition(currentGameEvent);
      currentGameEvent.trigger();
    }
  }

  // Called to start the game. Should initialize and render anything needed to start
  // the game. Will return with -1 for error if a easelJS stage hasn't
  // been provided using Game.setStage(Stage).  
  this.start = function() {
    // Attach container to main canvas stage
    if (stage === undefined) return -1;
    else stage.addChild(mainGameContainer);
    // Set background
    var background = new createjs.Bitmap("images/background_map.png");
    background.x = 0;
    background.y = 0;
    mainGameContainer.addChild(background);
    stage.update();
    // Load GameEvent objects
    game.loadStory();
    currentTurn = 0;
    currentGameEvent = story[0];

    // Run first GameEvent
    currentPlayer.updateGamePosition(currentGameEvent);
    currentGameEvent.trigger();
  }

  // Set / Get root EaselJS Shape object of the game
  this.setStage = function(easelJSStage) {
    stage = easelJSStage;
	stage.width = GAME_WIDTH;
	stage.height = GAME_HEIGHT;
  }
  this.getStage = function() {
    return stage;
  }

  //  Receive a reference to the player who's turn it currently is
  this.getCurrentPlayer = function() {
    return currentPlayer;
  }

  // Returns a reference to the current GameEvent object
  this.getCurrentEvent = function() {
    return currentGameEvent
  }

  this.getCurrentTurn = function() {
    return currentTurn;
  }

  // All function objects to which GameEvent members will point to should be declared as public
  // members of this class. Below is an example in which a player moves around the board after
  // being appropriately clicked (i.e., single or double).
  this.loadStory = function() {
	  
    // Player's avatar must be clicked to proceed
    this.singleClick = function() {
      var text;

      // Public eventListener to handle single clicking on the player
      this.handleClick = function(event) {
        // Delete old text
        mainGameContainer.removeChild(text)
        game.progress();
      }

      // What will be executed when the GameEvent function pointer is triggered
      text = new createjs.Text("Click the Player", "20px Arial", "#ff7700");
      text.x = 350;
      text.y = 350;
      mainGameContainer.addChild(text);
      var playerIcon = game.getCurrentPlayer().getIcon();
      playerIcon.x = 100 * (game.getCurrentTurn() + 1);
      playerIcon.y = 100;
      playerIcon.addEventListener("click", this.handleClick);
      mainGameContainer.addChild(playerIcon);
      stage.update();
    }

	this.startMenu = function() {
	var ALEX_IS_JUST_TRYING_TO_GET_THIS_TO_WORK_FOR_TOMORROW = 180;
    var stage;
		
    	//  Handle user clicking "start"
    	this.onStart = function(event) {
        	game.getStage().removeChild(stage);
        	game.getStage().update();
        	game.progress();
    	}
    
        // Change canvas color to off-white
		var canvas = game.getStage();
		var stage = canvas;
        // canvas.style.backgroundColor = "#f5f5f5";
        
        //initialize variables
        var incirclesr      = 40;
        var outcirclesr    = 50;
        var circlesy       = 150;
        var inrectw        = 280;
        var inrecth        = 30;
        var inrectangle1y  = 235;
        var inrectangle2y  = 310;
        var outrectangle1y = 225;
        var outrectangle2y = 300;
        var outrectanglesx = 150 + ALEX_IS_JUST_TRYING_TO_GET_THIS_TO_WORK_FOR_TOMORROW;
        var inrectanglesx  = 160 + ALEX_IS_JUST_TRYING_TO_GET_THIS_TO_WORK_FOR_TOMORROW;
        var outrectw       = 300;
        var outrecth       = 50;
        
        //initialize shapes
        stage         = new createjs.Container();
		game.getStage().addChild(stage);
        var outrectangles = new createjs.Graphics().beginFill("#616161").drawRect(outrectanglesx,0,outrectw,outrecth);
		var outcircles    = new createjs.Graphics().beginFill("#616161").drawCircle(0, circlesy, outcirclesr);
        var outcircle1    = new createjs.Shape(outcircles);
        var outcircle2    = new createjs.Shape(outcircles);
        var outcircle3    = new createjs.Shape(outcircles);
        var outcircle4    = new createjs.Shape(outcircles);
        var incircle1     = new createjs.Shape();
        var incircle2     = new createjs.Shape();
        var incircle3     = new createjs.Shape();
        var incircle4     = new createjs.Shape();
        var outrectangle1 = new createjs.Shape(outrectangles);
        var outrectangle2 = new createjs.Shape(outrectangles);
        var inrectangle1  = new createjs.Shape();
        var inrectangle2  = new createjs.Shape();
        
        //initialize text
        var p_num   = new createjs.Text("Pick # of Players", "36px Arial", "#616161");
        p_num.maxWidth = 1000;
        p_num.textAlign = "center";
        p_num.textBaseline = "middle";
        var p1      = new createjs.Text("1", "36px Arial", "#fafafa");
        p1.maxWidth = 1000;
        p1.textAlign = "center";
        p1.textBaseline = "middle";
        var p2      = new createjs.Text("2", "36px Arial", "#fafafa");
        p2.maxWidth = 1000;
        p2.textAlign = "center";
        p2.textBaseline = "middle";
        var p3      = new createjs.Text("3", "36px Arial", "#fafafa");
        p3.maxWidth = 1000;
        p3.textAlign = "center";
        p3.textBaseline = "middle";
        var p4      = new createjs.Text("4", "36px Arial", "#fafafa");
        p4.maxWidth = 1000;
        p4.textAlign = "center";
        p4.textBaseline = "middle";
        var start   = new createjs.Text("Start", "36px Arial", "#fafafa");
        start.maxWidth = 1000;
        start.textAlign = "center";
        start.textBaseline = "middle";
        var options = new createjs.Text("Options", "36px Arial", "#fafafa");
        options.maxWidth = 1000;
        options.textAlign = "center";
        options.textBaseline = "middle";
        
        //draw remaining shapes
        incircle1.graphics.beginFill("#f50057").drawCircle(120 + ALEX_IS_JUST_TRYING_TO_GET_THIS_TO_WORK_FOR_TOMORROW, circlesy, incirclesr);
        incircle2.graphics.beginFill("#00b0ff").drawCircle(240 + ALEX_IS_JUST_TRYING_TO_GET_THIS_TO_WORK_FOR_TOMORROW, circlesy, incirclesr);
        incircle3.graphics.beginFill("#00e676").drawCircle(360 + ALEX_IS_JUST_TRYING_TO_GET_THIS_TO_WORK_FOR_TOMORROW, circlesy, incirclesr);
        incircle4.graphics.beginFill("#ff9100").drawCircle(480 + ALEX_IS_JUST_TRYING_TO_GET_THIS_TO_WORK_FOR_TOMORROW, circlesy, incirclesr);
        inrectangle1.graphics.beginFill("#f44336").drawRect(inrectanglesx, inrectangle1y, inrectw, inrecth);
        inrectangle2.graphics.beginFill("#d500f9").drawRect(inrectanglesx, inrectangle2y, inrectw, inrecth);
        
        //set remaining shape coords
        outcircle1.x = 120 + ALEX_IS_JUST_TRYING_TO_GET_THIS_TO_WORK_FOR_TOMORROW;
        outcircle2.x = 240 + ALEX_IS_JUST_TRYING_TO_GET_THIS_TO_WORK_FOR_TOMORROW;
        outcircle3.x = 360 + ALEX_IS_JUST_TRYING_TO_GET_THIS_TO_WORK_FOR_TOMORROW;
        outcircle4.x = 480 + ALEX_IS_JUST_TRYING_TO_GET_THIS_TO_WORK_FOR_TOMORROW;
        outrectangle1.y = outrectangle1y;
        outrectangle2.y = outrectangle2y;
        
        //set text coords
        var circle_offset = 2 * (outcirclesr + 10)
        p_num.x   = canvas.width / 2;
        p_num.y   = circlesy - 100;
        p1.x      = canvas.width/2 - (circle_offset + circle_offset / 2);
        p1.y      = circlesy;
        p2.x      = canvas.width/2 - (circle_offset / 2);
        p2.y      = circlesy;
        p3.x      = canvas.width/2 + (circle_offset / 2);;
        p3.y      = circlesy;
        p4.x      = canvas.width/2 + (circle_offset + circle_offset / 2);;
        p4.y      = circlesy;
        start.x   = canvas.width / 2;
        start.y   = inrectangle1y + outrecth / 4;
        options.x = canvas.width / 2;
        options.y = inrectangle2y + outrecth / 4;
        
        //add objects to menuStage
        //add objects to stage
        stage.addChild(outcircle1);
        stage.addChild(outcircle2);
        stage.addChild(outcircle3);
        stage.addChild(outcircle4);
        stage.addChild(incircle1);
        stage.addChild(incircle2);
        stage.addChild(incircle3);
        stage.addChild(incircle4);
        stage.addChild(outrectangle1);
        stage.addChild(outrectangle2);
        stage.addChild(inrectangle1);
        stage.addChild(inrectangle2);
        stage.addChild(p_num);
        stage.addChild(p1);
        stage.addChild(p2);
        stage.addChild(p3);
        stage.addChild(p4);
        stage.addChild(start);
        stage.addChild(options);
        start.addEventListener("click", this.onStart);
        game.getStage().update();
}
	
    // Player must be double clicked to go to next game segment
    this.scavHunt = function() {
	  var scavHuntContainer;
		
	  this.onProceed = function(event) {
        game.getStage().removeChild(scavHuntContainer);
		game.progress();
	  }
		
      // Public eventListener to handle double clicking on the player
      this.handleDblClick = function(event) {
        // Delete old text
        mainGameContainer.removeChild(text)
        scavHuntContainer = new createjs.Container();
		scavHuntContainer.x = 100;
		scavHuntContainer.y = 100;
		var scavHuntBackground = new createjs.Shape();
		scavHuntBackground.graphics.beginFill("#000000").drawRect(0, 0, 760, 244);
		scavHuntContainer.addChild(scavHuntBackground);
		var scavHuntAnimalPic = new createjs.Bitmap("images/tiger.png");
		scavHuntAnimalPic.x = 50;
		scavHuntAnimalPic.y = 25;
		scavHuntContainer.addChild(scavHuntAnimalPic);
		var scavHuntDivider = new createjs.Shape();
		scavHuntDivider.graphics.beginFill("#FFFFFF").drawRect(269, 43, 3, 169);
		scavHuntContainer.addChild(scavHuntDivider);
		var scavHuntText = new createjs.Text("Text about a tiger...", "20px Arial", "#FFFFFF");
		scavHuntText.x = 300;
		scavHuntText.y = 122;
		scavHuntContainer.addChild(scavHuntText);
		var scavHuntProceed = new createjs.Text("Proceed", "20px Arial", "#FFFFFF");
		scavHuntProceed.x = 680;
		scavHuntProceed.y = 220;
		scavHuntProceed.addEventListener("click", this.onProceed);
		scavHuntContainer.addChild(scavHuntProceed);
		game.getStage().addChild(scavHuntContainer);
		game.getStage().update();
		game.getStage().update();
      }

      // What will be executed when the GameEvent function pointer is triggered
      var text = new createjs.Text("Double Click Now!", "20px Arial", "#ff7700");
      text.x = 350;
      text.y = 350;
      mainGameContainer.addChild(text);
      var playerIcon = game.getCurrentPlayer().getIcon();
      playerIcon.x = playerIcon.x + 40 * (game.getCurrentTurn() + 1);
      playerIcon.y = playerIcon.y + 100;
      playerIcon.addEventListener("dblclick", this.handleDblClick);
      stage.update();
    }

    // Moves from one GameEvent to the other, simply takes away old eventListeners
    this.transition = function() {
      game.getCurrentPlayer().getIcon().removeAllEventListeners();
    }

    // Assign different code to different segments GameEvents
    story[0] = new GameEvent(this.transition, this.startMenu);	// Single click to continue
    story[1] = new GameEvent(this.transition, this.singleClick);	// Now double click
    story[2] = new GameEvent(this.transition, this.scavHunt);	// Back to single click
	story[3] = new GameEvent(this.transition, this.singleClick);	// Double
    story[4] = new GameEvent(this.transition, this.scavHunt);	// Back to single click
  }
}
