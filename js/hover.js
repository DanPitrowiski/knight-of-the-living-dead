
$( '#hero-ui,#hero-stats' ).hover( 
	function() {
		$('.hero-stats').css('display','-webkit-box');
		var heroStats = ( 
			"<span class='statnum'>" + hero.name + "</span></br>" +
			hero.type + "</br></br>" + 
			"<span class='statnum'>" + hero.accuracy + "%</span> ACCURACY </br>" + 
			"<span class='statnum'>" + hero.dodge + "%</span> DODGE </br>" +
			"<span class='statnum'>" + hero.armor + "</span> ARMOR </br>" + 
			"<span class='statnum'>" + hero.weapon[0] + "</span> dmg " + hero.weapon[1] + "-" + hero.weapon[2] );
		$( '.hero-stats').html(heroStats);
		if (berserk.statAdj > 1){
			var totalbonusdamage = (berserk.statAdj-1) * 2;
			var berserkBonus = ( "</br>( +" + totalbonusdamage + "/+"+ totalbonusdamage + " dmg from Enrage )" );
			$( '.hero-stats').append(berserkBonus);
		}

	}, function() {
    	$( '.hero-stats' ).css('display','none');
  }
  );

$( '#enemy-ui-one,#enemyone' ).hover( 
	function() {
		$('.enemy-stats').css('display','-webkit-box');
		var enemyStats = ( 
			"<span class='statnum'>" + currentEnemies[0].name + "</span></br>" +
			currentEnemies[0].type + "</br></br>" + 
			"<span class='statnum'>" + currentEnemies[0].accuracy + "%</span> ACCURACY </br>" + 
			"<span class='statnum'>" + currentEnemies[0].dodge + "%</span> DODGE </br>" +
			"<span class='statnum'>" + currentEnemies[0].armor + "</span> ARMOR </br>" + 
			"<span class='statnum'>" + currentEnemies[0].weapon[0] + "</span> dmg " + currentEnemies[0].weapon[1] + "-" + currentEnemies[0].weapon[2] + "</br>" );
		$( '.enemy-stats').html(enemyStats); 

	}, function() {
    	$( '.enemy-stats' ).css('display','none');
  }
  );