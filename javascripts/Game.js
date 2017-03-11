/** Global variables for game object */
var GAME_WIDTH = 960;
var GAME_HEIGHT = 444;

/**
 * @function Game
 * This is a container for a single-player, linear story based game.
 * A game is seen as a series of "Game Events," represented by the GameEvent object.
 * Each GameEvent has two function pointers, moveFunc and actionFunc. The first is
 * meant to handle the transition between the last GameEvent and the current one.
 * The second is meant to setup what actually happens at this point in the game.
 * This includes rendering shapes and setting up EventListeners for user interaction.
 * Meaning, what actually makes the game unique is the series of GameEvents and the code
 * their function pointers point to.
 *
 * To create custom GameEvent objects and add them to the sequence of events, create
 * a priviledged member class (really a function obj) to Game.loadStory. This object should
 * contain constructor code, which will be triggered when it is the current GameEvent;
 * eventListeners for user interaction and game progression, and any other data members needed  to do
 * what you want at that point in the game. All eventListeners should be public functions such that
 * CreateJS can launch them.
 *
 * Now, to assign one or more GameEvent's function pointers to point to this new function object,
 * simply make the assignment in the body of Game.loadStory(). A simple example is provided.
 * Each GameEvent will have to trigger Game.progress() at some point (most likely a listener function)
 * to conclude the current GameEvent and trigger the next one. This will continue until there are no
 * more GameEvent objects. Populate Game.start() and Game.finish() with code to handle
 * the beginning and ending of the game.
 */


function Game(easelStage) {
    //-- Private --//
    var stage = easelStage; /** Reference to EaselJS Stage object */
    var story = Array(); /** Array of GameEvent objects */
    var currentGameEvent; /** A reference to the most recently visited GameEvent */
    /** Turn counter, and with single-player it's'also the position in the story */
    var currentTurn;
    /** For now, there is only one player in the game */
    this.numPlayers = 1;
    this.map;
    this.fileInput = $('#files');
    this.imageText;
    this.assets = [];
	this.currentBiome;
 
    var player = new Player(new createjs.Bitmap("images/player.png"));
    /** A reference to the player with the current turn. Can be an array for multiplayer/teams. */
    var currentPlayer = player;
    
    /**
     * EaselJS Container object. Shape objects attached to this using
     * Game.getMainContainer.addChild(Shape) can be manipulated as a collection.
     * Can be useful for encapsulating the main "playing field" from temporary
     * graphics or mini-games.
     */
    var mainGameContainer = new createjs.Container();
    
    /**
     * @function finish
     * Private function called by Game.progress() when the end of the game is reached
     * Do anything to finish the game such as announce the winner, release
     * resources, ask if they'd like to play again, change graphics, etc...
     */
    var finish = function() {
        var doneText = new createjs.Text("Game Finished!!", "20px Arial", "#ff7700");
        doneText.x = 100;
        doneText.y = 100;
        mainGameContainer.addChild(doneText);
        stage.update;
    };
    
    //-- Public --//
    
    /**
     * @function this.globalData
     * A generic container for game-scope data. Meaning, if it is needed
     * throughout different parts of the game, put it here. If the data is
     * needed for only one segment (i.e., GameEvent), bundle it with the object pointed to
     * by the GameEvent's moveFunc() or actionFunc() member.
     */
    this.globalData = {};
    
    /**
     * @function this.progress
     * This is the most important function.
     * Calling this transitions to the next GameEvent.
     */
    this.progress = function() {
        //if (++currentTurn >= story.length) finish();
        if (++currentTurn >= story.length){
            currentTurn = 1;
            currentGameEvent = story[1];
            currentGameEvent.trigger();
        }
        else {
            currentGameEvent = story[currentTurn];
            //currentPlayer.updateGamePosition(currentGameEvent);
            currentGameEvent.trigger();
        }
    };
    
    /**
     * @function this.start
     * Called to start the game. Should initialize and render anything needed to start
     * the game. Will return with -1 for error if a easelJS stage hasn't
     * been provided using Game.setStage(Stage)
     */
    this.start = function() {
        // Generate a userID for the user so that analytical data may be
        // associated to this user later
        var userID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
        analytics.identify(userID);
        
        /** Attach container to main canvas stage */
        if (stage === undefined) return -1;
        else stage.addChild(mainGameContainer);
        /** Set background */
        var background = new createjs.Bitmap(this.map.result);
        background.x = 0;
        background.y = 0;
        mainGameContainer.addChild(background);
        this.getStage().update();
        /** Load GameEvent objects */
        this.loadStory();
        currentTurn = 0;
        currentGameEvent = story[0];
        
        /** Run first GameEvent */
        currentPlayer.updateGamePosition(currentGameEvent);
        currentGameEvent.trigger();
    };
    
    /**
     * @function this.getCanvas
     * Returns a reference to the underlying canvas
     */
    this.getCanvas = function() {
        return canvas;
    };
    
    
    /**
     * @function this.setStage
     * Set root EaselJS DisplayObject object of the game
     */
    this.setStage = function(easelJSStage) {
        stage = easelJSStage;
        stage.width = GAME_WIDTH;
        stage.height = GAME_HEIGHT;
    };
    
    /**
     * @function this.getStage
     * Get root EaselJS DisplayObject object of the game
     */
    this.getStage = function() {
        return stage;
    };
    
    /**
     * @function this.getMainContainer
     */
    this.getMainContainer = function() {
        return mainGameContainer;
    };
    
    /**
     * @function this.getCurrentPlayer
     * Receive a reference to the player who's turn it currently is
     */
    this.getCurrentPlayer = function() {
        return currentPlayer;
    };
    
    /**
     * @function this.getCurrentEvent
     * Returns a reference to the current GameEvent object
     */
    this.getCurrentEvent = function() {
        return currentGameEvent;
    };
    
    /**
     * @function this.getCurrentTurn
     */
    this.getCurrentTurn = function() {
        return currentTurn;
    };
    
    /**
     * @function this.loadStory
     *  Assigns GameEvent objects their custom code
     */
    this.loadStory = function() {    
        /** Assign different code to different segments GameEvents */
        story[0] = new GameEvent(eventStartMenu);
        story[1] = new GameEvent(eventMoveAroundEarth);        
        story[2] = new GameEvent(eventInfoScreen);
        story[3] = new GameEvent(eventScrollGame);
    };
    
    this.defaultManifest = 
	"3\n"+
	"Pictures/Animals/Deciduous_Forest/Animal - BlackBear - Large - Black.png\n"+
	"0\n"+
	"./Pictures/Animals/Deciduous_Forest/Animal - WhiteTailDeer - Medium - Brown.png\n"+
	"0\n"+
	"./Pictures/Animals/Deciduous_Forest/Animal - Salamander - Small - Black.png\n"+
	"0\n"+
	"3\n"+
	"./Pictures/Animals/Desert/Animal - Cougar - Large - Brown.png\n"+
	"0\n"+
	"./Pictures/Animals/Desert/Animal - Armadillo - Medium - Brown.gif\n"+
	"0\n"+
	"./Pictures/Animals/Desert/Animal - SandCat - Small - Brown.png\n"+
	"0\n"+
	"3\n"+
	"./Pictures/Animals/Grassland/Animal - Bobcat - Large - Brown.png\n"+
	"0\n"+
	"./Pictures/Animals/Grassland/Animal - PrarieDog - Medium - Brown.png\n"+
	"0\n"+
	"./Pictures/Animals/Grassland/Animal - BumbleBee - Small - Yellow.png\n"+
	"0\n"+
	"3\n"+
	"./Pictures/Animals/Rainforest/Animal - Jaguar - Large - Orange.png\n"+
	"0\n"+
	"Pictures/Animals/Rainforest/Animal - Toucan - Medium - Black.png\n"+
	"1\n"+
	"   Known for its large and colorful bill, the toucan stands out among the birds of the tropical and subtropical rainforests.\n"+
	"./Pictures/Animals/Rainforest/Animal - Butterfly - Small - Blue.png\n"+
	"0\n"+
	"3\n"+
	"./Pictures/Animals/Tundra/Animal - PolarBear - Large - White.gif\n"+
	"0\n"+
	"./Pictures/Animals/Tundra/Animal - ArcticHare - Medium - White.jpg\n"+
	"0\n"+
	"./Pictures/Animals/Tundra/Animal - Trout - Small - Blue.png\n"+
	"0";
	this.workingManifest;
}
