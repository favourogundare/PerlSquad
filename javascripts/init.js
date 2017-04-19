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
	
	// left: 37, up: 38, right: 39, down: 40,
	// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
	var keys = {37: 1, 38: 1, 39: 1, 40: 1};

	document.addEventListener('touchmove', touchmove);
	
	/**
	 *  @function touchmove
	 *  @param e
	 *  Prevents touch scrolling
	 */
	function touchmove(e) {
		e.preventDefault();
	}
	
	/**
	 *  @function preventDefault
	 *  @param e
	 *  Prevents default behavior for listeners.
	 */
	function preventDefault(e) {
	  e = e || window.event;
	  if (e.preventDefault)
		  e.preventDefault();
	  e.returnValue = false;  
	}

	/**
	 *  @function preventDefaultForScrollKeys
	 *  Disables any key presses that would
	 *  allow for scrolling.
	 */
	function preventDefaultForScrollKeys(e) {
		if (keys[e.keyCode]) {
			preventDefault(e);
			return false;
		}
	}
	
	/**
	 *  @function disableScroll
	 *  Disables scrolling.
	 */
	function disableScroll() {
	  if (window.addEventListener) // older FF
		  window.addEventListener('DOMMouseScroll', preventDefault, false);
	  window.onwheel = preventDefault; // modern standard
	  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	  window.ontouchmove  = preventDefault; // mobile
	  document.onkeydown  = preventDefaultForScrollKeys;
	}

	/**
	 *  @function enableScroll
	 *  Enables scrolling when disabled.
	 */
	function enableScroll() {
		if (window.removeEventListener)
			window.removeEventListener('DOMMouseScroll', preventDefault, false);
		window.onmousewheel = document.onmousewheel = null; 
		window.onwheel = null; 
		window.ontouchmove = null;  
		document.onkeydown = null;  
	}
	
	Description.value = '';
	ImageSource.value = '';
	CBMBkgrd.addEventListener("mousedown", function(event) {
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
