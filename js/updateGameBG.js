var roundCounter = 0;

function updateGameBG(){

roundCounter++;

	if (roundCounter === 2){

	};

  if (roundCounter === 3){
    $('#game-container').addClass('darker-game-bg');
  };

	if (roundCounter === 4){
		$('.large-grey-cloud').css('display','inherit');
	};

	if (roundCounter === 5){
		$('.large-grey-cloud2').css('display','inherit');
		$('canvas').css('display','inherit');
		playRain();
    gameMusic.volume = 0.7;
	};
	if (roundCounter === 6){
		$('#game-container').addClass('twilight-game-bg');
		playWind();
    gravity = .5;
    wind = .2;
    rain_chance = .5;
	};

	if (roundCounter === 7){
		pauseRain();
		pauseAudio();
		playEpicMusic();
		playThunderandrain();
    gravity = .6;
    wind = .3;
    rain_chance = .75;
    $('.deathbringer-bg').css('display','inherit');
    $('.large-grey-cloud3').css('display','inherit');
	};

	if (roundCounter === 8){
    $('#thunder').addClass('thunder');

    // Bring Deathbringer infron of Mountains and Thunder
    $('.deathbringer-bg').css('z-index','-2');
    $('.deathbringer-bg').css('opacity','.4');
    // Remove all other comments for Deathbrings comment
		$('.turns-alerts').remove();
		alertMessage("Is that it? Is there no one left to challenge me?!", null, false);

    $('#game-container').addClass('night-game-bg');
    $('.large-grey-cloud4').css('display','inherit');
    $('.large-grey-cloud5').css('display','inherit');
    pauseEpicMusic();
    playDeathBringerMusic();
    wind = 0.4;
    gravity = 0.7;
    rain_chance = 1;
	};

	if (roundCounter === 9){
		winner();
	};

}

var rain = [], drops = [];

var gravity = 0.2;
var wind = 0.015;
var rain_chance = 0.4;

window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };

var canvas = document.getElementById('rain');
var ctx = canvas.getContext('2d');
canvas.width = 1100;
canvas.height = 350;

//--------------------------------------------

var Vector = function(x, y) {

  this.x = x || 0;
  this.y = y || 0;
};

Vector.prototype.add = function(v) {

  if (v.x != null && v.y != null) {

    this.x += v.x;
    this.y += v.y;

  } else {

    this.x += v;
    this.y += v;
  }

  return this;
};

Vector.prototype.copy = function() {

  return new Vector(this.x, this.y);
};

//--------------------------------------------

var Rain = function() {

  this.pos = new Vector(Math.random() * canvas.width, -50);
  this.prev = this.pos;

  this.vel = new Vector();
};

Rain.prototype.update = function() {

  this.prev = this.pos.copy();

  this.vel.y += gravity;
  this.vel.x += wind;

  this.pos.add(this.vel);
};

Rain.prototype.draw = function() {

  ctx.beginPath();
  ctx.moveTo(this.pos.x, this.pos.y);
  ctx.lineTo(this.prev.x, this.prev.y);
  ctx.stroke();
};

//--------------------------------------------

var Drop = function(x, y) {

  var dist = Math.random() * 7;
  var angle = Math.PI + Math.random() * Math.PI;

  this.pos = new Vector(x, y);

  this.vel = new Vector(
    Math.cos(angle) * dist,
    Math.sin(angle) * dist
    );
};

Drop.prototype.update = function() {

  this.vel.y += gravity;

  this.vel.x *= 0.95;
  this.vel.y *= 0.95;

  this.pos.add(this.vel);
};

Drop.prototype.draw = function() {

  ctx.beginPath();
  ctx.arc(this.pos.x, this.pos.y, 1, 0, Math.PI * 2);
  ctx.fill();
};

//--------------------------------------------

function update() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var i = rain.length;
  while (i--) {

    var raindrop = rain[i];

    raindrop.update();

    if (raindrop.pos.y >= canvas.height) {

      var n = Math.round(4 + Math.random() * 4);

      while (n--)
      drops.push(new Drop(raindrop.pos.x, canvas.height));

      rain.splice(i, 1);
    }

    raindrop.draw();
  }

  var i = drops.length;
  while (i--) {

    var drop = drops[i];
    drop.update();
    drop.draw();

    if (drop.pos.y > canvas.height) drops.splice(i, 1);
  }

  if (Math.random() < rain_chance) rain.push(new Rain());

  requestAnimFrame(update);
}

function init() {

  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(99,160,230,1)';
  ctx.fillStyle = 'rgba(99,160,230,1)';

  update();
}

init();