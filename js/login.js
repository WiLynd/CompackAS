import * as Common from './common/common_function.js';
import * as StringCS from './common/string.js';
import * as Message from './common/message.js';
import * as ValueCS from './common/values.js';

/*****  VIEW VARIABLE  *****/
var data, userData, resultRegex;
const modal = document.getElementById("myModal");
const regexPw = /^((\w|\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-\|_|\+|\=|\[|\]|\{|\}|\\|\||\;|\:|\'|\"|\,|\<|\.|\>|\/|\?){4,8})$/g;
/**
   * LOGIN ACTION
*/
function login() {
	let department = document.getElementById("lstDepartment").value;
	let user = document.getElementById("lstUser").value;
	let password = document.getElementById("pass").value;

	if (password == "") {
		Common.setupModal("error", null, data.lstMessage[6].text, null, data.lstButtonText[1].text, null, false);
	}
	else {
		checkUser(department, user, password);
	}
}

/**
   * CHECK USER ACCOUNT
*/
function checkUser(department, user, password) {
	resultRegex = regexPw.test(password);
	console.log(regexPw.test(password))
	if (resultRegex) {
		$.ajax({
			url: StringCS.HTTPS + StringCS.ADDRESS + StringCS.DIRECT + "loginchk?"
				+ StringCS.DEPARTMENT + department + "&" + StringCS.EMPLOYEE + user + "&"
				+ StringCS.PASSWORD + password,
			success: function (result) {
				if (JSON.parse(result).err_code == 0) {
					if (document.getElementById("remember-pw").checked) {
						savePassword(department, user, password);
					}
					sessionStorage.setItem(StringCS.EMPLOYEE, user);
					modal.style.display = "none";
					Common.movePage("./home.html");
				}
				else {
					// console.log(data)
					document.getElementById("pass").value = "";
					Common.setupModal("error", null, data.lstMessage[7].text, null, data.lstButtonText[6].text, null, false);
				}
			},
			error: function (jqXHR, exception) {
				console.log(exception);
				Common.setupModal("error", null, data.lstMessage[5].text, null, data.lstButtonText[1].text, null, false);
			},
			timeout: ValueCS.VL_SHORT_TIMEOUT
		})
	}
}

/**
   * SAVE PASSWORD
*/
function savePassword(department, user, password) {
	document.cookie = department + "_" + user + "_" + StringCS.PASSWORD + password;
}

function getCookie(cname) {
	var name = cname;
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
}

/**
   * GET DATA
*/
function getData(language) {
	if (data == undefined) {
		switch (language) {
			case 1:
				Common.setupModal("load", null, Message.I00001_0, null, null, null, false);
				break;
			case 2:
				Common.setupModal("load", null, Message.I00001_1, null, null, null, false);
				break;
			case 3:
				Common.setupModal("load", null, Message.I00001_2, null, null, null, false);
				break;
		}
	}
	else {
		Common.setupModal("load", null, data.lstMessage[0].text, null, null, null, false);
	}

	$.ajax({
		url: StringCS.HTTPS + StringCS.ADDRESS + StringCS.DIRECT + "readLoginDat?"
			+ StringCS.LANGUAGE + language,
		headers: {},
		success: function (result) {
			try {
				data = JSON.parse(result);
				// console.log(data)
				setLanguage();
				deleteDataCbb("lstDepartment");
				deleteDataCbb("lstUser");
				document.getElementById("pass").value = "";
				setDataDepartmentCbb();
				sessionStorage.setItem(StringCS.LANGUAGE, language);
				$('.collapseOne').collapse('show');
				modal.style.display = "none";
			} catch {
				Common.setupModal("error", null, data.lstMessage[5].text, null, null, null, false);
			}
		},
		error: function (jqXHR, exception) {
			console.log(exception);
			Common.setupModal("error", null, data.lstMessage[5].text, null, data.lstButtonText[1].text, null, false);
		},
		timeout: ValueCS.VL_LONG_TIMEOUT
	})
}

/**
   * SET LANGUAGE
*/
function setLanguage() {
	for (var i = 0; i < data.lstLanguage.length; i++) {
		document.getElementById(data.lstLanguage[i].item_id).innerHTML = data.lstLanguage[i].text;
		if (data.lstLanguage[i].item_id == "factory_name") {
			sessionStorage.setItem(data.lstLanguage[i].item_id, data.lstLanguage[i].text)
		}
	}
}

/**
   * SET DATA DEPARTMENT COMBOBOX
*/
function setDataDepartmentCbb() {
	if (data != null) {
		if (data.lstDepartment != null) {
			var optionSpace = document.createElement("option");
			optionSpace.classList.add("text");
			optionSpace.selected = true;
			optionSpace.hidden = true;
			optionSpace.text = "";
			optionSpace.value = 0;
			document.getElementById("lstDepartment").add(optionSpace);
			for (var i = 0; i < data.lstDepartment.length; i++) {
				var option = document.createElement("option");
				option.classList.add("text")
				option.text = data.lstDepartment[i].name;
				option.value = data.lstDepartment[i].code;
				document.getElementById("lstDepartment").add(option);
			}
		}
	}
}

/**
   * SET DATA USER COMBOBOX
*/
function setDataUserCbb(department, language) {
	$.ajax({
		url: StringCS.HTTPS + StringCS.ADDRESS + StringCS.DIRECT + "readLoginDat?"
			+ StringCS.DEPARTMENT + department + "&" + StringCS.LANGUAGE + language,
		headers: {},
		success: function (result) {
			try {
				userData = JSON.parse(result);
				// console.log(userData);
				if (userData != null) {
					if (userData.lstUser != null) {
						var optionSpace = document.createElement("option");
						optionSpace.classList.add("text")
						optionSpace.selected = true;
						optionSpace.hidden = true;
						optionSpace.text = "";
						optionSpace.value = 0;
						document.getElementById("lstUser").add(optionSpace);
						for (var i = 0; i < userData.lstUser.length; i++) {
							var option = document.createElement("option");
							option.classList.add("text")
							option.text = userData.lstUser[i].name;
							option.value = userData.lstUser[i].code;
							document.getElementById("lstUser").add(option);
						}
					}
				}
			} catch {
				Common.setupModal("error", null, data.lstMessage[5].text, null, null, null, false);
			}
		},
		error: function (jqXHR, exception) {
			console.log(exception);
			Common.setupModal("error", null, data.lstMessage[5].text, null, data.lstButtonText[1].text, null, false);
		},
		timeout: ValueCS.VL_LONG_TIMEOUT
	})
}

/**
   * DELETE DATA USER COMBOBOX
*/
function deleteDataCbb(cbb) {
	let lstUser = document.getElementById(cbb);
	for (let i = lstUser.options.length; i >= 0; i--) {
		lstUser.options[i] = null;
	}
}

/**
   * ONCHANGE ACTION
*/
function onchangeAction() {
	document.getElementById("pass").oninput = function () {
		let password = document.getElementById("pass").value;
		if (password.length >= 4) {
			document.getElementById("login").removeAttribute("disabled");
		}
		else {
			document.getElementById("login").setAttribute("disabled", "");
		}
	}

	document.getElementById("lstDepartment").onchange = function () {
		let departmentValue = document.getElementById("lstDepartment").value;
		deleteDataCbb("lstUser");
		setDataUserCbb(departmentValue, sessionStorage.getItem(StringCS.LANGUAGE));
	}

	document.getElementById("lstUser").onchange = function () {
		let departmentValue = document.getElementById("lstDepartment").value;
		let userValue = document.getElementById("lstUser").value;
		document.getElementById("pass").value = "";
		if ((getCookie(departmentValue + "_" + userValue + "_" + StringCS.PASSWORD)) != "") {
			document.getElementById("pass").value = getCookie(departmentValue + "_" + userValue + "_" + StringCS.PASSWORD);
			document.getElementById("login").removeAttribute("disabled");
		}
	}
}

/**
   * ONPRESS ACTION
*/
function onpressAction() {
	var input = document.getElementById("pass");
	input.addEventListener("keypress", function (event) {
		if (event.key === "Enter") {
			event.preventDefault();
			document.getElementById("login").click();
		}
	});
}

/**
   * ONCLICK ACTION
*/
function onclickAction() {
	document.getElementById("login").onclick = login;

	document.getElementById("lgEn").onclick = function () {
		Common.setIconEnglish();
		getData(1);
		sessionStorage.setItem("language", 'en');
	}

	document.getElementById("lgVi").onclick = function () {
		Common.setIconVietnamese();
		getData(2);
		sessionStorage.setItem("language", 'vi');
	}

	document.getElementById("lgJp").onclick = function () {
		Common.setIconJapanese();
		getData(3);
		sessionStorage.setItem("language", 'ja');
	}
}

/**
   * ONLOAD ACTION
*/
function onLoadAction() {
	onclickAction();
	onpressAction();
	onchangeAction();
	sessionStorage.setItem(StringCS.EMPLOYEE, '');
	sessionStorage.setItem("language", 'ja');
	Common.setIconJapanese();
	getData(3);
	document.getElementById("login").setAttribute("disabled", "")
}

window.onload = onLoadAction;