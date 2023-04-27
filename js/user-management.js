import * as Common from './common/common_function.js';
import * as StringCS from './common/string.js';
import * as Message from './common/message.js';
import * as ValueCS from './common/values.js';

const modal = document.getElementById("myModal");
var data, languageData, buttonData, messageData;
var tempRec = 0;
var userDataArr = {
    login_id: parseInt(sessionStorage.getItem(StringCS.EMPLOYEE)),
    lstUser: []
};
var role = [];
var language = [];
var department = [];
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
            + StringCS.EMPLOYEE + "0&" + StringCS.LANGUAGE + language_id,
        cache: false,
        async: true,
        dataType: "JSON",
        success: function (response) {
            data = response;
            languageData = data.lstLanguage;
            buttonData = data.lstButtonText;
            messageData = data.lstMessage;
            department = data.lstDepartment;
            role = data.lstRole;
            language = data.lstLanguageId;
            console.log(data);
            modal.style.display = "none";
            createGrid();
            document.getElementById("title").innerHTML = Common.setTextList("title", languageData);
            document.getElementById("user_config").innerHTML = '<i class="userBtn fas fa-user-cog m-r-10"></i>'
                + Common.setTextList("user_config", buttonData);
            document.getElementById("change_pw").innerHTML = '<i class="userBtn fas fa-key m-r-10"></i>'
                + Common.setTextList("change_pw", buttonData);
            document.getElementById("logout").innerHTML = '<i class="userBtn fas fa-sign-out-alt m-r-10"></i>'
                + Common.setTextList("logout", buttonData);
        }
    });
}

function createGrid() {
    $(function () {
        var obj = {
            width: "100%",
            height: 530,
            resizable: true,
            wrap: false,
            hwrap: false,
            showBottom: false,
            selectionModel: { type: 'cell' },
            scrollModel: { autoFit: true },
            swipeModel: { on: false },
            trackModel: { on: true },
            editor: { select: true },
            historyModel: { checkEditableAdd: true },
            editModel: {
                saveKey: $.ui.keyCode.ENTER,
                keyUpDown: false,
                clicksToEdit: 1
            },
            postRenderInterval: -1, //synchronous post rendering.
            //make rows editable based upon the class.
            editable: function (ui) {
                return this.hasClass({ rowIndx: ui.rowIndx, cls: 'pq-row-edit' });
            },
            create: function (evt, ui) {
                this.widget().pqTooltip();
            },
            pageModel: {
                type: "local",
                rPP: 5,
                rPPOptions: [1, 2, 5, 10, 20, 100]
            },
            toolbar: {
                items: [
                    {
                        type: 'button',
                        label: Common.setTextList("button_add", buttonData),
                        cls: 'btn headerBtn changes',
                        listener: function () {
                            addRow(this)
                        }
                    },
                    { type: 'separator' },
                    {
                        type: 'button',
                        label: Common.setTextList("button_save", buttonData),
                        cls: 'btn headerBtn changes',
                        listener: function () {
                            saveRecord();
                        },
                    },
                    {
                        type: 'button',
                        label: Common.setTextList("button_from", buttonData),
                        cls: 'btn headerBtn changes',
                        listener: function () {
                            location.reload();
                        },
                    },
                ]
            }
        };

        obj.dataModel = {
            cache: true,
            // location: "local",
            data: data.lstUser
        }

        obj.colModel = [
            {
                dataIndx: "employee_id",
                align: "right",
                minWidth: "80px",
                width: "7%",
                title: Common.setTextList("employee_id", languageData),
                render: function (ui) {
                    // console.log(ui)
                    var strId = ui.rowData.employee_id;
                    switch (strId.toString().length) {
                        case 1:
                            strId = "00000" + strId;
                            break;
                        case 2:
                            strId = "0000" + strId;
                            break;
                        case 3:
                            strId = "000" + strId;
                            break;
                        case 4:
                            strId = "00" + strId;
                            break;
                        case 5:
                            strId = "0" + strId;
                            break;
                        case 6:
                            break;
                    }
                    return {
                        text: strId,
                    };
                }
            },
            {
                dataIndx: "name",
                width: "20%",
                title: Common.setTextList("name", languageData),
            },
            {
                dataIndx: "icon_path",
                align: "center",
                width: "10%",
                title: Common.setTextList("icon_path", languageData),
            },
            {
                dataIndx: "department_no",
                hidden: true,
            },
            {
                dataIndx: "department",
                title: Common.setTextList("department_no", languageData),
                width: "10%",
                editor: {
                    type: "select",
                    mapIndices: { id: "code", name: "name" },
                    labelIndx: "name",
                    valueIndx: "code",
                    options: department,
                    mapIndices: { "code": "department_no", "name": "department" }
                },
                render: function (ui) {
                    for (var i = 0; i < department.length; i++) {
                        if (ui.rowData.department_no == department[i].code) {
                            return {
                                text: department[i].name,
                            };
                        }
                    }
                }
            },
            {
                dataIndx: "language_id",
                hidden: true,
            },
            {
                dataIndx: "language",
                title: Common.setTextList("language_no", languageData),
                width: "10%",
                editor: {
                    type: "select",
                    mapIndices: { id: "code", name: "name" },
                    labelIndx: "name",
                    valueIndx: "code",
                    options: language,
                    mapIndices: { "code": "language_id", "name": "language" }
                },
                render: function (ui) {
                    for (var i = 0; i < language.length; i++) {
                        if (ui.rowData.language_id == language[i].code) {
                            return {
                                text: language[i].name,
                            };
                        }
                    }
                }

            },
            {
                dataIndx: "role_no",
                hidden: true,
            },
            {
                dataIndx: "role",
                title: Common.setTextList("role_no", languageData),
                width: "10%",
                editor: {
                    type: "select",
                    mapIndices: { id: "code", name: "name" },
                    labelIndx: "name",
                    valueIndx: "code",
                    options: role,
                    mapIndices: { "code": "role_no", "name": "role" }
                },
                render: function (ui) {
                    for (var i = 0; i < role.length; i++) {
                        if (ui.rowData.role_no == role[i].code) {
                            return {
                                text: role[i].name,
                            };
                        }
                    }
                }

            },
            {
                dataIndx: "remarks",
                align: "center",
                // width: "",
                title: Common.setTextList("remarks", languageData),
            },
            {
                title: "",
                editable: false,
                width: "10%",
                sortable: false,
                render: function (ui) {
                    return "<button type='button' class='btn tableBtn edit_btn m-b-5' id='edit_btn'>"
                        + Common.setTextList("button_edit", buttonData) + "</button>\
                    <button type='button' class='btn tableBtn delete_btn' id='delete_btn'>"
                        + Common.setTextList("button_delete", buttonData) + "</button>";
                },
                postRender: function (ui) {
                    var rowIndx = ui.rowIndx,
                        grid = this,
                        $cell = grid.getCell(ui);

                    //edit button
                    $cell.find(".edit_btn").button({ icons: { primary: 'ui-icon-pencil' } })
                        .bind("click", function (evt) {
                            if (isEditing(grid)) {
                                return false;
                            }
                            editRow(rowIndx, grid, true);
                        });

                    //if it has edit class, then edit the row.
                    if (grid.hasClass({ rowData: ui.rowData, cls: 'pq-row-edit' })) {
                        editRow(rowIndx, grid);
                    }

                    //delete button
                    $cell.find(".delete_btn").button({ icons: { primary: 'ui-icon-close' } })
                        .bind("click", function (evt) {
                            deleteRow(rowIndx, grid);
                        });
                }
            }
        ]

        //to check whether any row is currently being edited.
        function isEditing(grid) {
            var rows = grid.getRowsByClass({ cls: 'pq-row-edit' });
            if (rows.length > 0) {
                var rowIndx = rows[0].rowIndx;
                grid.goToPage({ rowIndx: rowIndx });
                //focus on editor if any 
                grid.editFirstCellInRow({ rowIndx: rowIndx });
                return true;
            }
            return false;
        }

        //called by add button in toolbar.
        function addRow(grid) {
            var totalPages = $("#grid").pqGrid("option", "pageModel.totalPages");
            var rows = grid.getRowsByClass({ cls: 'pq-row-edit' });
            if (rows.length > 0) {//already a row currently being edited.
                var rowIndx = rows[0].rowIndx;

                //focus on editor if any 
                grid.editFirstCellInRow({
                    rowIndx: rowIndx
                });
            }
            else {
                //append empty row in the first row.                            
                var rowData = {
                    employee_id: "",
                    name: "",
                    icon_path: "",
                    language_id: "",
                    department_no: "",
                    role_no: "",
                    password: "",
                    address: "",
                    phone: "",
                    remarks: "",
                    create_date: "",
                    create_id: "",
                    update_date: "",
                    update_id: "",
                    del_flg: 0,
                    mode: 0
                }; //empty row template

                // $("#grid").pqGrid( "goToPage", { page: totalPages} );
                var rowIndx = grid.addRow({
                    rowIndxPage: 0,
                    rowData: rowData,
                    checkEditable: false
                });

                //start editing the new row.
                editRow(rowIndx, grid, true);
            }
        }

        //called by delete button.
        function deleteRow(rowIndx, grid) {
            grid.addClass({ rowIndx: rowIndx, cls: 'pq-row-delete' });
            Common.setupModal("question", null, setMessage("com_w_0001"), setButton("button_iie"), setButton("button_hai"), null, false);
            var rowData = grid.getRowData({ rowIndx: rowIndx });
            var button1 = document.getElementsByClassName("button-1")[0];
            var button0 = document.getElementsByClassName("button-0")[0];

            button1.onclick = function () {
                addRecord(prepareUserData(rowData, 2));
                $("#grid").pqGrid("deleteRow", { rowIndx: rowIndx });
                modal.style.display = "none";
            }

            button0.onclick = function () {
                grid.removeClass({ rowIndx: rowIndx, cls: 'pq-row-delete' });
                modal.style.display = "none";
            }
        }

        //called by edit button.
        function editRow(rowIndx, grid, edit) {
            console.log("edit")
            grid.addClass({ rowIndx: rowIndx, cls: 'pq-row-edit' });

            if (edit) grid.editFirstCellInRow({ rowIndx: rowIndx });

            //change edit button to save button and delete to cancel.
            var $tr = grid.getRow({ rowIndx: rowIndx }),
                $btn = $tr.find("button#edit_btn");
            // $btn.button("option", {
            //     label: "保存"
            // })
            //     .unbind("click")
            //     .click(function (evt) {
            //         // evt.preventDefault();
            //         return update(rowIndx, grid);
            //     });
            // $btn.next()
            //     .button("option", {
            //         label: "キャンセル"
            //     })
            //     .unbind("click")
            //     .click(function (evt) {
            //         grid.quitEditMode();
            //         grid.removeClass({ rowIndx: rowIndx, cls: 'pq-row-edit' })
            //         grid.rollback();
            //     });
            $btn.button("option", { label: setButton("button_update"), "icons": { primary: "ui-icon-check" } })
                .unbind("click")
                .click(function (evt) {
                    //evt.preventDefault();
                    return update(rowIndx, grid);
                });
            $btn.next().button("option", { label: setButton("button_cancel"), "icons": { primary: "ui-icon-cancel" } })
                .unbind("click")
                .click(function (evt) {
                    grid.quitEditMode();
                    grid.removeClass({ rowIndx: rowIndx, cls: 'pq-row-edit' })
                    grid.rollback();
                });
        }

        //called by update button.
        function update(rowIndx, grid) {
            console.log("update");
            var rowData = grid.getRowData({ rowIndx: rowIndx });
            if (rowData.mode == 0) {
                addRecord(prepareUserData(rowData, 0));
            } else {
                addRecord(prepareUserData(rowData, 1));
            }
            if (grid.saveEditCell() == false) {
                return false;
            }

            if (!grid.isValid({ rowIndx: rowIndx, focusInvalid: true }).valid) {
                return false;
            }

            if (grid.isDirty()) {
                grid.removeClass({ rowIndx: rowIndx, cls: 'pq-row-edit' });
            }
            else {
                grid.quitEditMode();
                grid.removeClass({ rowIndx: rowIndx, cls: 'pq-row-edit' });
                grid.refreshRow({ rowIndx: rowIndx });
            }
        }

        var $grid = $("div#grid").pqGrid(obj);
        $grid.pqGrid("option", {
            strGroup_header: "Drag a column here to group by that column",
            strGroup_merge: 'Merge cells',
            strGroup_fixCols: 'Fix columns',
            strGroup_grandSummary: 'Grand summary',
            strNextResult: "Next Result",
            strNoRows: "No rows to display.",
            strPrevResult: "Previous Result",
            strSearch: "Search",
            strSelectedmatches: "Selected {0} of {1} match(es)"
        });
        $grid.find(".pq-pager").pqPager("option", {
            strDisplay: "Displaying {0} to {1} of {2} items.",
            strFirstPage: "First Page",
            strLastPage: "Last Page",
            strNextPage: "Next Page",
            strPage: "Page {0} of {1}",
            strPrevPage: "Previous Page",
            strRefresh: "Refresh",
            strRpp: "Records per page: {0}"
        });
    });
}

/**
    * PREPARE USER DATA
*/
function prepareUserData(userData, mode) {
    var WriteUserDat = {
        employee_id: parseInt(userData.employee_id),
        name: userData.name,
        icon_path: userData.icon_path,
        language_id: parseInt(userData.language_id),
        department_no: parseInt(userData.department_no),
        role_no: parseInt(userData.role_no),
        password: userData.password,
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
    return WriteUserDat;
}

/**
   * ADD RECORD USER DATA
*/
function addRecord(userData) {
    userDataArr.lstUser[tempRec] = userData;
    tempRec++;
}

/**
   * ONCLICK ACTION
*/
function saveRecord() {
    console.log(userDataArr)
    $.ajax({
        type: "POST",
        dataType: "json",
        data: JSON.stringify(userDataArr),
        contentType: "application/json; charset=utf-8",
        url: StringCS.HTTPS + StringCS.ADDRESS + StringCS.DIRECT + "writeUser?",
        timeout: ValueCS.VL_LONG_TIMEOUT,
        success: function (response) {
            $("#grid").pqGrid("showLoading");
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
        $("#grid").pqGrid("hideLoading");
        location.reload();
        console.log('res', res);
    });
}

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
        sessionStorage.setItem(StringCS.EMPLOYEE, '');
        Common.setupModal("question", null, Common.setTextMessage("com_w_0003", messageData), Common.setTextList("button_iie", buttonData), Common.setTextList("button_hai", buttonData), null, false);
        Common.logout();
    }
}

/**
   * ONLOAD ACTION
*/
function onLoadAction() {
    Common.checkLogin(sessionStorage.getItem(StringCS.EMPLOYEE));
    getData();
    onclickAction();
    document.getElementById("factory_name").innerHTML = sessionStorage.getItem("factory_name");
}

window.onload = onLoadAction;