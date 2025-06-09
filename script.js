const questionPhrases = [
    'Вы загадали число', 
    'Я думаю, это число',
    'Может быть это',
    'Вероятнее всего это число',
    'Предположу, что это число'
];

const winPhrases = [
    'Я так и знал!',
    'Ура!',
    'Супер',
    'Сыграем еще?'
];

const errorPhrases = [
    'Вы загадали неверное число',
    'Вы забыли, какое число загадали?',
    'Сначала определитесь с числом..',
    'Я вас раскусил, вы меня обманываете!'
];

function getQuestion(number) {
    const randomQuestion = questionPhrases[Math.floor(questionPhrases.length * Math.random())];
    const compNumber = numberToText(number);
    const textNumber = compNumber.length < 20 ? compNumber : number;
    return `${randomQuestion} ${textNumber}?`
};

function numberToText(num) { 
    const number = Math.abs(num);

    const units = ['один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    const tens = ['десять', 'одинадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    const dozens = ['двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    const hundreds = ['сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];
    
    const numberText = num < 0 ? 'минус ' : '';

    if (number == 0) {
        return String(0);
    }

    if (number < 10) {
        return numberText + units[number - 1];
    }

    if (number < 20) {
        return numberText + tens[number - 10];
    }

    if (number < 100) {
        const divNumber = number % 10;
        return `${numberText}${dozens[Math.floor(number / 10) - 2]}${(divNumber) === 0 ? '' : ` ${units[divNumber - 1]}`}`;
    }

    if (number <= 999) {
        const hundred = hundreds[Math.floor(number / 100) - 1];
        if (number % 100 === 0) {
            return numberText + hundred;
        }
        return numberText + hundred + ` ${numberToText(number % 100)}`;
    }
};

let minValue, maxValue, answerNumber, orderNumber, gameRun;

const settingsGame = document.querySelector('#settingsGame');
const settingsGameCollapse = bootstrap.Collapse.getOrCreateInstance(settingsGame);
const game = document.querySelector('#game');
const gameCollapse = bootstrap.Collapse.getOrCreateInstance(game);
const footerStart = document.querySelector('#footerStart');
const footerStartCollapse = bootstrap.Collapse.getOrCreateInstance(footerStart);

function startGame() {
    settingsGameCollapse.hide();
    gameCollapse.show();
    footerStartCollapse.show();
    minValue = parseInt(document.querySelector('#minValue').value) || 0;
    maxValue = parseInt(document.querySelector('#maxValue').value) || 100;
    minValue = isNaN(minValue) ? 0 : Math.max(-999, minValue);
    maxValue = isNaN(maxValue) ? 0 : Math.min(999, maxValue);
    orderNumber = 1;
    gameRun = true;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    document.querySelector('#orderNumberField').textContent = orderNumber;
    document.querySelector('#answerField').textContent = getQuestion(answerNumber);
};

function nextQuestion() {
    orderNumber++;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    document.querySelector('#orderNumberField').textContent = orderNumber;
    document.querySelector('#answerField').textContent = getQuestion(answerNumber);
};

document.querySelector('#startGame').addEventListener('click', startGame);
document.querySelector('#btnRetry').addEventListener('click', () => {
    gameCollapse.hide();
    footerStartCollapse.hide();
    settingsGameCollapse.show();
    document.querySelector('#minValue').value = '';
    document.querySelector('#maxValue').value = '';
});

document.querySelector('#btnOver').addEventListener('click', () => {
    if (gameRun) {
        if (minValue === maxValue) {
            document.querySelector('#answerField').textContent = errorPhrases[Math.floor(errorPhrases.length * Math.random())];
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            nextQuestion();
        }
    }
});

document.querySelector('#btnLess').addEventListener('click', () => {
    if (gameRun) {
        if (minValue === maxValue) {
            document.querySelector('#answerField').textContent = errorPhrases[Math.floor(errorPhrases.length * Math.random())];
            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            nextQuestion();
        }
    }
});

document.querySelector('#btnEqual').addEventListener('click', () => {
    if (gameRun) {
            document.querySelector('#answerField').textContent = winPhrases[Math.floor(errorPhrases.length * Math.random())];
            gameRun = false;
        }
});
    


