/**  
 * @function eventInfoScreen
 * Info Screen portion of the game. Displays objects that belong in the biome.
 * Scroll over objects for information.
 */
function eventInfoScreen(){
    var timestamp = new Date(); // For analytics
	var infoTextInner;
	var infoText;
	var back = new Image();
	var prec, temp;
	var bgrnd, precip, temperature, infoOK;
	var infoText = new createjs.Text();
	
	var infoPage = new createjs.Container();        
    game.getStage().enableMouseOver(10);

	prec = new Image();
	prec.src = "Pictures/icons/precipitation.png";
	prec.onload = function() {
		temp = new Image();
		temp.src = "Pictures/icons/temperature.png";
		temp.onload = setInfoBG;
	};
	
	function setImg (img, imgScale, imgX, imgY) {
		var bounds = img.getBounds();
		var maxBound = Math.max(bounds.height, bounds.width);
		img.scaleX = img.scaleBackX = imgScale/maxBound;
		img.scaleY = img.scaleBackY = imgScale/maxBound;
		img.x = imgX;
		img.y = imgY;
	}
	
	function setHoverEffects(img, index, i) {
		img.on("rollover", function (event) {
			this.scaleX = this.scaleBackX * 1.1;
			this.scaleY = this.scaleBackY * 1.1;
			infoText.text = game.imageText[index][i][0];
			infoText.font = "25px Arial";
			infoText.color = "black";
			infoText.x = 289;
			infoText.y = 50;
			infoTextInner = infoText.clone();
			infoTextInner.color = "white";
			infoTextInner.shadow = undefined;
			infoTextInner.outline = false;
			infoText.shadow = new createjs.Shadow("#000", -3, -3, 25);
			infoText.outline = 3;
			infoPage.addChild(infoText, infoTextInner);
			game.getStage().update();
		});
		
		img.on("rollout", function (event) {
			this.scaleX = this.scaleBackX;
			this.scaleY = this.scaleBackY;
			infoPage.removeChild(infoText, infoTextInner);
			game.getStage().update();
		});
	}
	
	function setBiomeInfo() {
		bgrnd = new createjs.Bitmap(back);
		infoPage.addChild(bgrnd);
		var index = game.currentBiome.num-1;
		for (var i=0; i<game.displayedImageNum[index]; i++) {
			var newImage = new createjs.Bitmap(game.assets[index][i].result);
			infoPage.addChild(newImage);
			setImg(newImage, game.imageScale[index][i], game.imageX[index][i], game.imageY[index][i]);
			setHoverEffects(newImage, index, i);
		}
		
		//set temp and prec
		precip      = new createjs.Bitmap(prec);
		temperature = new createjs.Bitmap(temp);
		i = game.imageScale[index].length-2;
		setImg(temperature, game.imageScale[index][i], game.imageX[index][i], game.imageY[index][i]);
		setHoverEffects(temperature, index, i);
		i = game.imageScale[index].length-1;
		setImg(precip, game.imageScale[index][i], game.imageX[index][i], game.imageY[index][i]);
		setHoverEffects(precip, index, i);
		
		infoOK = makeOKButton(890, 15, onInfoOK);
		infoPage.addChild(temperature, precip, infoOK);       
		game.getStage().addChild(infoPage);
		game.getStage().update();
	}
	
	function setInfoBG(event) {	
		if (game.currentBiome.num == 1){
			back.src        = "deciduous.jpg";
			back.onload     = setBiomeInfo;
		} 
		else if (game.currentBiome.num == 2) {
			back.src        = "desert.jpg";
			back.onload     = setBiomeInfo;
		}
		else if (game.currentBiome.num == 3) {
			back.src        = "grassland.jpg";
			back.onload     = setBiomeInfo;
		}
		else if (game.currentBiome.num == 4) {
			back.src        = "rainforest.jpg";
			back.onload     = setBiomeInfo;
		}
		else if (game.currentBiome.num == 5) {
			back.src        = "tundra.jpg";
			back.onload     = setBiomeInfo;
		}
	}
	
	/**  
	 * @function onInfoOK
	 * Function that handles when OK is clicked on the Info Page.
	 * Removes the infoPage container and calls game.progress()
	 */
	function onInfoOK() {
		// Analytics
		sendUserTimeInfo("info-screen", timestamp, {biome: game.currentBiome.name});
		
		game.getStage().removeChild(infoPage);
		game.progress();
	}
}
