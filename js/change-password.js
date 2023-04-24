import * as Common from './common/common_function.js';
import * as StringCS from './common/string.js';
import * as Message from './common/message.js';

const regexPw = /^((\w|\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-\|_|\+|\=|\[|\]|\{|\}|\\|\||\;|\:|\'|\"|\,|\<|\.|\>|\/|\?){4,8})$/g;

/**
   * COMPARE PASSWORD
*/
function comparePassword() {
    var password = document.getElementById("newPwInput").value;
    var rePassword = document.getElementById("reNewPwInput").value;
    if (password == rePassword) {
        switch ((sessionStorage.getItem("language"))) {
    		case 'eng':
    			Common.setupModal("info", null, Message.I00009_0, null, StringCS.BACK_HOME_EN, null, false);
    			break;
    		case 'vie':
    			Common.setupModal("info", null, Message.I00009_1, null, StringCS.BACK_HOME_VI, null, false);
    			break;
    		case 'jap':
    			Common.setupModal("info", null, Message.I00009_2, null, StringCS.BACK_HOME_JP, null, false);
    			break;
    	}

    }
    else {
        document.getElementById("warningText").style.display = "block";
    }
}

/**
   * ONCLICK ACTION
*/
function onclickAction() {
    document.getElementById("homeBtn").onclick = function () {
        Common.movePage("./home.html");
    }

    document.getElementById("changeBtn").onclick = function () {
        comparePassword();
    }

    document.getElementById("cancelBtn").onclick = function () {
        Common.backAction();
    }

    document.getElementById("logoutBtn").onclick = function () {
        Common.movePage("./login.html");
    }
}

/**
   * ONCHANGE ACTION
*/
function onchangeAction() {
    document.getElementById("currentPwInput").oninput = function () {
        let currentPassword = document.getElementById("currentPwInput").value;
        let newPassword = document.getElementById("newPwInput").value;
        let reNewPassword = document.getElementById("reNewPwInput").value;
        if ((currentPassword.length >= 4) && (newPassword.length >= 4) && (reNewPassword.length >= 4)) {
            document.getElementById("changeBtn").removeAttribute("disabled");
        }
    }

    document.getElementById("newPwInput").oninput = function () {
        let currentPassword = document.getElementById("currentPwInput").value;
        let newPassword = document.getElementById("newPwInput").value;
        let reNewPassword = document.getElementById("reNewPwInput").value;
        if ((currentPassword.length >= 4) && (newPassword.length >= 4) && (reNewPassword.length >= 4)) {
            document.getElementById("changeBtn").removeAttribute("disabled");
        }
    }

    document.getElementById("reNewPwInput").oninput = function () {
        let currentPassword = document.getElementById("currentPwInput").value;
        let newPassword = document.getElementById("newPwInput").value;
        let reNewPassword = document.getElementById("reNewPwInput").value;
        if ((currentPassword.length >= 4) && (newPassword.length >= 4) && (reNewPassword.length >= 4)) {
            document.getElementById("changeBtn").removeAttribute("disabled");
        }
    }
}

/**
   * ONLOAD ACTION
*/
function onLoadAction() {
    onchangeAction();
    onclickAction();
    document.getElementById("factory_name").innerHTML = sessionStorage.getItem("factory_name");
    document.getElementById("warningText").style.display = "none";
}

window.onload = onLoadAction;