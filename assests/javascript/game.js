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

/* On hover of the center character div, run function. */
$(".aboutMe").hover(function(){
        /* get ID of image */
        var placeholder = this.id;

        /* declare character.id to access object values. EXAMPLE = hovering over image of jack returns
         id of jack(as declared in html). vitalStats would equal the object of characters.jack*/
        var vitalStats = crystals[placeholder];
        if(DEBUG) {
            console.log(placeholder);
            console.log(vitalStats);
        }
        /* because vitalStats is now a specific character from characters object, we can now access
         their name, health points, attack, and even counter attack if we chose to. The code below
         gets the name, HP, and attack and generates HTML containing it.*/
        $("#intructions").html(vitalStats.name + " HP: " + vitalStats.hp + "  Attack: " + vitalStats.attack + " CounterAttack: " + vitalStats.counter);
    }, /* above half runs on mouse enter hover area,
     here on down runs on mouse exit hover area */
    function(){
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
    if(player1 === undefined){
        /* same process as hover function to choose ID of clicked and select matching object */
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
    var resultsHtml =  player1.name + " has attacked " + player2.name + " for " + player1.attack + " Health Points!<br>" +
        player2.name + " has counter-attacked " + player1.name + " for " + player2.counter + " Health Points!<br>" +
        player1.name + " has " + player1.hp + " Health Points remaining!<br>" +
        player2.name + " has " + player2.hp + " Health Points remaining!";

    $(".stats").html(resultsHtml);
};

function erasePlayer2(){
    // alert("You've defeated " + currentEnemy.name);
    player2=undefined; /* so you can add new enemy */
    $(".playerTwo").html(""); /* clear dead opponent's photo */
    $(".stats").html(""); /* clear text with attack status */
    $(".instructionalText").html("Now choose your next opponent!");
    winCount++; /* for the Easter egg */
};

function gameOver(){
    alert("You lost!!!");
    reset();
}

function fightOutcome(){
    /* if enemy has less than 1 health, and you have more than 0 */
    if(player1.hp > 0 && player2.hp < 1){
        console.log(player2.name + ' is defeated.');
        erasePlayer2();
    }else if(player2.hp > 0 && player1.hp < 1){
        console.log(player1.name + ' is defeated');
        gameOver();
    }
    // if(currentEnemy.hp < 1 && chosenCharacter.hp > 0){
    //     deadEnemy(); /* enemy dies */
    // } else if(chosenCharacter.hp < 1)/*You have less than 1 HP? Too bad! */{
    //     deadPlayer(); /* you die. Reset function is contained within deadPlayer function */
    // }
};


$(".fightButton").on("click",function(){
    /* make sure it only runs if both enemy and character are chosen */
    if(player1 != undefined && player2 != undefined){
        /* remove enemy health based on your character attack */
        player2.hp -= player1.attack;
        /* remove your health based on their counter attack */
        // chosenCharacter.hp-=currentEnemy.counterAttack;
        player1.hp -= player2.counter;
        // /* run function to post results */
        updateStats();
        // /* increment attack based on global variable we declared earlier */
        player1.attack += Math.ceil(Math.random() * 9);
        // chosenCharacter.attack += attackPower;
        // /* Are either of them dead? */
        fightOutcome();
        /* Are all three characters defeated? */
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
    $(".playerOne").html = "";
    $(".playerTwo").html = "";




}