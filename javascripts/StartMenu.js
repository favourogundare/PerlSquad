var p1_button;
var p2_button;
var p3_button;
var p4_button;

/**
 * @function eventStartMenu
 */
function eventStartMenu() {
    analytics.track("start-menu");
    
	/** initialize page container */
    start_page = new createjs.Container();
	
    /** initialize buttons */
    p1_button      = new CircleButton("1", "36px Arial", 0, 0, "#f50057", game.getStage().width/2 - 180, 150, 50, true, "#212121", "click", one_player);
    p2_button      = new CircleButton("2", "36px Arial", 0, 0, "#00b0ff", game.getStage().width/2 - 60, 150, 50, false, "#212121", "click", two_player);
    p3_button      = new CircleButton("3", "36px Arial", 0, 0, "#00e676", game.getStage().width/2 + 60, 150, 50, false, "#212121", "click", three_player);
    p4_button      = new CircleButton("4", "36px Arial", 0, 0, "#ff9100", game.getStage().width/2 + 180, 150, 50, false, "#212121", "click", four_player);
    var start_button   = new RectButton("Start", "#f44336", game.getStage().width/2 - 150, 225, 300, 50, "click", onStart);
    var options_button = new RectButton("Options", "#d500f9", game.getStage().width/2 - 150, 300, 300, 50, "click", options_menu);

    /** initialize page text */
    var p_num   = new createjs.Text("Pick # of Players", "36px Arial", "#212121");
    p_num.textAlign = "center";
    p_num.textBaseline = "middle";
    p_num.x   = game.getStage().width / 2;
    p_num.y   = 50;
   
    /** add objects to stage */
    start_page.addChildAt(p_num, p1_button.container, p2_button.container, p3_button.container, p4_button.container, start_button.container, options_button.container, 0);
	game.getStage().addChild(start_page);
    game.getStage().update();
}

/**
 * @function one_player
 */
function one_player() {
	game.numPlayers = 1;
	p1_button.outCircle.graphics.clear().beginFill("#212121").drawCircle(0, 0, 50);
	p2_button.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	p3_button.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	p4_button.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	game.getStage().update();
}

/**
* @function two_player
*/
function two_player() {
	game.numPlayers = 2;
	p1_button.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	p2_button.outCircle.graphics.clear().beginFill("#212121").drawCircle(0, 0, 50);
	p3_button.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	p4_button.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	game.getStage().update();
}

/**
* @function three_player
*/
function three_player() {
	game.numPlayers = 3;
	p1_button.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	p2_button.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	p3_button.outCircle.graphics.clear().beginFill("#212121").drawCircle(0, 0, 50);
	p4_button.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	game.getStage().update();
}

/**
* @function four_player
*/
function four_player() {
	game.numPlayers = 4;
	p1_button.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	p2_button.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	p3_button.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	p4_button.outCircle.graphics.clear().beginFill("#212121").drawCircle(0, 0, 50);
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
function options_menu() {
	game.getStage().removeChild(start_page);
	game.getStage().update();
	eventOptionsMenu();
	/** options menu here */
}	
