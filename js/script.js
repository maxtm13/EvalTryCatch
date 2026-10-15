const filterByType = (type, ...values) => values.filter(value => typeof value === type), //Ф-ция возвращает элементы массива, у которых тип совпадает с переданным type

	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // константа - все блоки div  с классом dialog__response-block
		responseBlocksArray.forEach(block => block.style.display = 'none'); // каждый блок скрывается через CSS свойство display:none
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { // Объявление функции
		hideAllResponseBlocks(); //Вызов функции hideAllResponseBlocks скрытие всех блоков div.dialog__response-block
		document.querySelector(blockSelector).style.display = 'block'; // Блоки с переданным селектором blockSelector, отображаются через CSS свойство display:block
		if (spanSelector) { //Проверка условия  spanSelector передан в функцию
			document.querySelector(spanSelector).textContent = msgText; //если передан spanSelector, то в первый блок по селектору spanSelector записывется текст из переданного  msgText
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), //Ф-ция, которая вызывает ф-цию showResponseBlock с передачей параметра msgText  - показать блок с классом dialog__response-block_error, в блок с id = "#error", вписать текст из msgText

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),//Ф-ция, которая вызывает ф-цию showResponseBlock с передачей параметра msgText  - показать блок с классом dialog__response-block_ok, в блок с id = "ok", вписать текст из msgText 

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),//Ф-ция, которая вызывает ф-цию showResponseBlock только с одним параметром - показать блок с калссом dialog__response-block_no-results

	tryFilterByType = (type, values) => { // Объявление функции tryFilterByType с аргументами
		try { // попытка выполнить код
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // в констаньу valuesArray записывается в виде строки результат выполнения функции filterByType с переданными параметрами type и values
			const alertMsg = (valuesArray.length) ? // в константу alertMsg записывается значение в зависимости от выполнения условия длинны массива valuesArray > 0
				`Данные с типом ${type}: ${valuesArray}` : // Записывается если условие верно
				`Отсутствуют данные типа ${type}`; // Если условие не верно.
			showResults(alertMsg); //Вызов функции showResults с параметром alertMsg
		} catch (e) { //обработка ошибки возникшей  в блоке try
			showError(`Ошибка: ${e}`); //Вызов функции showError с передачей текста
		}
	};

const filterButton = document.querySelector('#filter-btn'); // Выбор блока на странице с id="filter-btn"

filterButton.addEventListener('click', e => { // назначение обработчика события клика на блок filter-btn
	const typeInput = document.querySelector('#type'); // Выбор блока с id="type"
	const dataInput = document.querySelector('#data');// Выбор блока с id="data"

	if (dataInput.value === '') { // Проверка условия отсутствия значения в поле dataInput
		dataInput.setCustomValidity('Поле не должно быть пустым!'); //Вывод сообщения об ошибке 
		showNoResults(); //вызов функции - показ блока с классом dialog__response-block_no-results
	} else { // блок кода, если условие не выполнено
		dataInput.setCustomValidity(''); //обнуляем ошибку формы
		e.preventDefault(); //отменяем стандартное выполнение  клика 
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //ВЫзов функции tryFilterByType с параметрами у значений которых удаляются содержащиеся в начале и в конце пробелы 
	}
});

