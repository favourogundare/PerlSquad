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

	var HelpPageText = new createjs.Text("FAQ", "36px Times New Roman", "#ffffff");
	HelpPageText.x = game.getStage().width/2;
	HelpPageText.y = 110;
	HelpPageText.textAlign = "center";
	HelpPageText.textBaseline = "middle";

	help_container.addChild(help_container_background, HelpPageText);
	game.getStage().addChild(help_container);
	game.getStage().update();







	/*
    "use strict";
	
	*/

	//var addimage_button  = new RectButton("Add Image", "#00e676", game.getStage().width/2 - 150, 150, 300, 50, "#212121", "click", addimageClicked);
	//var editimage_button   = new RectButton("Edit Image", "#ff9100", game.getStage().width/2 - 150, 225, 300, 50, "#212121", "click", editimageClicked);
	//var gamemech_button   = new RectButton("Game Mechanics", "#f44336", game.getStage().width/2 - 150, 300, 300, 50, "#616161", "click", gamemechClicked);

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













