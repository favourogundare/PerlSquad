function eventScavengerHunt() {
	  var scavHuntContainer;
		
	  this.onProceed = function(event) {
        game.getStage().removeChild(scavHuntContainer);
		game.progress();
	  }
		
      // Public eventListener to handle double clicking on the player
      this.handleDblClick = function(event) {
        // Delete old text
        game.getMainContainer().removeChild(text)
        scavHuntContainer = new createjs.Container();
		scavHuntContainer.x = 100;
		scavHuntContainer.y = 100;
		var scavHuntBackground = new createjs.Shape();
		scavHuntBackground.graphics.beginFill("#000000").drawRect(0, 0, 760, 244);
		scavHuntContainer.addChild(scavHuntBackground);
		var scavHuntAnimalPic = new createjs.Bitmap("images/tiger.png");
		scavHuntAnimalPic.x = 50;
		scavHuntAnimalPic.y = 25;
		scavHuntContainer.addChild(scavHuntAnimalPic);
		var scavHuntDivider = new createjs.Shape();
		scavHuntDivider.graphics.beginFill("#FFFFFF").drawRect(269, 43, 3, 169);
		scavHuntContainer.addChild(scavHuntDivider);
		var scavHuntText = new createjs.Text("Text about a tiger...", "20px Arial", "#FFFFFF");
		scavHuntText.x = 300;
		scavHuntText.y = 122;
		scavHuntContainer.addChild(scavHuntText);
		var scavHuntProceed = new createjs.Text("Proceed", "20px Arial", "#FFFFFF");
		scavHuntProceed.x = 680;
		scavHuntProceed.y = 220;
		scavHuntProceed.addEventListener("click", this.onProceed);
		scavHuntContainer.addChild(scavHuntProceed);
		game.getStage().addChild(scavHuntContainer);
		game.getStage().update();
		game.getStage().update();
      }

      // What will be executed when the GameEvent function pointer is triggered
      var text = new createjs.Text("Double Click Now!", "20px Arial", "#ff7700");
      text.x = 350;
      text.y = 350;
      game.getMainContainer().addChild(text);
      var playerIcon = game.getCurrentPlayer().getIcon();
      playerIcon.x = playerIcon.x + 40 * (game.getCurrentTurn() + 1);
      playerIcon.y = playerIcon.y + 100;
      playerIcon.addEventListener("dblclick", this.handleDblClick);
      game.getStage().update();
}