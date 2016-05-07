var TelegramBot = require('node-telegram-bot-api');
var mqtt = require('mqtt');
var config = require('./config');

// Setup bot
var bot = new TelegramBot(config.token, {polling: true});

var room_env = {};
var next_bus = {};

// Setup MQTT Client
var mqttClient = mqtt.connect('mqtt://127.0.0.1', {port: 1883});
mqttClient.subscribe('bus-monitor');
mqttClient.subscribe('local-env');

// Matches /start[whatever]
bot.onText(/\/start/, function (msg, match) {
  var fromId = msg.from.id;
  bot.sendMessage(fromId, 'Choose an option', {
    reply_markup: {
      keyboard: [
      [
        {
          'text': 'Temperature',
        }, {
          'text': 'Bus',
        }
      ]
    ],
    resize_keyboard: true
  }
  })
});

bot.onText(/Temperature/, function(msg, match) {
  var fromId = msg.from.id;
  bot.sendMessage(fromId, 'It is' + room_env.temperature + '°C inside.\nThe luminosity is ' + room_env.luminosity + ' Lux');
});

bot.onText(/Bus/, function(msg, match) {
  var fromId = msg.from.id;
  bot.sendMessage(fromId, 'The next bus is a ' + next_bus.route + ' in ' + next_bus.duetime + ' min');
});

bot.onText(/\/led/, function(msg, match) {
  var fromId = msg.from.id;
  var text = msg.text.split(' ');
  mqttClient.publish('led', text[1]);
});

bot.onText(/\/display/, function(msg, match) {
  var fromId = msg.from.id;
  var text = msg.text.split(' ');
  mqttClient.publish('display', text[1]);
});

mqttClient.on('message', function(topic, message) {
  console.log(topic);
  if (topic === 'local-env') {
    room_env = JSON.parse(message.toString('ascii'));
  } else if (topic === 'bus-monitor') {
    next_bus = JSON.parse(message.toString('ascii'));
  }
})
