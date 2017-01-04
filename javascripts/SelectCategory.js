/**  
 * @function eventScavengerHunt
 * Item gathering portion of game.
 */
function eventSelectCategory() {
    var BOX_WIDTH  = 760;
    var BOX_HEIGHT = 244;
    var SelectCategoryContainer;
    var outcircle1;
    var outcircle2;
    var outcircle3;
    var outcircle4;
    var outcircle5;
    var selected;
    var item;
    /*
    var scavHuntAnimal;
    var scavHuntGrowingSeason;
    var scavHuntPlantLife;
    var scavHuntPrecipitation;
    var scavHuntLatitude;
    var scavHuntBackground;
    */
    var option1;
    var option2;
    var option3;
    var option4;
    var option5;
    var selectBackground;
    var incircle1;
    var incircle2;
    var incircle3;
    var incircle4;
    var incircle5;
    var option1Text;
    var option2Text;
    var option3Text;
    var option4Text;
    var option5Text;
    var selectCategoryOK;
    var category;
    
    /**  
     * @function this.onAnimal
     * Extended function that handles when scavHuntAnimal container is clicked by highlighting "Animal" button.
     */
    this.on1 =  function(event){
        selected = 1;
        outcircle1.graphics.clear().beginFill("#616161").drawCircle(1 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle2.graphics.clear().beginFill("#bdbdbd").drawCircle(2 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle3.graphics.clear().beginFill("#bdbdbd").drawCircle(3 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle4.graphics.clear().beginFill("#bdbdbd").drawCircle(4 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle5.graphics.clear().beginFill("#bdbdbd").drawCircle(5 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        game.getStage().update();
    }
    
    /** 
     * @function this.onGrowingSeason
     * Extended function that handles when scavHuntGrowingSeason container is clicked by highlighting "Growing Season" button.
     */
    this.on2 = function(event){
        selected = 2;
        outcircle1.graphics.clear().beginFill("#bdbdbd").drawCircle(1 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle2.graphics.clear().beginFill("#616161").drawCircle(2 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle3.graphics.clear().beginFill("#bdbdbd").drawCircle(3 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle4.graphics.clear().beginFill("#bdbdbd").drawCircle(4 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle5.graphics.clear().beginFill("#bdbdbd").drawCircle(5 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        game.getStage().update();
    }
    
    /** 
     * @function this.onPlantLife
     * Extended function that handles when scavHuntPlantLife container is clicked by highlighting "Plant Life" button.
     */
    this.on3 = function(event){
        selected = 3;
        outcircle1.graphics.clear().beginFill("#bdbdbd").drawCircle(1 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle2.graphics.clear().beginFill("#bdbdbd").drawCircle(2 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle3.graphics.clear().beginFill("#616161").drawCircle(3 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle4.graphics.clear().beginFill("#bdbdbd").drawCircle(4 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle5.graphics.clear().beginFill("#bdbdbd").drawCircle(5 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        game.getStage().update();
    }
    
    /** 
     * @function this.onPrecipitation
     * Extended function that handles when scavHuntPrecipitation container is clicked by highlighting "Precipitation" button.
     */
    this.on4 = function(event){
        selected = 4;
        outcircle1.graphics.clear().beginFill("#bdbdbd").drawCircle(1 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle2.graphics.clear().beginFill("#bdbdbd").drawCircle(2 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle3.graphics.clear().beginFill("#bdbdbd").drawCircle(3 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle4.graphics.clear().beginFill("#616161").drawCircle(4 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle5.graphics.clear().beginFill("#bdbdbd").drawCircle(5 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        game.getStage().update();
    }
    
    
    /** 
     * @function this.onLatitude
     * Extended function that handles when scavHuntLatitude container is clicked by highlighting "Latitude" button.
     */
    this.on5 = function(event){
        selected = 5;
        outcircle1.graphics.clear().beginFill("#bdbdbd").drawCircle(1 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle2.graphics.clear().beginFill("#bdbdbd").drawCircle(2 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle3.graphics.clear().beginFill("#bdbdbd").drawCircle(3 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle4.graphics.clear().beginFill("#bdbdbd").drawCircle(4 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle5.graphics.clear().beginFill("#616161").drawCircle(5 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        game.getStage().update();
    }
	
    /** 
     * @function this.onOK
     * Extended function that handles when scavenger hunt OK is clicked by displaying the corresponding item info and removing the selected item from available options.
     */	
    this.onOK = function(event) {
        if (category == 1) {
            item = selected;
            option1Text.text = "Deciduous Forest";
            option2Text.text = "Desert";
            option3Text.text = "Grassland";
            option4Text.text = "Rainforest";
            option5Text.text = "Tundra";
            category++;
            selected = 1;
            outcircle1.graphics.clear().beginFill("#616161").drawCircle(1 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
            outcircle2.graphics.clear().beginFill("#bdbdbd").drawCircle(2 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
            outcircle3.graphics.clear().beginFill("#bdbdbd").drawCircle(3 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
            outcircle4.graphics.clear().beginFill("#bdbdbd").drawCircle(4 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
            outcircle5.graphics.clear().beginFill("#bdbdbd").drawCircle(5 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
            game.getStage().update();
        } else {
            console.log("selected[" + item + "][" + selected + "]");
            game.getStage().removeChild(SelectCategoryContainer);
            eventStartMenu();
        }
    }
    
    category = 1;
    
    /** scavHunt container section */
    SelectCategoryContainer = new createjs.Container();
    SelectCategoryContainer.x = 100;
    SelectCategoryContainer.y = 100;
    
    /** background for scavHunt container section */
    selectBackground = new createjs.Shape();
    selectBackground.graphics.beginFill("#000000").drawRect(0, 0, BOX_WIDTH, BOX_HEIGHT);
    
    /** initialize button containers */
    option1 = new createjs.Container();
    option2 = new createjs.Container();
    option3 = new createjs.Container();
    option4 = new createjs.Container();
    option5 = new createjs.Container();
    
    /** initialize button shapes */
    outcircle1    = new createjs.Shape();
    outcircle2    = new createjs.Shape();
    outcircle3    = new createjs.Shape();
    outcircle4    = new createjs.Shape();
    outcircle5    = new createjs.Shape();
    incircle1     = new createjs.Shape();
    incircle2     = new createjs.Shape();
    incircle3     = new createjs.Shape();
    incircle4     = new createjs.Shape();
    incircle5     = new createjs.Shape();
    
    /** initial default selection */
    selected = 1;
    
    /** animal button container section*/
    outcircle1.graphics.beginFill("#616161").drawCircle(1 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
    incircle1.graphics.beginFill("#f44336").drawCircle(1 * BOX_WIDTH/6, BOX_HEIGHT/3, 40);
    option1Text = new createjs.Text("Animal", "20px Arial", "#FFFFFF");
    option1Text.x = 1 * BOX_WIDTH / 6;
    option1Text.y = (BOX_HEIGHT / 3) + 70;
    option1Text.maxWidth = 1000;
    option1Text.textAlign = "center";
    option1Text.textBaseline = "middle";
    option1.addEventListener("click", this.on1);
    option1.addChildAt(outcircle1, incircle1, option1Text, 0);
    
    /** growing season button container section */
    outcircle2.graphics.beginFill("#bdbdbd").drawCircle(2 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
    incircle2.graphics.beginFill("#ff9100").drawCircle(2 * BOX_WIDTH/6, BOX_HEIGHT/3, 40);
    option2Text = new createjs.Text("Growing Season", "20px Arial", "#FFFFFF");
    option2Text.x = 2 * BOX_WIDTH / 6;
    option2Text.y = (BOX_HEIGHT / 3) + 70;
    option2Text.maxWidth = 1000;
    option2Text.textAlign = "center";
    option2Text.textBaseline = "middle";
    option2.addEventListener("click", this.on2);
    option2.addChildAt(outcircle2, incircle2, option2Text, 0);
    
    /** plant life button container section */
    outcircle3.graphics.beginFill("#bdbdbd").drawCircle(3 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
    incircle3.graphics.beginFill("#00e676").drawCircle(3 * BOX_WIDTH/6, BOX_HEIGHT/3, 40);
    option3Text = new createjs.Text("Plant Life", "20px Arial", "#FFFFFF");
    option3Text.x = 3 * BOX_WIDTH / 6;
    option3Text.y = (BOX_HEIGHT / 3) + 70;
    option3Text.maxWidth = 1000;
    option3Text.textAlign = "center";
    option3Text.textBaseline = "middle";
    option3.addEventListener("click", this.on3);
    option3.addChildAt(outcircle3, incircle3, option3Text, 0);
    
    /** precipitation button container section */
    outcircle4.graphics.beginFill("#bdbdbd").drawCircle(4 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
    incircle4.graphics.beginFill("#00b0ff").drawCircle(4 * BOX_WIDTH/6, BOX_HEIGHT/3, 40);
    option4Text = new createjs.Text("Precipitation", "20px Arial", "#FFFFFF");
    option4Text.x = 4 * BOX_WIDTH / 6;
    option4Text.y = (BOX_HEIGHT / 3) + 70;
    option4Text.maxWidth = 1000;
    option4Text.textAlign = "center";
    option4Text.textBaseline = "middle";
    option4.addEventListener("click", this.on4);
    option4.addChildAt(outcircle4, incircle4, option4Text, 0);
    
    /** latitude button container section */
    outcircle5.graphics.beginFill("#bdbdbd").drawCircle(5 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
    incircle5.graphics.beginFill("#d500f9").drawCircle(5 * BOX_WIDTH/6, BOX_HEIGHT/3, 40);
    option5Text = new createjs.Text("Latitude", "20px Arial", "#FFFFFF");
    option5Text.x = 5 * BOX_WIDTH / 6;
    option5Text.y = (BOX_HEIGHT / 3) + 70;
    option5Text.maxWidth = 1000;
    option5Text.textAlign = "center";
    option5Text.textBaseline = "middle";
    option5.addEventListener("click", this.on5);
    option5.addChildAt(outcircle5, incircle5, option5Text, 0);
    
    /** OK button section */
    selectCategoryOK = new createjs.Text("OK", "20px Arial", "#FFFFFF");
    selectCategoryOK.x = 9 * BOX_WIDTH / 10;
    selectCategoryOK.y = 4 * BOX_HEIGHT / 5;
    selectCategoryOK.addEventListener("click", this.onOK);
    
    /** Build and update stage */
    SelectCategoryContainer.addChildAt(selectBackground, option1, option2, option3, option4, option5, selectCategoryOK, 0);
    game.getStage().addChild(SelectCategoryContainer);
    game.getStage().update();
}