import * as Common from './common/common_function.js';

/**
   * SET ERROR TEXT
*/
function setErrorText() {
    document.getElementById("err_no").innerHTML = 404;
    document.getElementById("err_text").innerHTML = "ご指定のページはありません";
}

/**
   * ONLOAD ACTION
*/
function onclickAction() {
    document.getElementById("homeBtn").onclick = function () {
        Common.movePage("./home.html");
    }

    document.getElementById("returnHomeBtn").onclick = function () {
        Common.movePage("./home.html");
    }
}

/**
   * ONLOAD ACTION
*/
function onLoadAction() {
	onclickAction();
    setErrorText();
	document.getElementById("factory_name").innerHTML = sessionStorage.getItem("factory_name");
}

window.onload = onLoadAction;