$(document).ready(function() {


    // each character is their own object with different stats


    var han = {
        name : "Who, Me?",
        attack : 0,
        counterAttack: 0,
        hp: 0,

        init : function() {

            this.attack = Math.floor(Math.random() * 30);
            this.counterAttack = Math.floor(Math.random() * 30);
            this.hp = Math.floor(Math.random() * 150);



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

            this.attack = Math.floor(Math.random() * 20);
            this.counterAttack = Math.floor(Math.random() * 10);
            this.hp = Math.floor(Math.random() * 200);



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

            this.attack = Math.floor(Math.random() * 10);
            this.counterAttack = Math.floor(Math.random() * 20);
            this.hp = Math.floor(Math.random() * 100);



        },

        updateAttack : function() {

            this.attack += 1
        },

    };

    var jarjar = {

        attack : 0,
        counterAttack: 0,
        hp: 0,

        init : function() {

            this.attack = Math.floor(Math.random() * 25);
            this.counterAttack = Math.floor(Math.random() * 15);
            this.hp = Math.floor(Math.random() * 300);



        },


    };

    var highGround = {
        name: "High Ground Obi",
        attack : 0,
        counterAttack: 0,
        hp: 0,

        init : function() {

            this.attack = Math.floor(Math.random() * 50);
            this.counterAttack = Math.floor(Math.random() * 5);
            this.hp = Math.floor(Math.random() * 200);



        },

        updateAttack : function() {

            this.attack += 8
        },


    };




    // game code
    // first I need have the player pick a character and then initialize his character
    // Sith jar jar is the secret boss 
    

    var game = {

        playerCharacter: null,
        enemyCharacter: null,
        playerWon: false,


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
            // console.log(this);
            
             
             
             $("#yourChar").append($(player));

             $(player).attr("chosen", "true");
            
           
        },

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

            // console.log(this);



        },

        initializeFight : function(player, enemy) {
           // console.log(this.playerCharacter);
            if(!this.playerWon) {
                console.log("initializes player's char");
                this.playerCharacter.init();
            }
            this.enemyCharacter.init();
            //console.log(this.enemyCharacter);

            
            $(player).children("#health").text(this.playerCharacter.hp);
            $(enemy).children("#health").text(this.enemyCharacter.hp); 
            
            $("#yourChar").css("position", "relative");
            $("#yourChar").css("left", "500px");
            $("#defender").css("position", "absolute");
            $("#defender").css("left", "825px");
            $("#defender").css("bottom", "368px");
            $(enemy).css("position", "relative");
            $(enemy).css("right", "40px");



        },

        attack : function(player, enemy) {

            this.playerCharacter.hp -= this.enemyCharacter.counterAttack;
            console.log(this.playerCharacter.hp);
            console.log(this.playerCharacter.attack);
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
                alert("You defeated " + this.enemyCharacter.name + "! Choose a new opponent!");
                this.playerWon = true;
                //$(enemy).remove();
            }
            if(this.playerCharacter.hp === 0) {
                var playAgain = confirm("You were slain by " + this.enemyCharacter.name + "! Refresh the page to try again");
                if (playAgain) {
                    location.reload();
                }
            }


            

            


        


        }
    }

   
  
    var playerChosen = false;
    var player = null;
    var enemy = null;
    
    $(".character").on("click", function() {
        if(playerChosen === false) {
            player = this;
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
        
            
            $(".character").on("click", function() {
                if(game.playerWon) {

                
                    $(enemy).remove();
                }
                playerWon = false;
                if(playerChosen) {
                    //console.log(this);
                    $(this).off("click",this);
                // fix this later
                    enemy = this;
                    game.chooseEnemy(enemy);
                    //console.log(player);
                    game.initializeFight(player, enemy);
                    enemyChosen = true;

                    $("#attack").on("click", function() {

                        game.attack(player, enemy);




                    });

        


                }

            });
            
            

         
            





        

        
    });

    






            




    

   /* $(".character").on("click", function() {
        if(gameStarted === true) {
            var character = this;
            console.log($(this).attr("id"));
            game.chooseEnemy(character);
        }   



    });
    */



























    


});