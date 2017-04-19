function init() {
	var fileInput = $('#files');
	var uploadButton = $('#upload');

	uploadButton.on('click', function() {
		if (!window.FileReader) {
			alert('Your browser is not supported');
			return false;
		}
		var input = fileInput.get(0);

		// Create a reader object
		var reader = new FileReader();
		if (input.files.length) {
			var textFile = input.files[0];
			// Read the file
			reader.readAsText(textFile);
			// When it's loaded, process it
			$(reader).on('load', processFile);
		} else {
			alert('Please upload a file before continuing')
		} 
	});
}

function processFile(event) {
	var file = event.target.result, results;
	var numImages;
	var numDescriptions;
	if (file && file.length) {
		results = file.split("\n");
		for (var i=0; i<results.length; i++) {
			if (isNumber(results[i])) {
				console.log("New Biome!!!!!!!!!");
				numImages = results[i];
				while(numImages>0) {
					console.log("Image:" + results[++i]);
					numDescriptions = results[++i];
					while(numDescriptions>0) {
						console.log("Description" + results[++i])
						numDescriptions--;
					}
					numImages--;
				}
			}
		}
	}
}

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}