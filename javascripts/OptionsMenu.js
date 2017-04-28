/**
 *  @function eventOptionsMenu
 *  Handles the options menu page
 */
function eventOptionsMenu() {
	"use strict";
	var edit_button;
	var done_button;
	var options_title;
	var toggleTTS_button   = new RectButton("Speech: ON", "#00e676", game.getStage().width/2 - 150, 150, 300, 50, "#212121", "click", toggleTTS);
    edit_button   = new RectButton("Edit Images", "#ff9100", game.getStage().width/2 - 150, 225, 300, 50, "#212121", "click", edit_clicked);
    done_button = new RectButton("Done", "#f44336", game.getStage().width/2 - 150, 300, 300, 50, "#212121", "click", done_clicked);    

    /** declare options menu shapes */
    var options_page = new createjs.Container();

    /** initialize options menu text */
    options_title   = new createjs.Text("Options Menu", "48px Arial", "#212121");
    options_title.maxWidth = 1000;
    options_title.textAlign = "center";
    options_title.textBaseline = "middle";
    options_title.x = game.getStage().width / 2;
    options_title.y = 100;
    
    options_page.addChild(options_title, toggleTTS_button.container, edit_button.container, done_button.container);
    game.getStage().addChild(options_page); 
    game.getStage().update();
	
	function toggleTTS() {
		if (!game.speechOn) {
			if (responsiveVoice.voiceSupport()) {
				game.speechOn = true;
				toggleTTS_button.txt.text      = toggleTTS_button.txtInner.text = "Speech: OFF";
			} else {
				alert("Text to speech currently unavailable... Please try again later...");
			}
		} else {
			game.speechOn = false;
			toggleTTS_button.txt.text      = 
			toggleTTS_button.txtInner.text = "Speech: ON";
		}
		game.getStage().update();
	}
	
	/**
	 *  @function edit_clicked
	 *  Handles the edit button being clicked
	 *  by going to the editing stage.
	 */
	function edit_clicked(){
		
		options_page.removeAllChildren();
		eventSelectManifest("Edit");
	}
	
	/**
	 *  @function done_clicked
	 *  Handles the done button being clicked
	 *  by returning to the start menu.
	 */
	function done_clicked(){
		game.getStage().removeChild(options_page);
		eventStartMenu();
		/*window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024, readFile, readFileFail);
		window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024, editFile, editFileFail);*/
	}
}