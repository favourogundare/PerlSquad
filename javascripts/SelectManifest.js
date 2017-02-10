function eventSelectManifest(purpose, checkStart) {	
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
	
	function defaultClicked() {
		game.getStage().removeChild(select_manifest_page);
		parseManifest(game.defaultManifest);
	}
	
	function browseClicked() {
		document.getElementById("files").click();
		document.getElementById("files").onchange = function() {
			manifestSelectedText.text = "Custom File: " + document.getElementById("files").value;
			upload_button.outRect.graphics.clear().beginFill("#212121").drawRect(0, 0, 300, 50);
			fileChosen = true;
			game.getStage().update();};
	}
	
	function uploadClicked() {
		if (fileChosen) {
			game.getStage().removeChild(select_manifest_page);
			getUploadedManifest();
			function getUploadedManifest() {
				if (!window.FileReader) {
					alert('Your browser is not supported');
					return false;
				}
				
				var fileInput = $('#files');
				
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
				function processFile(event) {
					var file = event.target.result, results;
					if (file && file.length) {
						parseManifest(file);
					}
				}
			}
		}
	}
	
	function parseManifest(file) {
		var numImages;
		var numDescriptions;
		var source;
		var imageManifest = [];
		var index = -1;
		game.imageText = [];
		results = file.split("\n");
		for (var i=0; i<results.length; i++) {
			if (isNumber(results[i])) {
				console.log("New Biome!!!!!!!!!");
				index++;
				numImages = results[i];
				game.imageText[index] = [];
				while(numImages>0) {
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
						imageNum = i;
						i++;
						game.getStage().update();
						if (game.imageText[index][imageNum]) {
							game.imageText[index][imageNum].push(prettifyText(results[i]));
						}
						else {
							game.imageText[index][imageNum] = [results[i]];
						}
						console.log("Description" + results[i])
						numDescriptions--;
					}
					numImages--;
				}
			}
		}
		eventPreloadAssets(imageManifest, checkStart);
	}
	
	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
}

function prettifyText(inputText) {
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















