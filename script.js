const edit__block = document.querySelector('.edit__block');
const button = document.querySelector('.button');
const form =  document.querySelector('.form');
const find__word = document.querySelector('.find__word');
const finall = document.querySelector('.finall');
const card = document.querySelector('.card');
const words = [
	'машина',
	'яблоко',
	'корона',
	'автомагистраль',
	'аэропорт',
	'автомобиль',
	'космос',
	'рабочий',
	'бизнес',
	'трактор',
	'паштет',
	'трактат',
	'бумага',
	'камень',
	'аттракцион',
	'карантин',
	'картошка',
	'бюстгальтер',
	'подштанники',
	'рукав',
	'джинсы',
	'апельсин',
	'мандарин',
	'яблоко',
	'банан',
	'абрикос',
	'помада'
];

let findWord, word, spans;

startProgram();
form.addEventListener('submit', submitForm);
edit__block.addEventListener('input', editBlock);

edit__block.addEventListener('keydown', function(e) {
	if ((e.key == 'я' || e.key == 'Я' || e.key == 'z' || e.key == 'Z') && e.ctrlKey) {
		e.target.value = e.target.value.slice(0, -1);
	}
	if (e.key == 'Enter') {
		submitForm(e);
	}
});

function startProgram() {
	const numberInArray = getRandomInt(words.length);
	findWord = words[numberInArray];
	word = [];
	find__word.innerHTML = '';
	for (let i = 0; i < findWord.length; i++) {
		find__word.innerHTML += '<span>_</span>';
	}
	spans = find__word.querySelectorAll('span');
	edit__block.disabled = false;
	button.disabled = false;
	hoverButton(button);
}

function hoverButton(elem) {
	elem.style.cursor = 'pointer';
	elem.style.backgroundColor = 'rgba(12, 136, 236, 0.6)';
	elem.addEventListener('mouseover', function() {
		elem.style.backgroundColor = 'rgba(12, 136, 236, 1)';
	});
	elem.addEventListener('mouseout', function() {
		elem.style.backgroundColor = 'rgba(12, 136, 236, 0.6)';
	});
}

function getRandomInt(max) {
 	return Math.floor(Math.random() * Math.floor(max));
}

function arrElemsNotEmpty(arr, length) {
// если отгадали слово, т.е. массив не пустой 
// и длина у массива равна длине загаданного слова
	if (arr.length != length) {
		return false;
	}
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] == undefined) {
			return false;
		}
	}
	return true;
}

function logic(letter) { // letter = 'a'
	let find = false;
	for (let i = 0; i < findWord.length; i++) {
		if (letter == findWord[i] && word[i] != letter) {
			word[i] = letter;
			spans[i].innerHTML = word[i];
			find = true;
		}
	}

	if (find == true) {
		finall.innerHTML = 'Угадано!';
	} else if (find == false) {
		finall.innerHTML = 'Попробуйте ещё раз!';
	}
	if (arrElemsNotEmpty(word, findWord.length)) {
		newGame();
	}
}

function newGame() {
	edit__block.disabled = true;
	button.disabled = true;
	finall.innerHTML = 'Браво, отгадано!';

	const block = document.createElement('div');
	block.classList.add('card__item');
	card.append(block);

	const replay = document.createElement('div');
	replay.classList.add('button');
	replay.innerHTML = 'Начать заново?';
	block.append(replay);
	hoverButton(replay);

	replay.addEventListener('click', function() {
		startProgram();
		block.remove();
		finall.innerHTML = 'Ваш JavaScript!';
	});
	button.style.backgroundColor = '#ebebe4';
	button.style.cursor = 'default';
}

function submitForm(e) {
	e.preventDefault();
	const letter = edit__block.value.toLowerCase();
	logic(letter);
	edit__block.value = '';
}

function editBlock(e) {
	if (!e.target.value.match(/[а-яА-ЯЁё]+/)) {
		e.target.value = '';
	}
	if (e.target.value.length > 1) {
		e.target.value = e.target.value[0];
	}
}