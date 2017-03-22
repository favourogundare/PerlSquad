var BOX_WIDTH  = 760;
var BOX_HEIGHT = 244;
var selected;
var category;
var SelectCategoryContainer;
var selectBackground;
var selectCategoryOK;
var option1;
var option2;
var option3;
var option4;
var option5;
var item;

/**  
 * @function eventScavengerHunt
 * Item gathering portion of game.
 */
function eventSelectCategory() {
	category   = 1;
    
    /** SelectCategory container section */
    SelectCategoryContainer = new createjs.Container();
    SelectCategoryContainer.x = 100;
    SelectCategoryContainer.y = 100;
    
    /** background for SelectCategory container section */
    selectBackground = new createjs.Shape();
    selectBackground.graphics.beginFill("#000000").drawRect(0, 0, BOX_WIDTH, BOX_HEIGHT);
    
    /** initial default selection */
    selected = 1;
    
    /** OK button section */
	var selectCategoryOK   = new RectButton("OK", "#000000", 9 * BOX_WIDTH / 10, 4 * BOX_HEIGHT / 5 - 5, 50, 50, "#000000", "click", SConOK);
    /*selectCategoryOK = new createjs.Text("OK", "20px Arial", "#FFFFFF");
    selectCategoryOK.x = 9 * BOX_WIDTH / 10;
    selectCategoryOK.y = 4 * BOX_HEIGHT / 5;
    selectCategoryOK.addEventListener("click", SConOK);*/
    
	/** initialize buttons */
    option1      = new CircleButton("Deciduous Forest", "20px Arial", 0, 70, "#f44336", 1 * BOX_WIDTH / 6, BOX_HEIGHT / 3, 50, "#616161", "click", SCon1);
    option2      = new CircleButton("Desert", "20px Arial", 0, 70, "#ff9100", 2 * BOX_WIDTH / 6, BOX_HEIGHT / 3, 50, "#bdbdbd", "click", SCon2);
    option3      = new CircleButton("Grassland", "20px Arial", 0, 70, "#00e676", 3 * BOX_WIDTH / 6, BOX_HEIGHT / 3, 50, "#bdbdbd", "click", SCon3);
    option4      = new CircleButton("Rainforest", "20px Arial", 0, 70, "#00b0ff", 4 * BOX_WIDTH / 6, BOX_HEIGHT / 3, 50, "#bdbdbd", "click", SCon4);
	option5      = new CircleButton("Tundra", "20px Arial", 0, 70, "#d500f9", 5 * BOX_WIDTH / 6, BOX_HEIGHT / 3, 50, "#bdbdbd", "click", SCon5);	
	
    /** Build and update stage */
    SelectCategoryContainer.addChildAt(selectBackground, option1.container, option2.container, option3.container, option4.container, option5.container, selectCategoryOK.container, 0);
    game.getStage().addChild(SelectCategoryContainer);
    game.getStage().update();
}

/**
 * @function on1
 */
function SCon1() {
	selected = 1;
	option1.outCircle.graphics.clear().beginFill("#616161").drawCircle(0, 0, 50);
	option2.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option3.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option4.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option5.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	game.getStage().update();
}

/**
* @function on2
*/
function SCon2() {
	selected = 2;
	option1.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option2.outCircle.graphics.clear().beginFill("#616161").drawCircle(0, 0, 50);
	option3.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option4.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option5.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	game.getStage().update();
}

/**
* @function on3
*/
function SCon3() {
	selected = 3;
	option1.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option2.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option3.outCircle.graphics.clear().beginFill("#616161").drawCircle(0, 0, 50);
	option4.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option5.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	game.getStage().update();
}

/**
* @function on4
*/
function SCon4() {
	selected = 4;
	option1.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option2.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option3.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option4.outCircle.graphics.clear().beginFill("#616161").drawCircle(0, 0, 50);
	option5.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	game.getStage().update();
}

/**
* @function on5
*/
function SCon5() {
	selected = 5;
	option1.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option2.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option3.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option4.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option5.outCircle.graphics.clear().beginFill("#616161").drawCircle(0, 0, 50);
	game.getStage().update();
}

/** 
 * @function this.onOK
 * Extended function that handles when selectCategoryOK is clicked. The first time it is clicked, it will store the selected option and then change the options to biomes. The 
 * second time it is clicked, it will access the relative information based one the two category selections.
 */	
function SConOK() {
	console.log("selected[" + selected + "]");
	game.getStage().removeChild(SelectCategoryContainer);
	game.getStage().update();
	eventEditGame();
}