var infoPage;
/**  
 * @function eventInfoScreen
 * Info Screen portion of the game. Displays objects that belong in the biome.
 * Scroll over objects for information.
 */
function eventInfoScreen(){
    analytics.track("info-screen");
    
    var mouseTarget;
    var bitmap;
	var infoText;
    function setInfoBG(event) {
        var bgrnd = new createjs.Bitmap(back);
        infoPage = new createjs.Container();
        
        //*createjs.Touch.enable(infoPage);
        game.getStage().enableMouseOver(10);
        //infoPage.mouseMoveOutside = true;*/

        //load toucan image
        var result = preload.getResult("toucan");
        var toucan = new createjs.Bitmap(result);
		result = preload.getResult("precipitation");
		var precip = new createjs.Bitmap(result);
		result = preload.getResult("temperature");
		var temperature = new createjs.Bitmap(result);
		result = preload.getResult("butterfly");
		var butterfly = new createjs.Bitmap(result);
		result = preload.getResult("jaguar");
		var jaguar = new createjs.Bitmap(result);

		var biomestuff = [precip, temperature, butterfly, toucan, jaguar]

		biomestuff.forEach(function(item, index, array){
			
			//reset bounds
			var bounds = item.getBounds();
			var maxBound = Math.max(bounds.height, bounds.width);
			item.scaleY = item.scaleBackY = 150/maxBound;
			item.scaleX = item.scaleBackX = 150/maxBound;

			item.on("rollover", function (evt) {
				this.scaleX = this.scaleBackX * 1.1;
				this.scaleY = this.scaleBackY * 1.1;
				infoText = new createjs.Text("   Known for its large and colorful bill,\nthe toucan stands out among the birds\nof the tropical and subtropical rainforests.", "20px Arial", "#000000");
				infoText.x = 350;
				infoText.y = 250;
				infoPage.addChild(infoText);
				game.getStage().update();
			});

			item.on("rollout", function (evt) {
				this.scaleX = this.scaleBackX;
				this.scaleY = this.scaleBackY;
				infoPage.removeChild(infoText);
				game.getStage().update();
			});
        
        toucan.x = 150;
        toucan.y = 260;
                   
		temperature.x = 50;
		temperature.y = 50;
		
		precipitation.x = 50;
		precipitation.y = 75;
		
		butterfly.x = 400;
		butterfly.y = 450;
		
		jaguar.x = 250;
		jaguar.y = 20;
		
        infoOK = new createjs.Text("OK", "36px Arial", "#FFFFFF");
        infoOK.x = game.getStage().width-80;
        infoOK.y = game.getStage().height-60;
        infoOK.addEventListener("click", onInfoOK);
        
        /////////////////////HEY ROB HEY ROB HEY ROB HEY ROB HEY ROB!!!!! You don't really need this container unless you want to associate more things with the toucan... like if you wanted to put the text near the toucan. Instead, you can just add the toucan directly to the infoPage
        //var toucanContainer = new createjs.Container();
        infoPage.addChild(bgrnd);
        infoPage.addChild(toucan, infoOK);
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
    var back = new Image();
    back.src = "rainforest.jpg";
    back.onload = setInfoBG;
}

/**  
 * @function onInfoOK
 * Function that handles when OK is clicked on the Info Page.
 * Removes the infoPage container and calls game.progress()
 */
function onInfoOK() {
    game.getStage().removeChild(infoPage);
    game.progress();
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
