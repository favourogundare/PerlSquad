/**
 *  @function init
 *  Initializes the game and hides the Description div.
 */
function init() {
	"use strict";
	var stage = new createjs.Stage("main");
	var CBMBkgrd = document.getElementById("CheckboxMenuBkgrd");
	var CBM         = document.getElementById("CheckboxMenu");
	var CBMAdd      = document.getElementById("CheckboxMenuAdd");
	var CBMDelete   = document.getElementById("CheckboxMenuDelete");
	Description.value = '';
	ImageSource.value = '';
	CBMBkgrd.addEventListener("mousedown", function(event) {
		currentSelection = null;
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
    game.setStage(stage);
    eventLoadMap();
}
