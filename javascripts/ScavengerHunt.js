var BOX_WIDTH  = 760;
var BOX_HEIGHT = 244;
var remaining  = 5;
var scavHuntContainer;
var selected;
var scavHuntBackground;
var scavHuntOK;
var infoContainer;
var scavHuntOK2;
var selectFrom = [1, 2, 3, 4, 5];
var minSort;
var scavHuntDivider;
var scavHuntPic;
var scavHuntText;
var text;

/**  
 * @function eventScavengerHunt
 * Item gathering portion of game.
 */
function eventScavengerHunt() {
    /** What will be executed when the GameEvent function pointer is triggered */
    text = new createjs.Text("Double Click Now!", "20px Arial", "#ff7700");
    text.x = 350;
    text.y = 350;
    game.getMainContainer().addChild(text);
    var playerIcon = game.getCurrentPlayer().getIcon();
    playerIcon.x = playerIcon.x + 40 * (game.getCurrentTurn() + 1);
    playerIcon.y = playerIcon.y + 100;
    playerIcon.addEventListener("dblclick", handleDblClick);
    game.getStage().update();
}

/** 
 * @function this.handleDblClick
 * Extended function that handles double clicking on the player by proceeding with the scavenger hunt portion of the game.
 */
function handleDblClick() {
	/** Delete old text */
	game.getMainContainer().removeChild(text);
	
	/** scavHunt container section */
	scavHuntContainer = new createjs.Container();
	scavHuntContainer.x = 100;
	scavHuntContainer.y = 100;
	
	/** background for scavHunt container section */
	scavHuntBackground = new createjs.Shape();
	scavHuntBackground.graphics.beginFill("#000000").drawRect(0, 0, BOX_WIDTH, BOX_HEIGHT);
	
	/** initial default selection */
	selected = 1;
	
	/** OK button section */
	scavHuntOK = new createjs.Text("OK", "20px Arial", "#FFFFFF");
	scavHuntOK.x = 9 * BOX_WIDTH / 10;
	scavHuntOK.y = 4 * BOX_HEIGHT / 5;
	scavHuntOK.addEventListener("click", SHonOK);
	
	/** initialize buttons */
	option1      = new CircleButton("Animal", "20px Arial", 0, 70, "#f44336", 1 * BOX_WIDTH / 6, BOX_HEIGHT / 3, 50, true, "#616161", "click", SHon1);
	option2      = new CircleButton("Growing Season", "20px Arial", 0, 70, "#ff9100", 2 * BOX_WIDTH / 6, BOX_HEIGHT / 3, 50, false, "#616161", "click", SHon2);
	option3      = new CircleButton("Plant Life", "20px Arial", 0, 70, "#00e676", 3 * BOX_WIDTH / 6, BOX_HEIGHT / 3, 50, false, "#616161", "click", SHon3);
	option4      = new CircleButton("Precipitation", "20px Arial", 0, 70, "#00b0ff", 4 * BOX_WIDTH / 6, BOX_HEIGHT / 3, 50, false, "#616161", "click", SHon4);
	option5      = new CircleButton("Latitude", "20px Arial", 0, 70, "#d500f9", 5 * BOX_WIDTH / 6, BOX_HEIGHT / 3, 50, false, "#616161", "click", SHon5);

	/** Build and update stage */
	scavHuntContainer.addChildAt(scavHuntBackground, option1.container, option2.container, option3.container, option4.container, option5.container, scavHuntOK, 0);
	game.getStage().addChild(scavHuntContainer);
	game.getStage().update();
}

/**
 * @function on1
 */
function SHon1() {
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
function SHon2() {
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
function SHon3() {
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
function SHon4() {
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
function SHon5() {
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
 * Extended function that handles when scavenger hunt OK is clicked by displaying the corresponding item info and removing the selected item from available options.
 */	
function SHonOK() {
	infoContainer = new createjs.Container();
	infoContainer.x = 100;
	infoContainer.y = 100;
	
	scavHuntBackground2 = new createjs.Shape();
	scavHuntBackground2.graphics.beginFill("#000000").drawRect(0, 0, BOX_WIDTH, BOX_HEIGHT);
	
	scavHuntDivider = new createjs.Shape();
	scavHuntDivider.graphics.beginFill("#FFFFFF").drawRect(269, 43, 3, 169);
	
	scavHuntOK2 = new createjs.Text("OK", "20px Arial", "#FFFFFF");
	scavHuntOK2.x = 9 * BOX_WIDTH / 10;
	scavHuntOK2.y = 4 * BOX_HEIGHT / 5;
	scavHuntOK2.addEventListener("click", this.SHonOK2);
	
	game.getStage().removeChild(scavHuntContainer);
	remaining = remaining - 1;
	
	switch (selected){
		
	}
	if (selected == 1){
		scavHuntContainer.removeChild(option1.container);
		selectFrom[0] = 6;
		scavHuntPic = new createjs.Bitmap("Pictures/Animals/Rainforest/Animal - Toucan - Medium - Black.png");
		scavHuntPic.scaleX=.3;
		scavHuntPic.scaleY=.3;
		scavHuntPic.x = 50;
		scavHuntPic.y = 25;
		scavHuntText = new createjs.Text("   Known for its large and colorful bill,\nthe toucan stands out among the birds\nof the tropical and subtropical rainforests.", "20px Arial", "#FFFFFF");
		scavHuntText.x = 300;
		scavHuntText.y = 100;
		infoContainer.addChildAt(scavHuntBackground2, scavHuntPic, scavHuntDivider, scavHuntText, scavHuntOK2, 0);
	}
	else if (selected == 2){
		scavHuntContainer.removeChild(option2.container);
		selectFrom[1] = 6;
		scavHuntText = new createjs.Text("   Unlike some of the other biomes,\nthe rainforest's growing season lasts\nall year long.", "20px Arial", "#FFFFFF");
		scavHuntText.x = 300;
		scavHuntText.y = 100;
		infoContainer.addChildAt(scavHuntBackground2, scavHuntDivider, scavHuntText, scavHuntOK2, 0);
	}
	else if (selected == 3){
		scavHuntContainer.removeChild(option3.container);
		selectFrom[2] = 6;
		scavHuntPic = new createjs.Bitmap("Pictures/Plants/Rainforest/Venus Fly Trap.jpg");
		scavHuntPic.scaleX=.55;
		scavHuntPic.scaleY=.55;
		scavHuntPic.x = 70;
		scavHuntPic.y = 25;
		scavHuntText = new createjs.Text("   Some rainforest plants are adapted\nto obtain nutrients from animal matter.\nThe best known of these is probably\nthe Venus fly trap.", "20px Arial", "#FFFFFF");
		scavHuntText.x = 300;
		scavHuntText.y = 100;
		infoContainer.addChildAt(scavHuntBackground2, scavHuntPic, scavHuntDivider, scavHuntText, scavHuntOK2, 0);
	}
	else if (selected == 4){
		scavHuntContainer.removeChild(option4.container);
		selectFrom[3] = 6;
		scavHuntPic = new createjs.Bitmap("Pictures/Precipitation/Rainforest/Rain.jpg");
		scavHuntPic.scaleX=.12;
		scavHuntPic.scaleY=.12;
		scavHuntPic.x = 50;
		scavHuntPic.y = 45;
		scavHuntText = new createjs.Text("   The annual precipitation for temperate\nrainforests is at least 200 cm (78.74 in)\nand can go up to 350 cm (137.79 in).", "20px Arial", "#FFFFFF");
		scavHuntText.x = 300;
		scavHuntText.y = 100;
		infoContainer.addChildAt(scavHuntBackground2, scavHuntPic, scavHuntDivider, scavHuntText, scavHuntOK2, 0);
	}
	else if (selected == 5){
		scavHuntContainer.removeChild(option5.container);
		selectFrom[4] = 6;
		scavHuntText = new createjs.Text("   The rainforest is found between 10 degrees\nNorth and 10 degrees South.", "20px Arial", "#FFFFFF");
		scavHuntText.x = 300;
		scavHuntText.y = 100;
		infoContainer.addChildAt(scavHuntBackground2, scavHuntDivider, scavHuntText, scavHuntOK2, 0);
	}
	
	game.getStage().addChild(infoContainer);
	game.getStage().update();
}

/** 
 * @function this.onOK2
 * Extended function that handles when Item Info OK2 is clicked by moving the default highlighted/selected 
 * option to the first button still available if there are remaining items or by removing the infoContainer 
 * and calling game.progress().
 */
function SHonOK2(){
	infoContainer.removeAllChildren();
	game.getStage().removeChild(infoContainer);
	if (remaining){
		
		
		minSort = selectFrom.concat().sort();
		var color = "#616161";
		selected = minSort[0];
		for (i = 0; i < remaining; i++){
			switch(minSort[i]) {
				case 1:
					option1.outCircle.graphics.clear().beginFill(color).drawCircle(0, 0, 50);
					break;
				case 2:
					option2.outCircle.graphics.clear().beginFill(color).drawCircle(0, 0, 50);
					break;
				case 3:
					option3.outCircle.graphics.clear().beginFill(color).drawCircle(0, 0, 50);
					break;
				case 4:
					option4.outCircle.graphics.clear().beginFill(color).drawCircle(0, 0, 50);
					break;
				case 5:
					option5.outCircle.graphics.clear().beginFill(color).drawCircle(0, 0, 50);
					break;
			}
			color = "#bdbdbd";
		}
		
		game.getStage().addChild(scavHuntContainer);
		game.getStage().update();
	}
	else {
		game.progress();
	}
}