// ******************************************
// * SKILLS LIST
// ******************************************

var skillList = ["finishhim","berserk","misfortune","lightonyourfeet","armorup","keeneye","execute","extralife","morepotions"];

	var finishhim = {
		name: "Finish Him",
		statAdj: 10,
		skillpointCost: 4,
		turns: 7,
		turnsCount: 0,
		uid: "finishhim",
		heroOwns: true,
		effectDescription: "+10 dmg 7 turns",
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
		skillpointCost: 3,
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
		statAdj: 4,
		skillpointCost: 5,
		turns: 10,
		turnsCount: 0,
		uid: "armorup",
		heroOwns: true,
		effectDescription: "+4 armor for 10 turns",
		adjHero: function (){
			hero.armor += armorup.statAdj; },
		negHero: function (){
			hero.armor -= armorup.statAdj; },
	};

	var keeneye = {
		name: "Keen eye",
		statAdj: 15,
		skillpointCost: 2,
		turns: 10,
		turnsCount: 0,
		uid: "keeneye",
		heroOwns: false,
		effectDescription: "+15 accuracy for 10 turns",
		adjHero: function (){
			hero.accuracy += keeneye.statAdj; },
		negHero: function (){
			hero.accuracy -= keeneye.statAdj; },
	};

	var execute = {
		name: "Execute",
		statAdj: 30,
		skillpointCost: 3,
		turns: 3,
		turnsCount: 0,
		uid: "execute",
		heroOwns: false,
		effectDescription: "+30 damage for 3 turns",
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
		turns: 0,
		turnsCount: 0,
		uid: "morepotions",
		heroOwns: false,
		effectDescription: "+2 Skill & Health potions",
		adjHero: function (){
			hero.healthpotion += 2;
			hero.skillspotion += 2;} ,
		negHero: function (){},
	};

	var extralife = {
		name: "Extra Life",
		statAdj: 30,
		skillpointCost: 4,
		turns: 10,
		turnsCount: 0,
		uid: "extralife",
		heroOwns: false,
		effectDescription: "+30 hitpoints for 10 turns",
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
		skillpointCost: 2,
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

	var berserk = {
		name: "Enrage",
		statAdj: 0,
		skillpointCost: 5,
		turns: 15,
		turnsCount: 0,
		uid: "berserk",
		heroOwns: true,
		effectDescription: "Everytime you're hit, you deal +3 more dmg (effects last 15 turns)",
		adjHero: function (){
			if (berserk.statAdj > 0){
				hero.weapon[1] += 3;
				hero.weapon[2] += 3;
				setCharacterStats();
			}
			berserk.statAdj +=1;
		},
		negHero: function (){
			hero.weapon[1] -= ((berserk.statAdj-1) * 3);
			hero.weapon[2] -= ((berserk.statAdj-1) * 3);
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

	$('.alert-button').addClass('enemyturn');
	$('.fight-button').addClass('turnoffbuttons');
	$('.item-button').addClass('turnoffbuttons');
	$('.skill-button').addClass('turnoffbuttons');

	eval(heroskill).turnsCount = eval(heroskill).turns;
	hero.skillPointsCurrent -= eval(heroskill).skillpointCost;

	eval(heroskill).adjHero();

	if (eval(heroskill).uid != "morepotions") {
		$('#'+eval(heroskill).uid).css('display','none');
	}

	var message = ( hero.name + " activated "+eval(heroskill).name+" ("+eval(heroskill).effectDescription+")");
	alertMessage(message, null, false);

	playSkillActivated();
	endTurn();
	setFightInfo();

	setTimeout(function(){
		enemyAttack();
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