$(document).ready(function() {


    /* Each character is their own object with different stats
    * Each has an init method which initializes their stats randomly
    * Each has an update attack method that increases their attack power
    */
    var han = {
        name : "Who, Me?",
        attack : 0,
        counterAttack: 0,
        hp: 0,

        init : function() {

            this.attack = Math.floor(Math.random() * 20 + 5);
            this.counterAttack = Math.floor(Math.random() * 20 + 5);
            this.hp = Math.floor(Math.random() * 150 + 25);



        },

        updateAttack : function() {

            this.attack += 3
        },


    };

    var obiwan = {
        name: "Hello There Obi",
        attack : 0,
        counterAttack: 0,
        hp: 0,

        init : function() {

            this.attack = Math.floor(Math.random() * 20 + 5);
            this.counterAttack = Math.floor(Math.random() * 20 + 5);
            this.hp = Math.floor(Math.random() * 200 + 30 );
        },

        updateAttack : function() {
            this.attack += 5
        },

    };

    var anakin = {
        name: "Young Anakin",
        attack : 0,
        counterAttack: 0,
        hp: 0,

        init : function() {

            this.attack = Math.floor(Math.random() * 10 + 5);
            this.counterAttack = Math.floor(Math.random() * 20 + 10);
            this.hp = Math.floor(Math.random() * 100 + 20);



        },

        updateAttack : function() {

            this.attack += 1
        },

    };


    var highGround = {
        name: "High Ground Obi",
        attack : 0,
        counterAttack: 0,
        hp: 0,

        init : function() {

            this.attack = Math.floor(Math.random() * 50 + 5);
            this.counterAttack = Math.floor(Math.random() * 5 + 20);
            this.hp = Math.floor(Math.random() * 200 + 50);
        },

        updateAttack : function() {
            this.attack += 8
        },


    };

    // This is the game object code that holds the player's character, the enemy's chracter
    // if the player won the previous battle, and how many enemys are defeated.
    // It also handles game initialization, attacks, and end of game scenarios.
    var game = {

        playerCharacter: null,
        enemyCharacter: null,
        playerWon: false,
        enemysDefeated: 0,


        // This sets game's playerCharacter to whichever the user clicked and moves the
        // character's picture under 'Your Character'
        chooseCharacter : function(player) {

            if($(player).attr("id") === "obiwan") {
                this.playerCharacter = obiwan; 
            } else if($(player).attr("id") === "han") {
                this.playerCharacter = han;
             } else if($(player).attr("id") === "anakin") {
                 this.playerCharacter = anakin;
             } else {
                 this.playerCharacter = highGround;
             }
            
             $("#yourChar").append($(player));

             $(player).attr("chosen", "true");
            
        },

        // This sets game's enemyCharacter to whichever the user clicked and moves the
        // character's picture under  
        chooseEnemy : function(enemy) {
         
            if($(enemy).attr("id") === "obiwan") {
                this.enemyCharacter = obiwan; 
            } else if($(enemy).attr("id") === "han") {
                this.enemyCharacter = han;
             } else if($(enemy).attr("id") === "anakin") {
                 this.enemyCharacter = anakin;
             } else {
                 this.enemyCharacter = highGround;
             }

             $("#defender").append($(enemy));
             $(enemy).css("background-color", "black");
             $(enemy).css("border-width", "5px");
             $(enemy).css("border-color", "green");

            // Deletes previous battle text. 
            if (this.playerWon) {
                $("#battleText").html("");
            }
        },

        // This initializes the characters and manipulates the DOM to setup the fight
        initializeFight : function(player, enemy) {
            if(!this.playerWon) {
                console.log("initializes player's char");
                this.playerCharacter.init();
            }
            this.enemyCharacter.init();

            // Displays initialized health
            $(player).children("#health").text(this.playerCharacter.hp);
            $(enemy).children("#health").text(this.enemyCharacter.hp); 
            
            $("#yourChar").css("position", "relative");
            $("#yourChar").css("left", "500px");
            $("#defender").css("position", "absolute");
            $("#defender").css("left", "825px");
            $("#defender").css("bottom", "353px");
            $(enemy).css("position", "relative");
            $(enemy).css("right", "40px");

        },

        // This handles each attack, calculating updated hp, updates player's attack,
        // and handles end of game conditions

        attack : function(player, enemy) {

            
            if (this.enemyCharacter.hp > 0) {

                this.playerCharacter.hp -= this.enemyCharacter.counterAttack;
                console.log("players hp is " + this.playerCharacter.hp);
                console.log("players attack is " + this.playerCharacter.attack);
                console.log("players counterattack is " + this.playerCharacter.counterAttack);

                if(this.playerCharacter.hp <= 0) {
                    this.playerCharacter.hp = 0;
                }
                this.enemyCharacter.hp -= this.playerCharacter.attack;
            // console.log(this.enemyCharacter.hp)
                if(this.enemyCharacter.hp <= 0) {
                    this.enemyCharacter.hp = 0;
                }
                $(player).children("#health").text(this.playerCharacter.hp);
                $(enemy).children("#health").text(this.enemyCharacter.hp);

                this.playerCharacter.updateAttack();
            
                $("#battleText").html("<p>You attacked " + this.enemyCharacter.name + " for " + this.playerCharacter.attack + " damage.<p>" + "<p>" + this.enemyCharacter.name + " attacked you back for " + this.enemyCharacter.counterAttack + " damage. </p>");

                if(this.enemyCharacter.hp === 0) {
                    this.playerWon = true;

                    var winText = "<p>You defeated " + this.enemyCharacter.name + ". Please click a new opponenent. <p>";
                    $("#battleText").append(winText);
                    this.enemysDefeated++;
                    if (this.enemysDefeated === 3) {
                        var victory = $("<h1 class = 'fade-in'</h1>");
                        $(victory).html("CONGRATULATIONS! YOU ARE THE CHAMPION OF THE ANNUAL CORUSCANT BATTLE ROYALE")
                        $(victory).css("color", "red");
                        $(victory).css("position", "relative");
                        $(victory).css("bottom", "400px");
                        $(victory).css("right", "0px");
                        $(victory).css("display", "block");
                        $(victory).css("margin","0");
                        $(victory).css("text-align","center");
                        $(victory).appendTo( document.body );
                    }
                }

                 
                if(this.playerCharacter.hp === 0) {
                    var playAgain = confirm("You were slain by " + this.enemyCharacter.name + "! Refresh the page to try again");
                    if (playAgain) {
                        location.reload();
                    }
                }
            }      
        }
    }

   
    var playerChosen = false;
    var player = null;
    var enemy = null;
    

    // First on click event for choosing a player
    $(".character").on("click", function() {
        if(playerChosen === false) {
            player = this; // sets player to the id so we can pass it in game's methods to manipulate
            //console.log($(this).attr("id"));
            game.chooseCharacter(player);
            
        }   
        playerChosen = true;
        

        $("#enemies").append($(".characters"));  

        if($("#obiwan").attr("chosen") === "false") {
            $("#obiwan").css("background-color", "red");
            $("#obiwan").css("border-width", "0px");
         }
        if($("#anakin").attr("chosen") === "false") {
            $("#anakin").css("background-color", "red");  
            $("#anakin").css("border-width", "0px");
        } 
        if($("#highGround").attr("chosen") === "false") {
            $("#highGround").css("background-color" , "red");
            $("#highGround").css("border-width", "0px");  
        } 
        if($("#han").attr("chosen") === "false") {
            $("#han").css("background-color", "red");
            $("#han").css("border-width", "0px");
        } 
        
        // Second on click to choose an enemy. This also calls on game to 
        // initialize the fight.
        $(".character").on("click", function() {
            if(game.playerWon) {
                $(enemy).remove();
            }
            playerWon = false;
            if(playerChosen) {
                enemy = this;
                game.chooseEnemy(enemy);
                game.initializeFight(player, enemy);
                enemyChosen = true;
            }

        });

        // Clicking the attack button calls on game's attack method
        $("#attack").unbind().on("click", function() {
            console.log("attack was clicked");
            game.attack(player, enemy);
        });
        
    });

    






            




    



























    


});