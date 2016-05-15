
$('.item-button').click( function(){

	if (playerTurn == false){ return; }
	var item = $(this).attr('id');

	if (hero[item] < 1){
		$('.turns-alerts').remove();
		var message = ("You've run out of those.");
		alertMessage(message, null, false);
		return;
	}

	$('.alert-button').addClass('enemyturn');
	$('.fight-button').addClass('turnoffbuttons');
	$('.item-button').addClass('turnoffbuttons');
	$('.skill-button').addClass('turnoffbuttons');

	if (item === "healthpotion"){
		hero.hitPointsCurrent = hero.hitPoints;
		hero.healthpotion -= 1;
		message = ( hero.name + "'s hitpoints were restored to full.");
	}

	if (item === "skillspotion"){
		hero.skillPointsCurrent = hero.skillPoints;
		hero.skillspotion -= 1;
		message = ( hero.name + "'s skillpoints were restored to full.");
	}

	$('.editHealthPotion').html(hero.healthpotion);
	$('.editSkillPotion').html(hero.skillspotion);

	playItemRestore();
	$('.turns-alerts').remove();
	alertMessage(message, null, false);
	skillsSet();
	endTurn();
	setFightInfo();

	setTimeout(function(){
		enemyAttack();
	},1900);
});