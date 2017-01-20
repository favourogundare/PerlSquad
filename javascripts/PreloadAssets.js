var progressText;
var assets;
var preload;
var ObjectIndex;
var BiomeIndex;
/**
 * @function eventPreloadAssets
 * Utilizes the manifest to preload assets into 
 */
function eventPreloadAssets() {
	progressText = new createjs.Text("", "64px Arial", "#000000");
	progressText.x = game.getStage().width/2;
	progressText.y = game.getStage().height/2;
	progressText.textAlign = "center";
	progressText.textBaseline = "middle";
	game.getStage().addChild(progressText);
	game.getStage().update();
	assets = [];
    ObjectIndex = 0;
    BiomeIndex  = 0;
	
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
    if (!assets[BiomeIndex]){
        assets[BiomeIndex] = [];
    }
    else {
        if (!assets[BiomeIndex][ObjectIndex]){
            assets[BiomeIndex][ObjectIndex] = [event];
        }
        else{
            assets[BiomeIndex][ObjectIndex].push(event);
        }
    }
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
    game.getStage().removeChild(progressText);
    game.progress();   
}

function getPreload() {
    return preload;
}