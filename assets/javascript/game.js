$(document).ready(function() {

	var jediLife = 100;
	var ewokLife = 100;
	var jawaLife = 140;
	var sithLife = 180;

	var choiceLife = 0;
	var enemyLife =  0;

	var attack = 0;

    var chooseToggle = false;

    var thatChoice;
    var thatEnemy;

    var enemiesDefeated = 0;

    function start() {
    	$("#jedi").attr("value", jediLife);
    	$("#ewok").attr("value", ewokLife);
    	$("#jawa").attr("value", jawaLife);
    	$("#sith").attr("value", sithLife);
    	$("img").css("border", "5px solid lime");
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
    		chooseToggle = true;
    		enemiesDefeated++;
    		if (enemiesDefeated === 3) {
    			alert("You won Star Wars!");
    			reset();
    		}
    	} else {
    		attack = Math.floor(Math.random() * 30);
    		choiceLife -= attack;
    		$("span", ".choice").find("h6").html("Health: " + choiceLife);
    		if (choiceLife <= 0) {
    			alert("You got your butt kicked by " + $("span", ".enemy").find("h3").text());
    			reset();
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
    jediLife = 100;
	ewokLife = 100;
	jawaLife = 140;
	sithLife = 180;

	choiceLife = 0;
	enemyLife =  0;

	attack = 0;

    chooseToggle = false;

    thatChoice;
    thatEnemy;

    enemiesDefeated = 0;

    $("#result").empty();

    start();
    }

    $("audio").hide();
});