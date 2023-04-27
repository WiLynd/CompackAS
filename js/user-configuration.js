import * as Common from './common/common_function.js';
import * as StringCS from './common/string.js';
import * as Message from './common/message.js';
import * as ValueCS from './common/values.js';

var data, userData;
var employee_id = parseInt(sessionStorage.getItem(StringCS.EMPLOYEE));
var language_user = parseInt(sessionStorage.getItem(StringCS.LANGUAGE));

/**
   * GET USER DATA
*/
function getUserData(user) {
    $.ajax({
        url: StringCS.HTTPS + StringCS.ADDRESS + StringCS.DIRECT + "readUserDat?"
            + StringCS.EMPLOYEE + user + "&"
            + StringCS.LANGUAGE + language_user,
        dataType: "JSON",
        success: function (result) {
            data = result;
            userData = data.lstUser[0];
            // console.log(userData)
            setUserData(userData);
        },
        error: function (jqXHR, exception) {
            console.log(exception);
            Common.setupModal("error", null, data.lstMessage[5].text, null, data.lstButtonText[1].text, null, false);
        },
        timeout: ValueCS.VL_SHORT_TIMEOUT
    })
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

function formatDate(date) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

/**
    * PREPARE USER DATA
 */
function prepareUserData(id) {
    var WriteUserDat = {
        login_id: employee_id,
        lstUser: [{
            employee_id: id,
            name: "Kaze",
            icon_path: userData.icon_path,
            language_id: userData.language_id,
            department_no: userData.department_no,
            role_no: userData.role_no,
            password: userData.password,
            address: userData.address,
            phone: userData.phone,
            remarks: userData.remarks,
            create_date: null,
            create_id: userData.create_id,
            update_date: null,
            update_id: userData.update_id,
            del_flg: userData.del_flg,
            mode: 1
        }]
    }
    return WriteUserDat;
}

/**
   * SET USER DATA
*/
function setUserData(userData) {
    console.log(userData)
    document.getElementById("employee_id").value = userData.employee_id;
    document.getElementById("name").value = userData.name;
    document.getElementById("remarks").value = userData.remarks;
    setRoleCbb();
    setDepartmentCbb();
    setLanguageCbb();
    // saveUserData();
}

/**
   * SAVE USER DATA
*/
function saveUserData() {
    $.ajax({
        // headers: {
		// 	'Content-Type': "application/x-www-form-urlencoded"
		// },
        type: "POST",
        dataType: "json",
        data: JSON.stringify(prepareUserData(8)),
        contentType: "application/json; charset=utf-8",
        url: StringCS.HTTPS + StringCS.ADDRESS + StringCS.DIRECT + "writeUser?",
        timeout: ValueCS.VL_LONG_TIMEOUT,
        success: function (response) {
            console.log(response);
            // Common.setupModal("load", null, Mess.I00002, null, null, null, false);
        },
        error: function (xmlhttprequest, textstatus, message) {
            if (textstatus === "timeout") {
                console.log("timeout")
            } else {
                console.log(textstatus)
            }
            // Common.setupModal("error", null, Mess.E00004, null, StringCS.OK, null, false);
        }
    }).done(function (res) {
        console.log('res', res);
    });
}

/**
   * SET DATA FOR ROLE COMBOBOX
*/
function setRoleCbb() {
    if (data != null) {
        if (data.lstRole != null) {
            // var optionSpace = document.createElement("option");
            // optionSpace.classList.add("text")
            // optionSpace.text = "";
            // optionSpace.value = 0;
            // document.getElementById("lstRole").add(optionSpace);
            for (var i = 0; i < data.lstRole.length; i++) {
                var option = document.createElement("option");
                option.classList.add("text")
                option.text = data.lstRole[i].name;
                option.value = data.lstRole[i].code;
                if (userData.role_no == data.lstRole[i].code) {
                    option.selected = true;
                }
                document.getElementById("lstRole").add(option);
            }
        }
    }
}

/**
   * SET DATA FOR DEPARTMENT COMBOBOX
*/
function setDepartmentCbb() {
    if (data != null) {
        if (data.lstDepartment != null) {
            // var optionSpace = document.createElement("option");
            // optionSpace.classList.add("text")
            // optionSpace.text = "";
            // optionSpace.value = 0;
            // document.getElementById("lstRole").add(optionSpace);
            for (var i = 0; i < data.lstDepartment.length; i++) {
                var option = document.createElement("option");
                option.classList.add("text")
                option.text = data.lstDepartment[i].name;
                option.value = data.lstDepartment[i].code;
                if (userData.department_no == data.lstDepartment[i].code) {
                    option.selected = true;
                }
                document.getElementById("lstDepartment").add(option);
            }
        }
    }
}

/**
   * SET DATA FOR LANGUAGE COMBOBOX
*/
function setLanguageCbb() {
    if (data != null) {
        if (data.lstLanguageId != null) {
            // var optionSpace = document.createElement("option");
            // optionSpace.classList.add("text")
            // optionSpace.text = "";
            // optionSpace.value = 0;
            // document.getElementById("lstRole").add(optionSpace);
            for (var i = 0; i < data.lstLanguageId.length; i++) {
                var option = document.createElement("option");
                option.classList.add("text")
                option.text = data.lstLanguageId[i].name;
                option.value = data.lstLanguageId[i].code;
                if (userData.language_id == data.lstLanguageId[i].code) {
                    option.selected = true;
                }
                document.getElementById("lstLanguageId").add(option);
            }
        }
    }
}

/**
   * UPLOAD PICTURE ACTION
*/
function uploadPicture() {
    var uploader = document.createElement('input'),
        image = document.getElementById('img-result');

    uploader.type = 'file';
    uploader.accept = 'image/*';
    uploader.click();
    uploader.onchange = function () {
        var reader = new FileReader();
        reader.onload = function (evt) {
            image.classList.remove('no-image');
            image.style.backgroundImage = 'url(' + evt.target.result + ')';
            var request = {
                itemtype: 'test 1',
                brand: 'test 2',
                images: [{
                    data: evt.target.result
                }]
            };
        }
        reader.readAsDataURL(uploader.files[0]);
    }
}

/**
   * ONCLICK ACTION
*/
function onclickAction() {
    document.getElementById("homeBtn").onclick = function () {
        Common.movePage("./home.html");
    }

    document.getElementById("iconBtn").onclick = function () {
        uploadPicture();
    }

    document.getElementById("changePwBtn").onclick = function () {
        Common.movePage("./change-password.html");
    }

    document.getElementById("logoutBtn").onclick = function () {
        Common.setupModal("question", null, Common.setTextMessage("com_w_0003", messageData), Common.setTextList("button_iie", buttonData), Common.setTextList("button_hai", buttonData), null, false);
        Common.logout();
    }

    document.getElementById("cancelBtn").onclick = function () {
        Common.backAction();
    }
}

/**
   * ONLOAD ACTION
*/
function onLoadAction() {
    onclickAction();
    getUserData(employee_id, language_user);
    document.getElementById("factory_name").innerHTML = sessionStorage.getItem("factory_name");
}

window.onload = onLoadAction;