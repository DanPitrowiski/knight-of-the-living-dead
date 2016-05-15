 var message;
 var playerTurn = true;
 var enemyList = [zombieBob, ogre, berserker, dungeonGuard, mountainGiant, castleGuard, theking, dragon];
 var currentEnemies = [zombieBob];
 var myDiv = document.getElementById("div-history");
 var skipEnemy;
 var deathCount = 0; //Only one continue
 var totalTurns = 0;

 var myFirebaseRef = new Firebase('https://blazing-fire-8790.firebaseio.com/');

// THANKS TOGGLE TEXT

$('#thanks').on('click', function(event){
	event.preventDefault();
	$('#thanks-text').toggle();
});


// ******************************************
// * START GAME
// ******************************************

 $( document ).ready(function() {
 	var text_input = $('#hero-name');
  	text_input.focus();
  	setFightInfo();
  });

$('#entry').on('submit', function(e){
	$('#hero-name').blur();
	var name = $( '#hero-name' ).val();
 	hero.name = name;
	e.preventDefault();
	e.stopImmediatePropagation();
	gameObjective();
});


function gameObjective(){
	playAudio();
 	$( "#entry" ).fadeOut(500);
 	$( "#objective").fadeIn(2000);
};

$('.next-choose-adj').click( function(){
	$( "#objective" ).fadeOut(0);
	levelUp();
	$( "#hero-stats>.ch-name>.bold-stat").text(hero.name);
    alertMessage(currentEnemies[0].name + " won't let you pass. Time for a fight!", null, false);

});


// ******************************************
// * MENU
// ******************************************

$('.skill-f').click( function(){
skillsClose();
});

$('.item-f').click( function(){
itemsClose();
});

function skillsClose(){
	$('#items-menu').hide();
	$('#skills-menu').toggle();
};

function itemsClose(){
	$('#skills-menu').hide();
	$('#items-menu').toggle();
};

// ******************************************
// * ATTACK START
// ******************************************

// HERO'S TURN

$('.attack-f').click( function(){
	if (playerTurn == false){ return; }
	heroAttack();
});

function heroAttack(){
	totalTurns += 1;
	endTurn();
	$('.alert-button').addClass('enemyturn');
	$('.turns-alerts').remove();
	$('.fight-button').addClass('turnoffbuttons');
	$('.item-button').addClass('turnoffbuttons');
	$('.skill-button').addClass('turnoffbuttons');

	var hit = hitting(hero, currentEnemies[0]);

 	message = createHitMessage(hero, currentEnemies[0], hit);
 	attackAnimation(hero, currentEnemies[0], hit);

    setTimeout(function(){
	 	alertMessage(message, null, false);
	 	if ( hit === true){ playEnemyHit(); } else { playWeaponMiss(); }
			skipEnemy = setFightInfo();
	},300);

    console.log("2-What is skipEnemy: " + skipEnemy);

	// ENEMIES TURN

	setTimeout(function(){
		if (skipEnemy === true){ return; }
		$('.turns-alerts').remove();
		var hit = hitting(currentEnemies[0],hero);

		console.log(hit);

	 	message = createHitMessage(currentEnemies[0], hero, hit);
	 	attackAnimation(currentEnemies[0],hero, hit);

		setTimeout(function(){
		alertMessage(message, null, false);
	 	if ( hit === true){ playHeroHit(); } else { playWeaponMiss(); }
			$('.fight-button').removeClass('turnoffbuttons');
			$('.item-button').removeClass('turnoffbuttons');
			$('.skill-button').removeClass('turnoffbuttons');
			skillsSet();
			setFightInfo();
			endTurn();
		},300);
	},1600);
};

// ENEMIES TURN

$('.enemyturn').click( function(){
	enemyAttack();
});


function enemyAttack(){
	totalTurns += 1;
	$('.turns-alerts').remove();
	$('.fight-button').removeClass('turnoffbuttons');
	$('.item-button').removeClass('turnoffbuttons');
	$('.skill-button').removeClass('turnoffbuttons');

	var hit = hitting(currentEnemies[0],hero);

	console.log(hit);

	message = createHitMessage(currentEnemies[0], hero, hit);
 	attackAnimation(currentEnemies[0],hero, hit);

	setTimeout(function(){
		alertMessage(message, null, false);
	 	if ( hit === true){ playHeroHit(); } else { playWeaponMiss(); }
			skillsSet();
			endTurn();
			setFightInfo();
	},300);
};

// ******************************************
// * HITTING CALCULATION
// ******************************************

function hitting(attacker, defender){

	var hitChanceRandom = Math.floor((Math.random() * 100) + 1);
	var dodgeChance = Math.floor((Math.random() * 100) + 1);
	console.log(hitChanceRandom);

	if ( hitChanceRandom <= attacker.accuracy) {
		if ( dodgeChance <= defender.dodge){
			return "dodge";
		}
		return true;
		// damage(attacker, defender);
	}
	else {
		return false;
	}
}

// ******************************************
// * DAMAGE CALCULATION
// ******************************************

function damage(attacker, defender){
	console.log("In damage function");

	var attackerMaxDmg = parseFloat(attacker.weapon[2]);
	var attackerMinDmg = parseFloat(attacker.weapon[1]);

	var dmgRandom = Math.floor((Math.random() * (attackerMaxDmg-attackerMinDmg) ) + attackerMinDmg);

	dmgReceived = Math.floor(dmgRandom - defender.armor);

	if ( dmgReceived < 1){
		dmgReceived = 1;
	}

	defender.hitPointsCurrent = defender.hitPointsCurrent -  dmgReceived;

	return dmgReceived;

};

// ******************************************
// * ATTACK ANIMATION
// ******************************************

function attackAnimation(attacker, defender, hit){

// var currentCenterPoint = $(attacker.ui_id).outerWidth() / 2;
// var nextCenterPoint = $(defender.ui_id).next().outerWidth() / 2;

console.log("Attacker: "+attacker.name+"   Defender:"+defender.name+" and hit "+hit)

	if (attacker.ui_id === "#hero-ui" ){
		  $(attacker["ui_id"]).addClass("hero-attacking movetofront");
		  if ( hit === "dodge" ){
			$(defender["ui_id"]).addClass("enemy-dodge");
		}
		  setTimeout( function(){
		  $(attacker["ui_id"]).removeClass("hero-attacking movetofront");
		  $(defender["ui_id"]).removeClass("enemy-dodge");
		  }, 2000);
	}
	else {
		$(attacker["ui_id"]).addClass("enemy-attacking movetofront");
	  	if ( hit === "dodge"  ){
			$(defender["ui_id"]).addClass("hero-dodge");
		}
	  	setTimeout( function(){
	    $(attacker["ui_id"]).removeClass("enemy-attacking movetofront");
	    $(defender["ui_id"]).removeClass("hero-dodge");
	  	}, 2000);
	}
}

// ******************************************
// * END TURN
// ******************************************

function endTurn(){
	console.log("endTurn what is playerTurn="+playerTurn)
	if (playerTurn === false) { playerTurn = true; }
	else if (playerTurn === true) { playerTurn = false;}
}

// ******************************************
// * ALL ALERT NOTIFICATIONS
// ******************************************

function alertMessage(message, buttonText, showAlertButton){
	// $( '.game-alerts' ).promise().then(function(){
	$( ".game-alerts" ).css('display','none');

	console.log('.game-alerts');

	$( ".game-alerts" ).append("<h2 class='turns-alerts'>" + message + "</h2>");
	$( ".game-alerts" ).fadeIn(500).css('display','block');

	console.log("before alert button should show = " + playerTurn);

	$('.history').prepend('<p class="message">'+message+'</p>');

	if (showAlertButton === true){
		$( ".alert-button" ).text(buttonText);
		$( ".alert-button" ).fadeIn(500).css('display','block');
	}
}

function historyScroll() {
	$('#div-history').scrollTop("0");
}

function createHitMessage(attacker, defender, hit){
	if (hit === true){
	var dmgReceived = damage(attacker,defender);
	message = ( attacker.name + " hit " + defender.name +" dealing " + dmgReceived + " damage.");
 	} if (hit === false){
 		message = ( attacker.name + " missed " + defender.name );
 	} if (hit === "dodge") {
 		message = ( defender.name + " dodged " + attacker.name );
 	}
 	return message;
}

// ******************************************
// * RESETTING FIGHT INFO
// ******************************************

function setFightInfo(){
	$( "#enemyone-name").text(currentEnemies[0].name);
	$( "#enemyone-level").text(currentEnemies[0].level);

	setCharacterStats();

	if (currentEnemies[0].hitPointsCurrent <= 0 ){
		currentEnemies[0].hitPointsCurrent = 0;
		levelUp();
		enemyKilled(currentEnemies[0].name);
		return true;
	}
	if (hero.hitPointsCurrent <= 0 ){
		hero.hitPointsCurrent = 0;
		death();
		return true;
	}
	return false;
}

function setCharacterStats(){
	var enemyhealth = (currentEnemies[0].hitPointsCurrent + "/" + currentEnemies[0].hitPoints);
	var herohealth = (hero.hitPointsCurrent + "/" + hero.hitPoints);
	var heroskillpoints = (hero.skillPointsCurrent + "/" + hero.skillPoints);

	$( '.game-alerts' ).promise().done(function(){
		$( "#enemyone-health").text(enemyhealth);
		$( "#hero-health").text(herohealth);
		$( '#hero-skillpoints').text(heroskillpoints);
		$( "#hero-level").text(hero.level);
		$('.editHealthPotion').html(hero.healthpotion);
		$('.editSkillPotion').html(hero.skillspotion);
	});
}

// ******************************************
// * DEATH OR WIN
// ******************************************

function death(){
	$('.reload').fadeIn(3000).css('display','block');
	$('#popover').fadeIn(4000).show();
	$( "#death" ).fadeIn(3000).show();
	$('#death').addClass('popover-bg');
	deathCount += 1;
	if ( deathCount === 2){
		$('.reload').hide();
		$('.death-text').append("</br>The End.");
	}

};

function winner(){
	$('#level-up').hide();
	$('.editHeroName').text(hero.name);
	$('.turnTotal').text(totalTurns);
	$('#popover').fadeIn(4000).show();
	$('#winner').fadeIn(3000).show();
	$('#winner').addClass('popover-bg');
	$('.game-name').css('padding','100px 0');

	// SET WINNERS WINNING INFO
	 // myFirebaseRef.push({
 	// 	highscores: {
  // 			user: hero.name,
  // 			totalTurns: totalTurns,
  // 		}
	 // });

	 newScore();

	// var myHighScores = new Firebase('https://blazing-fire-8790.firebaseio.com/highscores');

	// myHighScores.orderByValue().on("value", function(snapshot) {
	// 		// console.log(snapshot);
 //  		snapshot.forEach(function(data) {
 //  			console.log("Date.key() is " + data.key() + " AND data.val() is " + data.val());
 //    		// console.log(highscores.user() + " completed the game in " + highscores.totalTurns() + " turns.");
 //    		console.log(data);
 //  		});
	// });

};

function enemyKilled(defender){
	$('#enemy-ui-one').fadeOut(2000);
	$('#enemyone').fadeOut(3000);
	$('#items-menu').hide();
	$('#skills-menu').hide();
	$('#fight-menu').hide();
	$('.alert-button').css('display','none');
	alertMessage("You've killed " + currentEnemies[0].name, null , false);
	$('#nextEnemy').html('<button class="nextEnemy">Ready For Next Enemy?</button>');
	$( "#nextEnemy" ).show();
	$(".nextEnemy").css('display','inherit');

	updateGameBG();
}

// ******************************************
// * LOAD NEXT ENEMY
// ******************************************

$('.nextEnemy,#nextEnemy').click( function(){
	// CSS changes and fades
	$('#game-container').addClass('darker-game-bg');

	$( "#nextEnemy").css('display','none');
	$('.fight-button').removeClass('turnoffbuttons');
	$('.item-button').removeClass('turnoffbuttons');
	$('.skill-button').removeClass('turnoffbuttons');
	$("#enemy-ui-one").css('display','inherit');
	$("#fight-menu").show();
	$('.turns-alerts').remove();
	$("#enemy-ui-one,#enemyone,.enemies").fadeIn(2000).show();

	console.log("What ID are we hiding "+currentEnemies[0].img_id);

	// Select Next Enemy
	enemyList.splice( enemyList[0], 1 );
	oldEnemies = currentEnemies[0].img_id;
	currentEnemies[0] = enemyList[0];
	$(oldEnemies).remove();
	currentEnemies[0].img();
 	$(currentEnemies[0].img_id).css('display','inherit');

	alertMessage("Prepare to fight " + currentEnemies[0].name, null , false);

	currentEnemies[0].hitPointsCurrent = currentEnemies[0].hitPoints;

	playEnemyEntrance(currentEnemies[0]);
	playerTurn=true;

	// Setting How Many Enemies Before King
	if (roundCounter < 6){
		var count = (5 - roundCounter);
		$('.editEnemiesCounter').html(count)
	} else{
		$('.enemiescount').fadeOut();
	}
	if (roundCounter === 7){
		$('.turns-alerts').remove();
		$('.deathbringer-bg').css('display','none');
		alertMessage("Even kings bow before me puny creature!", null, false);
	}

	setFightInfo();
});

// ******************************************
// * RELOAD AFTER YOUR DEATH
// ******************************************

$('.reload').click(function reload() {

	currentEnemies[0].hitPointsCurrent = currentEnemies[0].hitPoints;
	hero.hitPointsCurrent = hero.hitPoints;
	hero.skillPointsCurrent = hero.skillPoints;

	$( ".game-alerts" ).css('display','none');
	$('#popover').hide();
	$('#death').hide();
	$('.turns-alerts').remove();
	alertMessage("This time you won't be so lucky " + currentEnemies[0].name, null , false);

	playResurrected();
	setFightInfo();
	playerTurn=true;
});

// ******************************************
// * AUDIO CONTROLS
// ******************************************

var enemyHit = $('#enemyhit')[0];
var heroHit = $('#herohit')[0];
var weaponMiss = $('#weaponmiss')[0];
var gameMusic = $('#zombiemusic')[0];
var epicMusic = $('#epicmusic')[0];
var deathbringerMusic = $('#deathbringer-music')[0];
var rainPlay = $('#rainambience')[0];
var windPlay = $('#wind')[0];
var thunderandrainPlay = $('#thunderandrain')[0];
var dragonEntranceTwo = $('#dragon-entrance2')[0];
var skillActivated = $('#skillactivated')[0];
var itemRestore = $('#itemrestore')[0];
var resurrected = $('#resurrected')[0];

function playEnemyHit() { enemyHit.play(); enemyHit.volume = .8;}

function playHeroHit() { heroHit.play(); heroHit.volume = .8;}

function playWeaponMiss() { weaponMiss.play(); weaponMiss.volume = .8;}

function playAudio() { gameMusic.play(); gameMusic.volume = .6;}
function pauseAudio() { gameMusic.pause(); }

function playEpicMusic() { epicMusic.play(); }
function pauseEpicMusic() { epicMusic.pause(); }

function playDeathBringerMusic() { deathbringerMusic.play(); }
function pauseDeathBringerMusic() { deathbringerMusic.pause(); }

function playRain() { rainPlay.play(); }
function pauseRain() { rainPlay.play(); }

function playWind() { windPlay.play(); }

function playThunderandrain() { thunderandrain.play(); }

function playDragonEntranceTwo() { dragonEntranceTwo.play(); }

function playSkillActivated() { skillActivated.play(); }

function playItemRestore() { itemRestore.play(); }

function playResurrected() { resurrected.play(); }

function playEnemyEntrance(enemy){
	if (enemy.img_id === "#mountainGiant"){
	var audio = $('#mountainGiant-entrance')[0];
	}
	if (enemy.img_id === "#zombieBob"){
	var audio = $('#zombieBob-entrance')[0];
	}
	if (enemy.img_id === "#ogre"){
	var audio = $('#ogre-entrance')[0];
	}
	if (enemy.img_id === "#berserker"){
	var audio = $('#berserker-entrance')[0];
	}
	if (enemy.img_id === "#dragon"){
	var audio = $('#dragon-entrance')[0];
	playDragonEntranceTwo();
	}
	if (enemy.img_id === "#theking"){
	var audio = $('#theking-entrance')[0];
	}
	if (enemy.img_id === "#castleGuard"){
	var audio = $('#castleGuard-entrance')[0];
	}
	if (enemy.img_id === "#dungeonGuard"){
	var audio = $('#dungeonGuard-entrance')[0];
	}
	audio.play();
}
