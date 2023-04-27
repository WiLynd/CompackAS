const modal = document.getElementById("myModal");

/**
   * GENERATE TABLE
*/
function generateTable(listItem, tableName) {
    const table = document.getElementById(tableName);
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);
    for (let i = 0; i < listItem.length; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < listItem[i].length; j++) {
            const cell = document.createElement("td");
            var span = document.createElement("span");
            span.textContent = listItem[i][j];
            cell.appendChild(span);
            cell.classList.add("text");
            cell.classList.add("text-center");
            row.appendChild(cell);
        }
        row.id = i;
        tbody.appendChild(row);
    }
}

/**
   * CHANGE LANGUAGE
*/
function changeLanguage(lang) {
    document.getElementById("title") = data.title;
}


/** 
   * BACK ACTION
*/
function backAction() {
    history.back();
}

/**
   * INITIALIZE MODAL
   *
   * @param status     [STRING]
   * @param title     [STRING]
   * @param message     [STRING]
   * @param textButton0     [STRING]
   * @param textButton1     [STRING]
   * @param textButton2     [STRING]
   * @param isClose     [BOOL]
*/

function setupModal(status, title, message, textButton0, textButton1, textButton2, isClose) {
    // init view
    var modal = document.getElementById("myModal");
    var imageModal = document.getElementsByClassName("modal-image")[0];
    var titleModal = document.getElementsByClassName("title-modal")[0];
    var messageModal = document.getElementsByClassName("modal-message-detail")[0];
    var button0 = document.getElementsByClassName("button-0")[0];
    var button1 = document.getElementsByClassName("button-1")[0];
    var button2 = document.getElementsByClassName("button-2")[0];
    var closeButton = document.getElementsByClassName("modal-close-button")[0];

    // title and message
    if (title != null) {
        titleModal.innerHTML = title;
    }
    if (message != null) {
        messageModal.innerHTML = message;
    }

    // status
    if (status == "load") {
        titleModal.style.display = "none";
        imageModal.src = "../lib/imgs/gif/gif_loading_data.gif";
    } else if (status == "success") {
        titleModal.style.display = "none";
        imageModal.src = "../lib/imgs/gif/gif_success.gif";
    } else if (status == "error") {
        titleModal.style.display = "none";
        imageModal.src = "../lib/imgs/gif/gif_fail.gif";
    } else if (status == "question") {
        titleModal.style.display = "none";
        imageModal.src = "../lib/imgs/gif/gif_question.gif";
    } else if (status == "info") {
        titleModal.style.display = "none";
        imageModal.src = "../lib/imgs/gif/gif_info.gif";
    }

    // button
    if ((textButton1 != null) && (status == "info")) {
        button1.style.display = "block";
        button1.innerHTML = textButton1;
        button1.onclick = function () {
            modal.style.display = "none";
        }
    } else if (textButton1 != null) {
        button1.style.display = "block";
        button1.innerHTML = textButton1;
        button1.onclick = function () {
            modal.style.display = "none";
        }
    } else {
        button1.style.display = "none";
    }

    if (textButton0 != null) {
        button0.style.display = "block";
        button0.innerHTML = textButton0;
        button0.onclick = function () {
            modal.style.display = "none";
        }
    } else {
        button0.style.display = "none";
    }

    if (textButton1 != null) {
        button1.style.display = "block";
        button1.innerHTML = textButton1;
        button1.onclick = function () {
            modal.style.display = "none";
        }
    } else {
        button1.style.display = "none";
    }

    if (textButton2 != null) {
        button2.style.display = "block";
        button2.innerHTML = textButton2;
        button2.onclick = function () {
            modal.style.display = "none";
        }
    } else {
        button2.style.display = "none";
    }

    if (isClose == true) {
        closeButton.style.display = "block";
        closeButton.onclick = function () {
            modal.style.display = "none";
        }
    } else {
        closeButton.style.display = "none";
    }

    modal.style.display = "block";
}

/**
   * MOVING TO ANOTHER PAGE
   *
   * @param page     [STRING]
*/
function movePage(page) {
    window.location.href = page;
}

/*
    * SET ICON ENGLISH
*/
function setIconEnglish() {
    document.getElementById("language").setAttribute("src", "../lib/imgs/icons/ic-en.png");
    document.getElementById("language").setAttribute("value", "en");
    document.getElementById("lgEn").setAttribute("hidden", "");
    document.getElementById("lgVi").removeAttribute("hidden");
    document.getElementById("lgJp").removeAttribute("hidden");
}

/*
    * SET ICON VIETNAMESE
*/
function setIconVietnamese() {
    document.getElementById("language").setAttribute("src", "../lib/imgs/icons/ic-vi.png");
    document.getElementById("language").setAttribute("value", "vi");
    document.getElementById("lgVi").setAttribute("hidden", "");
    document.getElementById("lgEn").removeAttribute("hidden");
    document.getElementById("lgJp").removeAttribute("hidden");
}

/*
    * SET ICON JAPANESE
*/
function setIconJapanese() {
    document.getElementById("language").setAttribute("src", "../lib/imgs/icons/ic-jp.png");
    document.getElementById("language").setAttribute("value", "ja");
    document.getElementById("lgJp").setAttribute("hidden", "");
    document.getElementById("lgEn").removeAttribute("hidden");
    document.getElementById("lgVi").removeAttribute("hidden");
}


function setupDatePicker(nameDatePicker) {
    var dpk = document.getElementById(nameDatePicker);
    dpk.setAttribute("readOnly", "true");
    dpk.style.backgroundColor = "White";
}

function checkLogin(user) {
    console.log(user)
    if ((user == '') || (user == null)) {
        movePage("./login.html");
    }
}

function checkPwInput() {
    let currentPassword = document.getElementById("currentPwInput").value;
    let newPassword = document.getElementById("newPwInput").value;
    let reNewPassword = document.getElementById("reNewPwInput").value;
    if ((currentPassword.length >= 4) && (newPassword.length >= 4) && (reNewPassword.length >= 4)) {
        document.getElementById("button_change").removeAttribute("disabled");
    }
}

function setTextList(element, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (element == arr[i].item_id) {
            return arr[i].text;
        }
    }
}

function setTextMessage(element, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (element == arr[i].key_phrase) {
            return arr[i].text;
        }
    }
}

function logout() {
    var button1 = document.getElementsByClassName("button-1")[0];
    var button0 = document.getElementsByClassName("button-0")[0];

    button1.onclick = function () {
        movePage("./login.html");
        modal.style.display = "none";
    }

    button0.onclick = function () {
        modal.style.display = "none";
    }
}

export {
    backAction, setupModal, movePage, setupDatePicker, generateTable, setIconEnglish, setIconJapanese, setIconVietnamese,
    checkLogin, logout, checkPwInput, setTextList, setTextMessage
}