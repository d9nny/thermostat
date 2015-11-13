
$(document).ready(function() {
  var thermostat = new Thermostat();
  updateTemp();
  var country;
  var city;
  var temperature;
  var url;


  $.getJSON('http://api.wunderground.com/api/831aa92990911190/geolookup/q/autoip.json', function(data) {
  country = data.location.country;
  city = data.location.city;
  url = 'http://api.wunderground.com/api/831aa92990911190/conditions/q/' + country + '/' + city + '.json';
    $.getJSON(url, function(data) {
      updateWeather(data.current_observation.temp_c);
    });
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

  function updateWeather(temperature) {
     $('#weather-content').text(temperature);
  };
});

$("body").hide().fadeIn(2500);