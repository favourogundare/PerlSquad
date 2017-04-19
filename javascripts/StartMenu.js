/**
 * @function eventStartMenu
 * Opens up the start menu, the beginning point of the game.
 */
function eventStartMenu() {
	"use strict";
	var timestamp = new Date();
	/** initialize page container */
    var start_page = new createjs.Container();
	
    /** initialize buttons */
    var start_button   = new RectButton("Start", "#f44336", game.getStage().width/2 - 150, 150, 300, 50, "#212121", "click", onStart);
    var options_button = new RectButton("Options", "#00e676", game.getStage().width/2 - 150, 225, 300, 50, "#212121", "click", onOptions);
	var help_button    = new RectButton("Help", "#ff9100", game.getStage().width/2 - 150, 300, 300, 50, "#212121", "click", onHelp);
   
    /** add objects to stage */
    start_page.addChild(start_button.container, options_button.container, help_button.container);
	game.getStage().addChild(start_page);
    game.getStage().update();
	
	/**
	* @function onStart
	* Handle user clicking "start". Once this is clicked the game begins
	* and cannot be restarted without refreshing.
	*/
	function onStart() {
		/** Analytics */
		sendUserTimeInfo("start-game", timestamp);
		game.getStage().removeChild(start_page);
		game.getStage().update();
		game.started = true;
		eventSelectManifest("Use");
	}
	
	/**
	* @function options_menu
	* Handle user clicking "options". Leads to the editing portion of the game
	* where users can select a manifest to edit and then download a new version
	* of the manifest.
	*/
	function onOptions() {
		game.getStage().removeChild(start_page);
		game.getStage().update();
		eventOptionsMenu();
	}	

	/**
	 * @function onHelp
	 * Handle user clicking "help". Will provide some details regarding how to
	 * efficiently and effectively use certain portions of the game.
	 */
	function onHelp() {
		game.getStage().update();
		game.getStage().removeChild(start_page);
		eventHelpPage();
	}
}