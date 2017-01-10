function eventOptionsMenu() {
	var category;
    this.add_clicked = function(event){
        /*var choose_biome_title_text = new createjs.Text("Choose Biome for Adding Objects", "48px Arial", "#212121");
        options_title.maxWidth = 1000;
        options_title.textAlign = "center";
        options_title.textBaseline = "middle";
        game.startMenu.choose_biome();*/
        game.getStage().removeChild(options_page);
        eventSelectCategory("add");
    }
  
    this.edit_clicked = function(event){
        /*var choose_biome_title_text = new createjs.Text("Choose Biome for Editing Objects", "48px Arial", "#212121");
        options_title.maxWidth = 1000;
        options_title.textAlign = "center";
        options_title.textBaseline = "middle";
        game.startMenu.choose_biome();*/
        game.getStage().removeChild(options_page);
        eventSelectCategory("edit");
    }
  
    this.done_clicked = function(event){
        game.getStage().removeChild(options_page);
        eventStartMenu();
    }
        
    var canvas = game.getStage();
    var options_page = canvas;
        
    //options_page button height changes
    var inrectw        = 280;
    var inrecth        = 30;
    var outrectw       = 300;
    var outrecth       = 50;
    var inrectangle1y  = 160;
    var inrectangle2y  = 235;
    var inrectangle3y  = 310;
    var outrectangle1y = 150;
    var outrectangle2y = 225;
    var outrectangle3y = 300;
    var outrectanglesx = canvas.width/2 - outrectw/2;
    var inrectanglesx  = canvas.width/2 - outrectw/2 + 10;

    //declare options menu button containers
    var add_button;
    var edit_button;
    var done_button;

    //initialize options menu button containers
    add_button  = new createjs.Container();
    edit_button = new createjs.Container();
    done_button = new createjs.Container();

    //declare options menu shapes
    options_page = new createjs.Container();
    game.getStage().addChild(options_page);
    var outrectangles = new createjs.Graphics().beginFill("#212121").drawRect(outrectanglesx,0,outrectw,outrecth);
    var outrectangle1 = new createjs.Shape(outrectangles);
    var outrectangle2 = new createjs.Shape(outrectangles);
    var outrectangle3 = new createjs.Shape(outrectangles);
    var inrectangle1  = new createjs.Shape();
    var inrectangle2  = new createjs.Shape();
    var inrectangle3  = new createjs.Shape();

    //initialize options menu text 
    var options_title   = new createjs.Text("Options Menu", "48px Arial", "#212121");
    options_title.maxWidth = 1000;
    options_title.textAlign = "center";
    options_title.textBaseline = "middle";
    var add   = new createjs.Text("Add Objects", "36px Arial", "#fafafa");
    add.maxWidth = 1000;
    add.textAlign = "center";
    add.textBaseline = "middle";
    var edit = new createjs.Text("Edit Objects", "36px Arial", "#fafafa");
    edit.maxWidth = 1000;
    edit.textAlign = "center";
    edit.textBaseline = "middle";
    var done = new createjs.Text("Done", "36px Arial", "#fafafa");
    done.maxWidth = 1000;
    done.textAlign = "center";
    done.textBaseline = "middle";

    //draw remaining options menu shapes
    inrectangle1.graphics.beginFill("#00e676").drawRect(inrectanglesx, inrectangle1y, inrectw, inrecth);
    inrectangle2.graphics.beginFill("#ff9100").drawRect(inrectanglesx, inrectangle2y, inrectw, inrecth);
    inrectangle3.graphics.beginFill("#f44336").drawRect(inrectanglesx, inrectangle3y, inrectw, inrecth);

    //set remaining shape coords
    outrectangle1.y = outrectangle1y;
    outrectangle2.y = outrectangle2y;
    outrectangle3.y = outrectangle3y;
  
    //set text coords
    options_title.x = canvas.width / 2;
    options_title.y = outrectangle1y - outrecth;
    add.x           = canvas.width / 2;
    add.y           = inrectangle1y + outrecth / 3;
    edit.x          = canvas.width / 2;
    edit.y          = inrectangle2y + outrecth / 3;
    done.x          = canvas.width / 2;
    done.y          = inrectangle3y + outrecth / 3;
  
    add_button.addChildAt(outrectangle1, inrectangle1, add, 0);
    edit_button.addChildAt(outrectangle2, inrectangle2, edit, 0);
    done_button.addChildAt(outrectangle3, inrectangle3, done, 0);
    options_page.addChildAt(options_title, add_button, edit_button, done_button, 0);
  
    game.getStage().update();
    add_button.addEventListener("click", this.add_clicked);
    edit_button.addEventListener("click", this.edit_clicked);
    done_button.addEventListener("click", this.done_clicked);
}

function eventAddItem() {
	console.log("adding");
	//Description.style.display = 'inline';
	var redRectButton = new game.RectButton("Works", "#f44336", game.getStage().width/2 - 150, 225, 300, 50);
	console.log(redRectButton.container);
	game.getStage().addChild(redRectButton.container);
	game.getStage().update();
}

function eventEditItem() {
	console.log("editing");
}