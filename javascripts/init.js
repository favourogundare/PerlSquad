/**
 *  @function init
 *  Initializes the game and hides the Description div.
 */
function init() {
    var stage = new createjs.Stage("main");
	Description.style.display = 'none';
    game.setStage(stage);
    game.start();
}
