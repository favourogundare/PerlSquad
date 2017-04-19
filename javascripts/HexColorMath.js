/**
 *  @function addHexColor
 *  @param c1
 *  @param c2
 *  Adds two color hex values together.
 */
function addHexColor(c1, c2) {
	var hexStr = (parseInt(c1, 16) + parseInt(c2, 16)).toString(16);
	while (hexStr.length < 6) { hexStr = '0' + hexStr; } // Zero pad.
	return hexStr;
}

/**
 *  @function minusHexColor
 *  @param c1
 *  @param c2
 *  Subtracts one color hex value c2 from
 *  another c1. Not designed to handle
 *  negatives.
 */
function minusHexColor(c1, c2) {
	var hexStr = (parseInt(c1, 16) - parseInt(c2, 16)).toString(16);
	while (hexStr.length < 6) { hexStr = '0' + hexStr; } // Zero pad.
	return hexStr;
}