/**
 * @function makeOKButton
 *
 * @param xCord: The x coordinate
 * @param yCord: The y coordinate
 * @param eventListener: the function to be triggered 
 *                       for the button's "click" event
 *
 * @return An EaselJS Display Object
 *
 */
function makeOKButton(xCord, yCord, eventListener) {
	"use strict";
	game.getStage().enableMouseOver(10);
    var container = new createjs.Container();
		container.x = xCord;
		container.y = yCord;
    
    var rect = new createjs.Shape();
		rect.graphics.beginFill("#18770e").drawRect(0, 0, 65, 45);
    
    var text = new createjs.Text("OK", "36px Arial", "#FFFFFF");
		text.x = 6;
		text.y = 6;
    
    container.addChild(rect, text);
	container.addEventListener("rollover", HandleRollOver);
	container.addEventListener("rollout", HandleRollOut);
	container.addEventListener("mousedown", HandleMouseDown);
	container.addEventListener("pressup", HandlePressUp);
	container.addEventListener("pressup", eventListener);
	
	/**
	 *  @function HandleRollOver
	 *  Handles rollover event for the OK
	 *  button by slightly darkening the 
	 *  button fill.
	 */
	function HandleRollOver() {
		rect.graphics.clear().beginFill("#18660e").drawRect(0, 0, 65, 45);
		game.getStage().update();
	}
	
	/**
	 *  @function HandleRollOut
	 *  Handles rollout event for the OK
	 *  button by slightly darkening the 
	 *  button fill.
	 */
	function HandleRollOut() {
		rect.graphics.clear().beginFill("#18770e").drawRect(0, 0, 65, 45);
		game.getStage().update();
	}
	
	/**
	 *  @function HandleMouseDown
	 *  Handles mousedown event for the OK
	 *  button by darkening the button fill.
	 */
	function HandleMouseDown() {
		rect.graphics.clear().beginFill("#18420e").drawRect(0, 0, 65, 45);
		text.color = "#f5f5f5";
		game.getStage().update();
	}
	
	/**
	 *  @function HandlePressUp
	 *  Handles mousedown event for the OK
	 *  button by lightening the button fill
	 *  and calling the buttons event handler.
	 */
	function HandlePressUp() {
		rect.graphics.clear().beginFill("#18660e").drawRect(0, 0, 65, 45);
		text.color = "white";
		game.getStage().update();
	}
    return container;
}

/**
 *  @function RectButton
 *  @param buttonText
 *  @param buttonColor
 *  @param buttonX
 *  @param buttonY
 *  @param buttonW
 *  @param buttonH
 *  @param buttonEvent
 *  @param buttonFunction
 *  Rectangular button class.
 */
function RectButton(buttonText, buttonColor, buttonX, buttonY, buttonW, buttonH, outColor, buttonEvent, buttonFunction) {
	"use strict";
	game.getStage().enableMouseOver(10);
	this.container        = new createjs.Container();
	this.container.x      = buttonX;
	this.container.y      = buttonY;
	this.txt   		      = new createjs.Text(buttonText, "36px Arial", "black");
	this.txt.textAlign    = "center";
	this.txt.textBaseline = "middle";
	this.txt.x 	          = buttonW/2;
	this.txt.y            = 10 + buttonH/3;
	this.txtInner = this.txt.clone();
	this.txtInner.color = "white";
	this.txtInner.outline = false;
	this.txt.outline = 3;
	this.outRect          = new createjs.Shape();
	this.outRect.graphics.beginFill(outColor).drawRect(0, 0, buttonW, buttonH);
	this.inRect           = new createjs.Shape();
	this.inRect.graphics.beginFill(buttonColor).drawRect(10, 10, buttonW - 20, buttonH - 20);
	this.container.addChild(this.outRect, this.inRect, this.txt, this.txtInner);
	this.container.addEventListener("rollover", HandleRollOver.bind(this));
	this.container.addEventListener("rollout", HandleRollOut.bind(this));
	this.container.addEventListener("mousedown", HandleMouseDown.bind(this));
	this.container.addEventListener("pressup", HandlePressUp.bind(this));
	this.container.addEventListener("pressup", buttonFunction);
	
	/**
	 *  @function HandleRollOver
	 *  Handles rollover event for the rectangle
	 *  buttons by slightly darkening the button 
	 *  fill.
	 */
	function HandleRollOver() {
		var oldColor  = buttonColor.replace("#", "");
		var tempColor = minusHexColor(oldColor, "001100");
		buttonColor = "#"+tempColor;
		this.inRect.graphics.clear().beginFill(buttonColor).drawRect(10, 10, buttonW - 20, buttonH - 20);
		game.getStage().update();
	}
	
	/**
	 *  @function HandleRollOut
	 *  Handles rollout event for the rectangle
	 *  buttons by slightly darkening the button 
	 *  fill.
	 */
	function HandleRollOut() {
		var oldColor  = buttonColor.replace("#", "");
		var tempColor = addHexColor(oldColor, "001100");
		buttonColor = "#"+tempColor;
		this.inRect.graphics.clear().beginFill(buttonColor).drawRect(10, 10, buttonW - 20, buttonH - 20);
		game.getStage().update();
	}
	
	/**
	 *  @function HandleMouseDown
	 *  Handles mousedown event for the rectangle
	 *  buttons by darkening the button fill.
	 */
	function HandleMouseDown() {
		var oldColor  = buttonColor.replace("#", "");
		var tempColor = minusHexColor(oldColor, "002400");
		buttonColor = "#"+tempColor;
		this.inRect.graphics.clear().beginFill(buttonColor).drawRect(10, 10, buttonW - 20, buttonH - 20);
		this.txtInner.color = "#f5f5f5";
		game.getStage().update();
	}
	
	/**
	 *  @function HandlePressUp
	 *  Handles mousedown event for the rectangle
	 *  buttons by lightening the button fill
	 *  and calling the buttons event handler.
	 */
	function HandlePressUp() {
		var oldColor  = buttonColor.replace("#", "");
		var tempColor = addHexColor(oldColor, "002400");
		buttonColor = "#"+tempColor;
		this.inRect.graphics.clear().beginFill(buttonColor).drawRect(10, 10, buttonW - 20, buttonH - 20);
		this.txtInner.color = "white";
		game.getStage().update();
	}
} 

/**
 *  @function CircleButton
 *  @param buttonText
 *  @param buttonTextFormat
 *  @param buttonTextX
 *  @param buttonTextY
 *  @param buttonColor
 *  @param buttonX
 *  @param buttonY
 *  @param buttonR
 *  @param selected
 *  @param selectedColor
 *  @param buttonEvent
 *  @param buttonFunction
 *  Circular button class.
 */
function CircleButton(buttonText, buttonTextFormat, buttonTextX, buttonTextY, buttonColor, buttonX, buttonY, buttonR, outColor, buttonEvent, buttonFunction) {
	"use strict";
	game.getStage().enableMouseOver(10);
	this.container        = new createjs.Container();
	this.container.x      = buttonX;
	this.container.y      = buttonY;
	this.txt   		      = new createjs.Text(buttonText, buttonTextFormat, "black");
	this.txt.textAlign    = "center";
	this.txt.textBaseline = "middle";
	this.txt.x 	          = buttonTextX;
	this.txt.y            = buttonTextY;
	this.txtInner = this.txt.clone();
	this.txtInner.color = "white";
	this.txtInner.outline = false;
	this.txt.outline = 3;
	this.outCircle          = new createjs.Shape();
	this.outCircle.graphics.beginFill(outColor).drawCircle(0, 0, buttonR);
	this.inCircle           = new createjs.Shape();		
	this.inCircle.graphics.beginFill(buttonColor).drawCircle(0, 0, buttonR - 10);
	this.container.addChild(this.outCircle, this.inCircle, this.txt, this.txtInner);
	this.container.addEventListener("rollover", HandleRollOver.bind(this));
	this.container.addEventListener("rollout", HandleRollOut.bind(this));
	this.container.addEventListener("mousedown", HandleMouseDown.bind(this));
	this.container.addEventListener("pressup", HandlePressUp.bind(this));
	this.container.addEventListener("pressup", buttonFunction);
	
	/**
	 *  @function HandleRollOver
	 *  Handles rollover event for the circle
	 *  buttons by slightly darkening the button 
	 *  fill.
	 */
	function HandleRollOver() {
		var oldColor  = buttonColor.replace("#", "");
		var tempColor = minusHexColor(oldColor, "001100");
		buttonColor = "#"+tempColor;
		this.inCircle.graphics.clear().beginFill(buttonColor).drawCircle(0, 0, buttonR - 10);
		game.getStage().update();
	}
	
	/**
	 *  @function HandleRollOut
	 *  Handles rollout event for the circle
	 *  buttons by slightly darkening the button 
	 *  fill.
	 */
	function HandleRollOut() {
		var oldColor  = buttonColor.replace("#", "");
		var tempColor = addHexColor(oldColor, "001100");
		buttonColor = "#"+tempColor;
		this.inCircle.graphics.clear().beginFill(buttonColor).drawCircle(0, 0, buttonR - 10);
		game.getStage().update();
	}
	
	/**
	 *  @function HandleMouseDown
	 *  Handles mousedown event for the circle
	 *  buttons by darkening the button fill.
	 */
	function HandleMouseDown() {
		var oldColor  = buttonColor.replace("#", "");
		var tempColor = minusHexColor(oldColor, "002400");
		buttonColor = "#"+tempColor;
		this.inCircle.graphics.clear().beginFill(buttonColor).drawCircle(0, 0, buttonR - 10);
		this.txtInner.color = "#f5f5f5";
		game.getStage().update();
	}
	
	/**
	 *  @function HandlePressUp
	 *  Handles mousedown event for the circle
	 *  buttons by lightening the button fill
	 *  and calling the buttons event handler.
	 */
	function HandlePressUp() {
		var oldColor  = buttonColor.replace("#", "");
		var tempColor = addHexColor(oldColor, "002400");
		buttonColor = "#"+tempColor;
		this.inCircle.graphics.clear().beginFill(buttonColor).drawCircle(0, 0, buttonR - 10);
		this.txtInner.color = "white";
		game.getStage().update();
	}
}
