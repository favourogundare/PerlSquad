/**
 *  @function eventEditGame
 *  section to edit the items already in the game.
 */
function eventEditGame() {
	console.log("editing");
	var KEYCODE_B = 66;
	var KEYCODE_I = 73;
	var KEYCODE_R = 82;
	var KEYCODE_S = 83;
	var KEYCODE_T = 84;
	var KEYCODE_X = 88;
	var editingStage;
	
	
	document.onkeydown = handleKeyDown;
	
	var infoText;
	var back = new Image();
	var prec, temp;
	var bgrnd, precip, temperature, infoOK;
	var infoText = new createjs.Text("", "20px Arial", "#FFFFFF");
	
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
		img.on("mousedown", function (event) {
			var xOffset = event.stageX - event.currentTarget.x;
			var yOffset = event.stageY - event.currentTarget.y;
			this.scaleX = this.scaleBackX * 1.1;
			this.scaleY = this.scaleBackY * 1.1;
			infoText.text = game.imageText[index][i];
			infoText.x = 350;
			infoText.y = 250;
			infoPage.addChild(infoText);
			game.getStage().update();
		});
		
		img.on("pressup", function (event) {
			this.scaleX = this.scaleBackX;
			this.scaleY = this.scaleBackY;
			infoPage.removeChild(infoText);
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
		setHoverEffects(precip, index, i);
		i = game.imageScale[index].length-1;
		setImg(precip, game.imageScale[index][i], game.imageX[index][i], game.imageY[index][i]);
		setHoverEffects(temperature, index, i);
		
		infoOK = new createjs.Text("OK", "36px Arial", "#FFFFFF");
		infoOK.x = 890;
		infoOK.y = 20;
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
	
	function handleKeyDown(e) {
		//cross browser issues exist
		if (!e) {
			var e = window.event;
		}
		switch (e.keyCode) {
			case KEYCODE_B:
				console.log("B pressed");
				document.onkeydown = null;
				game.getStage().removeChild(infoPage);
				eventMoveAroundEarth();
				return false;
			case KEYCODE_I:
				console.log("I pressed");
				return false;
			case KEYCODE_R:
				console.log("R pressed");
				return false;
			case KEYCODE_S:
				console.log("S pressed");
				return false;
			case KEYCODE_T:
				console.log("T pressed");
				return false;
			case KEYCODE_X:
				console.log("X pressed");
				document.onkeydown = null;
				game.getStage().removeChild(infoPage);
				eventOptionsMenu();
				return false;
		}
	}
}

/**
 *  Add existing [I]mages/remove from manifest
 *  [S]cale
 *  Change [T]ext
 *  [R]otate
 *  E[X]it
 */
 
 
	
	
	
	
	
	
	/*
	item.on("pressmove", function(event) {
					event.currentTarget.x = event.stageX-xOffset; 
					event.currentTarget.y = event.stageY-yOffset;
					game.getStage().update(); // this updates the canvas with the new position
				});*/
