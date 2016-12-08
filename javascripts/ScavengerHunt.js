/**  
 * @function eventScavengerHunt
 * Item gathering portion of game.
 */
function eventScavengerHunt() {
    var BOX_WIDTH  = 760;
    var BOX_HEIGHT = 244;
    var remaining  = 5;
    var scavHuntContainer;
    var outcircle1;
    var outcircle2;
    var outcircle3;
    var outcircle4;
    var outcircle5;
    var selected;
    var scavHuntAnimal;
    var scavHuntGrowingSeason;
    var scavHuntPlantLife;
    var scavHuntPrecipitation;
    var scavHuntLatitude;
    var scavHuntBackground;
    var incircle1;
    var incircle2;
    var incircle3;
    var incircle4;
    var incircle5;
    var scavHuntAnimalText;
    var scavHuntGrowingSeasonText;
    var scavHuntPlantLifeText;
    var scavHuntPrecipitationText;
    var scavHuntLatitudeText;
    var scavHuntOK;
    var infoContainer;
    var scavHuntOK2;
    var selectFrom = [1, 2, 3, 4, 5];
    var minSort;
    var color;
    
    /**  
     * @function this.onAnimal
     * Extended function that handles when scavHuntAnimal container is clicked by highlighting "Animal" button.
     */
    this.onAnimal =  function(event){
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
    this.onGrowingSeason = function(event){
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
    this.onPlantLife = function(event){
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
    this.onPrecipitation = function(event){
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
    this.onLatitude = function(event){
        selected = 5;
        outcircle1.graphics.clear().beginFill("#bdbdbd").drawCircle(1 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle2.graphics.clear().beginFill("#bdbdbd").drawCircle(2 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle3.graphics.clear().beginFill("#bdbdbd").drawCircle(3 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle4.graphics.clear().beginFill("#bdbdbd").drawCircle(4 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        outcircle5.graphics.clear().beginFill("#616161").drawCircle(5 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        game.getStage().update();
    }
    
    
    /** 
     * @function this.onOK2
     * Extended function that handles when Item Info OK2 is clicked by moving the default highlighted/selected 
     * option to the first button still available if there are remaining items or by removing the infoContainer 
     * and calling game.progress().
     */
    this.onOK2 = function(event){
        if (remaining){
            game.getStage().removeChild(infoContainer);
            
            minSort = selectFrom.concat().sort();
            color = "#616161";
            selected = minSort[0];
            for (i = 0; i < remaining; i++){
                switch(minSort[i]) {
                    case 1:
                        outcircle1.graphics.clear().beginFill(color).drawCircle(1 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
                        break;
                    case 2:
                        outcircle2.graphics.clear().beginFill(color).drawCircle(2 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
                        break;
                    case 3:
                        outcircle3.graphics.clear().beginFill(color).drawCircle(3 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
                        break;
                    case 4:
                        outcircle4.graphics.clear().beginFill(color).drawCircle(4 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
                        break;
                    case 5:
                        outcircle5.graphics.clear().beginFill(color).drawCircle(5 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
                        break;
                }
                color = "#bdbdbd";
            }
            
            game.getStage().addChild(scavHuntContainer);
            game.getStage().update();
        }
        else {
            game.getStage().removeChild(infoContainer);
            game.progress();
        }
    }
	
    /** 
     * @function this.onOK
     * Extended function that handles when scavenger hunt OK is clicked by displaying the corresponding item info and removing the selected item from available options.
     */	
    this.onOK = function(event) {
        infoContainer = new createjs.Container();
        infoContainer.x = 100;
        infoContainer.y = 100;
        //OK section
        scavHuntBackground2 = new createjs.Shape();
        scavHuntBackground2.graphics.beginFill("#000000").drawRect(0, 0, BOX_WIDTH, BOX_HEIGHT);
        scavHuntOK2 = new createjs.Text("OK", "20px Arial", "#FFFFFF");
        scavHuntOK2.x = 9 * BOX_WIDTH / 10;
        scavHuntOK2.y = 4 * BOX_HEIGHT / 5;
        scavHuntOK2.addEventListener("click", this.onOK2);
        game.getStage().removeChild(scavHuntContainer);
        remaining = remaining - 1;
        if (selected == 1){
            scavHuntContainer.removeChild(scavHuntAnimal);
            selectFrom[0] = 6;
        }
        else if (selected == 2){
            scavHuntContainer.removeChild(scavHuntGrowingSeason);
            selectFrom[1] = 6;
        }
        else if (selected == 3){
            scavHuntContainer.removeChild(scavHuntPlantLife);
            selectFrom[2] = 6;
        }
        else if (selected == 4){
            scavHuntContainer.removeChild(scavHuntPrecipitation);
            selectFrom[3] = 6;
        }
        else if (selected == 5){
            scavHuntContainer.removeChild(scavHuntLatitude);
            selectFrom[4] = 6;
        }
        
        infoContainer.addChildAt(scavHuntBackground2, scavHuntOK2, 0);
        game.getStage().addChild(infoContainer);
        game.getStage().update();
    }
		
    /** 
     * @function this.handleDblClick
     * Extended function that handles double clicking on the player by proceeding with the scavenger hunt portion of the game.
     */
    this.handleDblClick = function(event) {
        /** Delete old text */
        game.getMainContainer().removeChild(text);
        
        /** scavHunt container section */
        scavHuntContainer = new createjs.Container();
        scavHuntContainer.x = 100;
        scavHuntContainer.y = 100;
        
        /** background for scavHunt container section */
        scavHuntBackground = new createjs.Shape();
        scavHuntBackground.graphics.beginFill("#000000").drawRect(0, 0, BOX_WIDTH, BOX_HEIGHT);
        
        /*var scavHuntAnimalPic = new createjs.Bitmap("images/tiger.png");
        scavHuntAnimalPic.x = 50;
        scavHuntAnimalPic.y = 25;
        scavHuntContainer.addChild(scavHuntAnimalPic);
        var scavHuntDivider = new createjs.Shape();
        scavHuntDivider.graphics.beginFill("#FFFFFF").drawRect(269, 43, 3, 169);
        scavHuntContainer.addChild(scavHuntDivider);
        var scavHuntText = new createjs.Text("Text about a tiger...", "20px Arial", "#FFFFFF");
        scavHuntText.x = 300;
        scavHuntText.y = 122;
        scavHuntContainer.addChild(scavHuntText);*/
        
        /** initialize button containers */
        scavHuntAnimal        = new createjs.Container();
        scavHuntGrowingSeason = new createjs.Container();
        scavHuntPlantLife     = new createjs.Container();
        scavHuntPrecipitation = new createjs.Container();
        scavHuntLatitude      = new createjs.Container();
        
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
        scavHuntAnimalText = new createjs.Text("Animal", "20px Arial", "#FFFFFF");
        scavHuntAnimalText.x = 1 * BOX_WIDTH / 6;
        scavHuntAnimalText.y = (BOX_HEIGHT / 3) + 70;
        scavHuntAnimalText.maxWidth = 1000;
        scavHuntAnimalText.textAlign = "center";
        scavHuntAnimalText.textBaseline = "middle";
        scavHuntAnimal.addEventListener("click", this.onAnimal);
        scavHuntAnimal.addChildAt(outcircle1, incircle1, scavHuntAnimalText, 0);
        
        /** growing season button container section */
        outcircle2.graphics.beginFill("#bdbdbd").drawCircle(2 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        incircle2.graphics.beginFill("#ff9100").drawCircle(2 * BOX_WIDTH/6, BOX_HEIGHT/3, 40);
        scavHuntGrowingSeasonText = new createjs.Text("Growing Season", "20px Arial", "#FFFFFF");
        scavHuntGrowingSeasonText.x = 2 * BOX_WIDTH / 6;
        scavHuntGrowingSeasonText.y = (BOX_HEIGHT / 3) + 70;
        scavHuntGrowingSeasonText.maxWidth = 1000;
        scavHuntGrowingSeasonText.textAlign = "center";
        scavHuntGrowingSeasonText.textBaseline = "middle";
        scavHuntGrowingSeason.addEventListener("click", this.onGrowingSeason);
        scavHuntGrowingSeason.addChildAt(outcircle2, incircle2, scavHuntGrowingSeasonText, 0);
        
        /** plant life button container section */
        outcircle3.graphics.beginFill("#bdbdbd").drawCircle(3 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        incircle3.graphics.beginFill("#00e676").drawCircle(3 * BOX_WIDTH/6, BOX_HEIGHT/3, 40);
        scavHuntPlantLifeText = new createjs.Text("Plant Life", "20px Arial", "#FFFFFF");
        scavHuntPlantLifeText.x = 3 * BOX_WIDTH / 6;
        scavHuntPlantLifeText.y = (BOX_HEIGHT / 3) + 70;
        scavHuntPlantLifeText.maxWidth = 1000;
        scavHuntPlantLifeText.textAlign = "center";
        scavHuntPlantLifeText.textBaseline = "middle";
        scavHuntPlantLife.addEventListener("click", this.onPlantLife);
        scavHuntPlantLife.addChildAt(outcircle3, incircle3, scavHuntPlantLifeText, 0);
        
        /** precipitation button container section */
        outcircle4.graphics.beginFill("#bdbdbd").drawCircle(4 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        incircle4.graphics.beginFill("#00b0ff").drawCircle(4 * BOX_WIDTH/6, BOX_HEIGHT/3, 40);
        scavHuntPrecipitationText = new createjs.Text("Precipitation", "20px Arial", "#FFFFFF");
        scavHuntPrecipitationText.x = 4 * BOX_WIDTH / 6;
        scavHuntPrecipitationText.y = (BOX_HEIGHT / 3) + 70;
        scavHuntPrecipitationText.maxWidth = 1000;
        scavHuntPrecipitationText.textAlign = "center";
        scavHuntPrecipitationText.textBaseline = "middle";
        scavHuntPrecipitation.addEventListener("click", this.onPrecipitation);
        scavHuntPrecipitation.addChildAt(outcircle4, incircle4, scavHuntPrecipitationText, 0);
        
        /** latitude button container section */
        outcircle5.graphics.beginFill("#bdbdbd").drawCircle(5 * BOX_WIDTH/6, BOX_HEIGHT/3, 50);
        incircle5.graphics.beginFill("#d500f9").drawCircle(5 * BOX_WIDTH/6, BOX_HEIGHT/3, 40);
        scavHuntLatitudeText = new createjs.Text("Latitude", "20px Arial", "#FFFFFF");
        scavHuntLatitudeText.x = 5 * BOX_WIDTH / 6;
        scavHuntLatitudeText.y = (BOX_HEIGHT / 3) + 70;
        scavHuntLatitudeText.maxWidth = 1000;
        scavHuntLatitudeText.textAlign = "center";
        scavHuntLatitudeText.textBaseline = "middle";
        scavHuntLatitude.addChildAt(outcircle5, incircle5, scavHuntLatitudeText, 0);
        scavHuntLatitude.addEventListener("click", this.onLatitude);
        
        /** OK button section */
        scavHuntOK = new createjs.Text("OK", "20px Arial", "#FFFFFF");
        scavHuntOK.x = 9 * BOX_WIDTH / 10;
        scavHuntOK.y = 4 * BOX_HEIGHT / 5;
        scavHuntOK.addEventListener("click", this.onOK);
        
        /** Build and update stage */
        scavHuntContainer.addChildAt(scavHuntBackground, scavHuntAnimal, scavHuntGrowingSeason, scavHuntPlantLife, scavHuntPrecipitation, scavHuntLatitude, scavHuntOK, 0);
        game.getStage().addChild(scavHuntContainer);
        game.getStage().update();
    }

    /** What will be executed when the GameEvent function pointer is triggered */
    var text = new createjs.Text("Double Click Now!", "20px Arial", "#ff7700");
    text.x = 350;
    text.y = 350;
    game.getMainContainer().addChild(text);
    var playerIcon = game.getCurrentPlayer().getIcon();
    playerIcon.x = playerIcon.x + 40 * (game.getCurrentTurn() + 1);
    playerIcon.y = playerIcon.y + 100;
    playerIcon.addEventListener("dblclick", this.handleDblClick);
    game.getStage().update();
}