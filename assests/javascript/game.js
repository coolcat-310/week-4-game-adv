/**
 * Created by juancarlosnavarrete on 2/18/17.
 */

var DEBUG = true;

//Global Variables
var crystals = {
    sazzy:{
        name: "Sazzy",
        hp: 100,
        attack: 10,
        counter: 8,
    },
    mozzy:{
        name: "Mozzy",
        hp: 150,
        attack: 8,
        counter: 10,

    },
    tranzy:{
        name: "Tranzy",
        hp: 75,
        attack: 16,
        counter: 14,
    },
    opazy:{
        name: "Opazy",
        hp: 80,
        attack: 9,
        counter: 3,
    }
};

var incAttack = 0;
var player1;
var player2;
var winCount = 0;


$(".aboutMe").hover(function(){
    /* The Event listener takes effect when the cursor is place over the crystal images
    *  The #instructions displays stats about each crystal and guides user towards the next step.*/

    var placeholder = this.id;
    var vitalStats = crystals[placeholder];
    if(DEBUG) {
        console.log(placeholder);
        console.log(vitalStats);
    }
    $("#intructions").html(vitalStats.name + " HP: " + vitalStats.hp + "  Attack: " + vitalStats.attack + " CounterAttack: " + vitalStats.counter);
        }, function(){
            if(player1===undefined){
                $("#intructions").html("Choose your Character!");
                } else if (player1!==undefined && player2===undefined){
                $("#intructions").html("<p>Choose your Adversary wisely!</p>");
                } else {
                $("#intructions").html("Let the battle begin!");
                }
        }
);

$(".aboutMe").on("click", function(){
    /* The Event listener takes effect when the cursor clicks on one of the crystal.
    *  The function assigns player1 and player2. */

    if(player1 === undefined){
        var placeholder = this.id;
        player1 = crystals[placeholder];
        incAttack = player1.attack;
        $(this).addClass("hideMe");
        $(".aboutMe").removeClass("playableCharacter");
        $(placeholder).addClass("hideMe");
        if(DEBUG) {
            console.log(this);
            console.log('I was click');
            console.log(player1);
            console.log(incAttack);
            console.log(placeholder);
        }
        htmlBuild = "<img class=img-circle src= assests/images/" + placeholder + ".jpg" + ">";
        console.log(htmlBuild);
        $(".playerOne").html(htmlBuild);
    }
    else if (player1 != undefined && player2 === undefined){
        var placeholder = this.id;
        player2 = crystals[placeholder];
        $(this).addClass("hideMe");
        $(this).addClass("currentEnemy");
        htmlBuild = "<img class=img-circle src= assests/images/" + placeholder + ".jpg" + ">";
        $(".playerTwo").html(htmlBuild);

        if(DEBUG) {
            console.log(player2);
        }
    }

});

function updateStats(){
    /* Builds a string about the current health status of both player1 & player2 */

    var resultsHtml =  player1.name + " has attacked " + player2.name + " for " + player1.attack + " Health Points!<br>" +
        player2.name + " has counter-attacked " + player1.name + " for " + player2.counter + " Health Points!<br>" +
        player1.name + " has " + player1.hp + " Health Points remaining!<br>" +
        player2.name + " has " + player2.hp + " Health Points remaining!";

    $(".stats").html(resultsHtml);
};

function erasePlayer2(){
    /* When player2 is defeated, then the contents in #playerTwo is erase*/
    player2=undefined;
    $(".playerTwo").html("");
    $(".stats").html("");
    $(".instructionalText").html("Now choose your next opponent!");
    winCount++;
};

function gameOver(){
    /* When player1 is defeated, then the game is reset */
    alert("You lost.\nPlease Try Again");
    reset();
}

function fightOutcome(){
    /* fightOutcome determine whether player1 or player2 is defeated */

    if(player1.hp > 0 && player2.hp < 1){
        if (DEBUG){console.log(player2.name + ' is defeated.');}
        erasePlayer2();
    }else if(player1.hp < 1){
        if (DEBUG){console.log(player1.name + ' is defeated');}
        gameOver();
    }
};

function isWinner(){
    /* isWinner determines whether player1 is a winner only after he beats all other crystals */
    if(winCount === 3){
        alert(player1.name + " is a Winner!!!!");
        reset();
    }
}

$(".fightButton").on("click",function(){
    /* fightBUTTON make sure that a fight can begin only if both players are chosen. */

    if(player1 != undefined && player2 != undefined){
        player2.hp -= player1.attack;
        player1.hp -= player2.counter;
        updateStats();
        player1.attack += Math.floor(Math.random() * 3);
        fightOutcome();
        isWinner();

        if(DEBUG){
            console.log(player2.hp);
            console.log(player1.hp);
            console.log('attack' + player1.attack)
        }

    };
});

function reset() {
    // Reset the game
    winCount = 0;
    player1= undefined;
    player2= undefined;
    $(".playerOne").html("");
    $(".playerTwo").html("");
    $("#intructions").html("Choose your Crystal");
    $(".stats").html("");
    $(".aboutMe").removeClass("hideMe");
    $(".aboutMe").removeClass("currentEnemy");
    $(".aboutMe").removeClass("player1");
    $(".aboutMe").addClass("playableCharacter");
    htmlBuild;
    crystals = {
        sazzy:{
            name: "Sazzy",
            hp: 100,
            attack: 10,
            counter: 8,
        },
        mozzy:{
            name: "Mozzy",
            hp: 150,
            attack: 8,
            counter: 10,

        },
        tranzy:{
            name: "Tranzy",
            hp: 75,
            attack: 16,
            counter: 14,
        },
        opazy:{
            name: "Opazy",
            hp: 80,
            attack: 9,
            counter: 3,
        }
    };
}

$(".resetButton").on("click",function(){
    reset();
});