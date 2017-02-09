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

function processFile(e) {
	var file = e.target.result,
		results;
	if (file && file.length) {
		results = file.split("\n");
		$('#name').val(results[0]);
		$('#age').val(results[1]);
	}
}