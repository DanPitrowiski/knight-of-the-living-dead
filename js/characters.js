var hero = {
    name:"Farva",
    uid: "hero",
    level:0,
    type:"Undead Knight",
    accuracy: 65,
    accuracySaved: 65,
    dodge: 20,
    dodgeSaved: 20,
    armor: 1,
    armorSaved: 1,
    weapon: ['Bone Scabre', 7, 12],
    weaponSaved: [ "", 7, 12],
    skillPointsCurrent:5,
    skillPoints:5,
    hitPointsCurrent:28,
    hitPoints:28,
    skills:['Keen eye'],
    ui_id: "#hero-ui",
    healthpotion: 6,
    skillspotion: 4,
};

var zombieBob = {
    name:"Farmer Bob Brains",
    uid: "zombieBob",
    level:1,
    type:"Zombie Botanist",
    accuracy: 60,
    dodge: 15,
    armor: 0,
    weapon: ['Pitch Fork', 5, 10],
    skillPointsCurrent:10,
    skillPoints:10,
    hitPointsCurrent:18,
    hitPoints:18,
    skills:['Bite','Skewer!'],
    ui_id: "#enemy-ui-one",
    img_id: "#zombieBob",
    img: function(){$("#enemy-ui-one").append('<img id="'+currentEnemies[0].uid+'" class="ememies" src="images/zombie-farmer.png">');},
};

var mountainGiant = {
    name:"Mountain Giant",
    uid: "mountainGiant",
    level:5,
    type:"Rocking and Rolling",
    accuracy: 55,
    dodge: 5,
    armor: 6,
    weapon: ['Fists', 15, 18],
    skillPointsCurrent:4,
    skillPoints:4,
    hitPointsCurrent:44,
    hitPoints:44,
    skills:['Crush','Pound'],
    ui_id: "#enemy-ui-one",
    img_id: "#mountainGiant",
    img: function(){$("#enemy-ui-one").append('<img id="'+currentEnemies[0].uid+'" class="ememies" src="images/rock-monster.png">');},
};

var ogre = {
    name:"Mogor",
    uid: "ogre",
    level:3,
    type:"Crush, kill, than eat",
    accuracy: 65,
    dodge: 22,
    armor: 2,
    weapon: ['Club', 8, 10],
    skillPointsCurrent:4,
    skillPoints:4,
    hitPointsCurrent:28,
    hitPoints:28,
    skills:['Keel!','Destoyah!'],
    ui_id: "#enemy-ui-one",
    img_id: "#ogre",
    img: function(){$("#enemy-ui-one").append('<img id="'+currentEnemies[0].uid+'" class="ememies" src="images/ogre.png">');},
};

var dungeonGuard = {
    name:"Butcher Brute",
    uid: "dungeonGuard",
    level:5,
    type:"First you peel them, then you eat them.",
    accuracy: 60,
    dodge: 10,
    armor: 3,
    weapon: ['Meat Cleaver', 14, 16],
    skillPointsCurrent:4,
    skillPoints:4,
    hitPointsCurrent:35,
    hitPoints:35,
    skills:['Peel','Carve'],
    ui_id: "#enemy-ui-one",
    img_id: "#dungeonGuard",
    img: function(){$("#enemy-ui-one").append('<img id="'+currentEnemies[0].uid+'" class="ememies" src="images/dungeon-guard.png">');},
};

var berserker = {
    name:"Imperial Berserker",
    uid: "berserker",
    level:4,
    type:"Heads will roll.",
    accuracy: 75,
    dodge: 20,
    armor: 1,
    weapon: ['Executioners Axe', 1, 20],
    skillPointsCurrent:4,
    skillPoints:4,
    hitPointsCurrent:25,
    hitPoints:25,
    skills:['Chop','Raging'],
    ui_id: "#enemy-ui-one",
    img_id: "#berserker",
    img: function(){$("#enemy-ui-one").append('<img id="'+currentEnemies[0].uid+'" class="ememies" src="images/berserker.png">');},
};

var castleGuard = {
    name:"Castle Guard",
    uid: "castleGuard",
    level:8,
    type:"None shall pass.",
    accuracy: 70,
    dodge: 35,
    armor: 4,
    weapon: ['Ginsu Axe', 15, 20],
    skillPointsCurrent:4,
    skillPoints:4,
    hitPointsCurrent:30,
    hitPoints:30,
    skills:['Violent Strike','Face-off'],
    ui_id: "#enemy-ui-one",
    img_id: "#castleGuard",
    img: function(){$("#enemy-ui-one").append('<img id="'+currentEnemies[0].uid+'" class="ememies" src="images/castle-guard.png">');},
};

var dragon = {
    name:"Deathbringer",
    uid: "dragon",
    level:99,
    type:"Peon crusher",
    accuracy: 88,
    dodge: 30,
    armor: 7,
    weapon: ['Dragon Claws', 20, 24],
    skillPointsCurrent:4,
    skillPoints:4,
    hitPointsCurrent:70,
    hitPoints:70,
    skills:['Bite Head Off','Fire Breath'],
    ui_id: "#enemy-ui-one",
    img_id: "#dragon",
    img: function(){$("#enemy-ui-one").append('<img id="'+currentEnemies[0].uid+'" class="ememies flying" src="images/dragon.png">');},
};

var theking = {
    name:"King Vlad the Inhaler",
    uid: "theking",
    level:20,
    type:"Supreme Ruler & Overall Good Guy",
    accuracy: 85,
    dodge: 50,
    armor: 5,
    weapon: ['Lights Edge', 18, 20],
    skillPointsCurrent:10,
    skillPoints:10,
    hitPointsCurrent:38,
    hitPoints:38,
    skills:['Cleave','Accurate Strike'],
    ui_id: "#enemy-ui-one",
    img_id: "#theking",
    img: function(){$("#enemy-ui-one").append('<img id="'+currentEnemies[0].uid+'" class="ememies" src="images/theking.png">');},
};