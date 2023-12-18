let currentQuestion = 1;
const totalQuestions = 5;

function startSurvey() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('survey-container').style.display = 'block';
    showQuestion();

    const questionNumberElement = document.getElementById('question-number');
    questionNumberElement.style.display = 'block';
}


function showQuestion() {
    const questionElement = document.getElementById('question');
    const answerOptionsElement = document.getElementById('answer-options');
    const questionNumberElement = document.getElementById('question-number');

    if (currentQuestion <= totalQuestions) {
        questionElement.innerText = `Question ${currentQuestion}: ${getQuestionText(currentQuestion)}`;
        answerOptionsElement.innerHTML = generateAnswerOptions(currentQuestion);
        questionNumberElement.innerText = `${currentQuestion}/${totalQuestions}`;
    }

    document.getElementById('confirmation-dialog').style.display = 'none';
}


function getQuestionText(questionNumber) {
    switch (questionNumber) {
        case 1:
            return 'How satisfied are you with our products?';
        case 2:
            return 'How fair are the prices compared to similar retailers?';
        case 3:
            return 'How satisfied are you with the value for money of your purchase?';
        case 4:
            return 'On a scale of 1-10, how would you recommend us to your friends and family?';
        case 5:
            return 'What could we do to improve our service? (Please provide feedback)';
        default:
            return '';
    }
}



function generateAnswerOptions(questionNumber) {
    if (questionNumber < 4) {
        let buttonsHtml = '';
        for (let i = 1; i <= 5; i++) {
            buttonsHtml += `<button class="rating-button" onclick="selectRating(${i})">${i}</button>`;
        }
        return buttonsHtml;
    } else if (questionNumber == 4) {
        let buttonsHtml = '';
        for (let i = 1; i <= 10; i++) {
            buttonsHtml += `<button class="rating-button" onclick="selectRating(${i})">${i}</button>`;
        }
        return buttonsHtml;
    } else {
        return `<textarea id="feedback" placeholder="Type your feedback here"></textarea>`;
    }
}



function selectRating(rating) {
    const surveyData = JSON.parse(localStorage.getItem('surveyData')) || {};
    surveyData[currentQuestion] = rating;
    localStorage.setItem('surveyData', JSON.stringify(surveyData));
    const buttons = document.querySelectorAll('.rating-button');
    buttons.forEach(button => button.classList.remove('selected'));
    const selectedButton = document.querySelector(`.rating-button:nth-child(${rating})`);
    selectedButton.classList.add('selected');
}



function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        showQuestion();
    } else {
        document.getElementById('confirmation-dialog').style.display = 'block';
    }
}

function prevQuestion() {
    if (currentQuestion > 1) {
        currentQuestion--;
        showQuestion();
    }
}

function skipQuestion() {
    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        showQuestion();
    }
}

function submitSurvey() {
    document.getElementById('survey-container').style.display = 'none';
    document.getElementById('thank-you-screen').style.display = 'block';
    setTimeout(() => {
        resetSurvey();
    }, 5000);
}

function cancelSubmission() {
    document.getElementById('confirmation-dialog').style.display = 'none';
}

function resetSurvey() {
    currentQuestion = 1;
    document.getElementById('survey-container').style.display = 'none';
    document.getElementById('thank-you-screen').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'block';

    const questionNumberElement = document.getElementById('question-number');
    questionNumberElement.style.display = 'none';
}
