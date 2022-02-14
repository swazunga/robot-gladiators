
var fightOrSkip = function () {
    //ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose. ');

    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again");
        return fightOrSkip();
    }

    //if player picks "skip" confirm and then stop the loop
    promptFight = promptFight.toLowerCase();
    if (promptFight === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            //subtract money from playerMoney for skipping
            playerInfo.money = playerInfo.money - 10;

            //return true if player wants to leave
            return true;
        }
    }
    return false;
}

var fight = function(enemy) {
    var isPlayerTurn = true;
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }
    // repeat and execute as long as the enemy-robot is alive
    while(playerInfo.health > 0 && enemy.health > 0) {
     if (fightOrSkip ()) {
         break;
     }
    // Subtract the value of `playerInfo.attack` from the value of `enemy.health` and use that result to update the value in the `enemy.health` variable
    var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);
    enemy.health = Math.max(0, enemy.health - damage);
    // Log a resulting message to teh console so we know that it worked. 
    console.log(
        playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
    );
        // check enemy's health
        if (enemy.health <=0) {
            window.alert(enemy.name + " has died!");

            // award player money for winning
            playerInfo.money = playerInfo.money + 20;
            //leave while() loop since enemy is dead
            break;
        }
        
        else {
            window.alert(enemy.name + " still as " + enemy.health + " health let");
        }
    // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update teh value in the `playerInfo.health` variable.
    var damage = randomNumber(enemy.attack - 3, enemy.attack)    
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    // Log a resulting message to the console so we know that it worked.
    console.log(
        enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
    );

    // check player's health
    if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        break;
    }
    else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
    }
    // switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
}
};

    // if no (false), ask question again by running fight () again
    // else {
    //     fight();
    // }
//}
//}   else {
//     window.alert("You need to choose a valid option. Try again!")
// };
//     };
// }; 

var startGame = function () {
    // keep track of who goes first

    playerInfo.reset ();
for(var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
    var pickedEnemyObj = enemyInfo[i];
    pickedEnemyObj.health = randomNumber(40, 60);
    fight(pickedEnemyObj);
    if (playerInfo.health > 0 && i < enemyInfo.length -1) {
        var storeConfirm = window.confirm ("The fight is over, visit the store before the next round?")
        if (storeConfirm) {
        shop ();
        }
    }
}
    else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
    }
}
endGame();
};
var endGame = function () {
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon");
    }
}
var shop = function () {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth (); 
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");

            // do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.")
            shop ();
            break;
    }
};
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

var getPLayerName = function () {
    var name="";
    //ADD LOOP HERE WITH PROMPT AND CONDITION
    while (name === "" || name === null) {
        name=prompt("What is your robot's name?")
    }
    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo = {
    name: getPLayerName(),
health: 100,
attack: 10,
money: 10,
reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
},
refillHealth: function () {
    if (this.money >= 7){
    window.alert("Refilling player's health by 20 for 7 dollars.")
    this.health +=20;
    this.money -= 7;
    }
    else {
        window.alert("You don't have enough money!")
    }
},
upgradeAttack: function() {
    if (this.money >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");
        this.attack += 6;
        this.money -= 7;
}
    else {
        window.alert("You don't have enough money!");
    }
}
};
console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var enemyInfo = [
    {
        name:"Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];
startGame();
