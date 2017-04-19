/**  
 * @function eventInfoScreen
 * Info Screen portion of the game. Displays objects that belong in the biome.
 * Scroll over objects for information.
 */
function eventInfoScreen(){
	"use strict";
	var timestamp = new Date(); // For analytics
	var back = new Image();
	var prec, temp;
	var bgrnd, precip, temperature, infoOK;
	var infoText = new createjs.Text();
	var infoTextInner;
	
	var infoPage = new createjs.Container();        
	game.getStage().enableMouseOver(10);

	prec = new Image();
	prec.src = "Pictures/icons/precipitation.png";
	prec.onload = function() {
		temp = new Image();
		temp.src = "Pictures/icons/temperature.png";
		temp.onload = setInfoBG;
	};
	
	/**
	 *  @function setImg
	 *  Sets the image on the screen for
	 *  the info screen.
	 *  @param img
	 *  @param imgScale
	 *  @param imgX
	 *  @param imgY
	 */
	function setImg (img, imgScale, imgX, imgY) {
		var bounds = img.getBounds();
		var maxBound = Math.max(bounds.height, bounds.width);
		img.scaleX = img.scaleBackX = imgScale/maxBound;
		img.scaleY = img.scaleBackY = imgScale/maxBound;
		img.x = imgX;
		img.y = imgY;
	}
	
	/**
	 *  @function setHoverEffects
	 *  Sets the hover over effects of
	 *  the images on the info screen.
	 *  @param img
	 *  @param index
	 *  @param i
	 */
	function setHoverEffects(img, index, i) {
		img.on("rollover", function (event) {
			this.scaleX = this.scaleBackX * 1.1;
			this.scaleY = this.scaleBackY * 1.1;
			if (img.name !== 'precip' && img.name !== 'temperature') {
				infoText.text = game.imageText[index][i][0];
			}
			else {
				infoText.text = game.otherText[index][i][0];
			}
			infoText.font = "28px Arial";
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
	
	/**
	 *  @function setBiomeInfo
	 *  Sets all the info for the biome on the
	 *  info screen.
	 */
	function setBiomeInfo() {
		bgrnd = new createjs.Bitmap(back);
		infoPage.addChild(bgrnd);
		var index = game.currentBiome.num-1;
		for (var i=0; i<game.displayedImageNum[index]; i++) {
			var newImage = new createjs.Bitmap(game.assets[index][i].result);
			newImage.name = game.assets[index][i].item.id;
			infoPage.addChild(newImage);
			setImg(newImage, game.imageScale[index][i], game.imageX[index][i], game.imageY[index][i]);
			setHoverEffects(newImage, index, i);
		}
		
		//set temp and prec
		precip           = new createjs.Bitmap(prec);
		precip.name      = "precip";
		temperature      = new createjs.Bitmap(temp);
		temperature.name = "temperature";
		setImg(temperature, game.otherScale[index][0], game.otherX[index][0], game.otherY[index][0]);
		setHoverEffects(temperature, index, 0);
		setImg(precip, game.otherScale[index][1], game.otherX[index][1], game.otherY[index][1]);
		setHoverEffects(precip, index, 1);
		
		infoOK = makeOKButton(890, 15, onInfoOK);
		infoPage.addChild(temperature, precip, infoOK);       
		game.getStage().addChild(infoPage);
		game.getStage().update();
	}
	
	/**
	 *  @function setInfoBG
	 *  Sets the info screen background for
	 *  the given biome.
	 *  @param event
	 */
	function setInfoBG(event) {	
		if (game.currentBiome.num == 1){
			back.src        = "./Pictures/Background/deciduous.jpg";
			back.onload     = setBiomeInfo;
		} 
		else if (game.currentBiome.num == 2) {
			back.src        = "./Pictures/Background/desert.jpg";
			back.onload     = setBiomeInfo;
		}
		else if (game.currentBiome.num == 3) {
			back.src        = "./Pictures/Background/grassland.jpg";
			back.onload     = setBiomeInfo;
		}
		else if (game.currentBiome.num == 4) {
			back.src        = "./Pictures/Background/rainforest.jpg";
			back.onload     = setBiomeInfo;
		}
		else if (game.currentBiome.num == 5) {
			back.src        = "./Pictures/Background/tundra.jpg";
			back.onload     = setBiomeInfo;
		}
	}
	
	/**  
	 * @function onInfoOK
	 * Function that handles when OK is clicked on the Info Page.
	 * Removes the infoPage container and calls game.progress()
	 */
	function onInfoOK() {
		/** Analytics */
		sendUserTimeInfo("info-screen", timestamp, {biome: game.currentBiome.name});
		
		game.getStage().removeChild(infoPage);
		game.progress();
	}
}
