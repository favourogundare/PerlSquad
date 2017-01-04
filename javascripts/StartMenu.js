/**
 * @function startMenu
 */
function eventStartMenu() {
    var stage;

    /**
     * @function this.one_player
     */
    this.one_player = function(event) {
        numPlayers = 1;
        outcircle1.graphics.clear().beginFill("#212121").drawCircle(canvas.width/2 - (circle_offset + circle_offset / 2), circlesy, outcirclesr);
        outcircle2.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 - (circle_offset / 2), circlesy, outcirclesr);
        outcircle3.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 + (circle_offset / 2), circlesy, outcirclesr);
        outcircle4.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 + (circle_offset + circle_offset / 2), circlesy, outcirclesr);
        game.getStage().update();
    }

    /**
    * @function this.two_player
    */
    this.two_player = function(event) {
        numPlayers = 2;
        outcircle1.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 - (circle_offset + circle_offset / 2), circlesy, outcirclesr);
        outcircle2.graphics.clear().beginFill("#212121").drawCircle(canvas.width/2 - (circle_offset / 2), circlesy, outcirclesr);
        outcircle3.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 + (circle_offset / 2), circlesy, outcirclesr);
        outcircle4.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 + (circle_offset + circle_offset / 2), circlesy, outcirclesr);
        game.getStage().update();
    }

    /**
    * @function this.three_player
    */
    this.three_player =  function(event) {
        numPlayers = 3;
        outcircle1.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 - (circle_offset + circle_offset / 2), circlesy, outcirclesr);
        outcircle2.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 - (circle_offset / 2), circlesy, outcirclesr);
        outcircle3.graphics.clear().beginFill("#212121").drawCircle(canvas.width/2 + (circle_offset / 2), circlesy, outcirclesr);
        outcircle4.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 + (circle_offset + circle_offset / 2), circlesy, outcirclesr);
        game.getStage().update();
    }

    /**
    * @function this.four_player
    */
    this.four_player = function(event) {
        numPlayers = 4;
        outcircle1.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 - (circle_offset + circle_offset / 2), circlesy, outcirclesr);
        outcircle2.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 - (circle_offset / 2), circlesy, outcirclesr);
        outcircle3.graphics.clear().beginFill("#bdbdbd").drawCircle(canvas.width/2 + (circle_offset / 2), circlesy, outcirclesr);
        outcircle4.graphics.clear().beginFill("#212121").drawCircle(canvas.width/2 + (circle_offset + circle_offset / 2), circlesy, outcirclesr);
        game.getStage().update();
    }

    /**
    * @function this.onStart
    * Handle user clicking "start"
    */
    this.onStart = function(event) {
        game.getStage().removeChild(stage);
        game.getStage().update();
        game.progress();
    }

    /**
    *@function this.options_menu
    */
    this.options_menu = function(event) {
        game.getStage().removeChild(stage);
        game.getStage().update();
        eventOptionsMenu();
        /** options menu here */
    }

    var canvas = game.getStage();
    var stage = canvas;

    /** declare button containers */
    var p1_button;
    var p2_button;
    var p3_button;
    var p4_button;
    var start_button;
    var options_button;

    /** initialize variables */
    var incirclesr     = 40;
    var outcirclesr    = 50;
    var circlesy       = 150;
    var inrectw        = 280;
    var inrecth        = 30;
    var inrectangle1y  = 235;
    var inrectangle2y  = 310;
    var outrectw       = 300;
    var outrecth       = 50;
    var outrectangle1y = 225;
    var outrectangle2y = 300;
    var outrectanglesx = canvas.width/2 - outrectw/2;
    var inrectanglesx  = canvas.width/2 - outrectw/2 + 10;
    var circle_offset  = 2 * (outcirclesr + 10);

    /** initialize containers */
    p1_button      = new createjs.Container();
    p2_button      = new createjs.Container();
    p3_button      = new createjs.Container();
    p4_button      = new createjs.Container();
    start_button   = new createjs.Container();
    options_button = new createjs.Container();

    /** initialize shapes */
    stage             = new createjs.Container();
    game.getStage().addChild(stage);
    var outrectangles = new createjs.Graphics().beginFill("#212121").drawRect(outrectanglesx,0,outrectw,outrecth);
    var outcircle1    = new createjs.Shape();
    var outcircle2    = new createjs.Shape();
    var outcircle3    = new createjs.Shape();
    var outcircle4    = new createjs.Shape();
    var incircle1     = new createjs.Shape();
    var incircle2     = new createjs.Shape();
    var incircle3     = new createjs.Shape();
    var incircle4     = new createjs.Shape();
    var outrectangle1 = new createjs.Shape(outrectangles);
    var outrectangle2 = new createjs.Shape(outrectangles);
    var inrectangle1  = new createjs.Shape();
    var inrectangle2  = new createjs.Shape();

    /** initialize text */
    var p_num   = new createjs.Text("Pick # of Players", "36px Arial", "#212121");
    p_num.maxWidth = 1000;
    p_num.textAlign = "center";
    p_num.textBaseline = "middle";
    var p1      = new createjs.Text("1", "36px Arial", "#fafafa");
    p1.maxWidth = 1000;
    p1.textAlign = "center";
    p1.textBaseline = "middle";
    var p2      = new createjs.Text("2", "36px Arial", "#fafafa");
    p2.maxWidth = 1000;
    p2.textAlign = "center";
    p2.textBaseline = "middle";
    var p3      = new createjs.Text("3", "36px Arial", "#fafafa");
    p3.maxWidth = 1000;
    p3.textAlign = "center";
    p3.textBaseline = "middle";
    var p4      = new createjs.Text("4", "36px Arial", "#fafafa");
    p4.maxWidth = 1000;
    p4.textAlign = "center";
    p4.textBaseline = "middle";
    var start   = new createjs.Text("Start", "36px Arial", "#fafafa");
    start.maxWidth = 1000;
    start.textAlign = "center";
    start.textBaseline = "middle";
    var options = new createjs.Text("Options", "36px Arial", "#fafafa");
    options.maxWidth = 1000;
    options.textAlign = "center";
    options.textBaseline = "middle";

    /** draw remaining shapes */
    outcircle1.graphics.beginFill("#212121").drawCircle(canvas.width/2 - (circle_offset + circle_offset / 2), circlesy, outcirclesr);
    outcircle2.graphics.beginFill("#bdbdbd").drawCircle(canvas.width/2 - (circle_offset / 2), circlesy, outcirclesr);
    outcircle3.graphics.beginFill("#bdbdbd").drawCircle(canvas.width/2 + (circle_offset / 2), circlesy, outcirclesr);
    outcircle4.graphics.beginFill("#bdbdbd").drawCircle(canvas.width/2 + (circle_offset + circle_offset / 2), circlesy, outcirclesr);
    incircle1.graphics.beginFill("#f50057").drawCircle(canvas.width/2 - (circle_offset + circle_offset / 2), circlesy, incirclesr);
    incircle2.graphics.beginFill("#00b0ff").drawCircle(canvas.width/2 - (circle_offset / 2), circlesy, incirclesr);
    incircle3.graphics.beginFill("#00e676").drawCircle(canvas.width/2 + (circle_offset / 2), circlesy, incirclesr);
    incircle4.graphics.beginFill("#ff9100").drawCircle(canvas.width/2 + (circle_offset + circle_offset / 2), circlesy, incirclesr);
    inrectangle1.graphics.beginFill("#f44336").drawRect(inrectanglesx, inrectangle1y, inrectw, inrecth);
    inrectangle2.graphics.beginFill("#d500f9").drawRect(inrectanglesx, inrectangle2y, inrectw, inrecth);

    /** set remaining shape coords */
    outrectangle1.y = outrectangle1y;
    outrectangle2.y = outrectangle2y;

    /** set text coords */
    p_num.x   = canvas.width / 2;
    p_num.y   = circlesy - 100;
    p1.x      = canvas.width/2 - (circle_offset + circle_offset / 2);
    p1.y      = circlesy;
    p2.x      = canvas.width/2 - (circle_offset / 2);
    p2.y      = circlesy;
    p3.x      = canvas.width/2 + (circle_offset / 2);
    p3.y      = circlesy;
    p4.x      = canvas.width/2 + (circle_offset + circle_offset / 2);
    p4.y      = circlesy;
    start.x   = canvas.width / 2;
    start.y   = inrectangle1y + outrecth / 3;
    options.x = canvas.width / 2;
    options.y = inrectangle2y + outrecth / 3;

    /** add objects to stage */
    p1_button.addChildAt(outcircle1, incircle1, p1, 0);
    p2_button.addChildAt(outcircle2, incircle2, p2, 0);
    p3_button.addChildAt(outcircle3, incircle3, p3, 0);
    p4_button.addChildAt(outcircle4, incircle4, p4, 0);
    start_button.addChildAt(outrectangle1, inrectangle1, start, 0);
    options_button.addChildAt(outrectangle2, inrectangle2, options, 0);
    stage.addChildAt(p_num, p1_button, p2_button, p3_button, p4_button, start_button, options_button, 0);
    game.getStage().update();
    p1_button.addEventListener("click", this.one_player);
    p2_button.addEventListener("click", this.two_player);
    p3_button.addEventListener("click", this.three_player);
    p4_button.addEventListener("click", this.four_player);
    options_button.addEventListener("click", this.options_menu);
    start_button.addEventListener("click", this.onStart);
    game.getStage().update();
}