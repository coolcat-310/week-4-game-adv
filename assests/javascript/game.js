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


/* On hover of the center character div, run function. */
$(".aboutMe").hover(function(){
        /* get ID of image */
        var placeholder = this.id;

        /* declare character.id to access object values. EXAMPLE = hovering over image of jack returns
         id of jack(as declared in html). vitalStats would equal the object of characters.jack*/
        var vitalStats = crystals[placeholder];
        // if(DEBUG) {
        //     console.log(placeholder);
        //     console.log(vitalStats);
        // }
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
    // else if /* player chosen, but not enemy */(currentEnemy === undefined && chosenCharacter !== undefined){
    //     /* This part is nearly identical to the above */
    //     var placeholder = this.id;
    //     currentEnemy = characters[placeholder];
    //     console.log(currentEnemy); /* You can cheat and view their counter-attack values. Cheater! */
    //     $(this).addClass("hideMe");
    //     $(this).removeClass("enemyCharacter"); /* no longer enemy character */
    //     $(this).addClass("currentEnemy");  /* make current enemy instead */
    //     htmlBuild = "<img src='assets/images/" + placeholder + ".jpg'" + ">" /* get image */
    //     $(".enemyBox").html(htmlBuild); /* place image in enemy box on right */
    //     $(".instructionalText").html("Let the battle begin!"); /* update instructions */
    // }
});