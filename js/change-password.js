import * as Common from './common/common_function.js';
import * as StringCS from './common/string.js';
import * as Message from './common/message.js';
import * as ValueCS from './common/values.js';

const regexPw = /^((\w|\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-\|_|\+|\=|\[|\]|\{|\}|\\|\||\;|\:|\'|\"|\,|\<|\.|\>|\/|\?){4,8})$/g;
const modal = document.getElementById("myModal");
var data, userData, languageData, buttonData, messageData;
var language_id = parseInt(sessionStorage.getItem(StringCS.LANGUAGE));

function getData() {
    switch (language_id) {
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
    $.ajax({
        url: StringCS.HTTPS + StringCS.ADDRESS + StringCS.DIRECT + "readUserDat?"
            + StringCS.EMPLOYEE + sessionStorage.getItem(StringCS.EMPLOYEE) + "&" + StringCS.LANGUAGE + language_id,
        cache: false,
        async: true,
        dataType: "JSON",
        success: function (response) {
            data = response;
            userData = data.lstUser[0];
            languageData = data.lstLanguage;
            buttonData = data.lstButtonText;
            messageData = data.lstMessage;
            console.log(messageData)
            console.log(data);
            modal.style.display = "none";
            document.getElementById("warningText").style.display = "none";
            document.getElementById("warningCurrentPwText").style.display = "none";
            document.getElementById("title").innerHTML = Common.setTextList("change_pw", buttonData);
            document.getElementById("homeBtn").innerHTML = '<i class="userBtn fas fa-home m-r-10"></i>'
                + Common.setTextList("button_home", buttonData);
            document.getElementById("logout").innerHTML = '<i class="userBtn fas fa-sign-out-alt m-r-10"></i>'
                + Common.setTextList("logout", buttonData);
            document.getElementById("current_password").innerHTML = Common.setTextList("current_password", languageData);
            document.getElementById("new_password").innerHTML = Common.setTextList("new_password", languageData);
            document.getElementById("renew_password").innerHTML = Common.setTextList("renew_password", languageData);
            document.getElementById("button_change").innerHTML = Common.setTextList("button_change", buttonData);
            document.getElementById("button_cancel").innerHTML = Common.setTextList("button_cancel", buttonData);
        }
    });
}

/**
   * COMPARE PASSWORD
*/
function comparePassword() {
    var password = document.getElementById("newPwInput").value;
    var currentPassword = document.getElementById("currentPwInput").value;
    var rePassword = document.getElementById("reNewPwInput").value;
    console.log(userData)

    if (currentPassword == userData.password && password == rePassword) {
        changePassword();
    } else {
        if (currentPassword == userData.password) {
            document.getElementById("warningCurrentPwText").style.display = "none";
        } else {
            document.getElementById("warningCurrentPwText").style.display = "block";
        }

        if (password == rePassword) {
            document.getElementById("warningText").style.display = "none";
        } else {
            document.getElementById("warningText").style.display = "block";
        }
    }
}

/**
    * PREPARE USER DATA
*/
function prepareUserData(userData, mode) {
    var password = document.getElementById("newPwInput").value;
    var WriteUserDat = {
        login_id: sessionStorage.getItem(StringCS.EMPLOYEE),
        lstUser: [
            {
                employee_id: parseInt(userData.employee_id),
                name: userData.name,
                icon_path: userData.icon_path,
                language_id: parseInt(userData.language_id),
                department_no: parseInt(userData.department_no),
                role_no: parseInt(userData.role_no),
                password: password,
                address: userData.address,
                phone: userData.phone,
                remarks: userData.remarks,
                create_date: null,
                create_id: parseInt(userData.create_id),
                update_date: null,
                update_id: parseInt(userData.update_id),
                del_flg: userData.del_flg,
                mode: mode
            }
        ]
    }
    return WriteUserDat;
}

/**
   * COMPARE PASSWORD
*/
function changePassword() {
    $.ajax({
        type: "POST",
        dataType: "json",
        data: JSON.stringify(prepareUserData(userData, 1)),
        contentType: "application/json; charset=utf-8",
        url: StringCS.HTTPS + StringCS.ADDRESS + StringCS.DIRECT + "writeUser?",
        timeout: ValueCS.VL_LONG_TIMEOUT,
        success: function (response) {
            console.log(response);
            document.getElementById("currentPwInput").value = "";
            document.getElementById("newPwInput").value = "";
            document.getElementById("reNewPwInput").value = "";
        },
        error: function (xmlhttprequest, textstatus, message) {
            console.log(prepareUserData(userData, 1))
            if (textstatus === "timeout") {
                console.log("timeout")
            } else {
                console.log(textstatus)
            }
        }
    }).done(function (res) {
    });
}

/**
   * ONCLICK ACTION
*/
function onclickAction() {
    document.getElementById("homeBtn").onclick = function () {
        Common.movePage("./home.html");
    }

    document.getElementById("button_change").onclick = function () {
        comparePassword();
    }

    document.getElementById("button_cancel").onclick = function () {
        Common.backAction();
    }

    document.getElementById("logoutBtn").onclick = function () {
        Common.setupModal("question", null, Common.setTextMessage("com_w_0003", messageData), Common.setTextList("button_iie", buttonData), Common.setTextList("button_hai", buttonData), null, false);
        Common.logout();
    }
}

/**
   * ONCHANGE ACTION
*/
function onchangeAction() {
    document.getElementById("current_password").oninput = function () {
        Common.checkPwInput();
    }

    document.getElementById("newPwInput").oninput = function () {
        Common.checkPwInput();
    }

    document.getElementById("reNewPwInput").oninput = function () {
        Common.checkPwInput();
    }
}

/**
   * ONLOAD ACTION
*/
function onLoadAction() {
    getData();
    onchangeAction();
    onclickAction();
    document.getElementById("factory_name").innerHTML = sessionStorage.getItem("factory_name");
}

window.onload = onLoadAction;