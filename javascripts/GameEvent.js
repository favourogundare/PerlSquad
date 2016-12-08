/**
* @function GameEvent
* An abstract representation of an event within a game. This could be a spot on the
* board, a segue to another part of a game, an animation, mini-game, etc...
*/
function GameEvent(moveFunction, actionFunction) {
    //-- Private --//
    var icon; // Reference to EaselJS Shape object
    /** Should point to a function object that transitions from the last GameEvent to this one */
    var moveFunc = (moveFunction !== undefined) ? moveFunction : (function() {
        return;
    });
    /** Should point to a function object that facilitates what happens at this GameEvent */
    var actionFunc = (actionFunction !== undefined) ? actionFunction : (function() {
        return;
    });

    //-- Public --//
    /**
     * @function this.getIcon
     * Get visual representation of the GameEvent, if any
     */
    this.getIcon = function() {
        if (icon !== undefined) return icon;
    }

    /**
     * @function this.setIcon
     * Set visual representation of the GameEvent, if any
     */
    this.setIcon = function(easelJSShape) {
        if (easelJsShape !== undefined) icon = easelJSShape;
    }

    /** 
     * @function this.trigger
     * Execute the code pointed to by moveFunc and actionFunc
     */
    this.trigger = function() {
        moveFunc();
        actionFunc();
    }
}


