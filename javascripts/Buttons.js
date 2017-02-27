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
	this.container.addChild(this.outRect, this.inRect, this.txt);
	this.container.addEventListener(buttonEvent, buttonFunction);
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
function HelpButton1(buttonText, buttonTextFormat, buttonTextColor, buttonColor, buttonX, buttonY, buttonW, buttonH, buttonEvent, buttonFunction) {
	this.container        = new createjs.Container();
	this.container.x      = buttonX;
	this.container.y      = buttonY;
	this.txt   		      = new createjs.Text(buttonText, buttonTextFormat, buttonTextColor);
	this.txt.textAlign    = "center";
	this.txt.textBaseline = "middle";
	this.txt.x 	          = buttonW/2;
	this.txt.y            = 10 + buttonH/3;
	this.Rect             = new createjs.Shape();		
	this.Rect.graphics.beginFill(buttonColor).drawRect(0, 0, buttonW, buttonH);
	this.container.addChild(this.Rect, this.txt);
	this.container.addEventListener(buttonEvent, buttonFunction);
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
function HelpButton2(buttonText, buttonTextFormat, buttonTextColor, buttonTextX, buttonTextY, buttonColor, buttonX, buttonY, buttonW, buttonH, buttonEvent, buttonFunction) {
	this.container        = new createjs.Container();
	this.container.x      = buttonX;
	this.container.y      = buttonY;
	this.txt   		      = new createjs.Text(buttonText, buttonTextFormat, buttonTextColor);
	this.txt.textAlign    = "center";
	this.txt.textBaseline = "middle";
	this.txt.x 	          = buttonTextX;
	this.txt.y            = buttonTextY;
	this.Rect             = new createjs.Shape();		
	this.Rect.graphics.beginFill(buttonColor).drawRect(0, 0, buttonW, buttonH);
	this.container.addChild(this.Rect, this.txt);
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
	this.container.addChild(this.outCircle, this.inCircle, this.txt);
	this.container.addEventListener(buttonEvent, buttonFunction);
}