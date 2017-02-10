var infoPage;

var timestamp;

/**  
 * @function eventInfoScreen
 * Info Screen portion of the game. Displays objects that belong in the biome.
 * Scroll over objects for information.
 */
function eventInfoScreen(){
    timestamp = new Date();
    
    var mouseTarget;
    var bitmap;
	var infoText;
	var prec, temp;
    function setInfoBG(event) {
        var bgrnd = new createjs.Bitmap(back);
        infoPage = new createjs.Container();
        
        //*createjs.Touch.enable(infoPage);
        game.getStage().enableMouseOver(10);
        //infoPage.mouseMoveOutside = true;*/

        //load toucan image
        var toucan = new createjs.Bitmap(game.assets[3][1].result);
		var precip = new createjs.Bitmap(prec);
		var temperature = new createjs.Bitmap(temp);
		var butterfly = new createjs.Bitmap(game.assets[3][2].result);
		var jaguar = new createjs.Bitmap(game.assets[3][0].result);

		var biomestuff = [precip, temperature, butterfly, toucan, jaguar];
		
		biomestuff.forEach(function(item, index, array){		
			item.on("rollover", function (evt) {
				this.scaleX = this.scaleBackX * 1.1;
				this.scaleY = this.scaleBackY * 1.1;
				if (index == 0) {
					infoText = new createjs.Text("   The annual precipitation for temperate\nrainforests is at least 200 cm (78.74 in)\nand can go up to 350 cm (137.79 in).", "20px Arial", "#000000");					
				} else if (index == 1){
					infoText = new createjs.Text("   The average temperature in the rainforest\nranges from 68-93 degrees F.", "20px Arial", "#000000");
				} else if (index == 2){
					infoText = new createjs.Text("   The rainforest is home to a large\nvariety of butterflies that don't live\nanywhere else in the world.", "20px Arial", "#000000");					
				} else if (index == 3){
					infoText = new createjs.Text("   Known for its large and colorful bill,\nthe toucan stands out among the birds\nof the tropical and subtropical rainforests.", "20px Arial", "#000000");
				} else if (index == 4){
					infoText = new createjs.Text("   The jaguar is the third largest cat\nin the world and one of the strongest\nhunters in the Americas.", "20px Arial", "#000000");
				}
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
        });
			
		//reset bounds
		var bounds = toucan.getBounds();
		var maxBound = Math.max(bounds.height, bounds.width);
		toucan.scaleY = toucan.scaleBackY = 150/maxBound;
		toucan.scaleX = toucan.scaleBackX = 150/maxBound;		
        toucan.x = 150;
        toucan.y = 260;

		bounds = temperature.getBounds();
		maxBound = Math.max(bounds.height, bounds.width);
		temperature.scaleX = temperature.scaleBackX = 70/maxBound;
		temperature.scaleY = temperature.scaleBackY = 70/maxBound;
	    temperature.x = 20;
		temperature.y = 20;
		
		bounds = precip.getBounds();
		maxBound = Math.max(bounds.height, bounds.width);
		precip.scaleX = precip.scaleBackX = 65/maxBound;
		precip.scaleY = precip.scaleBackY = 65/maxBound;
		precip.x = 20;
		precip.y = 350;
		
		bounds = butterfly.getBounds();
		maxBound = Math.max(bounds.height, bounds.width);
		butterfly.scaleX = butterfly.scaleBackX = 70/maxBound;
		butterfly.scaleY = butterfly.scaleBackY = 70/maxBound;
		butterfly.x = 600;
		butterfly.y = 100;
		
		bounds = jaguar.getBounds();
		maxBound = Math.max(bounds.height, bounds.width);
		jaguar.scaleX = jaguar.scaleBackX = 200/maxBound;
		jaguar.scaleY = jaguar.scaleBackY = 200/maxBound;		
		jaguar.x = 750;
		jaguar.y = 250;
        
        infoOK = new createjs.Text("OK", "36px Arial", "#FFFFFF");
        infoOK.x = game.getStage().width-80;
        infoOK.y = game.getStage().height-60;
        infoOK.addEventListener("click", onInfoOK);
        
        /////////////////////HEY ROB HEY ROB HEY ROB HEY ROB HEY ROB!!!!! You don't really need this container unless you want to associate more things with the toucan... like if you wanted to put the text near the toucan. Instead, you can just add the toucan directly to the infoPage
        //var toucanContainer = new createjs.Container();
        infoPage.addChild(bgrnd);
        infoPage.addChild(toucan, infoOK);
		infoPage.addChild(temperature, infoOK);
        infoPage.addChild(precip, infoOK);
        infoPage.addChild(butterfly, infoOK);
        infoPage.addChild(jaguar, infoOK);       
		
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
    back.onload = function() {
		prec = new Image();
		prec.src = "Pictures/icons/precipitation.png";
		prec.onload = function() {
			temp = new Image();
			temp.src = "Pictures/icons/temperature.png";
			temp.onload = setInfoBG;
		};
	};
}

/**  
 * @function onInfoOK
 * Function that handles when OK is clicked on the Info Page.
 * Removes the infoPage container and calls game.progress()
 */
function onInfoOK() {
    // Analytics
    sendUserTimeInfo("info-screen", timestamp, {biome: "rain-forest"});
    
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
