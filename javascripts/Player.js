  // Represents a player in the game
  function Player(easelJSShape) {
    //-- Private --//
    // Reference to EaselJS Shape  object, if the player has an avatar or similar
    var icon = (easelJSShape !== undefined) ? easelJSShape : undefined; 
    // Reference to most recently triggered GameEvent
    var currentEvent; 

    //-- Public --//
    // Get / Set a reference to the Player's EaselJS Shape object
    this.getIcon = function() {
      if (icon !== undefined) return icon;
    }
    this.setIcon = function(easelJSShape) {
      if (easelJsShape !== undefined) icon = easelJSShape;
    }

    // Provide an updated board position to the player. 
    this.updateGamePosition = function(GameEvent) {
      currentEvent = GameEvent;
    }
  }


