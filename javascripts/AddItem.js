/**
 *  @function eventAddItem
 *  Section to add items to the game.
 */
function eventAddItem() {
	var options_page = new createjs.Container();
	var fileText;
	var manifestBlob;
	
	var preview_button = new RectButton("Preview", "#00e676", game.getStage().width/2 - 380, 295, 300, 50, "#212121", "click", addPreview);
    var cancel_button = new RectButton("Cancel", "#f44336", game.getStage().width/2 - 380, 370, 300, 50, "#212121", "click", addCancel);
	
	var imagePreviewBoxOutline = new createjs.Shape();
	imagePreviewBoxOutline.graphics.beginFill("#000000").drawRect(game.getStage().width-370, 80, 210, 210);
	
	var imagePreviewBox = new createjs.Shape();
	imagePreviewBox.graphics.beginFill("#ffffff").drawRect(game.getStage().width-365, 85, 200, 200);
	
	Description.style.display     = 'inline';
    ImageSource.style.display     = 'inline';
	$("#ImageSource").on('change keyup paste', function() {
		console.log("Changes made to img source text");
		preview_button.txt.text = "Preview";
		preview_button.container.removeAllEventListeners();
		preview_button.container.addEventListener("click", addPreview);
		game.getStage().update();
	});
	AltBrowseButton.style.display = 'inline';
	document.getElementById("BrowseButton").value = "";
	//document.getElementById("BrowseButton").onchange = testing(this);
	document.getElementById("BrowseButton").onchange = function() {
		console.log("Changes made via image browsing");
		preview_button.txt.text = "Preview";
		preview_button.container.removeAllEventListeners();
		preview_button.container.addEventListener("click", addPreview);
		game.getStage().update();
	};
	
	function testing(input) {
		console.log("Changes made via image browsing");
		preview_button.txt.text = "Preview";
		preview_button.container.removeAllEventListeners();
		preview_button.container.addEventListener("click", addPreview);
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			/*reader.onload = function (e) {
				$('#blah')
					.attr('src', e.target.result)
					.width(150)
					.height(200);
			};

			reader.readAsDataURL(input.files[0]);*/
		}
		game.getStage().update();
	}
    
    options_page.addChild(preview_button.container, cancel_button.container, imagePreviewBoxOutline, imagePreviewBox);
	game.getStage().addChild(options_page);
	game.getStage().update();
	
	function addPreview() {
		if (!window.FileReader) {
			alert('Your browser is not supported');
			return false;
		}
		
		var fileInput = $('#BrowseButton');
		
		var input = fileInput.get(0);

		// Create a reader object
		var reader = new FileReader();
		
		reader.onloadend = function (event) {
			var previewImage = new createjs.Bitmap(event.target.result);
			var bounds = previewImage.getBounds();
			previewImage.x = game.getStage().width-325;
			previewImage.y = 125;
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