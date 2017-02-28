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
	/*var help_container_background = new createjs.Shape();
	help_container_background.graphics.beginFill("#D3D3D3").drawRect(game.getStage().width/2 - 300, game.getStage().height/2 - 150, 600, 300);*/

	var HelpPageText = new createjs.Text("How Do You?", "36px Arial", "#000000");
	HelpPageText.x = game.getStage().width/2;
	HelpPageText.y = 110;
	HelpPageText.textAlign = "center";
	HelpPageText.textBaseline = "middle";

/*
	var help_addimage_button  = new RectButton("Add Image", "#000000", game.getStage().width/2 - 150, 150, 300, 50, "#D3D3D3", "click", addimageClicked);
	var help_editimage_button   = new RectButton("Edit Image", "#000000", game.getStage().width/2 - 150, 225, 300, 50, "#D3D3D3", "click", editimageClicked);
	var help_gamemech_button   = new RectButton("Game Mechanics", "#000000", game.getStage().width/2 - 150, 300, 300, 50, "#D3D3D3", "click", gamemechClicked);
*/
	var help_addimage_button = new RectButton("Add an Image", "#f44336", game.getStage().width/2 - 150, 150, 300, 50, "#212121", "click", addimageClicked);
    var help_editimage_button = new RectButton("Edit an Image", "#00e676", game.getStage().width/2 - 150, 225, 300, 50, "#212121", "click", editimageClicked);
	var help_gamemech_button = new RectButton("Play the Game", "#ff9100", game.getStage().width/2 - 150, 300, 300, 50, "#212121", "click", gamemechClicked);

	//var help_addimage_button  = new HelpButton1("Add Image", "20px Arial", "#000000", "#A9A9A9", game.getStage().width/2 - 150, 150, 300, 50, "click", addimageClicked);
	//var help_editimage_button = new HelpButton1("Edit Image", "20px Arial", "#000000", "#A9A9A9", game.getStage().width/2 - 150, 225, 300, 50, "click", addimageClicked);
	//var help_gamemech_button  = new HelpButton1("Game Mechanics", "20px Arial", "#000000", "#A9A9A9", game.getStage().width/2 - 150, 300, 300, 50, "click", gamemechClicked);

	help_container.addChild(HelpPageText, help_addimage_button.container, help_editimage_button.container, help_gamemech_button.container);
	game.getStage().addChild(help_container);
	game.getStage().update();
	
	function addimageClicked(){
		var help_subcontainer = new createjs.Container();
		help_subcontainer.on("dblclick", function(event) {
			help_container.removeChild(help_subcontainer);
			game.getStage().update();
		});
		
		var help_subcontainer_background = new createjs.Shape();
		help_subcontainer_background.graphics.beginFill("#D3D3D3").drawRect(game.getStage().width/2 - 300, game.getStage().height/2 - 150, 600, 300);

		var HelpSubPageText = new createjs.Text("Lorem ipsum dolor sit amet, \nconsectetur adipiscing elit", "24px Arial", "#000000");
		HelpSubPageText.x = game.getStage().width/2;
		HelpSubPageText.y = 110;
		HelpSubPageText.textAlign = "center";
		HelpSubPageText.textBaseline = "middle";

		help_subcontainer.addChild(help_subcontainer_background, HelpSubPageText);
		help_container.addChild(help_subcontainer);
		game.getStage().update();

	}
	
	function editimageClicked(){
		var help_subcontainer = new createjs.Container();
		help_subcontainer.on("dblclick", function(event) {
			help_container.removeChild(help_subcontainer);
			game.getStage().update();
		});

		var help_subcontainer_background = new createjs.Shape();
		help_subcontainer_background.graphics.beginFill("#D3D3D3").drawRect(game.getStage().width/2 - 300, game.getStage().height/2 - 150, 600, 300);

		var HelpSubPageText = new createjs.Text("Lorem ipsum dolor sit amet, \nconsectetur adipiscing elit", "24px Arial", "#000000");
												
		HelpSubPageText.x = game.getStage().width/2;
		HelpSubPageText.y = 110;
		HelpSubPageText.textAlign = "center";
		HelpSubPageText.textBaseline = "middle";

		help_subcontainer.addChild(help_subcontainer_background, HelpSubPageText);
		help_container.addChild(help_subcontainer);
		game.getStage().update();

	}
	
	function gamemechClicked(){
		var help_subcontainer = new createjs.Container();
		help_subcontainer.on("dblclick", function(event) {
			help_container.removeChild(help_subcontainer);
			game.getStage().update();
		});

		var help_subcontainer_background = new createjs.Shape();
		help_subcontainer_background.graphics.beginFill("#D3D3D3").drawRect(game.getStage().width/2 - 300, game.getStage().height/2 - 150, 600, 300);

		var HelpSubPageText = new createjs.Text("Lorem ipsum dolor sit amet, \nconsectetur adipiscing elit", "24px Arial", "#000000");
		HelpSubPageText.x = game.getStage().width/2;
		HelpSubPageText.y = 110;
		HelpSubPageText.textAlign = "center";
		HelpSubPageText.textBaseline = "middle";

		help_subcontainer.addChild(help_subcontainer_background, HelpSubPageText);
		help_container.addChild(help_subcontainer);
		game.getStage().update();
	}


}













