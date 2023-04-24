import * as Common from './common/common_function.js';
import * as StringCS from './common/string.js';
import * as Message from './common/message.js';
import * as ValueCS from './common/values.js';

var data, userData;
var employee_id = sessionStorage.getItem(StringCS.EMPLOYEE);
var language = sessionStorage.getItem(StringCS.LANGUAGE);

/**
   * GET USER DATA
*/
function getUserData(user, language){
    $.ajax({
        url: StringCS.HTTPS + StringCS.ADDRESS + StringCS.DIRECT + "readUserDat?"
            + StringCS.EMPLOYEE + user + "&"
            + StringCS.LANGUAGE + language,
        dataType : "JSON",
        success: function (result) {
            data = result;
            userData = data.lstUser[0];
            console.log(userData)
            setUserData(userData);
        },
        error: function (jqXHR, exception) {
            console.log(exception);
            Common.setupModal("error", null, data.lstMessage[5].text, null, data.lstButtonText[1].text, null, false);
        },
        timeout: ValueCS.VL_SHORT_TIMEOUT
    })
}

/**
   * SET USER DATA
*/
function setUserData(userData) {
    console.log(userData)
    document.getElementById("employee_id").value = userData.employee_id;
    document.getElementById("name").value = userData.name;
    // document.getElementById("name").value = userData.name;
}

/**
   * SET DATA FOR COMBOBOX
   *
   * @param cbb     [INT]
*/
function setDataCbb(list) {
	if (userData != null) {
		if (userData.list != null) {
			var optionSpace = document.createElement("option");
			optionSpace.classList.add("text")
			optionSpace.text = "";
			optionSpace.value = 0;
			document.getElementById(list).add(optionSpace);
			for (var i = 0; i < userData.lstDepartment.length; i++) {
				var option = document.createElement("option");
				option.classList.add("text")
				option.text = userData.list[i].name;
				option.value = userData.list[i].code;
				document.getElementById(list).add(option);
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
		Common.movePage("./login.html");
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
    getUserData(employee_id,language);
    document.getElementById("factory_name").innerHTML = sessionStorage.getItem("factory_name");
}

window.onload = onLoadAction;