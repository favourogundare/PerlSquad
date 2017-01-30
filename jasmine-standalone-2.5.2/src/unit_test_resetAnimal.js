//tweaked version of resetAnimal used in scrollgame.js for simpler unit testing

function resetAnimal(animal, difficulty){
	var canvas = document.getElementById("main");
	animal.x = canvas.width + Math.random()*500;
	animal.y = canvas.height * Math.random()|0;
	// speed calculated based on difficulty setting - default is decently slow for younger kids (easy to tweak)
	animal.speed = (Math.random()*4)+ 2 + difficulty;
}