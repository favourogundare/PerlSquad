var assets;
var preload;
var ObjectIndex;
var BiomeIndex;
var Loading;
var progressText = new createjs.Text("", "20px Arial", "#000000");
progressText.x = game.getStage().width;
progressText.y = 20;
progressText.textAlign = "center";
progressText.textBaseline = "middle";
game.getStage().addChild(progressText);
game.getStage().update();
function eventPreloadAssets() {
	assets = [];
    ObjectIndex = 0;
    BiomeIndex  = 0;
    Loading     = 0;
	
	stage = new createjs.Stage("canvas");
	var manifest = getManifest();

	preload = new createjs.LoadQueue(false);
    preload.on("error", handleError);
    preload.on("fileerror", handleFileError);
    preload.on("progress", handleFileProgress);
	preload.on("fileload", handleFileLoad);
	preload.on("complete", handleComplete);
    for (var i = 0; i < manifest.length; i++) {
		if (typeof manifest[i] !== 'undefined' && manifest[i] !== null && manifest[i].length > 0){
			if (ObjectIndex == 7) {
				ObjectIndex = 0;
				BiomeIndex++;
			}
			preload.loadManifest(manifest[i])
			ObjectIndex++;
		}	else {
			game.progress();
			return;
		}
    }
	preload.loadManifest(manifest);
}
function handleError(event) {
    console.log("Error!",event.text);
}
function handleFileError() {
    console.log("File error");
}
function handleFileProgress(event) {
    progressText.text = (preload.progress*100|0) + "% Loaded";
    game.getStage().update();
}
function handleFileLoad(event) {
    console.log("Finished Loading: " + event.item.id);
	assets[BiomeIndex][ObjectIndex].push(event);
}
function handleComplete() {
	/*
        var offset = 0;
        for (i = 0; i < 2; i++){
            
            //get from array
            var events = assets[i];
            var result = events.result;

            //get by id
            var image = preload.getResult(id);
            var mybmp = new createjs.Bitmap(result);

            //reset bounds
            var bounds = mybmp.getBounds();
            mybmp.scaleY = new.h/bounds.height;
            mybmp.scaleX = new.w/bounds.width;
            mybmp.y = offset;
            stage.addChild(mybmp);
            offset += h;
        }
    */
    Loading++;
    if (Loading == manifest.length){
        game.progress();   
		return;
    }
}