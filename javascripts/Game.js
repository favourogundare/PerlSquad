// Global variable for game object
var game = new Game();

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

    // Player must be double clicked to go to next game segment
    this.doubleClick = function() {
      // Public eventListener to handle double clicking on the player
      this.handleDblClick = function(event) {
        // Delete old text
        mainGameContainer.removeChild(text)
        game.progress();
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
    story[0] = new GameEvent(this.transition, this.singleClick);	// Single click to continue
    story[1] = new GameEvent(this.transition, this.doubleClick);	// Now double click
    story[2] = new GameEvent(this.transition, this.singleClick);	// Back to single click
	story[3] = new GameEvent(this.transition, this.doubleClick);	// Double
    story[4] = new GameEvent(this.transition, this.singleClick);	// Back to single click
  }
}
