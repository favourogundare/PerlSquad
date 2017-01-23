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
	Description.style.display = 'none';
    ImageSource.style.display = 'none';
    game.setStage(stage);
    eventLoadMap();
    //game.start();
}
