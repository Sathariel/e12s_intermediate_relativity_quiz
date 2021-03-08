$(document).ready(function() {
	const debuffs = {
		"flare": 	"https://i.imgur.com/5vYRbXd.png",
		"aero": 	"https://i.imgur.com/LaADLBr.png",
		"eruption": "https://i.imgur.com/83xRLXp.png",
		"gaze": 	"https://i.imgur.com/QS1vXP1.png",
		"blizzard": "https://i.imgur.com/0zL9Nc6.png",
		"stack": 	"https://i.imgur.com/CqIpg8G.png"
	};

	const sequences_1 = [
		["eruption"],
		["blizzard", "aero"],
		["flare", "gaze", "stack"]
	];

	const sequences_2 = [
		["eruption"],
		["flare", "gaze", "stack"],
		["blizzard", "aero"]
	];

	const answers = {
		"flare": 	"out",
		"aero": 	"out",
		"eruption": "max melee",
		"gaze": 	"center",
		"blizzard": "center",
		"stack": 	"center"
	};

	const answersToPosition = {
		"out": "Get to the edge of the arena",
		"max melee": "Get to max melee range",
		"center": "Get under the boss"
	}

	let debuffSequence = [];
	let questionNum = 0;

	function generateSequence() {
		const sequences = (Math.floor(Math.random() * 2) == 0) ? sequences_1 : sequences_2;
		debuffSequence = [];
		for(let i = 0; i < 3; i++) {
			const sequenceCount = sequences[i].length;
			const debuffName = sequences[i][Math.floor(Math.random() * sequenceCount)];
			let debuff = debuffs[debuffName];
	
			debuffSequence.push(debuffName);
			updateImage(i, debuff);
		}
	}

	function updateImage(number, url) {
		let imgId = ""

		switch(number) {
			case 0:
				imgId = "first-debuff";
				break;
			case 1:
				imgId = "second-debuff";
				break;
			case 2:
				imgId = "third-debuff";
				break;
		}
		$(`#${imgId}`).attr("src", url)
	}

	$('#answer-button').click(() => {
		const questionCountText = ['first', 'second']
		if(questionNum == 3) {
			$("#result-text").text("Press the reset button");
			return;
		}
		let correctAnswer = answers[debuffSequence[2-questionNum]];
		let chosenAnswer = $('input[type=radio]:checked');
		if(chosenAnswer.length === 0) {
			$("#result-text").text("No answer selected");
		}
		else {
			if (chosenAnswer[0].value === correctAnswer) {
				$("#result-text").text("Correct!");
			}
			else {
				$("#result-text").text(`Incorrect: ${answersToPosition[correctAnswer]}`);
			}
			questionNum ++;
			$("#answers *").prop('disabled',true);
			setTimeout(() => {
				$('input[type=radio]:checked').prop("checked", false);
				$('span#debuff-num').text(questionCountText[2-questionNum]);
				$("#result-text").text('');
				$("#answers *").prop('disabled', false);
				if (questionNum == 3) {
					$("#answers").hide();
				}
			}, 3000)
		}
	});

	$('#reset-button').click(() => {
		generateSequence();
		questionNum = 0;
		$('input[type=radio]:checked').prop("checked", false);
		$('span#debuff-num').text('third');
		$("#result-text").text('');
		$("#answers *").prop('disabled', false);
		$("#answers").show();
	});
	generateSequence();
})