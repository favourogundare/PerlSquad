/** Global variables for game object */
const GAME_WIDTH = 960;
const GAME_HEIGHT = 444;

/**
 * @function Game
 * This is a container for a single-player (for now), linear story based game. 
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
    }

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
        if (++currentTurn >= story.length) finish();
        else {
            currentGameEvent = story[currentTurn];
            currentPlayer.updateGamePosition(currentGameEvent);
            currentGameEvent.trigger();
        }
    }

    /**
    * @function this.start
    * Called to start the game. Should initialize and render anything needed to start
    * the game. Will return with -1 for error if a easelJS stage hasn't
    * been provided using Game.setStage(Stage)
    */  
    this.start = function() {
        /** Attach container to main canvas stage */
        if (stage === undefined) return -1;
        else stage.addChild(mainGameContainer);
        /** Set background */
        var background = new createjs.Bitmap("images/background_map.png");
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
    }

	/**
	* @function this.getCanvas
	* Returns a reference to the underlying canvas
	*/
	this.getCanvas = function() {
		return canvas;
	}
	
	
    /**
    * @function this.setStage
    * Set root EaselJS DisplayObject object of the game
    */
    this.setStage = function(easelJSStage) {
        stage = easelJSStage;
        stage.width = GAME_WIDTH;
        stage.height = GAME_HEIGHT;
    }

    /**
    * @function this.getStage
    * Get root EaselJS DisplayObject object of the game
    */
    this.getStage = function() {
        return stage;
    }

    /**
    * @function this.getMainContainer
    */
    this.getMainContainer = function() {
        return mainGameContainer;
    }

    /**
    * @function this.getCurrentPlayer
    * Receive a reference to the player who's turn it currently is
    */
    this.getCurrentPlayer = function() {
        return currentPlayer;
    }

    /**
    * @function this.getCurrentEvent  
    * Returns a reference to the current GameEvent object
    */
    this.getCurrentEvent = function() {
        return currentGameEvent;
    }

    /**
    * @function this.getCurrentTurn
    */
    this.getCurrentTurn = function() {
        return currentTurn;
    }

    /**
    * @function this.loadStory
    *  Assigns GameEvent objects their custom code
    */
    this.loadStory = function() {
      
        /** Player's avatar must be clicked to proceed */
        this.singleClick = function() {
            var text;

            /** Public eventListener to handle single clicking on the player */
            this.handleClick = function(event) {
                /** Delete old text */
                mainGameContainer.removeChild(text);
                game.progress();
            }

            /** What will be executed when the GameEvent function pointer is triggered */
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

        /**
         * @function startMenu
         */
        this.startMenu = function() {
            var stage;

            /**
             * @function this.one_player
             */
            this.one_player = function(event) {
                outcircle1.graphics.clear().beginFill("#212121").drawCircle(canvas.width/2 - (circle_offset + circle_offset / 2), circlesy, outcirclesr);
                outcircle2.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 - (circle_offset / 2), circlesy, outcirclesr);
                outcircle3.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 + (circle_offset / 2), circlesy, outcirclesr);
                outcircle4.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 + (circle_offset + circle_offset / 2), circlesy, outcirclesr);
                game.getStage().update();
            }

            /**
            * @function this.two_player
            */
            this.two_player = function(event) {
                outcircle1.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 - (circle_offset + circle_offset / 2), circlesy, outcirclesr);
                outcircle2.graphics.clear().beginFill("#212121").drawCircle(canvas.width/2 - (circle_offset / 2), circlesy, outcirclesr);
                outcircle3.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 + (circle_offset / 2), circlesy, outcirclesr);
                outcircle4.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 + (circle_offset + circle_offset / 2), circlesy, outcirclesr);
                game.getStage().update();
            }

            /**
            * @function this.three_player
            */
            this.three_player =  function(event) {
                outcircle1.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 - (circle_offset + circle_offset / 2), circlesy, outcirclesr);
                outcircle2.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 - (circle_offset / 2), circlesy, outcirclesr);
                outcircle3.graphics.clear().beginFill("#212121").drawCircle(canvas.width/2 + (circle_offset / 2), circlesy, outcirclesr);
                outcircle4.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 + (circle_offset + circle_offset / 2), circlesy, outcirclesr);
                game.getStage().update();
            }

            /**
            * @function this.four_player
            */
            this.four_player = function(event) {
                outcircle1.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 - (circle_offset + circle_offset / 2), circlesy, outcirclesr);
                outcircle2.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 - (circle_offset / 2), circlesy, outcirclesr);
                outcircle3.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 + (circle_offset / 2), circlesy, outcirclesr);
                outcircle4.graphics.clear().beginFill("#212121").drawCircle(canvas.width/2 + (circle_offset + circle_offset / 2), circlesy, outcirclesr);
                game.getStage().update();
            }
         
            /**
            * @function this.onStart
            * Handle user clicking "start"
            */
            this.onStart = function(event) {
                game.getStage().removeChild(stage);
                game.getStage().update();
                game.progress();
            }
         
            /**
            *@function this.options_menu
            */
            this.options_menu = function(event) {
                game.getStage().removeChild(stage);
                game.getStage().update();
                /** options menu here */
            }
            
            var canvas = game.getStage();
            var stage = canvas;

            /** declare button containers */
            var p1_button;
            var p2_button;
            var p3_button;
            var p4_button;
            var start_button;
            var options_button;

            /** initialize variables */
            var incirclesr     = 40;
            var outcirclesr    = 50;
            var circlesy       = 150;
            var inrectw        = 280;
            var inrecth        = 30;
            var inrectangle1y  = 235;
            var inrectangle2y  = 310;
            var outrectw       = 300;
            var outrecth       = 50;
            var outrectangle1y = 225;
            var outrectangle2y = 300;
            var outrectanglesx = canvas.width/2 - outrectw/2;
            var inrectanglesx  = canvas.width/2 - outrectw/2 + 10;
            var circle_offset  = 2 * (outcirclesr + 10);

            /** initialize containers */
            p1_button      = new createjs.Container();
            p2_button      = new createjs.Container();
            p3_button      = new createjs.Container();
            p4_button      = new createjs.Container();
            start_button   = new createjs.Container();
            options_button = new createjs.Container();

            /** initialize shapes */
            stage             = new createjs.Container();
            game.getStage().addChild(stage);
            var outrectangles = new createjs.Graphics().beginFill("#212121").drawRect(outrectanglesx,0,outrectw,outrecth);
            var outcircle1    = new createjs.Shape();
            var outcircle2    = new createjs.Shape();
            var outcircle3    = new createjs.Shape();
            var outcircle4    = new createjs.Shape();
            var incircle1     = new createjs.Shape();
            var incircle2     = new createjs.Shape();
            var incircle3     = new createjs.Shape();
            var incircle4     = new createjs.Shape();
            var outrectangle1 = new createjs.Shape(outrectangles);
            var outrectangle2 = new createjs.Shape(outrectangles);
            var inrectangle1  = new createjs.Shape();
            var inrectangle2  = new createjs.Shape();

            /** initialize text */
            var p_num   = new createjs.Text("Pick # of Players", "36px Arial", "#212121");
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

            /** draw remaining shapes */
            outcircle1.graphics.beginFill("#212121").drawCircle(canvas.width/2 - (circle_offset + circle_offset / 2), circlesy, outcirclesr);
            outcircle2.graphics.beginFill("#bdbdbd").drawCircle(canvas.width/2 - (circle_offset / 2), circlesy, outcirclesr);
            outcircle3.graphics.beginFill("#bdbdbd").drawCircle(canvas.width/2 + (circle_offset / 2), circlesy, outcirclesr);
            outcircle4.graphics.beginFill("#bdbdbd").drawCircle(canvas.width/2 + (circle_offset + circle_offset / 2), circlesy, outcirclesr);
            incircle1.graphics.beginFill("#f50057").drawCircle(canvas.width/2 - (circle_offset + circle_offset / 2), circlesy, incirclesr);
            incircle2.graphics.beginFill("#00b0ff").drawCircle(canvas.width/2 - (circle_offset / 2), circlesy, incirclesr);
            incircle3.graphics.beginFill("#00e676").drawCircle(canvas.width/2 + (circle_offset / 2), circlesy, incirclesr);
            incircle4.graphics.beginFill("#ff9100").drawCircle(canvas.width/2 + (circle_offset + circle_offset / 2), circlesy, incirclesr);
            inrectangle1.graphics.beginFill("#f44336").drawRect(inrectanglesx, inrectangle1y, inrectw, inrecth);
            inrectangle2.graphics.beginFill("#d500f9").drawRect(inrectanglesx, inrectangle2y, inrectw, inrecth);

            /** set remaining shape coords */
            outrectangle1.y = outrectangle1y;
            outrectangle2.y = outrectangle2y;

            /** set text coords */
            p_num.x   = canvas.width / 2;
            p_num.y   = circlesy - 100;
            p1.x      = canvas.width/2 - (circle_offset + circle_offset / 2);
            p1.y      = circlesy;
            p2.x      = canvas.width/2 - (circle_offset / 2);
            p2.y      = circlesy;
            p3.x      = canvas.width/2 + (circle_offset / 2);
            p3.y      = circlesy;
            p4.x      = canvas.width/2 + (circle_offset + circle_offset / 2);
            p4.y      = circlesy;
            start.x   = canvas.width / 2;
            start.y   = inrectangle1y + outrecth / 4;
            options.x = canvas.width / 2;
            options.y = inrectangle2y + outrecth / 4;

            /** add objects to stage */
            p1_button.addChildAt(outcircle1, incircle1, p1, 0);
            p2_button.addChildAt(outcircle2, incircle2, p2, 0);
            p3_button.addChildAt(outcircle3, incircle3, p3, 0);
            p4_button.addChildAt(outcircle4, incircle4, p4, 0);
            start_button.addChildAt(outrectangle1, inrectangle1, start, 0);
            options_button.addChildAt(outrectangle2, inrectangle2, options, 0);
            stage.addChildAt(p_num, p1_button, p2_button, p3_button, p4_button, start_button, options_button, 0);
            game.getStage().update();
            p1_button.addEventListener("click", this.one_player);
            p2_button.addEventListener("click", this.two_player);
            p3_button.addEventListener("click", this.three_player);
            p4_button.addEventListener("click", this.four_player);
            options_button.addEventListener("click", this.options_menu);
            start_button.addEventListener("click", this.onStart);
            game.getStage().update();
        }   

        /** 
        * @function this.transition
        * Moves from one GameEvent to the other, simply takes away old eventListeners
        */
        this.transition = function() {
            game.getCurrentPlayer().getIcon().removeAllEventListeners();
        }

        /** Assign different code to different segments GameEvents */
        story[0] = new GameEvent(this.transition, this.startMenu);
        story[1] = new GameEvent(this.transition, eventPreloadAssets);
        story[2] = new GameEvent(this.transition, this.singleClick);
        story[3] = new GameEvent(this.transition, eventScavengerHunt);
        story[4] = new GameEvent(this.transition, eventScrollGame);
		

    }
}
