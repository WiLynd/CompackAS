import * as Common from './common/common_function.js';
import * as StringCS from './common/string.js';
import * as Message from './common/message.js';
import * as ValueCS from './common/values.js';

const modal = document.getElementById("myModal");
var language_id = parseInt(sessionStorage.getItem(StringCS.LANGUAGE));
var data, messageData, languageData, buttonData;

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
        url: StringCS.HTTPS + StringCS.ADDRESS + StringCS.DIRECT + "readMessageDat?"
            + StringCS.LANGUAGE + language_id,
        cache: false,
        async: true,
        dataType: "JSON",
        success: function (response) {
            data = response;
            messageData = data.lstMessage;
            languageData = data.lstLanguage;
            buttonData = data.lstButtonText;
            console.log(data);
            modal.style.display = "none";
            createGrid();
            document.getElementById("title").innerHTML = setLanguage("title");
            document.getElementById("user_config").innerHTML = '<i class="userBtn fas fa-user-cog m-r-10"></i>' + setButton("user_config");
            document.getElementById("change_pw").innerHTML = '<i class="userBtn fas fa-key m-r-10"></i>' + setButton("change_pw");
            document.getElementById("logout").innerHTML = '<i class="userBtn fas fa-sign-out-alt m-r-10"></i>' + setButton("logout");
        }
    });
}

function setLanguage(element) {
    for (var i = 0; i < languageData.length; i++) {
        if (element == languageData[i].item_id) {
            return languageData[i].text;
        }
    }
}

function setButton(element) {
    for (var i = 0; i < buttonData.length; i++) {
        if (element == buttonData[i].item_id) {
            return buttonData[i].text;
        }
    }
}

function setMessage(element) {
    for (var i = 0; i < messageData.length; i++) {
        if (element == messageData[i].key_phrase) {
            return messageData[i].text;
        }
    }
}



function createGrid() {
    $(function () {
        var obj = {
            width: "100%",
            height: 1000,
            cache: true,
            location: "local",
            resizable: true,
            showBottom: false,
            showButtonPanel: true,
            filterModel: { on: true, header: true },
            load: function () {
                var column = $("#grid").pqGrid("getColumn", { dataIndx: "page" });
                var filter = column.filter;
                filter.cache = null;
                filter.options = grid.getData({ dataIndx: ["page"] });
            },
            wrap: false,
            editable: false,
            virtualX: true, virtualY: true,
            scrollModel: { autoFit: true },
            swipeModel: { on: false },
            numberCell: { show: true },
            trackModel: { on: true },
            editor: { select: true },
            historyModel: { checkEditableAdd: true },
            toolbar: {
                items: [
                    {
                        type: 'button',
                        label: setButton("button_add"),
                        cls: 'btn headerBtn changes',
                        listener: function () {
                        }
                    },
                    { type: 'separator' },
                    {
                        type: 'button',
                        label: setButton("button_save"),
                        cls: 'btn headerBtn changes',
                        listener: function () {
                        },
                    },
                    {
                        type: 'button',
                        label: setButton("button_from"),
                        cls: 'btn headerBtn changes',
                        listener: function () {
                            location.reload();
                        },
                    },
                ]
            },
        };

        // function setDropdown() {
        //     var column = $( "#grid" ).pqGrid( "getColumn",{ dataIndx: "page" } );
        //     var filter = column.filter;
        //     filter.cache = null;
        //     filter.options = grid.getData({ dataIndx: ["page"] });
        // }

        obj.dataModel = {
            cache: true,
            // location: "local",
            data: data.lstMessage
        }

        obj.colModel = [
            {
                dataIndx: "message_no",
                align: "right",
                minWidth: "80px",
                width: "7%",
                title: "管理番号"
            },
            {
                dataIndx: "page",
                width: "10%",
                title: 'ページ',
                filter: {
                    type: "select",
                    condition: 'equal',
                    prepend: { '': '--Select--' },
                    valueIndx: "page",
                    labelIndx: "page",
                    listeners: ['change']
                }
            },
            {
                dataIndx: "key_phrase",
                width: "10%",
                title: "キーフレーズ"
            },
            {
                dataIndx: "japanese",
                width: "15%",
                title: "日本語"
            },
            {
                dataIndx: "english",
                width: "15%",
                title: "英語"
            },
            {
                dataIndx: "vietnamese",
                width: "15%",
                title: "ベトナム語",
            },
            {
                dataIndx: "remark",
                // width: "29%",
                title: "備考"
            },
            {
                title: "",
                editable: false,
                width: "10%",
                sortable: false,
                render: function (ui) {
                    return "<button type='button' class='btn tableBtn edit_btn m-b-5' id='edit_btn'>" + setButton("button_edit") + "</button>\
                <button type='button' class='btn tableBtn delete_btn' id='delete_btn'>" + setButton("button_delete") + "</button>";
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
                    // employee_id: "",
                    // name: "",
                    // icon_path: "",
                    // language_id: "",
                    // department_no: "",
                    // role_no: "",
                    // password: "",
                    // address: "",
                    // phone: "",
                    // remarks: "",
                    // create_date: "",
                    // create_id: "",
                    // update_date: "",
                    // update_id: "",
                    // del_flg: 0,
                    // mode: 0
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
            Common.setupModal("warning", null, setMessage("com_w_0001"), setButton("button_iie"), setButton("button_hai"), null, false);
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

        $("#grid").pqGrid(obj);

    })
}

/**
   * ONLOAD ACTION
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
}

/**
   * ONLOAD ACTION
*/
function onLoadAction() {
    onclickAction();
    getData();
    document.getElementById("factory_name").innerHTML = sessionStorage.getItem("factory_name");
}

window.onload = onLoadAction;