$(document).ready(function() {

	var jediLife = 120;
	var ewokLife = 80;
	var jawaLife = 100;
	var salaciousLife = 140;
	var sithLife = 180;

	var choiceLife = 0;
	var enemyLife =  0;

	var attack = 0;

    var chooseToggle = false;

    var thatChoice;
    var thatEnemy;

    var enemiesDefeated = 0;
    var wins = 0;
    var losses = 0;

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
    	$("#attack").prop("disabled", true);
    	console.log($("#jedi").attr("value"));
    }

    start();

    $(".character").on("click", function() {
        if (chooseToggle === false) {
            $(this).clone().appendTo(".choice");
            $(this).hide();
            choiceLife = parseInt($(this).attr("value"));
            $("#result").empty();
            $("img", ".choose").css("border", "5px solid red");
            chooseToggle = true;

        } else if (chooseToggle === true) {
            $(this).clone().appendTo(".enemy");
            $(this).hide();
            enemyLife = parseInt($(this).attr("value"));
            $("#result").empty();
            $("#next").empty();
            $("#attack").prop("disabled", false);
            chooseToggle = undefined;
        }
    })

    $("#attack").on("click", function() {
    	attack = Math.floor(Math.random() * 90);
    	enemyLife -= attack;
    	$("span", ".enemy").find("h6").html("Health: " + enemyLife);
    	$("#result").append('<span id="give">You attacked ' + $("span", ".enemy").find("h3").text() + ' for ' + attack + ' damage.</span><br>');
    	if (enemyLife <= 0) {
    		$("#next").append("You defeated " + $("span", ".enemy").find("h3").text() + ". Choose your next opponent.");
    		$("span", ".enemy").empty();
    		$("#attack").prop("disabled", true);
    		chooseToggle = true;
    		enemiesDefeated++;
    		if (enemiesDefeated === 4) {
    			wins++;
    			$("#wins").html("Wins: " + wins);
    			reset();
    			$("#win").show();
				setTimeout(function() { $("#win").hide(); }, 2700);
    		}
    	} else {
    		attack = Math.floor(Math.random() * 30);
    		choiceLife -= attack;
    		$("span", ".choice").find("h6").html("Health: " + choiceLife);
    		if (choiceLife <= 0) {
    			losses++;
    			$("#losses").html("Losses: " + losses);
    			reset();
    			$("#lose").show();
				setTimeout(function() { $("#lose").hide(); }, 2000);
    		} else {
    			$("#result").append('<span id="take">' + $("span", ".enemy").find("h3").text() + ' attacked you for ' + attack + ' damage.</span><br>');
    		}
    	}
    	console.log(enemiesDefeated);
    })

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
	enemyLife =  0;

	attack = 0;

    chooseToggle = false;

    thatChoice;
    thatEnemy;

    enemiesDefeated = 0;

    $("#result").empty();
    $("#next").empty();

    start();
    }

});