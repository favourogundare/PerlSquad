//declare options menu button containers
function eventOptionsMenu() {
	var edit_button;
	var done_button;
	var options_title;
    edit_button   = new RectButton("Edit Images", "#ff9100", game.getStage().width/2 - 150, 225, 300, 50, "#212121", "click", edit_clicked);
    done_button = new RectButton("Done", "#f44336", game.getStage().width/2 - 150, 300, 300, 50, "#212121", "click", done_clicked);    

    //declare options menu shapes
    var options_page = new createjs.Container();

    //initialize options menu text 
    options_title   = new createjs.Text("Options Menu", "48px Arial", "#212121");
    options_title.maxWidth = 1000;
    options_title.textAlign = "center";
    options_title.textBaseline = "middle";
    options_title.x = game.getStage().width / 2;
    options_title.y = 100;
    
    options_page.addChild(options_title, edit_button.container, done_button.container);
    game.getStage().addChild(options_page); 
    game.getStage().update();
	
	function edit_clicked(){
		/*var choose_biome_title_text = new createjs.Text("Choose Biome for Editing Objects", "48px Arial", "#212121");
		options_title.maxWidth = 1000;
		options_title.textAlign = "center";
		options_title.textBaseline = "middle";
		game.startMenu.choose_biome();*/
		options_page.removeAllChildren();
		eventSelectManifest("Edit");
	}
	
	function done_clicked(){
		game.getStage().removeChild(options_page);
		eventStartMenu();
		/*window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024, readFile, readFileFail);
		window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024, editFile, editFileFail);*/
	}
}