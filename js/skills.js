// ******************************************
// * SKILLS LIST
// ******************************************

var skillList = ["finishhim","berserk","misfortune","lightonyourfeet","armorup","keeneye","execute","extralife","morepotions","eyespit","fullrecovery"];

	var finishhim = {
		name: "Finish Him",
		statAdj: 10,
		skillpointCost: 6,
		turns: 8,
		turnsCount: 0,
		uid: "finishhim",
		heroOwns: true,
		effectDescription: "+10 dmg 8 turns",
		adjHero: function (){
			hero.weapon[1] += finishhim.statAdj;
			console.log("Working finish him");
			hero.weapon[2] += finishhim.statAdj;} ,
		negHero: function (){
			hero.weapon[1] -= finishhim.statAdj;
			hero.weapon[2] -= finishhim.statAdj;},
	};

	var lightonyourfeet = {
		name: "Light on your feet",
		statAdj: 30,
		skillpointCost: 10,
		turns: 10,
		turnsCount: 0,
		uid: "lightonyourfeet",
		heroOwns: true,
		effectDescription: "+30 dodge 10 turns",
		adjHero: function (){
			hero.dodge += lightonyourfeet.statAdj; },
		negHero: function (){
			hero.dodge -= lightonyourfeet.statAdj; },
	};

	var armorup = {
		name: "Armor up",
		statAdj: 5,
		skillpointCost: 5,
		turns: 12,
		turnsCount: 0,
		uid: "armorup",
		heroOwns: true,
		effectDescription: "+5 armor for 12 turns",
		adjHero: function (){
			hero.armor += armorup.statAdj; },
		negHero: function (){
			hero.armor -= armorup.statAdj; },
	};

	var keeneye = {
		name: "Keen eye",
		statAdj: 15,
		skillpointCost: 3,
		turns: 10,
		turnsCount: 0,
		uid: "keeneye",
		heroOwns: false,
		effectDescription: "+15% accuracy for 10 turns",
		adjHero: function (){
			hero.accuracy += keeneye.statAdj; },
		negHero: function (){
			hero.accuracy -= keeneye.statAdj; },
	};

	var execute = {
		name: "Execute",
		statAdj: 30,
		skillpointCost: 10,
		turns: 2,
		turnsCount: 0,
		uid: "execute",
		heroOwns: false,
		effectDescription: "+40 damage for 3 turns",
		adjHero: function (){
			hero.weapon[1] += execute.statAdj;
			hero.weapon[2] += execute.statAdj;} ,
		negHero: function (){
			hero.weapon[1] -= execute.statAdj;
			hero.weapon[2] -= execute.statAdj;},
	};

	var morepotions = {
		name: "More Potions",
		statAdj: 2,
		skillpointCost: 6,
		turns: 5,
		turnsCount: 0,
		uid: "morepotions",
		heroOwns: false,
		effectDescription: "+1 Mana & +1 Health potions (Cooldown 5 turns)",
		adjHero: function (){
			hero.healthpotion += 1;
			hero.skillspotion += 1;
			$('#morepotions').css('display','none');} ,
		negHero: function (){
			$('#morepotions').css('display','inherit');
		},
	};

	var extralife = {
		name: "Extra Life",
		statAdj: 30,
		skillpointCost: 4,
		turns: 12,
		turnsCount: 0,
		uid: "extralife",
		heroOwns: false,
		effectDescription: "+30 hitpoints for 12 turns",
		adjHero: function (){
			hero.hitPointsCurrent += extralife.statAdj;
			hero.hitPoints += extralife.statAdj;} ,
		negHero: function (){
			hero.hitPoints -= extralife.statAdj;
			if (hero.hitPointsCurrent > hero.hitPoints){
				hero.hitPointsCurrent = hero.hitPoints;}
			},
	};

	var misfortune = {
		name: "Misfortune",
		statAdj: 0,
		skillpointCost: 4,
		turns: 8,
		turnsCount: 0,
		uid: "misfortune",
		heroOwns: false,
		effectDescription: "Enemy dodge at 0% for 8 turns",
		adjHero: function (){
			misfortune.statAdj = currentEnemies[0].dodge;
			currentEnemies[0].dodge = 0;} ,
		negHero: function (){
			currentEnemies[0].dodge = misfortune.statAdj;
			},
	};

	var eyespit = {
		name: "Spit in their eye!",
		statAdj: 0,
		skillpointCost: 4,
		turns: 6,
		turnsCount: 0,
		uid: "eyespit",
		heroOwns: false,
		effectDescription: "50% enemy accuracy for 5 turns",
		adjHero: function (){
			eyespit.statAdj = currentEnemies[0].accuracy;
			currentEnemies[0].accuracy = Math.round(currentEnemies[0].accuracy / 2);} ,
		negHero: function (){
			currentEnemies[0].accuracy = eyespit.statAdj;
			},
	};

	var fullrecovery = {
		name: "Full recovery",
		statAdj: 0,
		skillpointCost: 20,
		turns: 0,
		turnsCount: 0,
		uid: "fullrecovery",
		heroOwns: false,
		effectDescription: "Fully heal yourself and regain half your mana",
		adjHero: function (){
			   hero.hitPointsCurrent = hero.hitPoints;
			   hero.skillPointsCurrent = Math.round(hero.skillPoints / 2) },
		negHero: function (){},
	};


	var berserk = {
		name: "Enrage",
		statAdj: 0,
		skillpointCost: 5,
		turns: 20,
		turnsCount: 0,
		uid: "berserk",
		heroOwns: true,
		effectDescription: "Everytime you're hit, you deal +2 more dmg (effects last 20 turns)",
		adjHero: function (){
			if (berserk.statAdj > 0){
				hero.weapon[1] += 2;
				hero.weapon[2] += 2;
				setCharacterStats();
			}
			berserk.statAdj +=1;
		},
		negHero: function (){
			hero.weapon[1] -= ((berserk.statAdj-1) * 2);
			hero.weapon[2] -= ((berserk.statAdj-1) * 2);
			berserk.statAdj = 0;
		},

	};



// ******************************************
// * CLICK SKILL
// ******************************************

$('.skill-button').click( function(){
	if (playerTurn == false){ return; }

	var heroskill = $(this).attr('id');

	$('.turns-alerts').remove();

	if (eval(heroskill).skillpointCost > hero.skillPointsCurrent){
		var message = ("You need more skillpoints for that.");
		alertMessage(message, null, false);
		return;
	}
	console.log("Skills page - player turn = "+ playerTurn);

	// $('.alert-button').addClass('enemyturn');
	// $('.fight-button').addClass('turnoffbuttons');
	// $('.item-button').addClass('turnoffbuttons');
	// $('.skill-button').addClass('turnoffbuttons');

	eval(heroskill).turnsCount = eval(heroskill).turns;
	hero.skillPointsCurrent -= eval(heroskill).skillpointCost;

	eval(heroskill).adjHero();

	if (eval(heroskill).uid != "morepotions") {
		$('#'+eval(heroskill).uid).css('display','none');
	}

	var message = ( hero.name + " activated "+eval(heroskill).name+" ("+eval(heroskill).effectDescription+")");
	alertMessage(message, null, false);

	playSkillActivated();
	// endTurn();
	setFightInfo();

	setTimeout(function(){
		// enemyAttack();
	},1700);

});



// ******************************************
// * Skill Counter and Set
// ******************************************

function skillsSet(){

	var count = skillList.length;
	for (var i=0; i < count; i++){
		if (eval(skillList[i]).turnsCount >= 1){
			eval(skillList[i]).turnsCount--;
			if(eval(skillList[i]).turnsCount === 0){
				eval(skillList[i]).negHero();
				var message = (eval(skillList[i]).name+"'s effects just wore off.");
				alertMessage(message, null, false);
				$('#'+eval(skillList[i]).uid).css('display','inherit');
			}
		}
	}
}