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
	var precipText, temperatureText, smallText, medText, largeText;
	var back = new Image();
	var prec, temp;
	var bgrnd, precip, temperature, small, med, large, infoOK;
	var biomestuff;
	var infoText = new createjs.Text("", "20px Arial", "#FFFFFF");
	var precipText, temperatureText, smallText, medText, largeText;
	var textstuff;
	
	var infoPage = new createjs.Container();        
    game.getStage().enableMouseOver(10);

	prec = new Image();
	prec.src = "Pictures/icons/precipitation.png";
	prec.onload = function() {
		temp = new Image();
		temp.src = "Pictures/icons/temperature.png";
		temp.onload = setBiomeInfo;
	};
	
	function setImg (img, imgScale, imgX, imgY) {
		var bounds = img.getBounds();
		var maxBound = Math.max(bounds.height, bounds.width);
		img.scaleX = img.scaleBackX = imgScale/maxBound;
		img.scaleY = img.scaleBackY = imgScale/maxBound;
		img.x = imgX;
		img.y = imgY;
	}
	
	function setBiomeInfo() {
		precip      = new createjs.Bitmap(prec);
		temperature = new createjs.Bitmap(temp);
		small       = new createjs.Bitmap(game.assets[game.currentBiome.num-1][2].result);
		med         = new createjs.Bitmap(game.assets[game.currentBiome.num-1][1].result);
		large       = new createjs.Bitmap(game.assets[game.currentBiome.num-1][0].result);
		biomestuff  = [precip, temperature, small, med, large];
		
		setImg(temperature, 70, 20, 20);
		setImg(precip, 65, 20, 350);
		
		infoOK = new createjs.Text("OK", "36px Arial", "#FFFFFF");
		infoOK.x = 890;
		infoOK.y = 20;
		
		if (game.currentBiome.num == 1){
			//reset bounds
			setImg(small, 70, 200, 250);
			setImg(med, 190, 600, 280);
			setImg(large, 150, 480, 200);
			precipText      = "   The annual precipitation for\ndeciduous forests is at around 75-150 cm (30-60 inches).";
			temperatureText = "   The annual temperature in the deciduous forest\naverages 50 degrees F.", "20px Arial";
			smallText       = "   Salamanders are amphibians that can\nregenerate body parts that they have lost.";
			medText         = "   The white-tailed deer is commonly found\nin North America, but can also be found\nthroughout Central and South America.";
			largeText       = "   The black bear is the world's most common\nspecies of bear; there are over twice as many\nblack bears as all other species combined.";
			back.src        = "deciduous.jpg";
			back.onload     = setInfoBG;
		} 
		else if (game.currentBiome.num == 2) {
			setImg(small, 90, 750, 230);
			setImg(med, 150, 300, 280);
			setImg(large, 220, 100, 200);
			precipText      = "   The annual precipitation for the\ndesert is less than 25 cm (10 inches).";
			temperatureText = "   The temperature in the desert\nranges from 110 degrees F during the\nday to 30F at night.";
			smallText       = "   The tiny sand cat is the only cat\nexclusively native to the desert; its feet\nhas thick fur to help it travel across the sand.";
			medText         = "   The armadillo has a shell of thick,\nleathery skin to protect it from predators.";
			largeText       = "   The cougar is another feline\nnative to the desert, but it also lives\nin mountains and thick forests.";
			back.src        = "desert.jpg";
			back.onload     = setInfoBG;
		}
		else if (game.currentBiome.num == 3) {
			setImg(small, 50, 700, 100);
			setImg(med, 200, 350, 300);
			setImg(large, 200, 645, 222);
			precipText      = "   The annual precipitation for a grassland\nis between 15 and 45 inches.";
			temperatureText = "   The average temperature in the grassland\nranges from 70 to 85 degrees F.";
			smallText       = "   Bees are a social insect that can live\nin colonies with up to 50 others; they\nfeed on nectar from flowers.";
			medText         = "   Unlike their cousins, squirrels, prarie dogs live\nunderground in burrows; they are called\n'dogs' because of their loud barking cry.";
			largeText       = "   The bobcat lives in many habitats, but most\nabundantly in American grasslands; they often compete\nwith coyotes and other predators for territory.";
			back.src        = "grassland.jpg";
			back.onload     = setInfoBG;
		}
		else if (game.currentBiome.num == 4) {
			setImg(small, 70, 600, 100);
			setImg(med, 150, 150, 260);
			setImg(large, 200, 745, 322);
			precipText      = "   The annual precipitation for temperate\nrainforests is at least 200 cm (78.74 in)\nand can go up to 350 cm (137.79 in).";
			temperatureText = "   The average temperature in the rainforest\nranges from 68-93 degrees F.";
			smallText       = "   The rainforest is home to a large\nvariety of butterflies that don't live\nanywhere else in the world.";
			medText         = "   Known for its large and colorful bill,\nthe toucan stands out among the birds\nof the tropical and subtropical rainforests.";
			largeText       = "   The jaguar is the third largest cat\nin the world and one of the strongest\nhunters in the Americas.";
			back.src        = "rainforest.jpg";
			back.onload     = setInfoBG;
		}
		else if (game.currentBiome.num == 5) {
			setImg(small, 70, 800, 330);
			setImg(med, 110, 150, 300);
			setImg(large, 200, 645, 322);
			precipText      = "   The annual precipitation for the tundra\n is only around 6-10 inches per year (15-25 cm).";
			temperatureText = "   The average temperature in the tundra\nranges from -30 degrees F in winter to 50F\nin the summer.";
			smallText       = "   Trout and salmon are a common freshwater\nfish and are an important food source for\nbears and birds of prey.";
			medText         = "   The arctic hare has thick fur for both warmth and\ncamoflage, and can run at speeds up to 40mph.";
			largeText       = "   The polar bear is one of the largest hunters\nnative to the arctic circle; they prefer to\nhunt seals in areas near the sea.";
			back.src        = "tundra.jpg";
			back.onload     = setInfoBG;
		}
	}
	
	function setInfoBG(event) {	
		textstuff = [precipText, temperatureText, smallText, medText, largeText];
		biomestuff.forEach(function(item, index, array){
			bgrnd = new createjs.Bitmap(back);
			item.on("mousedown", function (event) {
				var xOffset = event.stageX - event.currentTarget.x;
				var yOffset = event.stageY - event.currentTarget.y;
				this.scaleX = this.scaleBackX * 1.1;
				this.scaleY = this.scaleBackY * 1.1;
				infoText.text = textstuff[index];
				infoText.x = 350;
				infoText.y = 250;
				infoPage.addChild(infoText);
				game.getStage().update();
								
				item.on("pressmove", function(event) {
					event.currentTarget.x = event.stageX-xOffset; 
					event.currentTarget.y = event.stageY-yOffset;
					game.getStage().update(); // this updates the canvas with the new position
				});
			});
			
			item.on("pressup", function (event) {
				this.scaleX = this.scaleBackX;
				this.scaleY = this.scaleBackY;
				infoPage.removeChild(infoText);
				game.getStage().update();
			});
		});
		console.log("Should have updated");
		infoPage.addChild(bgrnd, temperature, precip, small, med, large, infoOK);       
		game.getStage().addChild(infoPage);
		game.getStage().update();
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
