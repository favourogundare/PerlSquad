//declare options menu button containers
var add_button;
var edit_button;
var done_button;
var options_page;
var options_title;
var category;
function eventOptionsMenu() {
    add_button   = new RectButton("Add", "#00e676", game.getStage().width/2 - 150, 150, 300, 50, "click", add_clicked);
    edit_button   = new RectButton("Edit", "#ff9100", game.getStage().width/2 - 150, 225, 300, 50, "click", edit_clicked);
    done_button = new RectButton("Done", "#f44336", game.getStage().width/2 - 150, 300, 300, 50, "click", done_clicked);    

    //declare options menu shapes
    options_page = new createjs.Container();

    //initialize options menu text 
    options_title   = new createjs.Text("Options Menu", "48px Arial", "#212121");
    options_title.maxWidth = 1000;
    options_title.textAlign = "center";
    options_title.textBaseline = "middle";
    options_title.x = game.getStage().width / 2;
    options_title.y = 100;
    
    options_page.addChildAt(options_title, add_button.container, edit_button.container, done_button.container, 0);
    game.getStage().addChild(options_page); 
    game.getStage().update();
}

function add_clicked(){
    /*var choose_biome_title_text = new createjs.Text("Choose Biome for Adding Objects", "48px Arial", "#212121");
    options_title.maxWidth = 1000;
    options_title.textAlign = "center";
    options_title.textBaseline = "middle";
    game.startMenu.choose_biome();*/
    options_page.removeAllChildren();
    eventSelectCategory("add");
}

function edit_clicked(){
    /*var choose_biome_title_text = new createjs.Text("Choose Biome for Editing Objects", "48px Arial", "#212121");
    options_title.maxWidth = 1000;
    options_title.textAlign = "center";
    options_title.textBaseline = "middle";
    game.startMenu.choose_biome();*/
    options_page.removeAllChildren();
    eventSelectCategory("edit");
}

function done_clicked(){
    game.getStage().removeChild(options_page);
    eventStartMenu();
}

/**
 *  @function eventAddItem
 *  Section to add items to the game.
 */
function eventAddItem() {
	Description.style.display = 'inline';
    ImageSource.style.display = 'inline';
    var done_button = new RectButton("Done", "#00e676", game.getStage().width/2 - 150, 295, 300, 50, "click", addDone);
    var cancel_button = new RectButton("Cancel", "#f44336", game.getStage().width/2 - 150, 370, 300, 50, "click", addCancel);
    options_page.addChild(done_button.container, cancel_button.container);
	game.getStage().update();
}

function addDone() {
    console.log(Description.value);
    console.log(ImageSource.value);
    Description.value = '';
    ImageSource.value = '';
    Description.style.display = 'none';
    ImageSource.style.display = 'none';
    options_page.removeAllChildren();
    eventOptionsMenu();
}

function addCancel() {
    Description.value = '';
    ImageSource.value = '';
    Description.style.display = 'none';
    ImageSource.style.display = 'none';
    options_page.removeAllChildren();
    eventOptionsMenu();
}

/**
 *  @function eventEditItem
 *  section to edit the items already in the game.
 */
function eventEditItem() {
	console.log("editing");
}