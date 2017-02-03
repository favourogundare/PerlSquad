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
function RectButton(buttonText, buttonColor, buttonX, buttonY, buttonW, buttonH, buttonEvent, buttonFunction) {
	this.container        = new createjs.Container();
	this.container.x      = buttonX;
	this.container.y      = buttonY;
	this.txt   		      = new createjs.Text(buttonText, "36px Arial", "#fafafa");
	this.txt.textAlign    = "center";
	this.txt.textBaseline = "middle";
	this.txt.x 	          = buttonW/2;
	this.txt.y            = 10 + buttonH/3;
	this.outRect          = new createjs.Shape();
	this.outRect.graphics.beginFill("#212121").drawRect(0, 0, buttonW, buttonH);
	this.inRect           = new createjs.Shape();		
	this.inRect.graphics.beginFill(buttonColor).drawRect(10, 10, buttonW - 20, buttonH - 20);
	this.container.addChildAt(this.outRect, this.inRect, this.txt, 0);
	this.container.addEventListener(buttonEvent, buttonFunction);
}




