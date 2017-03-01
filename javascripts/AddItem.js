/**
 *  @function eventAddItem
 *  Section to add items to the game.
 */
function eventAddItem() {
	var options_page = new createjs.Container();
	var fileText;
	var manifestBlob;
	var method;
	var previewImage;
	
	var preview_button = new RectButton("Preview", "#00e676", game.getStage().width/2 - 380, 295, 300, 50, "#212121", "click", addPreview);
    var cancel_button = new RectButton("Cancel", "#f44336", game.getStage().width/2 - 380, 370, 300, 50, "#212121", "click", addCancel);
	
	var PreviewBoxText = new createjs.Text("Image Preview Will\nBe Displayed Below", "32px Arial", "#000000");
    PreviewBoxText.textAlign    = "center";
	PreviewBoxText.textBaseline = "middle";
    PreviewBoxText.x = game.getStage().width-265;
    PreviewBoxText.y = 50;
	
	var imagePreviewBoxOutline = new createjs.Shape();
	imagePreviewBoxOutline.graphics.beginFill("#000000").drawRect(game.getStage().width-370, 120, 210, 210);
	
	var imagePreviewBox = new createjs.Shape();
	imagePreviewBox.graphics.beginFill("#ffffff").drawRect(game.getStage().width-365, 125, 200, 200);
	
	Description.style.display     = 'inline';
    ImageSource.style.display     = 'inline';
	$("#ImageSource").on('change keyup paste', function() {
		method = "Source";
		console.log("Changes made to img source text");
		options_page.removeChild(previewImage);
		preview_button.txt.text = "Preview";
		preview_button.container.removeAllEventListeners();
		preview_button.container.addEventListener("click", addPreview);
		game.getStage().update();
	});
	AltBrowseButton.style.display = 'inline';
	document.getElementById("BrowseButton").value = "";
	document.getElementById("BrowseButton").onchange = function() {
		method = "Browse";
		console.log("Changes made via image browsing");
		options_page.removeChild(previewImage);
		preview_button.txt.text = "Preview";
		preview_button.container.removeAllEventListeners();
		preview_button.container.addEventListener("click", addPreview);
		game.getStage().update();
	};
    
    options_page.addChild(preview_button.container, cancel_button.container, PreviewBoxText, imagePreviewBoxOutline, imagePreviewBox);
	game.getStage().addChild(options_page);
	game.getStage().update();
	
	function addPreview() {
		if (method === "Source") {
			var ImgTarget;
			var ImgSrc = document.getElementById("ImageSource").value;
			if (ImgSrc.indexOf(':') > -1) {
				var tempString = "file:///" + ImgSrc;
				ImgSrc = tempString;
			}
			console.log("Source");
			var preload = new createjs.LoadQueue(false);
			preload.on("error", handleError);
			preload.on("fileerror", handleFileError);
			preload.on("fileload", handleLoad);
			preload.on("complete", handleLoaded);
			preload.loadFile({type: createjs.AbstractLoader.IMAGE, src: ImgSrc, id: "map"});
			
			function handleError(event) {
				console.log("Error!",event.text);
			}
			function handleFileError() {
				console.log("File error");
			}
			function handleLoad(event) {
				console.log("Finished Loading: " + event.item.id);
				ImgTarget = event;
			}
			function handleLoaded() {
				previewImage = new createjs.Bitmap(ImgTarget.result);
				var bounds;
				while(bounds === undefined || bounds === null) {
					bounds = previewImage.getBounds();
				}
				previewImage.x = game.getStage().width-325;
				previewImage.y = 165;
				maxBound = Math.max(bounds.height, bounds.width);
				console.log(maxBound);
				if (maxBound > 120) {
					previewImage.scaleX = previewImage.scaleBackX = 120/maxBound;
					previewImage.scaleY = previewImage.scaleBackY = 120/maxBound;	
					console.log("Resized image");
				}
				options_page.addChild(previewImage);
				preview_button.txt.text = "Done";
				preview_button.container.removeAllEventListeners();
				preview_button.container.addEventListener("click", addDone);
				game.getStage().update();
			}
		}
		else {
			console.log("Browse");
			if (!window.FileReader) {
				alert('Your browser is not supported');
				return false;
			}
			
			var fileInput = $('#BrowseButton');
			
			var input = fileInput.get(0);

			// Create a reader object
			var reader = new FileReader();
			
			reader.onloadend = function (event) {
				previewImage = new createjs.Bitmap(event.target.result);
				var bounds;
				while(bounds === undefined || bounds === null) {
					bounds = previewImage.getBounds();
				}
				previewImage.x = game.getStage().width-325;
				previewImage.y = 165;
				maxBound = Math.max(bounds.height, bounds.width);
				console.log(maxBound);
				if (maxBound > 120) {
					previewImage.scaleX = previewImage.scaleBackX = 120/maxBound;
					previewImage.scaleY = previewImage.scaleBackY = 120/maxBound;	
					console.log("Resized image");
				}	
				options_page.addChild(previewImage);
				game.getStage().update();
				//bgrnd.sourceRect = new createjs.Rectangle(0,0,300,300);
			};
			reader.readAsDataURL(input.files[0]);
			
			preview_button.txt.text = "Done";
			preview_button.container.removeAllEventListeners();
			preview_button.container.addEventListener("click", addDone);
			game.getStage().update();

			//reader.readAsDataURL(input.files[0]);
		}
		
		/*preview_button.txt.text = "Done";
		preview_button.container.removeAllEventListeners();
		preview_button.container.addEventListener("click", addDone);
		
		game.getStage().update();*/
	}
	
	function addDone() {
		console.log(Description.value);
		console.log(ImageSource.value);
		//game.modified = true;
		readTextFile("javascripts/testread.txt");
		manifestBlob = new Blob([fileText], {type: "text/plain;charset=utf-8"});
		saveAs(manifestBlob, "Manifest.js");
		Description.value = '';
		ImageSource.value = '';
		Description.style.display = 'none';
		ImageSource.style.display = 'none';
		options_page.removeAllChildren();
		eventOptionsMenu();
	}
	
	function addCancel() {
		Description.value = '';
		ImageSource.value = '';
		Description.style.display     = 'none';
		ImageSource.style.display     = 'none';
		AltBrowseButton.style.display = 'none';
		options_page.removeAllChildren();
		eventOptionsMenu();
	}
}