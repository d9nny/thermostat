
$(document).ready(function() {
  var thermostat = new Thermostat();
  updateTemp();
  var location;
  var temperature;

  var weather = $.getJSON('http://api.wunderground.com/api/831aa92990911190/conditions/q/CA/San_Francisco.json', function(data) {
      temperature = data.current_observation.temp_c;
  });

  $('#update-weather').click( function() {
     $('#weather-content').text(temperature);
  });

  $('#power_saving_mode_on').css('background-color', 'green');
  $('#power_saving_mode_off').css('background-color', 'white').fadeTo("slow", 0.15);

  $( '#temperature_up' ).click( function() {
    thermostat.up();
    updateTemp();
  });

  $( '#temperature_down' ).click( function() {
    thermostat.down();
    updateTemp();
  });

  $( '#power_saving_mode_on' ).click( function() {
    $(this).css('background-color', 'green').fadeTo("slow", 1);
    $('#power_saving_mode_off').css('background-color', 'white').fadeTo("slow", 0.15);
    thermostat.powerSavingModeOn();
  });

  $( '#power_saving_mode_off' ).click( function() {
    $(this).css('background-color', 'red').fadeTo("slow", 1);
    $('#power_saving_mode_on').css('background-color', 'white').fadeTo("slow", 0.15);
    thermostat.powerSavingModeOff();
  });

  $( '#reset' ).click( function() {
    thermostat.resetButton();
    updateTemp();
  });

  function updateTemp() {
    $('#temperature').text(thermostat.temperature());
    $('#temperature').attr('class', thermostat.energyConsumption());
  };
});

$("body").hide().fadeIn(2500);