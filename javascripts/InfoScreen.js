var infoPage;

var timestamp;  // For analytics

/**  
 * @function eventInfoScreen
 * Info Screen portion of the game. Displays objects that belong in the biome.
 * Scroll over objects for information.
 */
function eventInfoScreen(){
    timestamp = new Date();
	
	var infoText;
	var prec, temp;

//Deciduous
	if (game.currentBiome.num == 1){
      function setInfoBG(event) {
        var bgrnd = new createjs.Bitmap(back);
        infoPage = new createjs.Container();
        
        game.getStage().enableMouseOver(10);

        var med = new createjs.Bitmap(game.assets[0][1].result);
		var precip = new createjs.Bitmap(prec);
		var temperature = new createjs.Bitmap(temp);
		var small = new createjs.Bitmap(game.assets[0][2].result);
		var large = new createjs.Bitmap(game.assets[0][0].result);

		var biomestuff = [precip, temperature, small, med, large];
		
		biomestuff.forEach(function(item, index, array){		
			item.on("rollover", function (evt) {
				this.scaleX = this.scaleBackX * 1.1;
				this.scaleY = this.scaleBackY * 1.1;
				if (index === 0) {
					infoText = new createjs.Text("   The annual precipitation for\ndeciduous forests is at around 75-150 cm (30-60 inches).", "20px Arial", "#FFFFFF");
				} else if (index == 1){
					infoText = new createjs.Text("   The annual temperature in the deciduous forest\naverages 50 degrees F.", "20px Arial", "#FFFFFF");
				} else if (index == 2){
					infoText = new createjs.Text("   Salamanders are amphibians that can\nregenerate body parts that they have lost.", "20px Arial", "#FFFFFF");
				} else if (index == 3){
					infoText = new createjs.Text("   The white-tailed deer is commonly found\nin North America, but can also be found\nthroughout Central and South America.", "20px Arial", "#FFFFFF");
				} else if (index == 4){
					infoText = new createjs.Text("   The black bear is the world's most common\nspecies of bear; there are over twice as many\nblack bears as all other species combined.", "20px Arial", "#FFFFFF");
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
		var bounds = med.getBounds();
		var maxBound = Math.max(bounds.height, bounds.width);
		med.scaleY = med.scaleBackY = 190/maxBound;
		med.scaleX = med.scaleBackX = 190/maxBound;		
        med.x = 600;
        med.y = 280;

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
		
		bounds = small.getBounds();
		maxBound = Math.max(bounds.height, bounds.width);
		small.scaleX = small.scaleBackX = 70/maxBound;
		small.scaleY = small.scaleBackY = 70/maxBound;
		small.x = 200;
		small.y = 250;
		
		bounds = large.getBounds();
		maxBound = Math.max(bounds.height, bounds.width);
		large.scaleX = large.scaleBackX = 150/maxBound;
		large.scaleY = large.scaleBackY = 150/maxBound;		
		large.x = 480;
        large.y = 200;
        
          // make info button
          // The first argument is x coord, then y coord, and event listener function
        infoOK = makeOKButton(890, 15, onInfoOK)
        
        infoPage.addChild(bgrnd);
        infoPage.addChild(med, infoOK);
		infoPage.addChild(temperature, infoOK);
        infoPage.addChild(precip, infoOK);
        infoPage.addChild(small, infoOK);
        infoPage.addChild(large, infoOK);       
		
        game.getStage().addChild(infoPage);
        game.getStage().update();
        

      }
      var back = new Image();
      back.src = "deciduous.jpg";
      back.onload = function() {
		prec = new Image();
		prec.src = "Pictures/icons/precipitation.png";
		prec.onload = function() {
			temp = new Image();
			temp.src = "Pictures/icons/temperature.png";
			temp.onload = setInfoBG;
		};
	  };
	};

//Desert
	if (game.currentBiome.num == 2){
      function setInfoBG(event) {
        var bgrnd = new createjs.Bitmap(back);
        infoPage = new createjs.Container();
        
        game.getStage().enableMouseOver(10);

        var med = new createjs.Bitmap(game.assets[1][1].result);
		var precip = new createjs.Bitmap(prec);
		var temperature = new createjs.Bitmap(temp);
		var small = new createjs.Bitmap(game.assets[1][2].result);
		var large = new createjs.Bitmap(game.assets[1][0].result);

		var biomestuff = [precip, temperature, small, med, large];
		
		biomestuff.forEach(function(item, index, array){		
			item.on("rollover", function (evt) {
				this.scaleX = this.scaleBackX * 1.1;
				this.scaleY = this.scaleBackY * 1.1;
				if (index === 0) {
					infoText = new createjs.Text("   The annual precipitation for the\ndesert is less than 25 cm (10 inches).", "20px Arial", "#FFFFFF");
				} else if (index == 1){
					infoText = new createjs.Text("   The temperature in the desert\nranges from 110 degrees F during the\nday to 30F at night.", "20px Arial", "#FFFFFF");
				} else if (index == 2){
					infoText = new createjs.Text("   The tiny sand cat is the only cat\nexclusively native to the desert; its feet\nhas thick fur to help it travel across the sand.", "20px Arial", "#FFFFFF");
				} else if (index == 3){
					infoText = new createjs.Text("   The armadillo has a shell of thick,\nleathery skin to protect it from predators.", "20px Arial", "#FFFFFF");
				} else if (index == 4){
					infoText = new createjs.Text("   The cougar is another feline\nnative to the desert, but it also lives\nin mountains and thick forests.", "20px Arial", "#FFFFFF");
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
		var bounds = med.getBounds();
		var maxBound = Math.max(bounds.height, bounds.width);
		med.scaleY = med.scaleBackY = 150/maxBound;
		med.scaleX = med.scaleBackX = 150/maxBound;		
        med.x = 300;
        med.y = 280;

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
		
		bounds = small.getBounds();
		maxBound = Math.max(bounds.height, bounds.width);
		small.scaleX = small.scaleBackX = 90/maxBound;
		small.scaleY = small.scaleBackY = 90/maxBound;
		small.x = 750;
		small.y = 230;
		
		bounds = large.getBounds();
		maxBound = Math.max(bounds.height, bounds.width);
		large.scaleX = large.scaleBackX = 220/maxBound;
		large.scaleY = large.scaleBackY = 220/maxBound;		
		large.x = 100;
        large.y = 200;
        
        infoOK = new createjs.Text("OK", "36px Arial", "#FFFFFF");
        infoOK.x = 890;
        infoOK.y = 20;
        infoOK.addEventListener("click", onInfoOK);
        
        infoPage.addChild(bgrnd);
        infoPage.addChild(med, infoOK);
		infoPage.addChild(temperature, infoOK);
        infoPage.addChild(precip, infoOK);
        infoPage.addChild(small, infoOK);
        infoPage.addChild(large, infoOK);       
		
        game.getStage().addChild(infoPage);
        game.getStage().update();
        

      }
      var back = new Image();
      back.src = "desert.jpg";
      back.onload = function() {
		prec = new Image();
		prec.src = "Pictures/icons/precipitation.png";
		prec.onload = function() {
			temp = new Image();
			temp.src = "Pictures/icons/temperature.png";
			temp.onload = setInfoBG;
		};
	  };
	};

//Grassland
	if (game.currentBiome.num == 3){
      function setInfoBG(event) {
        var bgrnd = new createjs.Bitmap(back);
        infoPage = new createjs.Container();
        
        game.getStage().enableMouseOver(10);

        var med = new createjs.Bitmap(game.assets[2][1].result);
		var precip = new createjs.Bitmap(prec);
		var temperature = new createjs.Bitmap(temp);
		var small = new createjs.Bitmap(game.assets[2][2].result);
		var large = new createjs.Bitmap(game.assets[2][0].result);

		var biomestuff = [precip, temperature, small, med, large];
		
		biomestuff.forEach(function(item, index, array){		
			item.on("rollover", function (evt) {
				this.scaleX = this.scaleBackX * 1.1;
				this.scaleY = this.scaleBackY * 1.1;
				if (index === 0) {
					infoText = new createjs.Text("   The annual precipitation for a grassland\nis between 15 and 45 inches.", "20px Arial", "#FFFFFF");
				} else if (index == 1){
					infoText = new createjs.Text("   The average temperature in the grassland\nranges from 70 to 85 degrees F.", "20px Arial", "#FFFFFF");
				} else if (index == 2){
					infoText = new createjs.Text("   Bees are a social insect that can live\nin colonies with up to 50 others; they\nfeed on nectar from flowers.", "20px Arial", "#FFFFFF");
				} else if (index == 3){
					infoText = new createjs.Text("   Unlike their cousins, squirrels, prarie dogs live\nunderground in burrows; they are called\n'dogs' because of their loud barking cry.", "20px Arial", "#FFFFFF");
				} else if (index == 4){
					infoText = new createjs.Text("   The bobcat lives in many habitats, but most\nabundantly in American grasslands; they often compete\nwith coyotes and other predators for territory.", "20px Arial", "#FFFFFF");
				}
				infoText.x = 250;
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
		var bounds = med.getBounds();
		var maxBound = Math.max(bounds.height, bounds.width);
		med.scaleY = med.scaleBackY = 200/maxBound;
		med.scaleX = med.scaleBackX = 200/maxBound;		
        med.x = 350;
        med.y = 300;

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
		
		bounds = small.getBounds();
		maxBound = Math.max(bounds.height, bounds.width);
		small.scaleX = small.scaleBackX = 50/maxBound;
		small.scaleY = small.scaleBackY = 50/maxBound;
		small.x = 700;
		small.y = 100;
		
		bounds = large.getBounds();
		maxBound = Math.max(bounds.height, bounds.width);
		large.scaleX = large.scaleBackX = 200/maxBound;
		large.scaleY = large.scaleBackY = 200/maxBound;		
		large.x = 645;
        large.y = 222;
        
        infoOK = new createjs.Text("OK", "36px Arial", "#FFFFFF");
        infoOK.x = 890;
        infoOK.y = 20;
        infoOK.addEventListener("click", onInfoOK);
        
        infoPage.addChild(bgrnd);
        infoPage.addChild(med, infoOK);
		infoPage.addChild(temperature, infoOK);
        infoPage.addChild(precip, infoOK);
        infoPage.addChild(small, infoOK);
        infoPage.addChild(large, infoOK);       
		
        game.getStage().addChild(infoPage);
        game.getStage().update();
        

      }
      var back = new Image();
      back.src = "grassland.jpg";
      back.onload = function() {
		prec = new Image();
		prec.src = "Pictures/icons/precipitation.png";
		prec.onload = function() {
			temp = new Image();
			temp.src = "Pictures/icons/temperature.png";
			temp.onload = setInfoBG;
		};
	  };
	};

//Rainforest
	if (game.currentBiome.num == 4){
      function setInfoBG(event) {
        var bgrnd = new createjs.Bitmap(back);
        infoPage = new createjs.Container();
        
        game.getStage().enableMouseOver(10);

        var med = new createjs.Bitmap(game.assets[3][1].result);
		var precip = new createjs.Bitmap(prec);
		var temperature = new createjs.Bitmap(temp);
		var small = new createjs.Bitmap(game.assets[3][2].result);
		var large = new createjs.Bitmap(game.assets[3][0].result);

		var biomestuff = [precip, temperature, small, med, large];
		
		biomestuff.forEach(function(item, index, array){		
			item.on("rollover", function (evt) {
				this.scaleX = this.scaleBackX * 1.1;
				this.scaleY = this.scaleBackY * 1.1;
				if (index === 0) {
					infoText = new createjs.Text("   The annual precipitation for temperate\nrainforests is at least 200 cm (78.74 in)\nand can go up to 350 cm (137.79 in).", "20px Arial", "#FFFFFF");
				} else if (index == 1){
					infoText = new createjs.Text("   The average temperature in the rainforest\nranges from 68-93 degrees F.", "20px Arial", "#FFFFFF");
				} else if (index == 2){
					infoText = new createjs.Text("   The rainforest is home to a large\nvariety of butterflies that don't live\nanywhere else in the world.", "20px Arial", "#FFFFFF");
				} else if (index == 3){
					infoText = new createjs.Text("   Known for its large and colorful bill,\nthe toucan stands out among the birds\nof the tropical and subtropical rainforests.", "20px Arial", "#FFFFFF");
				} else if (index == 4){
					infoText = new createjs.Text("   The jaguar is the third largest cat\nin the world and one of the strongest\nhunters in the Americas.", "20px Arial", "#FFFFFF");
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
		var bounds = med.getBounds();
		var maxBound = Math.max(bounds.height, bounds.width);
		med.scaleY = med.scaleBackY = 150/maxBound;
		med.scaleX = med.scaleBackX = 150/maxBound;		
        med.x = 150;
        med.y = 260;

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
		
		bounds = small.getBounds();
		maxBound = Math.max(bounds.height, bounds.width);
		small.scaleX = small.scaleBackX = 70/maxBound;
		small.scaleY = small.scaleBackY = 70/maxBound;
		small.x = 600;
		small.y = 100;
		
		bounds = large.getBounds();
		maxBound = Math.max(bounds.height, bounds.width);
		large.scaleX = large.scaleBackX = 200/maxBound;
		large.scaleY = large.scaleBackY = 200/maxBound;		
		large.x = 745;
        large.y = 322;
        
        infoOK = new createjs.Text("OK", "36px Arial", "#FFFFFF");
        infoOK.x = 890;
        infoOK.y = 20;
        infoOK.addEventListener("click", onInfoOK);
        
        infoPage.addChild(bgrnd);
        infoPage.addChild(med, infoOK);
		infoPage.addChild(temperature, infoOK);
        infoPage.addChild(precip, infoOK);
        infoPage.addChild(small, infoOK);
        infoPage.addChild(large, infoOK);       
		
        game.getStage().addChild(infoPage);
        game.getStage().update();
        

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
	};
	
//Tundra
	if (game.currentBiome.num == 5){
      function setInfoBG(event) {
        var bgrnd = new createjs.Bitmap(back);
        infoPage = new createjs.Container();
        
        game.getStage().enableMouseOver(10);

        var med = new createjs.Bitmap(game.assets[4][1].result);
		var precip = new createjs.Bitmap(prec);
		var temperature = new createjs.Bitmap(temp);
		var small = new createjs.Bitmap(game.assets[4][2].result);
		var large = new createjs.Bitmap(game.assets[4][0].result);

		var biomestuff = [precip, temperature, small, med, large];
		
		biomestuff.forEach(function(item, index, array){		
			item.on("rollover", function (evt) {
				this.scaleX = this.scaleBackX * 1.1;
				this.scaleY = this.scaleBackY * 1.1;
				if (index === 0) {
					infoText = new createjs.Text("   The annual precipitation for the tundra\n is only around 6-10 inches per year (15-25 cm).", "20px Arial", "#FFFFFF");
				} else if (index == 1){
					infoText = new createjs.Text("   The average temperature in the tundra\nranges from -30 degrees F in winter to 50F\nin the summer.", "20px Arial", "#FFFFFF");
				} else if (index == 2){
					infoText = new createjs.Text("   Trout and salmon are a common freshwater\nfish and are an important food source for\nbears and birds of prey.", "20px Arial", "#FFFFFF");
				} else if (index == 3){
					infoText = new createjs.Text("   The arctic hare has thick fur for both warmth and\ncamoflage, and can run at speeds up to 40mph.", "20px Arial", "#FFFFFF");
				} else if (index == 4){
					infoText = new createjs.Text("   The polar bear is one of the largest hunters\nnative to the arctic circle; they prefer to\nhunt seals in areas near the sea.", "20px Arial", "#FFFFFF");
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
		var bounds = med.getBounds();
		var maxBound = Math.max(bounds.height, bounds.width);
		med.scaleY = med.scaleBackY = 110/maxBound;
		med.scaleX = med.scaleBackX = 110/maxBound;		
        med.x = 150;
        med.y = 300;

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
		
		bounds = small.getBounds();
		maxBound = Math.max(bounds.height, bounds.width);
		small.scaleX = small.scaleBackX = 70/maxBound;
		small.scaleY = small.scaleBackY = 70/maxBound;
		small.x = 800;
		small.y = 330;
		
		bounds = large.getBounds();
		maxBound = Math.max(bounds.height, bounds.width);
		large.scaleX = large.scaleBackX = 200/maxBound;
		large.scaleY = large.scaleBackY = 200/maxBound;		
		large.x = 645;
        large.y = 322;
        
        infoOK = new createjs.Text("OK", "36px Arial", "#FFFFFF");
        infoOK.x = 890;
        infoOK.y = 20;
        infoOK.addEventListener("click", onInfoOK);
        
        infoPage.addChild(bgrnd);
        infoPage.addChild(med, infoOK);
		infoPage.addChild(temperature, infoOK);
        infoPage.addChild(precip, infoOK);
        infoPage.addChild(small, infoOK);
        infoPage.addChild(large, infoOK);       
		
        game.getStage().addChild(infoPage);
        game.getStage().update();
        

      }
      var back = new Image();
      back.src = "tundra.jpg";
      back.onload = function() {
		prec = new Image();
		prec.src = "Pictures/icons/precipitation.png";
		prec.onload = function() {
			temp = new Image();
			temp.src = "Pictures/icons/temperature.png";
			temp.onload = setInfoBG;
		};
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
    sendUserTimeInfo("info-screen", timestamp, {biome: game.currentBiome.name});
    
    game.getStage().removeChild(infoPage);
    game.progress();
}

