/**currcurr
 *  @function eventEditGame
 *  Section to add/remove images from the
 *  game and/or manifest. Also allows the
 *  user to edit the images in the game.
 */
function eventEditGame() {
	"use strict";
	console.log("editing");
	var KEYCODE_B     = 66;
	var KEYCODE_D     = 68;
	var KEYCODE_H     = 72;
	var KEYCODE_I     = 73;
	var KEYCODE_M     = 77;
	var KEYCODE_R     = 82;
	var KEYCODE_S     = 83;
	var KEYCODE_T     = 84;
	var KEYCODE_X     = 88;
	var KEYCODE_UP    = 38;
	var KEYCODE_DOWN  = 40;
	var KEYCODE_LEFT  = 37;
	var KEYCODE_RIGHT = 39;
	var currentSelection;
	var HelpDisplayed     = false;
    var CBMDisplayed      = false;
	var BiomeSectionSplit = false;
    var editInfoBoxOpen   = false;
	var moveModeOn        = false;
	var scaleModeOn       = false;
    var editInfoBox = document.getElementById("EditInfoDiv");
	var CBMBkgrd    = document.getElementById("CheckboxMenuBkgrd");
	var CBM         = document.getElementById("CheckboxMenu");
	var CBMAdd      = document.getElementById("CheckboxMenuAdd");
	var CBMDelete   = document.getElementById("CheckboxMenuDelete");
	var dropzone    = document.getElementById("main");
	var HelpContainer;
	var ManifestBiomeSection;
	var ManifestBiomeSectionPreSplit  = "";
	var ManifestBiomeSectionPostSplit = "";
	var ImagesOnScreen    = [];
	var ImagesNotOnScreen = [];
	var TextOnScreen      = [];
	var InstructionText, InstructionTextInner;
	var prec, temp;
	var bgrnd, precip, temperature, infoOK;
	var back     = new Image();
	var infoText = new createjs.Text();
	var infoTextInner;
	var infoPage = new createjs.Container();
	var numDescriptions, numImages;
	var bounds, maxBound;
	
	game.getStage().enableMouseOver(10);
	
	document.onkeydown = handleKeyDown;
	
	CBMAdd.addEventListener('click', CBMAddClicked);
	
	/**
	 *  @function CBMAddClicked
	 *  Handler function for clicking the add 
	 *  button on the checkbox menu. Adds all 
	 *  checked images to the stage unless they 
	 *  are already in the stage.
	 */
	function CBMAddClicked() {
		console.log("ADD CLICKED");
		var AddList = [];
		$("#CheckboxMenu").find("input[type=checkbox]:checked").each(function() {
			if($(this) === null) {
				alert("No checkboxes selected...");
			}
			if ( $.inArray($(this).parent()[0].innerText, ImagesOnScreen) === -1 ) {
				AddList.push($(this).parent()[0].innerText);
			}
			else {
				alert("The image for " + $(this).parent()[0].innerText + " is already on the screen...");
			}
		});
		console.log(AddList);
		if (AddList.length + ImagesOnScreen.length < 11) {
			for (var j = 0; j < AddList.length; j++) {
				AddToScreen(game.currentBiome.num-1, GetAssetIndexByID(AddList[j]));
				var toRemove = $.inArray(AddList[j], ImagesNotOnScreen);
				ImagesNotOnScreen.splice(toRemove, 1);
			}
			game.getStage().update();
		} else {
			alert("Cannot add that many images to the screen. At most 10 can be displayed...");
		}
		$(".checkbox").prop('checked', false);
	}
	CBMDelete.addEventListener('click', CBMDeleteClicked);
	
	/**
	 *  @function CBMDeleteClicked
	 *  Handler function for clicking the delete
	 *  button on the checkbox menu. Asks the user to 
	 *  confirm whether or not they wish to permanently 
	 *  delete the images from the manifest. If confirmed, 
	 *  removes all checked images from the ImagesOnScreen/
	 *  ImagesNotOnScreen arrays as well as the checkbox menu.
	 */
	function CBMDeleteClicked() {
		console.log("DELETE CLICKED");
		var DelConfirm = confirm("Are you sure you want to permanently delete these from the manifest?");
		if (DelConfirm) {
			var DeleteList = [];
			$("#CheckboxMenu").find("input[type=checkbox]:checked").each(function() {
				DeleteList.push($(this).parent()[0].innerText);
			});
			console.log(DeleteList);
			console.log(ImagesOnScreen);
			var toRemoveFromScreen = 0;
			for (var j = 0; j < DeleteList.length; j++) {
				if ($.inArray(DeleteList[j], ImagesOnScreen) > -1 ) {
					toRemoveFromScreen++;
				}
			}
			if (ImagesOnScreen.length - toRemoveFromScreen > 1) {
				for (var j = 0; j < DeleteList.length; j++) {
					var toRemove = $.inArray(DeleteList[j], ImagesOnScreen);
					console.log(toRemove);
					if (toRemove > -1 ) {
						infoPage.removeChild(infoPage.getChildByName(DeleteList[j]));
						ImagesOnScreen.splice(toRemove, 1);
					}
					else {
						ImagesNotOnScreen.splice($.inArray(DeleteList[j], ImagesNotOnScreen), 1);
					}
				}
				game.getStage().update();
				console.log($("#CheckboxMenu").find("input[type=checkbox]:checked"));
				$("#CheckboxMenu").find("input[type=checkbox]:checked").parent().remove();
			} else {
				alert("Cannot delete images... There must be at least two animals on the screen.");
				$(".checkbox").prop('checked', false);
			}
		}
	}
	
	function createFormData(image) {
		var formImage = new FormData();
		formImage.append('subDir', game.currentBiome.name);
		formImage.append('userImage', image);
		
		uploadFormData(formImage);
		function uploadFormData(formData) {
			$.ajax({
				url: "upload_image.php",
				type: "POST",
				data: formData,
				contentType: false,
				cache: false,
				processData: false,
				success: function(data) {
					console.log("Success: " + data);
				}
			});
		}
	}
	
	function cancel(e) {
		e = e || window.event; // get window.event if e argument missing (in IE)
		if (e.preventDefault) { e.preventDefault(); }
		return false;
	}
	
	// Tells the browser that we *can* drop on this target
	dropzone.addEventListener('dragover', cancel);
	dropzone.addEventListener('dragenter', cancel);
	dropzone.addEventListener('drop', HandleDrop);
	function HandleDrop(e) {
		e = e || window.event; // get window.event if e argument missing (in IE)   
		if (e.preventDefault) { console.log("prevented"); e.preventDefault(); } // stops the browser from redirecting off to the image.
		if (moveModeOn) {
			toggleOffMoveMode();
		}
		if (scaleModeOn) {
			toggleOffScaleMode();
		}
		if (editInfoBoxOpen) {
			if (confirm("Would you like to save changes to the text?")) {
				submitChange();
			}
			if(editInfoBoxOpen) {
				closeEditInfoBox();
			}
		}
		if (HelpDisplayed) {
			toggleOffHelp();
		}
		document.onkeydown = null;
		console.log(e);
		
		var files = e.dataTransfer.files;
		/** Quick fix to avoid race conditions. Could be fixed better with more time. */
		if (files.length > 1) {
			alert("Please only upload one image at a time");
		}
		else if (ImagesOnScreen.length + files.length < 11) {
			for (var i=0; i<files.length; i++) {
				var file = files[i];
				console.log("FILEEEE: "+ file);
				createFormData(file);
				
				if (!file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
					alert('Woah there! Images uploaded must be in\none of the following formats:\n{.jpg, .jpeg, .png, .gif}');
				}
				else if (file.size < 2000000) {
					var reader = new FileReader();
					var progressText = new createjs.Text("", "64px Arial", "#ffffff");
						progressText.x = game.getStage().width/2;
						progressText.y = game.getStage().height/2;
						progressText.textAlign = "center";
						progressText.textBaseline = "middle";
					game.getStage().addChild(progressText);
					reader.addEventListener('progress', function(prog_e) {
						prog_e = prog_e || window.event; // get window.event if e argument missing (in IE)
						progressText.text = "Image " + (prog_e.loaded / prog_e.total * 100|0) + "% Loaded";
						game.getStage().update();
					});
					
					reader.addEventListener('loadend', function (event) {
						event = event || window.event; // get window.event if e argument missing (in IE)
						game.getStage().removeChild(progressText);
						var imgX = e.clientX;
						var imgY = e.clientY;
						var previewImage = new Image();
						previewImage.src = event.target.result;
						console.log(event.target);
						previewImage.onload = function() {
							console.log(previewImage);
							var previewBtmp = new createjs.Bitmap(previewImage);
							previewBtmp.x = imgX;
							previewBtmp.y = imgY;
							var bounds = previewBtmp.getBounds();
							var maxBound = Math.max(bounds.height, bounds.width);
							var imgScale = maxBound;
							console.log(maxBound);
							if (maxBound > 120) {
								previewBtmp.scaleX = previewBtmp.scaleY = 120/maxBound;
								imgScale = previewBtmp.scaleX*maxBound;
								console.log("Resized image");
							}
							previewBtmp.scaleBackX = previewBtmp.scaleBackY = previewBtmp.scaleX;
							infoPage.addChild(previewBtmp);
							game.getStage().update();
							var imgID = "";
							while (imgID === "") {
								imgID = prompt("Please enter the id for your image.\nIf uploading more than one, enter the ids for images left to right and top to bottom.\nSuggestion: The id should describe what the image is.\nEx: A polar bear image might have the id PolarBear", "");
							}
							var imgText = "";
							while (imgText === "") {
								imgText = prompt("Please enter the text for your image.\nIf uploading more than one, enter the ids for images left to right and top to bottom.\nSuggestion: The id should describe something about the image.", "");
							}
							ImagesOnScreen.push(imgID);
							CBMAppend(imgID);
							previewBtmp.name = imgID;
							game.imageSources[game.currentBiome.num-1].push("Pictures/Animals/"+game.currentBiome.name+"/"+file.name);
							game.imageScale[game.currentBiome.num-1].push(imgScale);
							game.imageX[game.currentBiome.num-1].push(imgX);
							game.imageY[game.currentBiome.num-1].push(imgY);
							game.imageText[game.currentBiome.num-1][game.imageScale[game.currentBiome.num-1].length-1] = [imgText];
							game.assets[game.currentBiome.num-1][game.imageScale[game.currentBiome.num-1].length-1] = { result: previewImage, item: {id: imgID} };
							SetSelectEffects(previewBtmp, game.currentBiome.num-1, game.imageScale[game.currentBiome.num-1].length-1);
						};
					});
					reader.readAsDataURL(file);
				}
				else {
					alert("Woah there! File size limit is 2MB...\nTry uploading a smaller file.");
				}
			}
		} else {
			alert("Cannot add that many images to the screen. At most 10 can be displayed...");
		}
		document.onkeydown = handleKeyDown;
		return false;
	}
	
	console.log ("NOT BROKEN");
	var HelpText = new createjs.Text();
		HelpText.textAlign    = "left";
		HelpText.textBaseline = "middle";
		HelpText.x = game.getStage().width/2 -182.5;
		HelpText.y = game.getStage().height/3-15;
		HelpText.font = "25px Arial";
		HelpText.color = "black";
	var HelpTextInner = HelpText.clone();
		HelpTextInner.color = "white";
		HelpTextInner.shadow = undefined;
		HelpTextInner.outline = false;
		HelpText.shadow = new createjs.Shadow("#000", -3, -3, 25);
		HelpText.outline = 3;
	ResetHelpText();
	
	GetManifestBiomeSection();
	
	prec = new Image();
	prec.src = "Pictures/icons/precipitation.png";
	prec.onload = function() {
		temp = new Image();
		temp.src = "Pictures/icons/temperature.png";
		temp.onload = SetInfoBG;
	};
	
	/**
	 *  @function GetManifestBiomeSection
	 *  Splices the section of manifest for
	 *  the currently selected biome.
	 */
	function GetManifestBiomeSection() {
		var lines = game.workingManifest.split("\n");
		var BiomeSectionNum = 0;
		var OuterSection;
		for (var i=0; i<lines.length; i++) {
			if (isNumber(lines[i])) {
				console.log("New Biome!!!!!!!!!");
				BiomeSectionNum++;
				/** if not the biome section we're looking for */
				if (BiomeSectionNum != game.currentBiome.num) {
					if (BiomeSectionNum < game.currentBiome.num) {
						OuterSection = ManifestBiomeSectionPreSplit;
					}
					else {
						OuterSection = ManifestBiomeSectionPostSplit + "\n";
					}
					
					OuterSection = OuterSection.concat(lines[i]);
					numImages = lines[i];
					console.log("NumImages: "+numImages);
					OuterSection = OuterSection.concat("\n"+lines[++i]);
					while(numImages>0) {
						for (var j=0; j<5; j++) {
							OuterSection = OuterSection.concat("\n"+lines[++i]);
						}
						OuterSection = OuterSection.concat("\n"+lines[++i]);
						numDescriptions = lines[i];
						console.log("numDescriptions = " + numDescriptions);
						while(numDescriptions>0) {
							OuterSection = OuterSection.concat("\n"+lines[++i]);
							numDescriptions--;
						}
						numImages--;
					}
					for (var j=0; j<5; j++) {
						OuterSection = OuterSection.concat("\n"+lines[++i]);
					}
					var numPrecDescriptions = lines[i];
					while (numPrecDescriptions>0) {
						OuterSection = OuterSection.concat("\n"+lines[++i]);
						numPrecDescriptions--;
					}
					for(var j=0; j<5; j++) {
						OuterSection = OuterSection.concat("\n"+lines[++i]);
					}
					var numTempDescriptions = lines[i];
					while (numTempDescriptions>0) {
						OuterSection = OuterSection.concat("\n"+lines[++i]);
						numTempDescriptions--;
					}
					if (BiomeSectionNum < game.currentBiome.num) {
						ManifestBiomeSectionPreSplit = OuterSection + "\n";
					}
					else {
						ManifestBiomeSectionPostSplit = OuterSection;
					}
				}
				else {
					ManifestBiomeSection = lines[i];
					numImages = lines[i];
					console.log("NumImages: "+numImages);
					ManifestBiomeSection = ManifestBiomeSection.concat("\n"+lines[++i]);
					
					while(numImages>0) {
						for (var j=0; j<5; j++) {
							ManifestBiomeSection = ManifestBiomeSection.concat("\n"+lines[++i]);
						}
						ManifestBiomeSection = ManifestBiomeSection.concat("\n"+lines[++i]);
						numDescriptions = lines[i];
						console.log("numDescriptions = " + numDescriptions);
						while(numDescriptions>0) {
							ManifestBiomeSection = ManifestBiomeSection.concat("\n"+lines[++i]);
							numDescriptions--;
						}
						numImages--;
					}
					for (var j=0; j<5; j++) {
						ManifestBiomeSection = ManifestBiomeSection.concat("\n"+lines[++i]);
					}
					numPrecDescriptions = lines[i];
					while (numPrecDescriptions>0) {
						ManifestBiomeSection = ManifestBiomeSection.concat("\n"+lines[++i]);
						numPrecDescriptions--;
					}
					for(var j=0; j<5; j++) {
						ManifestBiomeSection = ManifestBiomeSection.concat("\n"+lines[++i]);
					}
					numTempDescriptions = lines[i];
					while (numTempDescriptions>0) {
						ManifestBiomeSection = ManifestBiomeSection.concat("\n"+lines[++i]);
						numTempDescriptions--;
					}
				}
			}
		}
		console.log("HERE'S THE MANIFEST BIOME SECTION:");
		console.log(ManifestBiomeSection);
	}
	
	/**
	 *  @function ReformManifest
	 *  Pieces manifest back together when-
	 *  ever done editing the currently
	 *  selected biome section.
	 */
	function ReformManifest() {
		var index = game.currentBiome.num-1;
		var reformedBiome = ImagesOnScreen.length+ImagesNotOnScreen.length;
		reformedBiome += "\n" + ImagesOnScreen.length;
		for (var j=0; j<ImagesOnScreen.length;j++){
			var i = GetAssetIndexByID(ImagesOnScreen[j]);
			reformedBiome += "\n" + game.imageSources[index][i]
						   + "\n" + ImagesOnScreen[j]
						   + "\n" + game.imageScale[index][i]
						   + "\n" + game.imageX[index][i]
						   + "\n" + game.imageY[index][i]
						   + "\n" + game.imageText[index][i].length;
			for (var k=0; k<game.imageText[index][i].length; k++) {
				reformedBiome += "\n" + SimplifyText(game.imageText[index][i][k]);
			}
		}
		for (var j=0; j<ImagesNotOnScreen.length;j++){
			var i = GetAssetIndexByID(ImagesNotOnScreen[j]);
			reformedBiome += "\n" + game.imageSources[index][i]
						   + "\n" + ImagesNotOnScreen[j]
						   + "\n" + game.imageScale[index][i]
						   + "\n" + game.imageX[index][i]
						   + "\n" + game.imageY[index][i]
						   + "\n" + game.imageText[index][i].length;
			for (var k=0; k<game.imageText[index][i].length; k++) {
				reformedBiome += "\n" + SimplifyText(game.imageText[index][i][k]);
			}
		}
		reformedBiome += "\ntemperature"
					   + "\n" + game.otherScale[index][0]
					   + "\n" + game.otherX[index][0]
					   + "\n" + game.otherY[index][0]
					   + "\n" + game.otherText[index][0].length;
		for (var k=0; k<game.otherText[index][0].length; k++) {
			reformedBiome += "\n" + SimplifyText(game.otherText[index][0][k]);
		}
		reformedBiome += "\nprecip"
					   + "\n" + game.otherScale[index][1]
					   + "\n" + game.otherX[index][1]
					   + "\n" + game.otherY[index][1]
					   + "\n" + game.otherText[index][1].length;
		for (var k=0; k<game.otherText[index][1].length; k++) {
			reformedBiome += "\n" + SimplifyText(game.otherText[index][1][k]);
		}
		
		return ManifestBiomeSectionPreSplit + reformedBiome + ManifestBiomeSectionPostSplit;
	}
	
	/**
	 *  @function ResetHelpText
	 *  Sets/Resets the Standard Help
	 *  Text for the editing stage.
	 */
	function ResetHelpText() {
		HelpText.text = HelpTextInner.text =
		"B: ChangeBiome\n"+
		"D: Delete Image\n"+
		"H: Toggle Help Screen\n"+
		"I: Toggle Image List\n"+
		"M: Toggle Image Moving\n"+
		"S: Toggle Image Scaling\n"+
		"T: Toggle Text Editing\n"+
		"X: Exit Editing Menu\n"+
		"Drag images into biome to upload";
		
	}
	
	/**
	 *  @function SetImg
	 *  Places the image on the screen and
	 *  scales it based upon the arguments
	 *  provided.
	 *  @param img
	 *  @param imgScale
	 *  @param imgX
	 *  @param imgY
	 */
	function SetImg(img, imgScale, imgX, imgY) {
		var bounds = img.getBounds();
		var maxBound = Math.max(bounds.height, bounds.width);
		img.scaleX = img.scaleBackX = imgScale/maxBound;
		img.scaleY = img.scaleBackY = imgScale/maxBound;
		img.x = imgX;
		img.y = imgY;
	}
	
	/**
	 *  @function SetSelectEffects
	 *  Handles what happens when an image is
	 *  selected. Displays the text for the
	 *  given image and sets it as the currently
	 *  selected image for the editing stage.
	 *  @param img
	 *  @param index
	 *  @param i
	 */
	function SetSelectEffects(IMG, index, i) {
		IMG.addEventListener("mousedown", function (event) {
			event = event || window.event; // get window.event if e argument missing (in IE)
			console.log("SBX: "+IMG.scaleBackX);
			IMG.scaleX = IMG.scaleBackX * 1.1;
			IMG.scaleY = IMG.scaleBackY * 1.1;
			
			if (!moveModeOn && !scaleModeOn) {
				console.log(event.currentTarget);
				currentSelection = event.currentTarget;
				if (IMG.name !== 'precip' && IMG.name !== 'temperature') {
					infoText.text = game.imageText[index][i][0];
				}
				else {
					infoText.text = game.otherText[index][i][0];
				}
				infoText.font = "28px Arial";
				infoText.color = "black";
				infoText.x = 289;
				infoText.y = 50;
				infoTextInner = infoText.clone();
				infoTextInner.color = "white";
				infoTextInner.shadow = undefined;
				infoTextInner.outline = false;
				infoText.shadow = new createjs.Shadow("#000", -3, -3, 25);
				infoText.outline = 3;
				infoPage.addChild(infoText, infoTextInner);
			}
			game.getStage().update();
		});
		
		IMG.addEventListener("pressup", function (event) {
			event = event || window.event; // get window.event if e argument missing (in IE)
			if (moveModeOn) {
				alert("Move mode on... Press M to toggle off before switching images.");
			}
			if (scaleModeOn){
				alert("Scale mode on... Press S to toggle off before switching images.");
			}
			IMG.scaleX = IMG.scaleBackX;
			IMG.scaleY = IMG.scaleBackY;
			infoPage.removeChild(infoText, infoTextInner);
			game.getStage().update();
		});
	}
	
	/**
	 *  @function CBMAppend
	 *  Appends an option to the end of the 
	 *  Checkbox Menu List.
	 *  @param CB_ID
	 */
	function CBMAppend(CB_ID) {
		var $newField = $('<div/>', { id: CB_ID, style: "overflow: hidden" });
		var $InputText = $('<label/>', { style: "display: inline-block" }).html(CB_ID).prepend($('<input/>').attr({ class: 'checkbox', type: 'checkbox'}));
		$newField.append($InputText);
		$("#CheckboxMenu").append($newField);
	}
	
	/**
	 *  @function AddToScreen
	 *  Adds images to the screen based on
	 *  their settings in the manifest.
	 *  @param index
	 *  @param i
	 */
	function AddToScreen(index, i) {
		console.log(game.assets[index][i]);
		var newImage = new createjs.Bitmap(game.assets[index][i].result);
		newImage.name = game.assets[index][i].item.id;
		infoPage.addChild(newImage);
		SetImg(newImage, game.imageScale[index][i], game.imageX[index][i], game.imageY[index][i]);
		ImagesOnScreen.push(game.assets[index][i].item.id);
		TextOnScreen.push(game.imageText[index][i][0]);
		SetSelectEffects(newImage, index, i);
	}
	
	/**
	 *  @function SetBiomeInfo
	 *  Sets everything in the editing stage for 
	 *  the chosen biome once the temperature and 
	 *  precipitation images have been loaded.
	 */
	function SetBiomeInfo() {
		bgrnd = new createjs.Bitmap(back);
		infoPage.addChild(bgrnd);
		var index = game.currentBiome.num-1;
		for (var i=0; i<game.displayedImageNum[index]; i++) {
			AddToScreen (game.currentBiome.num-1, i);
			CBMAppend(game.assets[index][i].item.id);
		}
		for (var i=game.displayedImageNum[index]; i<game.numImages[index]; i++) {
			CBMAppend(game.assets[index][i].item.id);
			ImagesNotOnScreen.push(game.assets[index][i].item.id);
		}
		console.log(infoPage);
		
		/** set temp and prec */
		precip      = new createjs.Bitmap(prec);
		precip.name = "precip";
		temperature = new createjs.Bitmap(temp);
		temperature.name = "temperature";
		i = game.otherScale[index].length-2;
		SetImg(temperature, game.otherScale[index][0], game.otherX[index][0], game.otherY[index][0]);
		SetSelectEffects(temperature, index, 0);
		i = game.imageScale[index].length-1;
		SetImg(precip, game.otherScale[index][1], game.otherX[index][1], game.otherY[index][1]);
		SetSelectEffects(precip, index, 1);
		
		infoOK = new createjs.Text("OK", "36px Arial", "#FFFFFF");
		infoOK.x = 890;
		infoOK.y = 20;
		
		InstructionText = new createjs.Text("Press H for Help at any time", "36px Arial", "black");
		InstructionText.textAlign    = "center";
		InstructionText.textBaseline = "middle";
		InstructionText.x = game.getStage().width/2;
		InstructionText.y = game.getStage().height-30;
		InstructionTextInner = InstructionText.clone();
		InstructionTextInner.color = "white";
		InstructionTextInner.shadow = undefined;
		InstructionTextInner.outline = false;
		InstructionText.shadow = new createjs.Shadow("#000", -3, -3, 25);
		InstructionText.outline = 3;
		
		infoPage.addChild(temperature, precip, infoOK);       
		game.getStage().addChild(infoPage, InstructionText, InstructionTextInner);
		game.getStage().update();
	}
	
	/**
	 *  @function SetInfoBG
	 *  Sets the background for the editing
	 *  stage based upon which biome was chosen.
	 */
	function SetInfoBG(event) {
		event = event || window.event; // get window.event if e argument missing (in IE)
		if (game.currentBiome.num == 1){
			back.src        = "./Pictures/Background/deciduous.jpg";
			back.onload     = SetBiomeInfo;
		} 
		else if (game.currentBiome.num == 2) {
			back.src        = "./Pictures/Background/desert.jpg";
			back.onload     = SetBiomeInfo;
		}
		else if (game.currentBiome.num == 3) {
			back.src        = "./Pictures/Background/grassland.jpg";
			back.onload     = SetBiomeInfo;
		}
		else if (game.currentBiome.num == 4) {
			back.src        = "./Pictures/Background/rainforest.jpg";
			back.onload     = SetBiomeInfo;
		}
		else if (game.currentBiome.num == 5) {
			back.src        = "./Pictures/Background/tundra.jpg";
			back.onload     = SetBiomeInfo;
		}
	}
	
	/**
	 *  @function handleKeyDown
	 *  Handles all key presses during editing
	 *  stage and determines how key presses are
	 *  handled.
	 *  @param e
	 */
	function handleKeyDown(e) {
		/** cross browser issues exist */
		if (!e) {
			var e = window.event;
		}
	    if (editInfoBoxOpen) return;
		switch (e.keyCode) {
			case KEYCODE_B:
				console.log("B pressed");
				document.onkeydown = null;
				CBMAdd.removeEventListener("click", CBMAddClicked);
				CBMDelete.removeEventListener("click", CBMDeleteClicked);
				dropzone.removeEventListener('dragover', cancel);
				dropzone.removeEventListener('dragenter', cancel);
				dropzone.removeEventListener('drop', HandleDrop);
				CBMReset();
				game.getStage().removeChild(infoPage, InstructionText, InstructionTextInner);
				$("#CheckboxMenu").find("input[type=checkbox]").parent().remove();
				parseManifest(ReformManifest());
				
				return false;
			case KEYCODE_D:
				console.log("D pressed");
				if (currentSelection) {
					if (currentSelection.name === "precip") {
						alert("Cannot delete the precipitation image...");
					}
					else if (currentSelection.name === "temperature") {
						alert("Cannot delete the temperature image...");
					}
					else {
						Handle_D_Pressed();
					}
				}
				else {
					alert("No image selected. Please Select an image first");
				}
				return false;
			case KEYCODE_H:
				console.log("H pressed");
				Handle_H_Pressed();
				return false;
			case KEYCODE_I:
				console.log("I pressed");
				Handle_I_Pressed();
				return false;
			case KEYCODE_M:
				console.log("M pressed");
				if (currentSelection) {
					Handle_M_Pressed();
				}
				else {
					alert("No image selected. Please Select an image first");
				}
				return false;
			case KEYCODE_S:
				console.log("S pressed");
				if (currentSelection) {
					Handle_S_Pressed();
				}
				else {
					alert("No image selected. Please Select an image first");
				}
				return false;
			case KEYCODE_T:
				console.log("T pressed");
				if (currentSelection) {
					Handle_T_Pressed();
				}
				else {
					alert("No image selected. Please Select an image first");
				}
				return false;
			case KEYCODE_X:
				console.log("X pressed");
				var exit=window.confirm("Are you sure you want to exit?");
				if (exit) {
					document.onkeydown = null;
					CBMAdd.removeEventListener("click", CBMAddClicked);
					CBMDelete.removeEventListener("click", CBMDeleteClicked);
					dropzone.removeEventListener('dragover', cancel);
					dropzone.removeEventListener('dragenter', cancel);
					dropzone.removeEventListener('drop', HandleDrop);
					CBMReset();
					game.getStage().removeChild(infoPage, InstructionText, InstructionTextInner);
					$("#CheckboxMenu").find("input[type=checkbox]").parent().remove();
					var fileName = prompt("Please enter the name for your manifest file.\nPress cancel to discard changes.", "Manifest.txt");
					if (fileName !== null) {
						var blob = new Blob([ReformManifest()], {type: "text/plain;charset=utf-8"});
						saveAs(blob, fileName);
					}
					eventOptionsMenu();
				}
				return false;
		}
		
		/**
		 *  @function CBMReset
		 *  Sets/resets the location of the Image
		 *  Checkbox Menu.
		 */
		function CBMReset() {
			$(".checkbox").prop('checked', false);
			
			CheckboxMenuBkgrd.style.display = 'none';
			CheckboxMenuAdd.style.display = 'none';
			CheckboxMenuDelete.style.display = 'none';
			CheckboxMenu.style.display = 'none';
			
			CBMBkgrd.style.position = 'absolute';
			CBMBkgrd.style.top = "20px";
			CBMBkgrd.style.left = "11px";
			
			CBM.style.position = 'absolute';
			CBM.style.top = "40px";
			CBM.style.left = "11px";
			
			CBMAdd.style.position = 'absolute';
			CBMAdd.style.top = "192px";
			CBMAdd.style.left = "10.5px";
			
			CBMDelete.style.position = 'absolute';
			CBMDelete.style.top = "192px";
			CBMDelete.style.left = "72px";
		}
		
		/**
		 *  @function Handle_D_Pressed
		 *  Handles D Press during editing stage. If an
		 *  image has been clicked that can be modified, 
		 *  it removes the image from the editing stage. If 
		 *  not, it alerts the user that no image has been
		 *  clicked.
		 */
		function Handle_D_Pressed() {
			if (ImagesOnScreen.length > 2) {
				var toRemove = $.inArray(currentSelection.name, ImagesOnScreen);
				ImagesOnScreen.splice(toRemove, 1);
				ImagesNotOnScreen.push(currentSelection.name);
				infoPage.removeChild(currentSelection);
				currentSelection = null;
				game.getStage().update();
			} else {
				alert("Cannot delete image... There must be at least two animals on the screen.");
			}
		}
		
		/**
		 *  @function Handle_H_Pressed
		 *  Handles H Press during editing stage. Toggles
		 *  a help dialog for whichever state the edit
		 *  stage is in.
		 */
		function Handle_H_Pressed() {
			var HelpBkgrd;
			if (HelpDisplayed === false) {
				HelpContainer = new createjs.Container();
				HelpDisplayed = true;
				
				HelpBkgrd = new createjs.Shape();
				HelpBkgrd.graphics.beginFill("#212121").drawRect(game.getStage().width/2 - 242.5, game.getStage().height/3 - 40, 485, 250);
				
				HelpContainer.addChild(HelpBkgrd, HelpText, HelpTextInner);
				infoPage.addChild(HelpContainer);
				game.getStage().update();
			}
			else {
				toggleOffHelp();
			}
		}
		
		/**
		 *  @function Handle_I_Pressed
		 *  Handles I Press during editing stage. Pulls
		 *  up the Image Checkbox Menu, which allows the
		 *  user to remove images from the manifest and/
		 *  or add images to the editing stage that are
		 *  available in the manifest. Image Checkbox
		 *  Menu is a scrollable/movable dialog box.
		 */
		function Handle_I_Pressed() {
			if (!CBMDisplayed) {
				CBMDisplayed = true;
				EnableCBM();
			}
			else {
				CBMDisplayed = false;
				CBMReset();
			}
			
			/**
			 *  @function EnableCBM
			 *  Sets the Image Checkbox Menu to be visible.
			 */
			function EnableCBM(){
				CheckboxMenuBkgrd.style.display = 'inline';
				CheckboxMenuAdd.style.display = 'inline';
				CheckboxMenuDelete.style.display = 'inline';
				CheckboxMenu.style.display = 'inline';
			}
		}
		
		/**
		 *  @function Handle_M_Pressed
		 *  Handles M Press during editing stage. If an
		 *  image has been clicked that can be modified, 
		 *  it allows the user to move that image. If 
		 *  not, it alerts the user that no image has been
		 *  clicked.
		 */
		function Handle_M_Pressed() {
			var upHeld = false;
			var downHeld = false;
			var leftHeld = false;
			var rightHeld = false;
			
			moveModeOn = true;
			
			HelpText.text = HelpTextInner.text =
			"Up: Move Image Up\n"+
			"Right: Move Image Right\n"+
			"Down: Move Image Down\n"+
			"Left: Move Image Left\n"+
			"H: Toggle Help Menu\n"+
			"M: Toggle Image Moving";
			
			if (!createjs.Ticker.hasEventListener("tick")) {
				createjs.Ticker.setFPS(30);
				console.log(createjs.Ticker.framerate);
				createjs.Ticker.addEventListener("tick", tick);
			}
			
			document.onkeydown = function(e) {
				if (!e) {
					var e = window.event;
				}
				switch (e.keyCode) {
					case KEYCODE_UP:
						console.log("Up pressed");
						upHeld = true;
						return false;
					case KEYCODE_DOWN:
						console.log("Down pressed");
						downHeld = true;
						return false;
					case KEYCODE_LEFT:
						console.log("Left pressed");
						leftHeld = true;
						return false;
					case KEYCODE_RIGHT:
						console.log("Right pressed");
						rightHeld = true;
						return false;
					case KEYCODE_H:
						console.log("H Pressed");
						Handle_H_Pressed();
						return false;
					case KEYCODE_M:
						console.log("M pressed");
						toggleOffMoveMode();
						return false;
					case KEYCODE_B: case KEYCODE_D: case KEYCODE_I: case KEYCODE_S: case KEYCODE_T: case KEYCODE_X:
						alert("Currently in Move Mode... Please Press M to toggle off before attempting to access a separate mode!!!");
						return false;
				}
			};
			document.onkeyup = function(e) {
				if (!e) {
					var e = window.event;
				}
				switch (e.keyCode) {
					case KEYCODE_UP:
						console.log("Up released");
						upHeld = false;
						break;
					case KEYCODE_DOWN:
						console.log("Down released");
						downHeld = false;
						break;
					case KEYCODE_LEFT:
						console.log("Left released");
						leftHeld = false;
						break;
					case KEYCODE_RIGHT:
						console.log("Right released");
						rightHeld = false;
						break;
				}
			};
			
			/**
			 *  @function tick
			 *  Timer function for moving state of
			 *  editing stage.
			 *  @param event
			 */
			function tick(event) {
				event = event || window.event; // get window.event if e argument missing (in IE)
				if (HelpDisplayed === false) {
					if (upHeld) {
						currentSelection.y-=5;
					}
					if (rightHeld) {
						currentSelection.x-=-5;
					}
					if (leftHeld) {
						currentSelection.x-=5;
					}
					if (downHeld) {
						currentSelection.y-=-5;
					}
					if (upHeld || rightHeld || leftHeld || downHeld) {
						game.getStage().update();
					}
				}
			}
		}
		
		/**
		 *  @function Handle_S_Pressed
		 *  Handles S Press during editing stage. If an
		 *  image has been clicked that can be modified, 
		 *  it allows the user to scale that image. If 
		 *  not, it alerts the user that no image has been
		 *  clicked.
		 */
		function Handle_S_Pressed() {
			var upHeld   = false;
			var downHeld = false;
			
			scaleModeOn  = true;
			
			HelpText.text = HelpTextInner.text =
			"Up: Scale Image Up\n"+
			"Down: Scale Image Down\n"+
			"H: Toggle Help Menu\n"+
			"S: Toggle Image Scaling";
			
			if (!createjs.Ticker.hasEventListener("tick")) {
				createjs.Ticker.setFPS(30);
				console.log(createjs.Ticker.framerate);
				createjs.Ticker.addEventListener("tick", tick);
			}
			
			document.onkeydown = function(e) {
				if (!e) {
					var e = window.event;
				}
				switch (e.keyCode) {
					case KEYCODE_UP:
						console.log("Up pressed");
						upHeld = true;
						return false;
					case KEYCODE_DOWN:
						console.log("Down pressed");
						downHeld = true;
						return false;
					case KEYCODE_H:
						console.log("H Pressed");
						Handle_H_Pressed();
						return false;
					case KEYCODE_S:
						console.log("S pressed");
						toggleOffScaleMode();
						return false;
					case KEYCODE_B: case KEYCODE_D: case KEYCODE_I: case KEYCODE_M: case KEYCODE_T: case KEYCODE_X:
						alert("Currently in Scale Mode... Please Press S to toggle off before attempting to access a separate mode!!!");
						return false;
				}
			};
			document.onkeyup = function(e) {
				if (!e) {
					var e = window.event;
				}
				switch (e.keyCode) {
					case KEYCODE_UP:
						console.log("Up released");
						upHeld = false;
						break;
					case KEYCODE_DOWN:
						console.log("Down released");
						downHeld = false;
						break;
				}
			};
			
			/**
			 *  @function tick
			 *  Timer function for scaling state of
			 *  editing stage.
			 *  @param event
			 */
			function tick(event) {
				event = event || window.event; // get window.event if e argument missing (in IE)
				if (HelpDisplayed === false) {
					if (upHeld) {
						bounds = currentSelection.getBounds();
						maxBound = Math.max(bounds.height * currentSelection.scaleY, bounds.width * currentSelection.scaleX);
						console.log(maxBound);
						if (maxBound < 200) {
							currentSelection.scaleX = currentSelection.scaleBackX -= -0.01;
							currentSelection.scaleY = currentSelection.scaleBackY -= -0.01;
						}
					}
					if (downHeld) {
						bounds = currentSelection.getBounds();
						maxBound = Math.max(bounds.height * currentSelection.scaleY, bounds.width * currentSelection.scaleX);
						if (maxBound > 50) {
							currentSelection.scaleX = currentSelection.scaleBackX -= 0.01;
							currentSelection.scaleY = currentSelection.scaleBackY -= 0.01;	
						}
					}
					if (upHeld || downHeld) {
						game.getStage().update();
					}
				}
			}
		}
		
		/**
		 *  @function Handle_T_Pressed
		 *  Handles T Press during editing stage. If an
		 *  image has been clicked that can be modified, 
		 *  it allows the user to add/modify image text. 
		 *  If not, it alerts the user that no image has
		 *  been clicked.
		 */
		function Handle_T_Pressed() {
			// I tried doing this from HTML instead but had trouble
			EditInfoDiv.children[0].value = infoText.text;
			var changeInfoButton = EditInfoDiv.children[1];
			changeInfoButton.addEventListener("click", submitChange);
			var cancelButton = EditInfoDiv.children[2];
			cancelButton.addEventListener("click", closeEditInfoBox);
			var itemLabel = EditInfoDiv.children[3];
			itemLabel.innerHTML = currentSelection.name;
			editInfoBoxOpen = true;
			EditInfoDiv.style.display = "inline";
		}
	}
	
	function toggleOffHelp() {
		HelpDisplayed = false;
		infoPage.removeChild(HelpContainer);
		game.getStage().update();
	}
	
	function toggleOffMoveMode() {
		moveModeOn = false;
		if (currentSelection.name === "precip") {
			game.otherX[game.currentBiome.num-1][1] = currentSelection.x;
			game.otherY[game.currentBiome.num-1][1] = currentSelection.y;
		}
		else if(currentSelection.name === "temperature") {
			game.otherX[game.currentBiome.num-1][0] = currentSelection.x;
			game.otherY[game.currentBiome.num-1][0] = currentSelection.y;
		}
		else {
			game.imageX[game.currentBiome.num-1][GetAssetIndexByID(currentSelection.name)] = currentSelection.x;
			game.imageY[game.currentBiome.num-1][GetAssetIndexByID(currentSelection.name)] = currentSelection.y;
		}
		document.onkeyup   = null;
		document.onkeydown = handleKeyDown;
		createjs.Ticker.removeAllEventListeners();
		ResetHelpText();
		game.getStage().update();
	}
	
	function toggleOffScaleMode() {
		scaleModeOn = false;
		var bounds = currentSelection.getBounds();
		var maxBound = Math.max(bounds.height, bounds.width);
		if (currentSelection.name === "precip") {
			game.otherScale[game.currentBiome.num-1][1] = currentSelection.scaleX*maxBound;
		}
		else if(currentSelection.name === "temperature") {
			game.otherScale[game.currentBiome.num-1][0] = currentSelection.scaleX*maxBound;
		}
		else {
			game.imageScale[game.currentBiome.num-1][GetAssetIndexByID(currentSelection.name)] = currentSelection.scaleX*maxBound;
		}
		console.log(game.imageScale[game.currentBiome.num-1][GetAssetIndexByID(currentSelection.name)]);
		document.onkeyup   = null;
		document.onkeydown = handleKeyDown;
		createjs.Ticker.removeAllEventListeners();
		ResetHelpText();
		game.getStage().update();
	}
		
	function closeEditInfoBox() {
		editInfoBoxOpen = false;
		EditInfoDiv.style.display = "none";
	}

	function submitChange() {
		/** Save the new text */
		if (currentSelection.name === "precip") {
			game.otherText[game.currentBiome.num-1][1][0] = EditInfoDiv.children[0].value;
		}
		else if(currentSelection.name === "temperature") {
			game.otherText[game.currentBiome.num-1][0][0] = EditInfoDiv.children[0].value;
		}
		else {
			game.imageText[game.currentBiome.num-1][GetAssetIndexByID(currentSelection.name)][0] = EditInfoDiv.children[0].value;
		}
		closeEditInfoBox();
	}
	
	/**
	 *  @function GetAssetIndexByID
	 *  Finds the index of an asset by id in
	 *  the game.assets array.
	 *  @param OBJECT_ID
	 */
	function GetAssetIndexByID(OBJECT_ID) {
		for (var i=0; i< game.assets[game.currentBiome.num-1].length; i++) {
			if (game.assets[game.currentBiome.num-1][i].item.id === OBJECT_ID) {
				return i;
			}
		}
		return -1;
	}
	
	/**
	 *  @function SimplifyText
	 *  Helper function for reform manifest that
	 *  gets rid of any pesky newlines/tabs/spaces
	 *  in the display text.
	 *  @param InputText
	 *  @return InputText.trim()
	 */
	function SimplifyText(InputText) {
		InputText = InputText.replace(/(\r\n|\n|\r)/gm," ");
		InputText = InputText.replace(/\t+/g, " ");
		InputText = InputText.replace(/\s+/g," ");
		return InputText.trim();
	}
}
