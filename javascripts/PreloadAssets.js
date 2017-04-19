/* jshint strict: true */
/**
 * @function eventPreloadAssets
 * @param manifest
 * Utilizes the manifest to preload assets into 
 */
function eventPreloadAssets(manifest) {
	"use strict";
	/** Analytics */
    var timestamp = new Date();
	
	var itemProgressText;
	var progressText;
	var BiomeIndex;
	var loadItem;
	var preload;
	
	for (var i=0; i<game.assets.length; i++) {
		game.assets[i] = [];
	}
	
    itemProgressText = new createjs.Text("", "32px Arial", "#000000");
	itemProgressText.x = game.getStage().width/2;
	itemProgressText.y = game.getStage().height/2+40;
	itemProgressText.textAlign = "center";
	itemProgressText.textBaseline = "middle";
    
	progressText = new createjs.Text("", "64px Arial", "#000000");
	progressText.x = game.getStage().width/2;
	progressText.y = game.getStage().height/2;
	progressText.textAlign = "center";
	progressText.textBaseline = "middle";
	
    game.getStage().addChild(progressText, itemProgressText);
	game.getStage().update();
    BiomeIndex  = 0;
	
	preload = new createjs.LoadQueue(false);
    preload.on("error", handleError);
    preload.on("fileerror", handleFileError);
    preload.on("filestart", function(event){loadItem = event.item.id;});
    preload.on("fileprogress", handleItemProgress);
    preload.on("progress", handleFileProgress);
	preload.on("fileload", handleFileLoad);
	preload.on("complete", handleComplete);
	
	
	if (typeof manifest[0] !== 'undefined' && manifest[0] !== null && manifest[0].length > 0){
		preload.loadManifest(manifest[BiomeIndex]);
	}
	
	/**
	 * @function handleError
	 * @param event
	 * Logs an error if the loading fails.
	 */
	function handleError(event) {
		console.log("Error!",event.text);
	}
	/**
	 * @function handleFileError
	 * Logs an error if an individual file load fails.
	 */
	function handleFileError() {
		console.log("File error");
	}
	/**
	 * @function handleItemProgress
	 * @param event
	 * Displays loading progress for files that take longer to load.
	 */
	function handleItemProgress(event) {
		console.log(loadItem);
		itemProgressText.text = loadItem + " " + (event.progress*100|0) + "% Loaded";
		game.getStage().update();
	}
	/**
	 * @function handleFileProgress
	 * @param event
	 * Displays loading progress for total loading.
	 */
	function handleFileProgress(event) {
		var BiomeName;
		switch (BiomeIndex) {
			case 0:
				BiomeName = "Deciduous Forest ";
				break;
			case 1:
				BiomeName = "Desert ";
				break;
			case 2:
				BiomeName = "Grassland ";
				break;
			case 3:
				BiomeName = "Rainforest ";
				break;
			case 4:
				BiomeName = "Tundra ";
				break;
		}
		console.log("Loading " + event + "...");
		progressText.text = BiomeName + (preload.progress*100|0) + "% Loaded";
		game.getStage().update();
	}
	/**
	 * @function handleFileLoad
	 * @param event
	 * Stores asset in array once loaded.
	 */
	function handleFileLoad(event) {
		console.log("Finished Loading: " + event.item.id);
		if (!game.assets[BiomeIndex]){
			game.assets[BiomeIndex] = [event];
		}
		else {
			game.assets[BiomeIndex].push(event);
		}
	}
	/**
	 * @function handleComplete
	 * Calls game.progress() once loading is complete.
	 */
	function handleComplete() {
		if (BiomeIndex < 4) {
			if (typeof manifest[0] !== 'undefined' && manifest[0] !== null && manifest[0].length > 0){
				preload.loadManifest(manifest[++BiomeIndex]);
			}
		}
		else {
			
			/** Analytics - how long did it take to load? */
			sendUserTimeInfo("preloading", timestamp);
			
			game.getStage().removeChild(progressText, itemProgressText);
			game.getStage().removeChild(progressText, itemProgressText);
			
			if (game.started === false) {
				eventMoveAroundEarth();
			} 
			else {
				game.progress();
			}   
		}
	}
}
