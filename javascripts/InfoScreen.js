function eventInfoScreen(){
    var infoPage;
    var background;
    var text;
    var mouseTarget;
    var bitmap;
	var infoText;
    
    infoPage = new createjs.Container();
	
    //*createjs.Touch.enable(infoPage);
    game.getStage().enableMouseOver(10);
    //infoPage.mouseMoveOutside = true;*/

	var back = new createjs.Bitmap("rainforest.jpg");

    //load toucan image
    var toucan = new createjs.Bitmap("toucan.png");
    toucan.scaleX = toucan.scaleY = toucan.scale = .5;
    toucan.x = 150;
    toucan.y = 300;
	    
    toucan.on("rollover", function (evt) {
        this.scaleX = this.scaleY = this.scale * 1.2;
		infoText = new createjs.Text("   Known for its large and colorful bill,\nthe toucan stands out among the birds\nof the tropical and subtropical rainforests.", "20px Arial", "#000000");
		infoText.x = 350;
		infoText.y = 250;
		infoPage.addChild(infoText);
		game.getStage().update();
    });

    toucan.on("rollout", function (evt) {
        this.scaleX = this.scaleY = this.scale;
		infoPage.removeChild(infoText);
        game.getStage().update();
    });
    
    /////////////////////HEY ROB HEY ROB HEY ROB HEY ROB HEY ROB!!!!! You don't really need this container unless you want to associate more things with the toucan... like if you wanted to put the text near the toucan. Instead, you can just add the toucan directly to the infoPage
    //var toucanContainer = new createjs.Container();
	infoPage.addChild(back);
    infoPage.addChild(toucan);
   //infoPage.addChild(toucanContainer);
    game.getStage().addChild(infoPage);
    game.getStage().update();
    
    //createjs.Ticker.addEventListener("tick", tick);

    //load sheep image
    //////////////var sheep = new createjs.Bitmap("sheep.png");
    //sheep.src = "sheep.png";
    //sheep.name = "sheep";
    //sheep.onload = createAnimals;

    /** initialize page text */
    /*
    var p_num   = new createjs.Text("Pick # of Players", "36px Arial", "#212121");
    p_num.textAlign = "center";
    p_num.textBaseline = "middle";
    p_num.x   = game.getStage().width / 2;
    p_num.y   = 50; 
    */		
    
}

/**function tick(event) {
// this set makes it so the stage only re-renders when an event handler indicates a change has happened.
    if (update) {
        update = false; // only update once
        stage.update(event);
    }
}

function stop() {
    createjs.Ticker.removeEventListener("tick", tick);
}*/