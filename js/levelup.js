var turnzero = 0;
var levelUpOptions = ['attackLevel', 'armorLevel','skillsLevel','dodgeLevel','accuracyLevel','healthBoost'];

	var attackLevel = {
	level1: ['Bone Saw', 10, 15],
	level2: ['Death Seeker', 14, 19],
	level3: ['Bone Scythe', 16, 25],
	level4: ['Harbinger', 22, 28],
	level5: ['Repentance', 29, 30],
	level6: ['Devilish Dire', 6, 66],
	level7: ['Deaths Blow', 34, 44],
	level8: ['Exacto Knife', 45, 55],
	level9: ['Diablos Incarnation', 50, 100],
	nextLevel: ["level1", 1],
	currentLevel: 1,
	maxLevel: 4,
	img: "images/icons/attack.png",
	upgradeSelect: function(){
		$('#level-up').append('<div id="attackLevel" class="levelup-option border-attacklevel">'+'<div class="img-bg"> <img class="center skill-img" src='+attackLevel.img+'></div>'+'<h1>UPGRADE YOUR WEAPON</h1></br>'+
		'<p>Upgrade your weapon from ' + hero.weapon[0] + ' ('+ hero.weapon[1] + '-' + hero.weapon[2] + ') dmg to the '+
							  attackLevel[upgradeTo][0] + ' ('+ attackLevel[upgradeTo][1] + '-' + attackLevel[upgradeTo][2] + ' dmg).</p><button class="levelup-button center" id="attackLevel">CHOOSE UPGRADE</button></div>');
		},
	}

	var armorLevel = {
	level1: 4,
	level2: 7,
	level3: 10,
	level4: 13,
	level5: 16,
	level6: 21,
	level7: 24,
	level8: 27,
	level9: 30,
	nextLevel: ["level1", 1],
	maxLevel: 5,
	img: "images/icons/armor.png",
	}

	var accuracyLevel = {
	level1: 74,
	level2: 82,
	level3: 90,
	level4: 95,
	level5: 99,
	level6: 99.5,
	level7: 99.9,
	level8: 100,
	level9: 105,
	nextLevel: ["level1", 1],
	maxLevel: 5,
	img: "images/icons/accuracy.png",
	}

	var skillsLevel = {
	level1: 'misfortune',
	level2: 'armorup',
	level3: 'extralife',
	level4: 'finishhim',
	level5: 'execute',
	level6: 'lightonyourfeet',
	level7: 'morepotions',
	level8: 'fullrecovery',
	level9: '',
	nextLevel: ["level1", 1],
	maxLevel: 2,
	img: "images/icons/skills.png",
	}

	var dodgeLevel = {
	level1: 20,
	level2: 30,
	level3: 40,
	level4: 50,
	level5: 60,
	level6: 70,
	level7: 80,
	level8: 90,
	level9: 95,
	nextLevel: ["level1", 1],
	maxLevel: 5,
	img: "images/icons/dodge.png",
	}

	var healthBoost = {
	level1: 5,
	level2: 6,
	level3: 7,
	level4: 9,
	level5: 11,
	level6: 14,
	level7: 17,
	level8: 20,
	level9: 23,
	level10: 30,
	nextLevel: ["level1", 1],
	maxLevel: 10,
	img: "images/icons/health.png",
	}

function levelUp() {
	$( "#popover" ).addClass("popover-bg-opaque");
	$( "#level-up" ).fadeIn(2000);
	$( "#popover" ).fadeIn(2000);

	hero.level += 1;
	$( ".insert-lvl").html(hero.level);

	// Give Random Hitpoint Bonus
	var addHitPoints = Math.floor((Math.random() * 5) + 1);
    hero.hitPointsCurrent += addHitPoints;
    hero.hitPoints += addHitPoints;
    $('.editHitPoints').html(addHitPoints);

    // Give Random Skillpoint Bonus
    var addSkillPoints = Math.floor((Math.random() * 3) + 1);
    hero.skillPointsCurrent += addSkillPoints;
    hero.skillPoints += addSkillPoints;
    $('.editSkillPoints').html(addSkillPoints);

    setCharacterStats();

    // Randomize Next Available 3 Upgrades
	levelUpOptions = shuffle(levelUpOptions);

	var level;
	console.log(levelUpOptions);
	console.log("Counting the levels:" + level);

	if (( levelUpOptions[0] === "attackLevel") || ( levelUpOptions[1] === "attackLevel") || ( levelUpOptions[2] === "attackLevel")) {
		// level = attackLevel.currentLevel += 1;
		upgradeTo = attackLevel.nextLevel[0];
		console.log(level);
		$('#level-up').append('<div class="levelup-option border-attacklevel">'+'<div class="img-bg"><img class="center skill-img" src='+attackLevel.img+'></div><h1>UPGRADE YOUR WEAPON</h1></br>'+
						  	'<p>Upgrade your weapon from ' + hero.weapon[0] + ' ('+ hero.weaponSaved[1] + '-' + hero.weaponSaved[2] + ' dmg) to the '+
						  	attackLevel[upgradeTo][0] + ' ('+ attackLevel[upgradeTo][1] + '-' + attackLevel[upgradeTo][2] + ' dmg).</p><button class="levelup-button center" id="attackLevel">CHOOSE UPGRADE</button></div>'
						  	);
	}

	if (( levelUpOptions[0] === "armorLevel") || ( levelUpOptions[1] === "armorLevel") || ( levelUpOptions[2] === "armorLevel")) {
		// level = attackLevel.currentLevel += 1;
		upgradeTo = armorLevel.nextLevel[0];
		console.log(level);
		$('#level-up').append('<div class="levelup-option border-armorlevel">'+'<div class="img-bg"><img class="center skill-img" src='+armorLevel.img+'></div><h1>INCREASE YOUR ARMOR</h1></br>'+
							  '<p>Increase your armor plating from ' + hero.armorSaved + ' to '+ armorLevel[upgradeTo] + '.</p><button class="levelup-button center" id="armorLevel">CHOOSE UPGRADE</button></div>');
	}

	if (( levelUpOptions[0] === "accuracyLevel") || ( levelUpOptions[1] === "accuracyLevel") || ( levelUpOptions[2] === "accuracyLevel")) {
		// level = attackLevel.currentLevel += 1;
		upgradeTo = accuracyLevel.nextLevel[0];
		console.log(level);
		$('#level-up').append('<div class="levelup-option border-accuracylevel">'+'<div class="img-bg"><img class="center skill-img" src='+accuracyLevel.img+'></div><h1>UP YOUR ACCURACY</h1></br>'+
							  '<p>Increase your accuracy from ' + hero.accuracySaved + '% to '+ accuracyLevel[upgradeTo] + '%.</p><button class="levelup-button center" id="accuracyLevel">CHOOSE UPGRADE</button></div>');
	}

	if (( levelUpOptions[0] === "skillsLevel") || ( levelUpOptions[1] === "skillsLevel") || ( levelUpOptions[2] === "skillsLevel")) {
		// level = attackLevel.currentLevel += 1;
		upgradeTo = skillsLevel.nextLevel[0];
		console.log(level);
		$('#level-up').append('<div class="levelup-option border-skillslevel">'+'<div class="img-bg"><img class="center skill-img" src='+skillsLevel.img+'></div><h1>CHOOSE A NEW SKILL</h1></br>'+
							  '<p>Add the skill '+eval(skillsLevel[upgradeTo]).name + ' - '+eval(skillsLevel[upgradeTo]).effectDescription+'. Also +5 to your maximum mana.</p><button class="levelup-button center" id="skillsLevel">CHOOSE UPGRADE</button></div>');
	}

	if (( levelUpOptions[0] === "dodgeLevel") || ( levelUpOptions[1] === "dodgeLevel") || ( levelUpOptions[2] === "dodgeLevel")) {
		// level = attackLevel.currentLevel += 1;
		upgradeTo = dodgeLevel.nextLevel[0];
		console.log(level);
		$('#level-up').append('<div class="levelup-option border-dodgelevel">'+'<div class="img-bg"><img class="center skill-img" src='+dodgeLevel.img+'></div><h1>DODGE AND MOVE!</h1></br>'+
							  '<p>Upgrade your dodge level from '+ hero.dodgeSaved + '% to '+dodgeLevel[upgradeTo]+ '%.</p><button class="levelup-button center" id="dodgeLevel">CHOOSE UPGRADE</button></div>');
	}

	if (( levelUpOptions[0] === "healthBoost") || ( levelUpOptions[1] === "healthBoost") || ( levelUpOptions[2] === "healthBoost")) {
		// level = attackLevel.currentLevel += 1;
		upgradeTo = healthBoost.nextLevel[0];
		var newTotal = hero.hitPoints + healthBoost[upgradeTo];
		$('#level-up').append('<div class="levelup-option border-healthBoost">'+'<div class="img-bg"><img class="center skill-img" src='+healthBoost.img+'></div><h1>EXTRA HEALTH</h1></br>'+
							  '<p>Increase your health by ' + healthBoost[upgradeTo] + ' (up to '+ newTotal + ') and heal to full.</p><button class="levelup-button center" id="healthBoost">CHOOSE UPGRADE</button></div>');
	}


	$('.levelup-button').click( function(){

		var upgrade = $(this).attr('id');
		var upgradeTo;
		var addDifference;

		if (upgrade === "attackLevel"){
			var addDifference1 = hero.weapon[1] - hero.weaponSaved[1];
			var addDifference2 = hero.weapon[2] - hero.weaponSaved[2];

			upgradeTo = attackLevel.nextLevel[0];

			hero.weapon[0] = attackLevel[upgradeTo][0];
			hero.weapon[1] = attackLevel[upgradeTo][1] + addDifference1;
			hero.weapon[2] = attackLevel[upgradeTo][2] + addDifference2;
			hero.weaponSaved[1] = attackLevel[upgradeTo][1];
			hero.weaponSaved[2] = attackLevel[upgradeTo][2];
			attackLevel.nextLevel[1] += 1;
			attackLevel.nextLevel[0] = "level" + attackLevel.nextLevel[1];

			alertMessage("You've upgraded your weapon",null, null);
		}

		if (upgrade === "armorLevel"){
			addDifference = hero.armor - hero.armorSaved;
			upgradeTo = armorLevel.nextLevel[0];
			hero.armor = armorLevel[upgradeTo] + addDifference;
			hero.armorSaved = armorLevel[upgradeTo];
			armorLevel.nextLevel[1] += 1;
			armorLevel.nextLevel[0] = "level" + armorLevel.nextLevel[1];

			alertMessage("You've upgraded your armor plating",null, null);
		}

		if (upgrade === "accuracyLevel"){
			addDifference = hero.accuracy - hero.accuracySaved;
			upgradeTo = accuracyLevel.nextLevel[0];
			hero.accuracy = accuracyLevel[upgradeTo] + addDifference;
			hero.accuracySaved = accuracyLevel[upgradeTo];
			accuracyLevel.nextLevel[1] += 1;
			accuracyLevel.nextLevel[0] = "level" + accuracyLevel.nextLevel[1];

			alertMessage("You've upgraded your accuracy",null, null);
		}

		if (upgrade === "dodgeLevel"){
			addDifference = hero.dodge - hero.dodgeSaved;
			upgradeTo = dodgeLevel.nextLevel[0];
			hero.dodge = dodgeLevel[upgradeTo] + addDifference;
			hero.dodgeSaved = dodgeLevel[upgradeTo];
			dodgeLevel.nextLevel[1] += 1;
			dodgeLevel.nextLevel[0] = "level" + dodgeLevel.nextLevel[1];

			alertMessage("You've upgraded your dodge skill",null, null);
		}

		if (upgrade === "skillsLevel"){
			upgradeTo = skillsLevel.nextLevel[0];
			$('#'+skillsLevel[upgradeTo]).css('display','inherit');
			skillsLevel.nextLevel[1] += 1;
			skillsLevel.nextLevel[0] = "level" + skillsLevel.nextLevel[1];
			hero.skillPoints+=5;
			hero.skillPointsCurrent+=5;

			alertMessage("You've added a new skill and gained 5 mana points",null, null);
		}

		if (upgrade === "healthBoost"){
			upgradeTo = healthBoost.nextLevel[0];
			hero.hitPoints = hero.hitPoints + healthBoost[upgradeTo];
			hero.hitPointsCurrent = hero.hitPoints;
			healthBoost.nextLevel[1] += 1;
			healthBoost.nextLevel[0] = "level" + healthBoost.nextLevel[1];

			alertMessage("You've gain health and been fully healed",null, null);
		}

		console.log("Level up - player turn = "+ playerTurn);

		eval(upgrade);
		$( "#popover" ).fadeOut(200);
		$( ".levelup-option" ).remove();
		$( "#level-up" ).fadeOut(2000);

		playSkillActivated();
		setCharacterStats();

		if (roundCounter === 0){
			playEnemyEntrance(currentEnemies[0]);
		}
	});
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}