/**  
 * @function eventMoveAroundEarth
 * Allows player to pick a biome to visit.
 */

var timestamp;

function eventMoveAroundEarth() {
    timestamp = new Date();
    
        var moveText;
	var handleClick = function(event) {
        game.currentBiome = game.currentBiome.next;
        moveText.text = "Biome: " + game.currentBiome.name + "\nClick the Player to Change Biomes\nClick OK to Visit";
        console.log(game.currentBiome.name);
        playerIcon.x = game.currentBiome.x;
        playerIcon.y = game.currentBiome.y;
        game.getStage().update();
    }
    var onMoveOK = function(event) {
	// Analytics
	sendUserTimeInfo("biome-selection", timestamp);
	
        game.getMainContainer().removeChild(moveText);
        game.getMainContainer().removeChild(playerIcon);
        game.getMainContainer().removeChild(moveOK);
        game.progress();
    }
	
    //	Build biome list
    var biomeList = new DoublyLinkedCycle();
    //dark green
    biomeList.add(1, "Deciduous Forest", 160, 115);
    //yellow
    biomeList.add(2, "Desert", 450, 170);
    //pink
    biomeList.add(3, "Grassland", 630, 105);
    //light green
    biomeList.add(4, "Rainforest", 215, 270);
    //weird green
    biomeList.add(5, "Tundra", 310, 20);
    
    var playerIcon = game.getCurrentPlayer().getIcon();
    game.currentBiome = biomeList.head;
    playerIcon.x = game.currentBiome.x
    playerIcon.y = game.currentBiome.y;
    playerIcon.addEventListener("click", handleClick);
    
    moveText = new createjs.Text("Biome: " + game.currentBiome.name + "\nClick the Player to Change Biomes\nClick OK to Visit", "20px Arial", "#ff7700");
    moveText.textAlign    = "center";
	moveText.textBaseline = "middle";
    moveText.x = game.getStage().width/2;
    moveText.y = game.getStage().height - 50;
    
    moveOK = new createjs.Text("OK", "36px Arial", "#FFFFFF");
	moveOK.x = game.getStage().width-80;
	moveOK.y = game.getStage().height-60;
	moveOK.addEventListener("click", onMoveOK);
    
    game.getMainContainer().addChild(moveText);
    game.getMainContainer().addChild(moveOK);
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


