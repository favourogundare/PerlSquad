var mybutton;
describe("RectButton", function() {
	var imgsrc;
	// NOTE: jasmine requires a bunch of plugins and workarounds to access HTML5 canvas elements,
	// so for simplicity and time conservation I just hard-coded them in. Please forgive me.
	var canvas_width;
	var canvas_height;
	




	it("Check for correct mybutton settings:", function() {
		mybutton = new RectButton("mybuttonText", "#ffffff", 10, 20, 30, 45, "click", hello);
		mybutton.container.dispatchEvent("click");
		console.log("Return value: " + mybutton.returnValue);
		expect(mybutton.container.x).toBe(10);
		expect(mybutton.container.y).toBe(20);
		expect(mybutton.txt.text).toBe("mybuttonText");
		expect(mybutton.txt.font).toBe("36px Arial");
		expect(mybutton.txt.color).toBe("#fafafa");
		expect(mybutton.txt.textAlign).toBe("center");
		expect(mybutton.txt.textBaseline).toBe("middle");
		expect(mybutton.txt.x).toBe(15);
		expect(mybutton.txt.y).toBe(25);
		//expect(result).toBe("Hello!");
		expect(mybutton.txt.parent).toBe(mybutton.container);
		expect(mybutton.outRect.parent).toBe(mybutton.container);
		expect(mybutton.inRect.parent).toBe(mybutton.container);
	});
});

function hello() {
	mybutton.returnValue = "Hello!";
} 