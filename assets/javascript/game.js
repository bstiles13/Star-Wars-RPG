$(document).ready(function() {

	// Each character is given a predefined number of life points that is pushed to the html and value attributes at the start
    var jediLife = 120;
    var ewokLife = 80;
    var jawaLife = 100;
    var salaciousLife = 140;
    var sithLife = 180;


    //These are placeholders that adopt the life points of chosen characters
    var choiceLife = 0;
    var enemyLife = 0;

    //This variable will later generate random attack points when the "attack" button is clicked, and will reduce the choice's and enemy's life
    var attack = 0;

    //A toggle that allows the first character to be selected when false, and the second character (enemy) to be selected when true
    var chooseToggle = false;

    //Counters
    var enemiesDefeated = 0;
    var wins = 0;
    var losses = 0;

    //Function that shows gif when player wins
    function winGif() {
    	$("#win").show();
        setTimeout(function() {
            $("#win").hide();
                }, 2700);
    }

    //Function that shows gif when player loses
    function loseGif() {
    	$("#lose").show();
        setTimeout(function() {
            $("#lose").hide();
                }, 2000);
    }

    //Function that shows gif when player escapes to hyperspace successfully
    function escapeGif() {
    	$("#run").show();
        setTimeout(function() {
            $("#run").hide();
                }, 3000);
    }

    //Starts game and assigns life points to character/html/DOM
    function start() {
        $("#jedi").attr("value", jediLife).find("h6").html("Health : " + jediLife);
        $("#ewok").attr("value", ewokLife).find("h6").html("Health : " + ewokLife);
        $("#jawa").attr("value", jawaLife).find("h6").html("Health : " + jawaLife);
        $("#salacious").attr("value", salaciousLife).find("h6").html("Health : " + salaciousLife);
        $("#sith").attr("value", sithLife).find("h6").html("Health : " + sithLife);
        $("img", ".choose").css("border", "5px solid lime");
        $("audio").hide();
        $("#win").hide();
        $("#lose").hide();
        $("#run").hide();
        $("#attack").prop("disabled", true);
        $("#escape").prop("disabled", true);
        console.log($("#jedi").attr("value"));
    }

    start();

    //Player chooses character
    //If the choose toggle is false, the click will select the first (main) character
    $(".character").on("click", function() {
        if (chooseToggle === false) {
            $(this).clone().appendTo(".choice");
            $(this).hide();
            choiceLife = parseInt($(this).attr("value"));
            $("#result").empty();
            $("img", ".choose").css("border", "5px solid red");
            $("h2", ".choose").text("Choose your opponent");
            chooseToggle = true;

        //If the choose toggle is true, the click will select the enemy
        } else if (chooseToggle === true) {
            $(this).clone().appendTo(".enemy");
            $(this).hide();
            enemyLife = parseInt($(this).attr("value"));
            $("#result").empty();
            $("#next").empty();
            $("#attack").prop("disabled", false);
            $("#escape").prop("disabled", false);
            chooseToggle = undefined;
        }
    })

    //Player clicks the Attack button that inflicts random damage to enemy between 0-90
    $("#attack").on("click", function() {
        attack = Math.floor(Math.random() * 90);
        enemyLife -= attack;
        $("span", ".enemy").find("h6").html("Health: " + enemyLife);
        $("#result").append('<span id="give">You attacked ' + $("span", ".enemy").find("h3").text() + ' for ' + attack + ' damage.</span><br>');
        //If the enemy's life reaches 0, remove the enemy and allow a second enemy to be selected
        if (enemyLife <= 0) {
            $("#next").append("You defeated " + $("span", ".enemy").find("h3").text() + ". Choose your next opponent.");
            $("span", ".enemy").empty();
            $("#attack").prop("disabled", true);
            $("#escape").prop("disabled",true);
            chooseToggle = true;
            enemiesDefeated++;
            //If all available enemies are defeated, increase wins by 1 and reset game/character selection
            if (enemiesDefeated === 4) {
                wins++;
                $("#wins").html("Wins: " + wins);
                reset();
                winGif();
            }
        //If enemy survives an Attack click, the enemy strikes back at player's character with random damage between 0-30
        } else {
            attack = Math.floor(Math.random() * 30);
            choiceLife -= attack;
            $("span", ".choice").find("h6").html("Health: " + choiceLife);
            //If the player's character reaches 0 life, increase losses by 1 and reset game/characte selection
            if (choiceLife <= 0) {
                losses++;
                $("#losses").html("Losses: " + losses);
                reset();
                loseGif();
            } else {
                $("#result").append('<span id="take">' + $("span", ".enemy").find("h3").text() + ' attacked you for ' + attack + ' damage.</span><br>');
            }
        }
        console.log(enemiesDefeated);
    })
    //If defeat is imminent, player can click 'Jump to Hyperspace' button that gives 50% chance of reset and 50% chance of loss
    $("#escape").on("click", function() {
    	var winLose = Math.floor(Math.random() * 2);
    	if (winLose === 0) {
    		losses++;
    		$("#losses").html("Losses: " + losses);
    		reset();
    		loseGif();
    	} else if (winLose === 1) {
    		reset();
    		escapeGif();
    	}
    	console.log(winLose);
    });

    //Reset button that resets wins and losses
    $("input", ".reset").on("click", function() {
    	wins = 0;
    	$("#wins").html("Wins: " + wins);
    	losses = 0;
    	$("#losses").html("Losses: " + losses);
    	reset();
    })

    //Reset function that returns game to original state; triggers when game is won, lost, escaped, or reset
    function reset() {

        $("span", ".choose").show();
        $("span", ".choice").empty();
        $("span", ".enemy").empty();
        jediLife = 120;
        ewokLife = 80;
        jawaLife = 100;
        salaciousLife = 140;
        sithLife = 180;

        choiceLife = 0;
        enemyLife = 0;

        attack = 0;

        chooseToggle = false;

        enemiesDefeated = 0;

        $("#result").empty();
        $("#next").empty();
        $("h2", ".choose").text("Choose your character");

        start();
    }

});