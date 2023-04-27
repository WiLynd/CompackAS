import * as Common from './common/common_function.js';
import * as StringCS from './common/string.js';
import * as Message from './common/message.js';

/**
   * CREATE CALENDAR
*/
document.addEventListener('DOMContentLoaded', function () {
	var initialLocaleCode = sessionStorage.getItem("language");
	// var localeSelectorEl = document.getElementById('locale-selector');
	var calendarEl = document.getElementById('calendar');

	var calendar = new FullCalendar.Calendar(calendarEl, {
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
		},
		locale: initialLocaleCode,
		buttonIcons: false, // show the prev/next text
		//   weekNumbers: true,
		navLinks: true, // can click day/week names to navigate views
		editable: true,
		selectable: true,
		dayMaxEvents: true, // allow "more" link when too many events
		events: [
			{
				id: 'a',
				title: 'my event',
				start: '2023-04-17'
			}
		],
		eventClick: function (info) {
			alert('clicked ' + info.startStr);
		},
		dateClick: function (info) {
			alert('clicked ' + info.dateStr);
		},
		select: function (info) {
			alert('selected ' + info.startStr + ' to ' + info.endStr);
		}
	});

	calendar.render();

	// build the locale selector's options
	// calendar.getAvailableLocaleCodes().forEach(function(localeCode) {
	//   var optionEl = document.createElement('option');
	//   optionEl.value = localeCode;
	//   optionEl.selected = localeCode == initialLocaleCode;
	//   optionEl.innerText = localeCode;
	//   localeSelectorEl.appendChild(optionEl);
	// });

	// when the selected option changes, dynamically change the calendar option
	// localeSelectorEl.addEventListener('change', function() {
	//   if (this.value) {
	// 	calendar.setOption('locale', this.value);
	//   }
	// });

});


/**
   * ONCLICK ACTION
*/
function onclickAction() {
	document.getElementById("userConfigBtn").onclick = function () {
		Common.movePage("./user-configuration.html");
	}

	document.getElementById("changePwBtn").onclick = function () {
		Common.movePage("./change-password.html");
	}

	document.getElementById("logoutBtn").onclick = function () {
		Common.setupModal("question", null, Common.setTextMessage("com_w_0003", messageData), Common.setTextList("button_iie", buttonData), Common.setTextList("button_hai", buttonData), null, false);
        Common.logout();
	}

	document.getElementById("area-management").onclick = function () {
		Common.movePage("./area-management.html");
	}
	
	document.getElementById("drawing-management").onclick = function () {
		Common.movePage("./drawing-management.html");
	}

	document.getElementById("equipment-management").onclick = function () {
		Common.movePage("./equipment-management.html");
	}

	document.getElementById("equipment-registration-management").onclick = function () {
		Common.movePage("./equipment-registration-management.html");
	}

	document.getElementById("language-management").onclick = function () {
		Common.movePage("./language-management.html");
	}

	document.getElementById("message-management").onclick = function () {
		Common.movePage("./message-management.html");
	}

	document.getElementById("unit-management").onclick = function () {
		Common.movePage("./unit-management.html");
	}

	document.getElementById("user-management").onclick = function () {
		Common.movePage("./user-management.html");
	}
}

/**
   * ONLOAD ACTION
*/
function onLoadAction() {
	onclickAction();
	document.getElementById("factory_name").innerHTML = sessionStorage.getItem("factory_name");
}

window.onload = onLoadAction;