describe("ResetAnimal", function() {
  var bitmp;
  var diff;
  // NOTE: jasmine requires a bunch of plugins and workarounds to access HTML5 canvas elements,
  // so for simplicity and time conservation I just hard-coded them in. Please forgive me.
  var canvas_width;
  var canvas_height;

  beforeEach(function() {
    bitmp = new createjs.Bitmap();
	canvas_width = 960;
	canvas_height = 444;
  });

  it("Check for valid x y positioning", function() {
	diff = 1;
	resetAnimal(bitmp, diff);
	expect(bitmp.x).not.toBeLessThan(canvas_width);
	expect(bitmp.x).toBeLessThan(canvas_width + 500);
	expect(bitmp.y).not.toBeLessThan(0);
	expect(bitmp.y).toBeLessThan(canvas_height);
  });

  describe("difficulty & speed testing", function() {
    beforeEach(function() {
      bitmp = new createjs.Bitmap();
    });

    it("positive difficulty", function() {
      diff = 4;
	  resetAnimal(bitmp, diff);
	  expect(bitmp.speed).not.toBeLessThan(6);
	  expect(bitmp.speed).toBeLessThan(10);
    });

    it("zero difficulty (should not actually occur, but we can still test)", function() {
      diff = 0;
	  resetAnimal(bitmp, diff);
	  expect(bitmp.speed).not.toBeLessThan(2);
	  expect(bitmp.speed).toBeLessThan(6);
    });
	
	it("negative difficulty (why? no idea)", function() {
		diff = -2;
		resetAnimal(bitmp, diff);
		expect(bitmp.speed).not.toBeLessThan(0);
		expect(bitmp.speed).toBeLessThan(4);
	});
	
	it ("test for extremely high difficulty", function() {
		diff = 15000;
		resetAnimal(bitmp, diff);
		expect(bitmp.speed).not.toBeLessThan(15002);
		expect(bitmp.speed).toBeLessThan(15006);
	});
	
	it ("test for extremely negative difficulty (hey, you never know)", function () {
		diff = -15000;
		resetAnimal(bitmp, diff);
		expect(bitmp.speed).not.toBeLessThan(-14998);
		expect(bitmp.speed).toBeLessThan(-14992);
	});
	
  });
});
