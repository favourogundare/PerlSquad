var preload;
/**
 * @function eventLoadMap
 * Utilizes the manifest to preload assets into 
 */
function eventLoadMap() {
	preload = new createjs.LoadQueue(false);
    preload.on("error", handleMapError);
    preload.on("fileerror", handleMapFileError);
	preload.on("fileload", handleMapLoad);
	preload.on("complete", handleMapLoaded);
    preload.loadFile({type: createjs.AbstractLoader.IMAGE, src: "./images/background_map.png", id: "map"});
}
function handleMapError(event) {
    console.log("Error!",event.text);
}
function handleMapFileError() {
    console.log("File error");
}
function handleMapLoad(event) {
    console.log("Finished Loading: " + event.item.id);
    game.map = event;
}
function handleMapLoaded() {
    game.start();
}
