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

/**  
 * @function eventScavengerHunt
 * Item gathering portion of game.
 */
function eventSelectCategory(chosen) {
    var BOX_WIDTH  = 760;
    var BOX_HEIGHT = 244; 
	category = 1;
    
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
    selectCategoryOK = new createjs.Text("OK", "20px Arial", "#FFFFFF");
    selectCategoryOK.x = 9 * BOX_WIDTH / 10;
    selectCategoryOK.y = 4 * BOX_HEIGHT / 5;
    selectCategoryOK.addEventListener("click", onOK);
    
	/** initialize buttons */
    option1      = new game.CircleButton("Animal", "#f44336", 1 * BOX_WIDTH / 6, (BOX_HEIGHT / 3) + 70, 50, true, "click", on1);
    option2      = new game.CircleButton("Growing Season", "#ff9100", 2 * BOX_WIDTH / 6, (BOX_HEIGHT / 3) + 70, 50, false, "click", on2);
    option3      = new game.CircleButton("Plant Life", "#00e676", 3 * BOX_WIDTH / 6, (BOX_HEIGHT / 3) + 70, 50, false, "click", on3);
    option4      = new game.CircleButton("Precipitation", "#00b0ff", 4 * BOX_WIDTH / 6, (BOX_HEIGHT / 3) + 70, 50, false, "click", on4);
	option5      = new game.CircleButton("Latitude", "#d500f9", 5 * BOX_WIDTH / 6, (BOX_HEIGHT / 3) + 70, 50, false, "click", on5);
	
    /** Build and update stage */
    SelectCategoryContainer.addChildAt(selectBackground, option1.container, option2.container, option3.container, option4.container, option5.container, selectCategoryOK, 0);
    game.getStage().addChild(SelectCategoryContainer);
    game.getStage().update();
}

/**
 * @function on1
 */
function on1() {
	selected = 1;
	option1.outCircle.graphics.clear().beginFill("#212121").drawCircle(0, 0, 50);
	option2.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option3.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option4.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option5.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	game.getStage().update();
}

/**
* @function on2
*/
function on2() {
	selected = 2;
	option1.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option2.outCircle.graphics.clear().beginFill("#212121").drawCircle(0, 0, 50);
	option3.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option4.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option5.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	game.getStage().update();
}

/**
* @function on3
*/
function on3() {
	selected = 3;
	option1.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option2.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option3.outCircle.graphics.clear().beginFill("#212121").drawCircle(0, 0, 50);
	option4.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option5.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	game.getStage().update();
}

/**
* @function on4
*/
function on4() {
	selected = 4;
	option1.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option2.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option3.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option4.outCircle.graphics.clear().beginFill("#212121").drawCircle(0, 0, 50);
	option5.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	game.getStage().update();
}

/**
* @function on5
*/
function on5() {
	selected = 5;
	option1.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option2.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option3.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option4.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
	option5.outCircle.graphics.clear().beginFill("#212121").drawCircle(0, 0, 50);
	game.getStage().update();
}

/** 
 * @function this.onOK
 * Extended function that handles when selectCategoryOK is clicked. The first time it is clicked, it will store the selected option and then change the options to biomes. The 
 * second time it is clicked, it will access the relative information based one the two category selections.
 */	
function onOK() {
	if (category == 1) {
		var item = selected;
		option1.txt.text = "Deciduous Forest";
		option2.txt.text = "Desert";
		option3.txt.text = "Grassland";
		option4.txt.text = "Rainforest";
		option5.txt.text = "Tundra";
		category++;
		selected = 1;
		option1.outCircle.graphics.clear().beginFill("#212121").drawCircle(0, 0, 50);
		option2.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
		option3.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
		option4.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
		option5.outCircle.graphics.clear().beginFill("#bdbdbd").drawCircle(0, 0, 50);
		game.getStage().update();
	} else {
		console.log("selected[" + item + "][" + selected + "]");
		game.getStage().removeChild(SelectCategoryContainer);
		game.getStage().update();
		switch (chosen){
			case "add":
				eventAddItem();
				break;
			case "edit":
				eventEditItem();
		}
	}
}