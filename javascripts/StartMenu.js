var p1_button;
var p2_button;
var p3_button;
var p4_button;

/**
 * @function eventStartMenu
 */
function eventStartMenu() {
	/** initialize page container */
    start_page = new createjs.Container();
	
    /** initialize buttons */
    var start_button   = new RectButton("Start", "#f44336", game.getStage().width/2 - 150, 150, 300, 50, "click", onStart);
    var options_button = new RectButton("Options", "#00e676", game.getStage().width/2 - 150, 225, 300, 50, "click", onOptions);
	var help_button    = new RectButton("Help", "#ff9100", game.getStage().width/2 - 150, 300, 300, 50, "click", onHelp);
   
    /** add objects to stage */
    start_page.addChildAt(start_button.container, options_button.container, help_button.container, 0);
	game.getStage().addChild(start_page);
    game.getStage().update();
}

/**
* @function onStart
* Handle user clicking "start"
*/
function onStart() {
	game.getStage().removeChild(start_page);
	game.getStage().update();
	game.progress();
}
	
/**
*@function options_menu
*/
function onOptions() {
	game.getStage().removeChild(start_page);
	game.getStage().update();
	eventOptionsMenu();
	/** options menu here */
}	

function onHelp() {
	game.getStage.update();
}