/**
 *  @function eventHelpPage
 *  Black Pop Up Box that explains how to load and play the game
 *  Explains game mechanics for minigames as well
 */
function eventHelpPage() {
	"use strict";
	var help_container = new createjs.Container();

	var HelpPageText = new createjs.Text("How Do You ... ?", "40px Arial", "#000000");
		HelpPageText.x = game.getStage().width/2;
		HelpPageText.y = 110;
		HelpPageText.textAlign = "center";
		HelpPageText.textBaseline = "middle";
	
	var help_playgame_button = new RectButton("Play the Game", "#f44336", game.getStage().width/2 - 150, 150, 300, 50, "#212121", "click", playgameClicked);
    var help_editgame_button = new RectButton("Edit the Game", "#00e676", game.getStage().width/2 - 150, 225, 300, 50, "#212121", "click", editGameClicked);
	var help_backbutton_button = new RectButton("Back", "#ff9100", game.getStage().width/2 - 150, 300, 300, 50, "#212121", "click", backbuttonClicked);
	
	help_container.addChild(HelpPageText, help_playgame_button.container, help_editgame_button.container, help_backbutton_button.container);
	game.getStage().addChild(help_container);
	game.getStage().update();
	
	/**
	 *  @function playgameClicked
	 *  Handler for clicking the how to play
	 *  the game button. Explains how to play.
	 */
	function playgameClicked(){
		var help_subcontainer = new createjs.Container();
		help_subcontainer.on("dblclick", function(event) {
			help_container.removeChild(help_subcontainer);
			game.getStage().update();
		});
		
		var help_subcontainer_background = new createjs.Shape();
		help_subcontainer_background.graphics.beginFill("#000000").drawRect(game.getStage().width/2 - 300, game.getStage().height/2 - 150, 600, 300);
		
		
		var HelpSubPageText = new createjs.Text("Click 'Start'. Then, select a manifest.\n\n"+
												"Pick default if you're unsure what to click.\n\n"+
												"Follow in-game instructions from there.\n\n"+
												"**********************************************\n\n"+
												"(Double Click Black Box Text Box to Exit)", "30px Arial", "#ffffff");
		HelpSubPageText.x = game.getStage().width/2;
		HelpSubPageText.y = 100;
		HelpSubPageText.textAlign = "center";
		HelpSubPageText.textBaseline = "middle";

		help_subcontainer.addChild(help_subcontainer_background, HelpSubPageText);
		help_container.addChild(help_subcontainer);
		game.getStage().update();

	}
	
	/**
	 *  @function editGameClicked
	 *  Handler for clicking the how to edit
	 *  the game button. Explains how to edit.
	 */
	function editGameClicked(){
		var help_subcontainer = new createjs.Container();
		help_subcontainer.on("dblclick", function(event) {
			help_container.removeChild(help_subcontainer);
			game.getStage().update();
		});

		var help_subcontainer_background = new createjs.Shape();
		help_subcontainer_background.graphics.beginFill("#000000").drawRect(game.getStage().width/2 - 300, game.getStage().height/2 - 150, 600, 300);
		
		var HelpSubPageText = new createjs.Text("Click 'Options'. Then click 'Edit Image'\n\n"+
												"Pick manifest to edit. Pick default if unsure.\n\n"+
												"Pick biome to edit. Press 'H' for help.\n\n"+
												"************************************************\n\n"+
												"(Double Click Black Box Text Box to Exit)", "30px Arial", "#ffffff");
		HelpSubPageText.x = game.getStage().width/2;
		HelpSubPageText.y = 100;
		HelpSubPageText.textAlign = "center";
		HelpSubPageText.textBaseline = "middle";

		help_subcontainer.addChild(help_subcontainer_background, HelpSubPageText);
		help_container.addChild(help_subcontainer);
		game.getStage().update();

	}
	
	/**
	 *  @function backbuttonClicked
	 *  Handler for clicking the back button.
	 *  Takes the player back to the start menu.
	 */
	function backbuttonClicked(){
		game.getStage().removeChild(help_container);
		eventStartMenu();
	}


}













