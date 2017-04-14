/* jshint strict: true */

/**
 *  @function eventSelectManifest
 *  @param purpose
 *  Allows the user to select which manifest they would like
 *  to use or edit and then calls on the preloading to load 
 *  that manifest
 */
function eventSelectManifest(purpose) {	
	"use strict";
	var selectManifestText = new createjs.Text("Select Manifest to " + purpose, "46px Arial", "#000000");
	selectManifestText.x = game.getStage().width/2;
	selectManifestText.y = 110;
	selectManifestText.textAlign = "center";
	selectManifestText.textBaseline = "middle";
	
	var default_button  = new RectButton("Default", "#00e676", game.getStage().width/2 - 150, 150, 300, 50, "#212121", "click", defaultClicked);
	var browse_button   = new RectButton("Browse...", "#ff9100", game.getStage().width/2 - 150, 225, 300, 50, "#212121", "click", browseClicked);
	var upload_button   = new RectButton("Upload", "#f44336", game.getStage().width/2 - 150, 300, 300, 50, "#616161", "click", uploadClicked);
	
	var manifestSelectedText = new createjs.Text("No File Selected", "20px Arial", "#000000");
	manifestSelectedText.x = game.getStage().width/2;
	manifestSelectedText.y = 365;
	manifestSelectedText.textAlign = "center";
	manifestSelectedText.textBaseline = "middle";
	
	var select_manifest_page = new createjs.Container();
	select_manifest_page.addChild(selectManifestText, default_button.container, browse_button.container, upload_button.container, manifestSelectedText);
	game.getStage().addChild(select_manifest_page);
	game.getStage().update();
	
	var fileChosen = false;
	
	/**
	 *  @function defaultClicked
	 *  Handles when the user opts to load the default manifest.
	 */
	function defaultClicked() {
		game.getStage().removeChild(select_manifest_page);
		parseManifest(game.defaultManifest);
	}
	
	/**
	 *  @function browseClicked
	 *  Handles when the user decides to browse files to choose
	 *  a manifest file.
	 */
	function browseClicked() {
		document.getElementById("BrowseButton").click();
		document.getElementById("BrowseButton").onchange = function() {
			manifestSelectedText.text = "Custom File: " + document.getElementById("BrowseButton").value;
			upload_button.outRect.graphics.clear().beginFill("#212121").drawRect(0, 0, 300, 50);
			fileChosen = true;
			game.getStage().update();};
	}
	
	/**
	 *  @function uploadClicked
	 *  Uploads the selected file once one has been selected.
	 */
	function uploadClicked() {
		if (fileChosen) {
			game.getStage().removeChild(select_manifest_page);
			getUploadedManifest();			
		}
	}
	
	/**
	 *  @function getUploadedManifest
	 *  Retrieves the file from the upload stack.
	 */
	function getUploadedManifest() {
		if (!window.FileReader) {
			alert('Your browser is not supported... try a different browser.');
			return false;
		}
		
		var fileInput = $('#BrowseButton');
		
		var input = fileInput.get(0);

		// Create a reader object
		var reader = new FileReader();
		if (input.files.length) {
			var textFile = input.files[0];
			// Read the file
			reader.readAsText(textFile);
			// When it's loaded, process it
			$(reader).on('load', processFile);
		} else {
			alert('Please upload a file before continuing');
		}
		
		/**
		 *  @function processFile
		 *  Processes the input as text
		 */
		function processFile(event) {
			var file = event.target.result, results;
			
			if (file && file.length) {
				parseManifest(file);
			}
		}
	}
}

/**
 *  @function parseManifest
 *  Parses manifest and stores values into array for preloading.
 */
function parseManifest(file) {
	var numImages;
	var numDescriptions;
	var source;
	var imgID;
	var imageManifest = [];
	var index = -1;
	game.workingManifest = file;
	console.log(file);
	var results = file.split("\n");
	//id scale x y
	for (var i=0; i<results.length; i++) {
		if (isNumber(results[i])) {
			console.log("New Biome!!!!!!!!!");
			numImages = results[i];
			index++;
			game.numImages[index] = results[i];
			console.log("NumImages: "+game.numImages[index]);
			i++;
			game.displayedImageNum[index] = results[i];
			console.log("DisplayedImageNum: " +results[i]);
			game.imageSources[index] = [];
			game.imageText[index]    = [];
			game.imageScale[index]   = [];
			game.imageX[index]       = [];
			game.imageY[index]       = [];
			game.otherText[index]    = [];
			game.otherScale[index]   = [];
			game.otherX[index]       = [];
			game.otherY[index]       = [];
			var imageNum = 0;
			while(game.numImages[index]>imageNum) {
				i++;
				source = results[i];
				game.imageSources[index].push(source);
				console.log("Image:" + results[i]);
				i++;
				imgID = results[i];
				console.log("HERE IS THE ID: " + imgID);
				if (imageManifest[index]) {
					imageManifest[index].push({type: createjs.AbstractLoader.IMAGE, src: source, id: imgID});
				}
				else {
					imageManifest[index] = [{type: createjs.AbstractLoader.IMAGE, src: source, id: imgID}];
				}
				game.imageScale[index][imageNum] = results[++i];
				game.imageX[index][imageNum]     = results[++i];
				game.imageY[index][imageNum]     = results[++i];
				numDescriptions = results[++i];
				console.log("numDescriptions = " + numDescriptions);
				while(numDescriptions>0) {
					i++;
					//game.getStage().update();
					if (game.imageText[index][imageNum]) {
						game.imageText[index][imageNum].push(prettifyText(results[i]));
					}
					else {
						game.imageText[index][imageNum] = [prettifyText(results[i])];
					}
					console.log("Description" + results[i]);
					numDescriptions--;
				}
				imageNum++;
			}
			//source = results[++i];
			//console.log("Bkgrd Src: " + source);
			//imageManifest[index].push([{type: createjs.AbstractLoader.IMAGE, src: source}]);
			i++;
			game.otherScale[index][0] = results[++i];
			game.otherX[index][0]     = results[++i];
			game.otherY[index][0]     = results[++i];
			i++;
			console.log("NumTempDescriptions: " + results[i]);
			var numTempDescriptions = results[i];
			game.otherText[index][0] = [];
			while (numTempDescriptions>0) {
				i++;
				game.otherText[index][0].push(prettifyText(results[i]));
				numTempDescriptions--;
			}
			i++;
			game.otherScale[index][1] = results[++i];
			game.otherX[index][1]     = results[++i];
			game.otherY[index][1]     = results[++i];
			i++;
			var numPrecDescriptions = results[i];
			game.otherText[index][1] = [];
			while (numPrecDescriptions>0) {
				i++;
				game.otherText[index][1].push(prettifyText(results[i]));
				numPrecDescriptions--;
			}
		}
	}
	eventPreloadAssets(imageManifest);
}

/**
 *  @function prettifyText
 *  @param inputText
 *  Rewrites text input from manifest to be multilined.
 */
function prettifyText(inputText) {
	"use strict";
	var checkpoint = 44;
	var checking;
	var temp;
	while (checkpoint < inputText.length) {
		checking = checkpoint;
		while (inputText.charAt(checking) != " ") {
			checking--;
			if (checking == checkpoint - 44) {
				alert("Text issue encountered!!!");
				return inputText;
			}
		}
		if (inputText.length > checking) {
			temp = inputText.substring(0,checking) + "\n" + inputText.substring(checking+1,inputText.length+1);
			inputText = temp;
		}
		checkpoint += 45;
	}
	return "   " + inputText;
}

/**
	 *  @function isNumber
	 *  @param n
	 *  Checks if a value is a number
	 */
	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}














