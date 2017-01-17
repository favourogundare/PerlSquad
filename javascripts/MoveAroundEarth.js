function eventMoveAroundEarth() {
	
	var handleClick = function(event) {
		currentBiome = currentBiome.next;
        playerIcon.x = currentBiome.x;
        playerIcon.y = currentBiome.y;
        game.getStage().update();
    }
	
    //	Build biome list
    var biomeList = new DoublyLinkedCycle();
    //dark green
    biomeList.add("Deciduous Forest", 160, 115);
    //yellow
    biomeList.add("Desert", 450, 170);
    //pink
    biomeList.add("Grassland", 630, 105);
    //light green
    biomeList.add("Rainforest", 215, 270);
    //weird green
    biomeList.add("Tundra", 310, 20);
    
    var text;
    text = new createjs.Text("Click the Player", "20px Arial", "#ff7700");
    text.x = 350;
    text.y = 350;
    game.getMainContainer().addChild(text);
    
    var playerIcon = game.getCurrentPlayer().getIcon();
    var currentBiome = biomeList.head;
    playerIcon.x = currentBiome.next.x
    playerIcon.y = currentBiome.next.y;
    playerIcon.addEventListener("click", handleClick);
    game.getMainContainer().addChild(playerIcon);
    game.getStage().update();
    
    
    /**
     * @function this.transition
     * Moves from one GameEvent to the other, simply takes away old eventListeners
     */
    this.transition = function() {
        game.getCurrentPlayer().getIcon().removeAllEventListeners();
    }
    
}


