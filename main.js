const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const mth_element = document.querySelector('.date-picker .dates .month .mth');
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
const days_element = document.querySelector('.date-picker .dates .days');

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDateMin;
let selectedDayMin;
let selectedMonthMin;
let selectedYearMin;

let selectedDateMax;
let selectedDayMax;
let selectedMonthMax;
let selectedYearMax;

mth_element.textContent = months[month] + ' ' + year;

selected_date_element.textContent = formatDate(date);
selected_date_element.dataset.value = selectedDateMin;

populateDates();

// EVENT LISTENERS
date_picker_element.addEventListener('click', toggleDatePicker);
next_mth_element.addEventListener('click', goToNextMonth);
prev_mth_element.addEventListener('click', goToPrevMonth);

// FUNCTIONS
function toggleDatePicker(e) {
	if (!checkEventPathForClass(e.path, 'dates')) {
		dates_element.classList.toggle('active');
	}
}

function goToNextMonth(e) {
	month++;
	if (month > 11) {
		month = 0;
		year++;
	}
	mth_element.textContent = months[month] + ' ' + year;
	populateDates();
}

function goToPrevMonth(e) {
	month--;
	if (month < 0) {
		month = 11;
		year--;
	}
	mth_element.textContent = months[month] + ' ' + year;
	populateDates();
}

function populateDates(e) {
	days_element.innerHTML = '';
	let amount_days = 31;

	if (month == 1) {
		amount_days = 28;
	}

	for (let i = 0; i < amount_days; i++) {
		const day_element = document.createElement('div');
		day_element.classList.add('day');
		day_element.textContent = i + 1;

		if ((selectedDayMin == (i + 1) && selectedYearMin == year && selectedMonthMin == month)) {
			day_element.classList.add('selected');
		}

		if ((selectedDayMax == (i + 1) && selectedYearMax == year && selectedMonthMax == month)) {
			day_element.classList.add('selected-two');
		}

		
		if (selectedDateMin && selectedDateMax && validateRange(i)) {
			day_element.classList.add('in-between');
		}

		day_element.addEventListener('click', function () {

			if (!selectedDateMin || selectedDateMax) {
				selectedDateMin = new Date(year + '-' + (month + 1) + '-' + (i + 1));
				selectedDayMin = (i + 1);
				selectedMonthMin = month;
				selectedYearMin = year;

			} else if (selectedDateMin && !selectedDateMax) {
				selectedDateMax = new Date(year + '-' + (month + 1) + '-' + (i + 1));
				selectedDayMax = (i + 1);
				selectedMonthMax = month;
				selectedYearMax = year;
			}

			selected_date_element.textContent = formatDate(selectedDateMin);
			selected_date_element.dataset.value = selectedDateMin;

			populateDates();
		});

		days_element.appendChild(day_element);
	}
}

function validateRange(currentDay) {
	if (selectedDateMin < selectedDateMax &&
		(
			((currentDay + 1) > selectedDayMin && (currentDay + 1) < selectedDateMax) &&
			(year >= selectedYearMin && year <= selectedYearMax) &&
			(month >= selectedMonthMin && month <= selectedMonthMax)
		)) return true
	else if (selectedDateMin > selectedDateMax &&
		((currentDay + 1) < selectedDayMin && (currentDay + 1) > selectedDateMax &&
			(year <= selectedYearMin && year >= selectedYearMax) &&
			(month <= selectedMonthMin && month >= selectedMonthMax)
		)) return true
	else return false

}


	// HELPER FUNCTIONS
	function checkEventPathForClass(path, selector) {
		for (let i = 0; i < path.length; i++) {
			if (path[i].classList && path[i].classList.contains(selector)) {
				return true;
			}
		}
		

		return false;
	}


	function formatDate(d) {
		let day = d.getDate();
		if (day < 10) {
			day = '0' + day;
		}

		let month = d.getMonth() + 1;
		if (month < 10) {
			month = '0' + month;
		}

		let year = d.getFullYear();

		return day + ' / ' + month + ' / ' + year;
	}

