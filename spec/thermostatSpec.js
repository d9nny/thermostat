describe('Thermostat', function() {

	var thermostat;
	var temp = 20;

	beforeEach(function() {
		thermostat = new Thermostat();
	});

	describe('#temperature', function () {
		it('has a default temprature on initialization', function () {
			expect(thermostat.temperature()).toBe(temp);
		});
	});

	describe("#up", function() {
		it('allows you to increase the temperature', function() {
			thermostat.up();
			expect(thermostat.temperature()).toBe(temp + 1);
		});

		it('prevents you increasing the temp if powerSaving is true', function() {
			for (var i = 0; i < 5; i++) {
				thermostat.up();
			};
			expect(function() {thermostat.up();}).toThrow('In power saving mode. Max temperature reached');
		});
		it('prevents you increasing the temp past 32 degrees if powerSaving is false', function() {
			thermostat.powerSavingModeOff();
			for (var i = 0; i < 12; i++) {
				thermostat.up();
			};
			expect(function() {thermostat.up();}).toThrow('Maximum temperature reached');
		});
	});
	describe("#down", function() {
		it('allow you to decrease the temperature', function () {
			thermostat.down();
			expect(thermostat.temperature()).toBe(temp - 1);
		});
		it('prevents you reducing the temperature below ten degrees', function() {
			for (var i = 0; i < 10; i++) {
				thermostat.down();
			};
			expect(function() {thermostat.down();}).toThrow('Min temperature reached');
		});
	});

	describe("#powerSavingModeOn", function() {
		it('turning on', function() {
			expect(thermostat.powerSavingModeOn()).toBe(true);
		});
	});

	describe('#powerSavingModeOff', function() {
		it('turning off', function() {
			expect(thermostat.powerSavingModeOff()).toBe(false);
		});
	});

	describe('#resetButton', function() {
		it('resets the temperature to 20', function() {
			thermostat.resetButton();
			expect(thermostat.temperature()).toBe(temp);
		});
	});

	describe('#energyConsumption', function() {
		it('changes to low energy consumption if less than 18 degrees', function() {
			thermostat.down();
			thermostat.down();
			expect(thermostat.energyConsumption()).toEqual("low-usage");
		});
		it('changes to medium energy consumption if between than 18 & 25 degrees', function() {
			expect(thermostat.energyConsumption()).toEqual("medium-usage");
		});
		it('changes to high energy consumption if more than 25 degrees', function() {
			thermostat.powerSavingModeOff();
			for (var i = 0; i < 7; i++) {
				thermostat.up();
			};
			expect(thermostat.energyConsumption()).toEqual("high-usage");
		});
	});
});





