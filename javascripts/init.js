/**
 *  @function init
 *  Initializes the game and hides the Description div.
 */
function init() {
    var stage = new createjs.Stage("main");
    Description.value = '';
    ImageSource.value = '';
    console.log(Description.value);
    console.log(ImageSource.value);
    game.setStage(stage);
    eventLoadMap();
}
