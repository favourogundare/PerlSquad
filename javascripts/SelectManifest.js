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
			alert('Your browser is not supported');
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
	
	/**
	 *  @function isNumber
	 *  @param n
	 *  Checks if a value is a number
	 */
	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
	
	/**
	 *  @function parseManifest
	 *  Parses manifest and stores values into array for preloading.
	 */
	function parseManifest(file) {
		var numImages;
		var numDescriptions;
		var source;
		var imageManifest = [];
		var index = -1;
		game.workingManifest = file;
		console.log(file);
		var results = file.split("\n");
		for (var i=0; i<results.length; i++) {
			if (isNumber(results[i])) {
				console.log("New Biome!!!!!!!!!");
				numImages = results[i];
				console.log("NumImages: "+numImages);
				index++;
				i++;
				game.displayedImageNum[index] = results[i];
				console.log("DisplayedImageNum: " +results[i]);
				game.imageText[index] = [];
				var imageNum = 0;
				while(numImages>imageNum) {
					i++;
					source = results[i];
					if (imageManifest[index]) {
						imageManifest[index].push({type: createjs.AbstractLoader.IMAGE, src: source});
					}
					else {
						imageManifest[index] = [{type: createjs.AbstractLoader.IMAGE, src: source}];
					}
					console.log("Image:" + results[i]);
					numDescriptions = results[++i];
					console.log("numDescriptions = " + numDescriptions);
					while(numDescriptions>0) {
						i++;
						//game.getStage().update();
						if (game.imageText[index][imageNum]) {
							game.imageText[index][imageNum].push(prettifyText(results[i]));
						}
						else {
							game.imageText[index][imageNum] = [results[i]];
						}
						console.log("Description" + results[i]);
						numDescriptions--;
					}
					imageNum++;
				}
				i++;
				console.log("NumPrecDescriptions: " + results[i]);
				var numPrecDescriptions = results[i];
				while (numPrecDescriptions>0) {
					i++;
					if (game.imageText[index][imageNum]) {
						game.imageText[index][imageNum].push(prettifyText(results[i]));
					}
					else {
						game.imageText[index][imageNum] = [results[i]];
					}
					numPrecDescriptions--;
				}
				imageNum++;
				i++;
				var numTempDescriptions = results[i];
				while (numTempDescriptions>0) {
					i++;
					if (game.imageText[index][imageNum]) {
						game.imageText[index][imageNum].push(prettifyText(results[i]));
					}
					else {
						game.imageText[index][imageNum] = [results[i]];
					}
					numTempDescriptions--;
				}
			}
		}
		eventPreloadAssets(imageManifest);
	}
}

/**
 *  @function prettifyText
 *  @param inputText
 *  Rewrites text input from manifest to be multilined.
 */
function prettifyText(inputText) {
	"use strict";
	var checkpoint = 39;
	var checking;
	var temp;
	while (checkpoint < inputText.length) {
		checking = checkpoint;
		while (inputText.charAt(checking) != " ") {
			checking--;
			if (checking == checkpoint - 39) {
				alert("Text issue encountered!!!");
				return inputText;
			}
		}
		if (inputText.length > checking) {
			temp = inputText.substring(0,checking) + "\n" + inputText.substring(checking+1,inputText.length+1);
			inputText = temp;
		}
		checkpoint += 40;
	}
	return inputText;
}















