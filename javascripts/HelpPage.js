/**
 *  @function eventHelpPage
 *  @param purpose
 *  @param checkStart
 *  Black Pop Up Box that explains how to load and play the game
 *  Explains game mechanics for minigames as well
 */
function eventHelpPage() {

    /*
        help page container
        background
        text
        next button - goes to next page of help page
        ok button - closes help page
        add all above to container
        add container to stage
        onOk - remove container from stage and call eventStartMenu
    */
	var help_container = new createjs.Container();
	var help_container_background = new createjs.Shape();
	help_container_background.graphics.beginFill("#000000").drawRect(game.getStage().width/2 - 300, game.getStage().height/2 - 150, 600, 300);

	var HelpPageText = new createjs.Text("FAQ : CHOOSE A TOPIC", "36px Arial", "#ffffff");
	HelpPageText.x = game.getStage().width/2;
	HelpPageText.y = 110;
	HelpPageText.textAlign = "center";
	HelpPageText.textBaseline = "middle";

	var help_addimage_button  = new RectButton("Add Image", "#000000", game.getStage().width/2 - 150, 150, 300, 50, "#D3D3D3", "click", addimageClicked);
	var help_editimage_button   = new RectButton("Edit Image", "#000000", game.getStage().width/2 - 150, 225, 300, 50, "#D3D3D3", "click", editimageClicked);
	var help_gamemech_button   = new RectButton("Game Mechanics", "#000000", game.getStage().width/2 - 150, 300, 300, 50, "#D3D3D3", "click", gamemechClicked);
/*
	var help_addimage_button  = new HelpButton1(buttonText, "20px Arial", buttonTextColor, buttonColor, buttonX, buttonY, buttonW, buttonH, buttonEvent, buttonFunction);
	var help_editimage_button  = new HelpButton1(buttonText, buttonTextFormat, buttonTextColor, buttonColor, buttonX, buttonY, buttonW, buttonH, buttonEvent, buttonFunction);
	var help_gamemech_button  = new HelpButton1(buttonText, buttonTextFormat, buttonTextColor, buttonColor, buttonX, buttonY, buttonW, buttonH, buttonEvent, buttonFunction);
*/

	help_container.addChild(help_container_background, HelpPageText, help_addimage_button.container, help_editimage_button.container, help_gamemech_button.container);
	game.getStage().addChild(help_container);
	game.getStage().update();
	
function addimageClicked(){
		game.getStage().update();
	}
	
	function editimageClicked(){
		game.getStage().update();
	}
	
	function gamemechClicked(){
		game.getStage().update();
	}


}



/*
	"use strict";
	var HelpPageText = new createjs.Text("Select the topic you need " + purpose + " with", "46px Arial", "#000000");
	HelpPageText.x = game.getStage().width/2;
	HelpPageText.y = 110;
	HelpPageText.textAlign = "center";
	HelpPageText.textBaseline = "middle";
	
	var addimage_button  = new RectButton("Add Image", "#00e676", game.getStage().width/2 - 150, 150, 300, 50, "#212121", "click", addimageClicked);
	var editimage_button   = new RectButton("Edit Image", "#ff9100", game.getStage().width/2 - 150, 225, 300, 50, "#212121", "click", editimageClicked);
	var gamemech_button   = new RectButton("Game Mechanics", "#f44336", game.getStage().width/2 - 150, 300, 300, 50, "#616161", "click", gamemechClicked);
	
}
	
*/













