/**currcurr
 *  @function eventEditGame
 *  Section to add/remove images from the
 *  game and/or manifest. Also allows the
 *  user to edit the images in the game.
 */
function eventEditGame() {
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
    var editInfoBox = document.getElementById("EditInfoDiv");
	var CBMBkgrd    = document.getElementById("CheckboxMenuBkgrd");
	var CBM         = document.getElementById("CheckboxMenu");
	var CBMAdd      = document.getElementById("CheckboxMenuAdd");
	var CBMDelete   = document.getElementById("CheckboxMenuDelete");
	var HelpContainer;
	var ManifestBiomeSection;
	var ManifestImageSection;
	var ManifestBiomeSectionBeforeSplit;
	var ManifestBiomeSectionAfterSplit;
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
	
	game.getStage().enableMouseOver(10);
	
	document.onkeydown = handleKeyDown;
	
	var HelpText = new createjs.Text();
		HelpText.textAlign    = "center";
		HelpText.textBaseline = "middle";
		HelpText.x = game.getStage().width/2;
		HelpText.y = game.getStage().height/3;
		HelpText.font = "25px Arial";
		HelpText.color = "black";
		HelpTextInner = HelpText.clone();
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
		for (var i=0; i<lines.length; i++) {
			if (isNumber(lines[i])) {
				console.log("New Biome!!!!!!!!!");
				BiomeSectionNum++;
				if (BiomeSectionNum != game.currentBiome.num) {
					numImages = lines[i];
					console.log("NumImages: "+numImages);
					i++;
					while(numImages>0) {
						i+=5;
						numDescriptions = lines[++i];
						console.log("numDescriptions = " + numDescriptions);
						while(numDescriptions>0) {
							i++;
							numDescriptions--;
						}
						numImages--;
					}
					i+=5;
					var numPrecDescriptions = lines[i];
					console.log("PRECDESC: " + numPrecDescriptions);
					while (numPrecDescriptions>0) {
						i++;
						numPrecDescriptions--;
					}
					i+=5;
					var numTempDescriptions = lines[i];
					while (numTempDescriptions>0) {
						i++;
						numTempDescriptions--;
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
					var numPrecDescriptions = lines[i];
					while (numPrecDescriptions>0) {
						ManifestBiomeSection = ManifestBiomeSection.concat("\n"+lines[++i]);
						numPrecDescriptions--;
					}
					for(var j=0; j<5; j++) {
						ManifestBiomeSection = ManifestBiomeSection.concat("\n"+lines[++i]);
					}
					var numTempDescriptions = lines[i];
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
		//ImagesOnScreen; TextOnScreen
		var lines = game.workingManifest.split("\n");
		var TempSection = game.numImages[game.currentBiome.num];
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
		"X: Exit Editing Menu";
		
	}
	
	/**
	 *  @function SetImg
	 *  @param img
	 *  @param imgScale
	 *  @param imgX
	 *  @param imgY
	 *  Places the image on the screen and
	 *  scales it based upon the arguments
	 *  provided.
	 */
	function SetImg (img, imgScale, imgX, imgY) {
		var bounds = img.getBounds();
		var maxBound = Math.max(bounds.height, bounds.width);
		img.scaleX = img.scaleBackX = imgScale/maxBound;
		img.scaleY = img.scaleBackY = imgScale/maxBound;
		img.x = imgX;
		img.y = imgY;
	}
	
	/**
	 *  @function SetSelectEffects
	 *  @param img
	 *  @param index
	 *  @param i
	 *  Handles what happens when an image is
	 *  selected. Displays the text for the
	 *  given image and sets it as the currently
	 *  selected image for the editing stage.
	 */
	function SetSelectEffects(IMG, IMG_TEXT) {
		IMG.addEventListener("mousedown", function (event) {
			console.log(event.currentTarget);
			currentSelection = event.currentTarget;
			IMG.scaleX = IMG.scaleBackX * 1.1;
			IMG.scaleY = IMG.scaleBackY * 1.1;
			game.getStage().update();
		});
		
		IMG.addEventListener("mousedown", SetDisplayText);
		
		/**
		 *  @function SetDisplayText
		 *  Sets the display text for the image clicked.
		 */
		function SetDisplayText() {
			infoText.text = IMG_TEXT;
			infoText.font = "25px Arial";
			infoText.color = "black";
			infoText.x = 289;
			infoText.y = 50;
			infoTextInner = infoText.clone();
			infoTextInner.color = "white";
			infoTextInner.shadow = undefined;
			infoTextInner.outline = false;
			infoText.shadow = new createjs.Shadow("#000", -3, -3, 25);
			infoText.outline = 3;
			console.log("TEXT OBJECT**************");
			console.log(infoText);
			infoPage.addChild(infoText, infoTextInner);
			game.getStage().update();
		}
		
		
		IMG.addEventListener("pressup", function (event) {
			IMG.scaleX = IMG.scaleBackX;
			IMG.scaleY = IMG.scaleBackY;
			infoPage.removeChild(infoText, infoTextInner);
			game.getStage().update();
		});
	}
	
	/**
	 *  @function CBMAppend
	 *  @param CB_ID
	 *  Appends an option to the end of the 
	 *  Checkbox Menu List.
	 */
	function CBMAppend(CB_ID) {
		var $newField = $('<div/>', { id: CB_ID, style: "overflow: hidden" });
		var $InputText = $('<label/>', { style: "display: inline-block" }).html(CB_ID).prepend($('<input/>').attr({ class: 'checkbox', type: 'checkbox'}));
		$newField.append($InputText);
		$("#CheckboxMenu").append($newField);
	}
	
	/**
	 *  @function AddToScreen
	 *  @param IMG
	 *  @param IMG_ID
	 *  @param IMG_SCALE
	 *  @param IMG_X
	 *  @param IMG_Y
	 *  @param IMG_TEXT
	 *  Adds images to the screen based on
	 *  their settings in the manifest.
	 */
	function AddToScreen(IMG, IMG_ID, IMG_SCALE, IMG_X, IMG_Y, IMG_TEXT) {
		var newImage = new createjs.Bitmap(IMG);
		newImage.name = IMG_ID;
		infoPage.addChild(newImage);
		SetImg(newImage, IMG_SCALE, IMG_X, IMG_Y);
		ImagesOnScreen.push(IMG_ID);
		TextOnScreen.push(IMG_TEXT);
		SetSelectEffects(newImage, IMG_TEXT);
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
			AddToScreen (game.assets[index][i].result,
						 game.assets[index][i].item.id,
						 game.imageScale[index][i],
						 game.imageX[index][i],
						 game.imageY[index][i],
						 game.imageText[index][i][0]);
			CBMAppend(game.assets[index][i].item.id);
		}
		for (var i=game.displayedImageNum[index]; i<game.numImages[index]; i++) {
			CBMAppend (game.assets[index][i].item.id);
		}
		console.log(infoPage);
		
		//set temp and prec
		precip      = new createjs.Bitmap(prec);
		precip.name = "precip";
		temperature = new createjs.Bitmap(temp);
		temperature.name = "temperature";
		i = game.imageScale[index].length-2;
		SetImg(temperature, game.imageScale[index][i], game.imageX[index][i], game.imageY[index][i]);
		SetSelectEffects(precip, game.imageText[index][i][0]);
		i = game.imageScale[index].length-1;
		SetImg(precip, game.imageScale[index][i], game.imageX[index][i], game.imageY[index][i]);
		SetSelectEffects(temperature, game.imageText[index][i][0]);
		
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
		if (game.currentBiome.num == 1){
			back.src        = "deciduous.jpg";
			back.onload     = SetBiomeInfo;
		} 
		else if (game.currentBiome.num == 2) {
			back.src        = "desert.jpg";
			back.onload     = SetBiomeInfo;
		}
		else if (game.currentBiome.num == 3) {
			back.src        = "grassland.jpg";
			back.onload     = SetBiomeInfo;
		}
		else if (game.currentBiome.num == 4) {
			back.src        = "rainforest.jpg";
			back.onload     = SetBiomeInfo;
		}
		else if (game.currentBiome.num == 5) {
			back.src        = "tundra.jpg";
			back.onload     = SetBiomeInfo;
		}
	}
	
	/**
	 *  @function handleKeyDown
	 *  @param e
	 *  Handles all key presses during editing
	 *  stage and determines how key presses are
	 *  handled.
	 */
	function handleKeyDown(e) {
		//cross browser issues exist
		if (!e) {
			var e = window.event;
		}
	    if (editInfoBoxOpen == true) return;
		switch (e.keyCode) {
			case KEYCODE_B:
				console.log("B pressed");
				document.onkeydown = null;
				CBMReset();
				game.getStage().removeChild(infoPage, InstructionText, InstructionTextInner);
				$("#CheckboxMenu").find("input[type=checkbox]").parent().remove();
				parseManifest();
				return false;
			case KEYCODE_D:
				console.log("D pressed");
				if (currentSelection) {
					Handle_D_Pressed();
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
			/*case KEYCODE_R:
				console.log("R pressed");
				if (currentSelection) {
					Handle_R_Pressed();
				}
				else {
					alert("No image selected. Please Select an image first");
				}
				return false;*/
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
				document.onkeydown = null;
				CBMReset();
				game.getStage().removeChild(infoPage, InstructionText, InstructionTextInner);
				$("#CheckboxMenu").find("input[type=checkbox]").parent().remove();
				eventOptionsMenu();
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
			var toRemove = $.inArray(currentSelection.name, ImagesOnScreen);
			ImagesOnScreen.splice(toRemove, 1);
			ImagesNotOnScreen.push(currentSelection.name);
			infoPage.removeChild(currentSelection);
			currentSelection = null;
			game.getStage().update();
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
				HelpDisplayed = false;
				infoPage.removeChild(HelpContainer);
				game.getStage().update();
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
			 *  Sets the Image Checkbox Menu and enables
			 *  it to be moved around on the screen.
			 */
			function EnableCBM(){
				CheckboxMenuBkgrd.style.display = 'inline';
				CheckboxMenuAdd.style.display = 'inline';
				CheckboxMenuDelete.style.display = 'inline';
				CheckboxMenu.style.display = 'inline';
				CBMBkgrd.addEventListener("mousedown", function(event) {
					currentSelection = null;
					/*console.log("ClientX: " + event.PageX);
					console.log("ClientY: " + event.clientY);
					console.log("CurrentTargetX: " + CBMBkgrd.style.left);
					console.log("CurrentTargetY: " + CBMBkgrd.style.top);
					xOffset = event.PageX;
					xOffset = xOffset - CBMBkgrd.style.left;
					yOffset = event.clientY + 'px' - CBMBkgrd.style.top;
					console.log(xOffset);
					console.log(yOffset);*/
					window.addEventListener("mousemove", CBMHandleMove, true);
					
					/**
					 *  @function CBMHandleMove
					 *  Moves all of the pieces of the Image
					 *  Checkbox Menu whenever it is dragged
					 *  and dropped.
					 */
					function CBMHandleMove(event) {
						CBMBkgrd.style.position = 'absolute';
						CBMBkgrd.style.top = event.clientY + 'px';
						CBMBkgrd.style.left = event.clientX + 'px';
						
						CBM.style.position = 'absolute';
						CBM.style.top = event.clientY + 20 + 'px';
						CBM.style.left = event.clientX + 'px';
						
						CBMAdd.style.position = 'absolute';
						CBMAdd.style.top = event.clientY + 172 + 'px';
						CBMAdd.style.left = event.clientX -0.5 + 'px';
						
						CBMDelete.style.position = 'absolute';
						CBMDelete.style.top = event.clientY + 172 + 'px';
						CBMDelete.style.left = event.clientX + 61 + 'px';
					}
					
					window.addEventListener("mouseup", CBMHandleMouseUp, false);
					
					/**
					 *  @function CBMHandleMouseUp
					 *  @param event
					 *  Deactivates movability for the Image
					 *  Checkbox Menu whenever the mouse is
					 *  released.
					 */
					function CBMHandleMouseUp(event) {
						console.log("RELEASED");
						window.removeEventListener("mousemove", CBMHandleMove, true);
						window.removeEventListener("mouseup", CBMHandleMouseUp, false);
					}
				});
				$("#CheckboxMenuAdd").on('click', function() { 
					console.log("ADD CLICKED");
					var AddList = [];
					$("#CheckboxMenu").find("input[type=checkbox]:checked").each(function() {
						if($(this) === null) {
							alert("No checkboxes selected...")
						}
						if ( $.inArray($(this).parent()[0].innerText, ImagesOnScreen) === -1 ) {
							AddList.push($(this).parent()[0].innerText);
							var toRemove = $.inArray($(this).parent()[0].innerText, ImagesNotOnScreen);
							ImagesNotOnScreen.splice(toRemove, 1);
						}
						else {
							alert("The image for " + $(this).parent()[0].innerText + " is already on the screen...");
						}
					});
					console.log(AddList);
					var index = game.currentBiome.num-1;
					for (var j = 0; j < AddList.length; j++) {
						var i = 0;
						while (i<game.assets[index].length && AddList[j] !== game.assets[index][i].item.id) { i++; console.log(i); }
						AddToScreen (game.assets[index][i].result,
						 game.assets[index][i].item.id,
						 game.imageScale[index][i],
						 game.imageX[index][i],
						 game.imageY[index][i],
						 game.imageText[index][i][0]);
					}
					game.getStage().update();
					$(".checkbox").prop('checked', false);
				});
				$("#CheckboxMenuDelete").on('click', function() { 
					console.log("DELETE CLICKED");
					var DelConfirm = confirm("Are you sure you want to permanently delete these from the manifest?");
					if (DelConfirm) {
						//console.log(document.getElementsByName());
						var DeleteList = [];
						$("#CheckboxMenu").find("input[type=checkbox]:checked").each(function() {
							DeleteList.push($(this).parent()[0].innerText);
						});
						console.log(DeleteList);
						console.log(ImagesOnScreen);
						for (var j = 0; j < DeleteList.length; j++) {
							var toRemove = $.inArray(DeleteList[j], ImagesOnScreen);
							console.log(toRemove);
							if (toRemove > -1 ) {
								infoPage.removeChild(infoPage.getChildByName(DeleteList[j]));
								ImagesOnScreen.splice(toRemove, 1);
							}
						}
						game.getStage().update();
						console.log($("#CheckboxMenu").find("input[type=checkbox]:checked"));
						$("#CheckboxMenu").find("input[type=checkbox]:checked").parent().remove();
					}
				});
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
						document.onkeyup   = null;
						document.onkeydown = handleKeyDown;
						createjs.Ticker.removeAllEventListeners();
						ResetHelpText();
						game.getStage().update();
						return false;
					case KEYCODE_B: case KEYCODE_D: case KEYCODE_I: case KEYCODE_S: case KEYCODE_T: case KEYCODE_X:
						alert("Currently in Move Mode... Please Press M to toggle off before attempting to access a separate mode!!!")
						return false;
				}
			}
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
			}
			
			/**
			 *  @function tick
			 *  @param event
			 *  Timer function for moving state of
			 *  editing stage.
			 */
			function tick(event) {
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
			var upHeld = false;
			var downHeld = false;
			
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
						document.onkeyup   = null;
						document.onkeydown = handleKeyDown;
						createjs.Ticker.removeAllEventListeners();
						ResetHelpText();
						game.getStage().update();
						return false;
					case KEYCODE_B: case KEYCODE_D: case KEYCODE_I: case KEYCODE_M: case KEYCODE_T: case KEYCODE_X:
						alert("Currently in Scale Mode... Please Press S to toggle off before attempting to access a separate mode!!!")
						return false;
				}
			}
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
			}
			
			/**
			 *  @function tick
			 *  @param event
			 *  Timer function for scaling state of
			 *  editing stage.
			 */
			function tick(event) {
				if (HelpDisplayed === false) {
					if (upHeld) {
						bounds = currentSelection.getBounds();
						maxBound = Math.max(bounds.height * currentSelection.scaleY, bounds.width * currentSelection.scaleX);
						console.log(maxBound);
						if (maxBound < 200) {
							currentSelection.scaleX = currentSelection.scaleBackX -= -.01;
							currentSelection.scaleY = currentSelection.scaleBackY -= -.01;
						}
					}
					if (downHeld) {
						bounds = currentSelection.getBounds();
						maxBound = Math.max(bounds.height * currentSelection.scaleY, bounds.width * currentSelection.scaleX);
						if (maxBound > 50) {
							currentSelection.scaleX = currentSelection.scaleBackX -= .01;
							currentSelection.scaleY = currentSelection.scaleBackY -= .01;	
						}
					}
					if (upHeld || downHeld) {
						game.getStage().update();
					}
				}
			}
		}

		function closeEditInfoBox() {
			editInfoBoxOpen = false;
			EditInfoDiv.style.display = "none";
		}

		function submitChange() {
			// Save the new text
			game.imageText[game.currentBiome.num-1][currentSelection.number] =
			EditInfoDiv.children[0].value;
			closeEditInfoBox();
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
//			editInfoBox.style.display = "inline";
//			var person = prompt("Please edit the text", infoText);
		}
	}

}


/**
 *  Add existing [I]mages/remove from manifest
 *  [S]cale
 *  Change [T]ext
 *  [R]otate
 *  E[X]it
 */
 
 
	
	
	
	
	
	
	/*
	item.on("pressmove", function(event) {
					event.currentTarget.x = event.stageX-xOffset; 
					event.currentTarget.y = event.stageY-yOffset;
					game.getStage().update(); // this updates the canvas with the new position
				});*/
