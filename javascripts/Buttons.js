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
    var container = new createjs.Container();
    container.x = xCord;
    container.y = yCord;
    
    var rect = new createjs.Shape();
    rect.graphics.beginFill("#18770e").drawRect(0, 0, 65, 45)
    
    text = new createjs.Text("OK", "36px Arial", "#FFFFFF");
    text.x = 6;
    text.y = 3;
    
    container.addChild(rect)
    container.addChild(text)
    container.addEventListener("click", eventListener);
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
	this.container        = new createjs.Container();
	this.container.x      = buttonX;
	this.container.y      = buttonY;
	this.txt   		      = new createjs.Text(buttonText, "36px Arial", "#fafafa");
	this.txt.textAlign    = "center";
	this.txt.textBaseline = "middle";
	this.txt.x 	          = buttonW/2;
	this.txt.y            = 10 + buttonH/3;
	this.outRect          = new createjs.Shape();
	this.outRect.graphics.beginFill(outColor).drawRect(0, 0, buttonW, buttonH);
	this.inRect           = new createjs.Shape();		
	this.inRect.graphics.beginFill(buttonColor).drawRect(10, 10, buttonW - 20, buttonH - 20);
	this.container.addChildAt(this.outRect, this.inRect, this.txt, 0);
	this.container.addEventListener(buttonEvent, buttonFunction);
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
	this.container        = new createjs.Container();
	this.container.x      = buttonX;
	this.container.y      = buttonY;
	this.txt   		      = new createjs.Text(buttonText, buttonTextFormat, "#fafafa");
	this.txt.textAlign    = "center";
	this.txt.textBaseline = "middle";
	this.txt.x 	          = buttonTextX;
	this.txt.y            = buttonTextY;
	this.outCircle          = new createjs.Shape();
	this.outCircle.graphics.beginFill(outColor).drawCircle(0, 0, buttonR);
	this.inCircle           = new createjs.Shape();		
	this.inCircle.graphics.beginFill(buttonColor).drawCircle(0, 0, buttonR - 10);
	this.container.addChildAt(this.outCircle, this.inCircle, this.txt, 0);
	this.container.addEventListener(buttonEvent, buttonFunction);
}
