var p1_button;
var p2_button;
var p3_button;
var p4_button;

var timestamp;
/**
 * @function eventStartMenu
 */
function eventStartMenu() {
	timestamp = new Date();
	/** initialize page container */
    start_page = new createjs.Container();
	
    /** initialize buttons */
    var start_button   = new RectButton("Start", "#f44336", game.getStage().width/2 - 150, 150, 300, 50, "#212121", "click", onStart);
    var options_button = new RectButton("Options", "#00e676", game.getStage().width/2 - 150, 225, 300, 50, "#212121", "click", onOptions);
	var help_button    = new RectButton("Help", "#ff9100", game.getStage().width/2 - 150, 300, 300, 50, "#212121", "click", onHelp);
   
    /** add objects to stage */
    start_page.addChild(start_button.container, options_button.container, help_button.container);
	game.getStage().addChild(start_page);
    game.getStage().update();
}

/**
* @function onStart
* Handle user clicking "start"
*/
function onStart() {
	// Analytics
    sendUserTimeInfo("start-game", timestamp);
	game.getStage().removeChild(start_page);
	game.getStage().update();
	eventSelectManifest("Use", true);
}
	
/**
*@function options_menu
*/
function onOptions() {
	game.getStage().removeChild(start_page);
	game.getStage().update();
	eventSelectManifest("Edit", false);
	/** options menu here */
}	

function onHelp() {
	game.getStage.update();
}