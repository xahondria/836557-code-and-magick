'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_POSITION_X = 100;
var CLOUD_POSITION_Y = 10;
var CLOUD_SHADOW_GAP = 10;
var CLOUD_PADDING_LEFT = 40;

var FONT_GAP = 15;
var LINE_HEIGHT = 16;
var FONT = 'PT Mono';

var messagePosX = CLOUD_POSITION_X + CLOUD_PADDING_LEFT;
var messagePosY = CLOUD_POSITION_Y + FONT_GAP;
var messageHeight = 2 * LINE_HEIGHT;

var BAR_WIDTH = 40;
var BAR_GAP = 50;
var HISTOGRAM_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {

  // cloud shadow
  renderCloud(ctx, CLOUD_POSITION_X + CLOUD_SHADOW_GAP, CLOUD_POSITION_Y + CLOUD_SHADOW_GAP, 'rgba(0, 0, 0, 0.3)');

  // cloud
  renderCloud(ctx, CLOUD_POSITION_X, CLOUD_POSITION_Y, '#fff');

  // message
  ctx.fillStyle = '#000';

  ctx.font = LINE_HEIGHT + 'px' + FONT;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', messagePosX, messagePosY);
  ctx.fillText('Список результатов:', messagePosX, messagePosY + LINE_HEIGHT);

  // histogram

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';

    // time
    ctx.fillText(Math.round(times[i]), CLOUD_POSITION_X + CLOUD_PADDING_LEFT + (BAR_WIDTH + BAR_GAP) * i, CLOUD_POSITION_Y + FONT_GAP + messageHeight + FONT_GAP + HISTOGRAM_HEIGHT - (HISTOGRAM_HEIGHT * times[i]) / maxTime);

    // player name
    ctx.fillText(players[i], CLOUD_POSITION_X + CLOUD_PADDING_LEFT + (BAR_WIDTH + BAR_GAP) * i, CLOUD_POSITION_Y + FONT_GAP + messageHeight + FONT_GAP + LINE_HEIGHT + HISTOGRAM_HEIGHT + FONT_GAP);

    // bar
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var barColor = Math.random() * 255;
      ctx.fillStyle = 'rgba(0, 0, ' + barColor + ', 1)';
    }

    ctx.fillRect(CLOUD_POSITION_X + CLOUD_PADDING_LEFT + (BAR_WIDTH + BAR_GAP) * i, CLOUD_POSITION_Y + FONT_GAP + messageHeight + FONT_GAP + HISTOGRAM_HEIGHT - (HISTOGRAM_HEIGHT * times[i]) / maxTime + FONT_GAP, BAR_WIDTH, (HISTOGRAM_HEIGHT * times[i]) / maxTime);
  }
};
