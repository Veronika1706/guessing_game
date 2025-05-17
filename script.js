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
    }

    function getPhraseCheckNumber() {
        let phrase = '';
        const phraseRandom = Math.round(Math.random() * 4); 
        switch (phraseRandom) {
            case 0:
                phrase = `Вы загадали число`
                break;
            case 1:
                phrase = `Я думаю, это число`
                break;

            case 2:
                phrase = `Может быть это`
                break;

            case 3:
                phrase = `Вероятнее всего это число`
                break;

            case 4:
                phrase = `Предположу, что это число`
                break;
        }
        return phrase;
    }

// Первая карточка - Начать игру
document.getElementById('btnTobegin').addEventListener('click', function () { 
    document.querySelector('.title-page').classList.remove('show');              
    document.querySelector('.value-range').classList.remove('hidden');          
    document.querySelector('.valueRange').classList.remove('hidden');           
    document.querySelector('.form-inline').classList.remove('hidden');          
    document.querySelector('#btnTobegin').classList.add('hidden');              
    document.querySelector('#btnProceed').classList.remove('hidden');         
})

// Вторая карточка - Диапозон значений,  условия 
document.getElementById('btnProceed').addEventListener('click', function () { 
    document.querySelector('.value-range').classList.add('hidden');             
    document.querySelector('.terms').classList.remove('hidden');                
    document.querySelector('.valueRange').classList.add('hidden');              
    document.querySelector('.form-inline').classList.add('hidden');             
    document.querySelector('.guessNumber').classList.remove('hidden');          
    document.querySelector('#btnProceed').classList.add('hidden');              
    document.querySelector('#btnPlay').classList.remove('hidden');              
    minValue = parseInt(document.querySelector('#formInputMin').value);
    maxValue = parseInt(document.querySelector('#formInputMax').value);
    minValue = (minValue < -999) ? minValue = -999 : (minValue > 999) ? minValue = 999 : minValue;
    maxValue = (maxValue > 999) ? maxValue = 999 : (maxValue < -999) ? maxValue = -999 : maxValue;
    if (Number.isNaN(maxValue) || Number.isNaN(minValue)) {
        minValue = 0;
        maxValue = 100;
    }
    guessNumber.innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;
})

// Третья карточка - Игра
document.getElementById('btnPlay').addEventListener('click', function () {      
    document.querySelector('.terms').classList.add('hidden');                   
    document.querySelector('.question').classList.remove('hidden');             
    document.querySelector('.guessNumber').classList.add('hidden');             
    document.querySelector('.no-gutters').classList.remove('hidden');           
    document.querySelector('#btnPlay').classList.add('hidden');                 
    document.querySelector('#btnLess').classList.remove('hidden');              
    document.querySelector('#btnEqual').classList.remove('hidden');             
    document.querySelector('#btnOver').classList.remove('hidden');              
    document.querySelector('.btn-link').classList.remove('hidden');             

    let answerNumber = Math.floor((minValue + maxValue) / 2); 
    let orderNumber = 1; 
    let gameRun = true;

    const orderNumberField = document.getElementById('orderNumberField'); 
    const answerField = document.getElementById('answerField');
    orderNumberField.innerText = orderNumber;

    
    const compNumber = numberToText(answerNumber);
    const resultNumber = compNumber.length < 20 ? compNumber : answerNumber;
    answerField.innerText = `Вы загадали число ${resultNumber}?`;

    document.getElementById('btnLess').addEventListener('click', function () { 
        if (gameRun) {
            if (minValue === maxValue || minValue == answerNumber) {
                const phraseRandom = Math.round(Math.random() * 3);
                switch (phraseRandom) {
                    case 0:
                        answerPhrase = `Вы загадали неверное число`
                        break;

                    case 1:
                        answerPhrase = `Вы забыли, какое число загадали?`
                        break;

                    case 2:
                        answerPhrase = `Сначала определитесь с числом..`
                        break;

                    case 3:
                        answerPhrase = `Я вас раскусил, вы меня обманываете!`
                        break;
                }
                answerField.innerText = answerPhrase;
                gameRun = false;
            } else {
                maxValue = answerNumber - 1; 
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                
                const phraseCheckNumber = getPhraseCheckNumber();
                const compNumber = numberToText(answerNumber);
                const resultNumber = compNumber.length < 20 ? compNumber : answerNumber;
                answerField.innerText = `${phraseCheckNumber} ${resultNumber}?`;
            }
        }
    })

    document.getElementById('btnOver').addEventListener('click', function () {
        if (gameRun) {
            if (minValue === maxValue) {
                const phraseRandom = Math.round(Math.random() * 3);
                switch (phraseRandom) {
                    case 0:
                        answerPhrase = `Вы загадали неверное число`
                        break;

                    case 1:
                        answerPhrase = `Вы забыли, какое число загадали?`
                        break;

                    case 2:
                        answerPhrase = `Сначала определитесь с числом..`
                        break;

                    case 3:
                        answerPhrase = `Я вас раскусил, вы меня обманываете!`
                        break;
                }
                answerField.innerText = answerPhrase;
                gameRun = false;
            } else {
                minValue = answerNumber + 1; 
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                const phraseCheckNumber = getPhraseCheckNumber();
                
                const compNumber = numberToText(answerNumber);
                const resultNumber = compNumber.length < 20 ? compNumber : answerNumber;
                answerField.innerText = `${phraseCheckNumber} ${resultNumber}?`;
            }
        }
    })

    document.getElementById('btnEqual').addEventListener('click', function () {
        if (gameRun) {
            const phraseRandom = Math.round(Math.random() * 3);
            switch (phraseRandom) {
                case 0:
                    answerPhrase = `Я так и знал!`
                    break;

                case 1:
                    answerPhrase = `Ура!`
                    break;

                case 2:
                    answerPhrase = `Супер`
                    break;

                case 3:
                    answerPhrase = `Сыграем еще?`
                    break;
            }
            answerField.innerText = answerPhrase;
            gameRun = false;
        }
    })
})

// Кнопка заново
document.getElementById('btnRetry').addEventListener('click', function () {    
    document.querySelector('.question').classList.toggle('hidden');            
    document.querySelector('.value-range').classList.toggle('hidden');        
    document.querySelector('.no-gutters').classList.toggle('hidden');      
    document.querySelector('.valueRange').classList.toggle('hidden');          
    document.querySelector('.form-inline').classList.toggle('hidden');         
    document.querySelector('#btnLess').classList.toggle('hidden');             
    document.querySelector('#btnEqual').classList.toggle('hidden');            
    document.querySelector('#btnOver').classList.toggle('hidden');             
    document.querySelector('.btn-link').classList.toggle('hidden');             
    document.querySelector('#btnProceed').classList.toggle('hidden');           
    document.querySelector('#formInputMin').value = '';
    document.querySelector('#formInputMax').value = '';
    minValue = (minValue < -999) ? minValue = -999 : (minValue > 999) ? minValue = 999 : minValue;
    maxValue = (maxValue > 999) ? maxValue = 999 : (maxValue < -999) ? maxValue = -999 : maxValue;
    if (Number.isNaN(maxValue) || Number.isNaN(minValue)) {
        minValue = 0;
        maxValue = 100;
    }
    guessNumber.innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;

    document.getElementById('btnProceed').addEventListener('click', function () {   
        document.querySelector('.value-range').classList.add('hidden');            
        document.querySelector('.terms').classList.remove('hidden');                
        document.querySelector('.valueRange').classList.add('hidden');             
        document.querySelector('.form-inline').classList.add('hidden');            
        document.querySelector('.guessNumber').classList.remove('hidden');         
        document.querySelector('#btnProceed').classList.add('hidden');          
        document.querySelector('#btnPlay').classList.remove('hidden');            
    })
})