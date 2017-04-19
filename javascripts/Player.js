/** 
* @function Player
* @param easelJSShape
* Represents a player in the game
*/
function Player(easelJSShape) {
	"use strict";
    //-- Private --//
    /** Reference to EaselJS Shape  object, if the player has an avatar or similar */
    var icon = (easelJSShape !== undefined) ? easelJSShape : undefined; 
    /** Reference to most recently triggered GameEvent */
    var currentEvent; 

    //-- Public --//
    /**
     * @function this.getIcon
     * Get a reference to the Player's EaselJS Shape object
     */
    this.getIcon = function() {
        if (icon !== undefined) return icon;
    };

    /**
     * @function this.setIcon
	 * @param easelJSShape
     * Set a reference to the Player's EaselJS Shape object
     */
    this.setIcon = function(easelJSShape) {
        if (easelJsShape !== undefined) icon = easelJSShape;
    };

    /** 
     * @function this.updateGamePosition
	 * @param GameEvent
     * Provide an updated board position to the player.
     */
    this.updateGamePosition = function(GameEvent) {
        currentEvent = GameEvent;
    };
}


