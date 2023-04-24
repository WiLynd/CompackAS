import * as Common from './common/common_function.js';
import * as StringCS from './common/string.js';
import * as Message from './common/message.js';

var userData, data;
var role = [];
var language_id = [];
var department = [];

$.ajax({
    url: "https://192.168.200.134/CompackAS/compacks/readUserDat?employee_id=0&languageId=3",
    cache: false,
    async: true,
    dataType: "JSON",
    success: function (response) {
        data = response;
        // department = data.lstDepartment;
        // role = data.lstRole;
        // language_id = data.lstLanguage_id;
        console.log(data)
        createGrid();
    }
});

function createGrid() {
    $(function () {
        var obj = {
            width: "100%",
            height: 500,
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
                rPP: 2,
                rPPOptions: [1, 2, 5, 10, 20, 100]
            },
            toolbar: {
                items: [
                    {
                        type: 'button',
                        label: '追加',
                        cls: 'btn headerBtn changes',
                        listener: function () {
                            addRow(this)
                        }
                    },
                    { type: 'separator' },
                    {
                        type: 'button',
                        label: '保存',
                        cls: 'btn headerBtn changes',
                        listener: function () {
                        },
                    },
                    {
                        type: 'button',
                        label: '元に戻す',
                        cls: 'btn headerBtn changes',
                        listener: function () {
                            $grid.pqGrid("rollback");
                            $grid.pqGrid("history", { method: 'resetUndo' });
                        },
                        options: { disabled: true }
                    },
                ]
            }
        };

        obj.dataModel = {
            cache: true,
            location: "local",
            data: data.lstUser
        }

        obj.colModel = [
            {
                dataIndx: "employee_id",
                align: "right",
                width: "7%",
                title: "社員番号"
            },
            {
                dataIndx: "name",
                width: "20%",
                title: "氏名"
            },
            {
                dataIndx: "icon_path",
                align: "center",
                width: "10%",
                title: "アイコン"
            },
            {
                dataIndx: "department_no",
                hidden: true,
            },
            {
                dataIndx: "department_name",
                width: "10%",
                title: "部門",
                editor: {
                    type: 'select',
                    valueIndx: "department_no",
                    labelIndx: "department_name",
                    mapIndices: { "department_no": "department_no", "department_name": "department_name" },
                    options: department
                },
            },
            {
                dataIndx: "language_id",
                hidden: true,
            },
            {
                dataIndx: "language_name",
                valueIndx: "language_id",
                width: "10%",
                title: "表示言語",
                editor: {
                    type: 'select',
                    valueIndx: "language_id",
                    labelIndx: "language_name",
                    mapIndices: { "language_id": "language_id", "language_name": "language_name" },
                    options: language_id
                },
            },
            {
                dataIndx: "role_id",
                hidden: true,
            },
            {
                dataIndx: "role_name",
                valueIndx: "role_id",
                width: "10%",
                title: "役割",
                editor: {
                    type: 'select',
                    valueIndx: "role_id",
                    labelIndx: "role_name",
                    mapIndices: { "role_id": "role_id", "role_name": "role_name" },
                    options: role
                },
            },
            {
                dataIndx: "remarks",
                align: "center",
                // width: "",
                title: "備考"
            },
            {
                title: "",
                editable: false,
                width: "10%",
                sortable: false,
                render: function (ui) {
                    return "<button type='button' class='btn tableBtn edit_btn m-b-5' id='edit_btn'>編集</button>\
                    <button type='button' class='btn tableBtn delete_btn' id='delete_btn'>削除</button>";
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
                    department_name: "",
                    language_no: "",
                    role_name: "",
                    remarks: ""
                }; //empty row template

                var rowIndx = grid.addRow({
                    // rowIndxPage: 0,
                    rowData: rowData,
                    checkEditable: false
                });

                //start editing the new row.
                editRow(rowIndx, grid, true);
            }
        }

        //called by delete button.
        function deleteRow(rowIndx, grid) {
            console.log("delete", rowIndx)
            grid.addClass({ rowIndx: rowIndx, cls: 'pq-row-delete' });

            var ans = window.confirm("Are you sure to delete row No " + (rowIndx + 1) + "?");
            if (ans) {
                var ProductID = grid.getRecId({ rowIndx: rowIndx });
                
                $.ajax($.extend({}, obj, {
                    context: grid,
                    url: "/pro/products/delete",
                    data: { ProductID: ProductID },
                    success: function () {
                        this.refreshDataAndView(); //reload fresh page data from server.
                    },
                    error: function () {
                        this.removeClass({ rowIndx: rowIndx, cls: 'pq-row-delete' });
                    }
                }));
            }
            else {
                grid.removeClass({ rowIndx: rowIndx, cls: 'pq-row-delete' });
            }
        }

        //called by edit button.
        function editRow(rowIndx, grid, edit) {
            console.log("edit")
            grid.addClass({ rowIndx: rowIndx, cls: 'pq-row-edit' });

            if (edit) grid.editFirstCellInRow({ rowIndx: rowIndx });

            //change edit button to save button and delete to cancel.
            var $tr = grid.getRow({ rowIndx: rowIndx }),
                $btn = $tr.find("button.edit_btn");
            $btn.button("option", {
                label: "保存"
            })
                .unbind("click")
                .click(function (evt) {
                    evt.preventDefault();
                    return update(rowIndx, grid);
                });
            $btn.next()
                .button("option", {
                    label: "キャンセル"
                })
                .unbind("click")
                .click(function (evt) {
                    grid.quitEditMode();
                    grid.removeClass({ rowIndx: rowIndx, cls: 'pq-row-edit' })
                    grid.rollback();
                });
        }

        //called by update button.
        function update(rowIndx, grid) {
            console.log("update")
            if (grid.saveEditCell() == false) {
                return false;
            }

            if (!grid.isValid({ rowIndx: rowIndx, focusInvalid: true }).valid) {
                return false;
            }

            if (grid.isDirty()) {
                var url,
                    rowData = grid.getRowData({ rowIndx: rowIndx }),
                    recIndx = grid.option("dataModel.recIndx"),
                    type;

                grid.removeClass({ rowIndx: rowIndx, cls: 'pq-row-edit' });

                if (rowData[recIndx] == null) {
                    //add record.
                    type = 'add';
                    // url = "/pro/products/add"; 

                }
                else {
                    //update record.
                    type = 'update';
                    // url = "/pro/products/update"; 

                }
                $.ajax($.extend({}, obj, {
                    context: grid,
                    url: url,
                    data: rowData,
                    success: function (response) {
                        if (type == 'add') {
                            rowData[recIndx] = response.recId;
                        }
                        //debugger;
                        grid.commit({ type: type, rows: [rowData] });
                        grid.refreshRow({ rowIndx: rowIndx });
                    }
                }));
            }
            else {
                grid.quitEditMode();
                grid.removeClass({ rowIndx: rowIndx, cls: 'pq-row-edit' });
                grid.refreshRow({ rowIndx: rowIndx });
            }
        }

        
        var $grid = $("div#grid").pqGrid(obj);
        $grid.pqGrid("option", {
            strAdd: "Add",
            strDelete: "Delete",
            strEdit: "Edit",
            strGroup_header: "Drag a column here to group by that column",
            strGroup_merge: 'Merge cells',
            strGroup_fixCols: 'Fix columns',
            strGroup_grandSummary: 'Grand summary',
            strLoading: "Loading",
            strNextResult: "Next Result",
            strNoRows: "No rows to display.",
            strNothingFound: "Nothing found",
            strPrevResult: "Previous Result",
            strSearch: "Search",
            strSelectedmatches: "Selected {0} of {1} match(es)"
        });
        $grid.find(".pq-pager").pqPager("option", {
            strDisplay:"Displaying {0} to {1} of {2} items.",
            strFirstPage:"First Page",
            strLastPage:"Last Page",
            strNextPage:"Next Page",
            strPage:"Page {0} of {1}",
            strPrevPage:"Previous Page",
            strRefresh:"Refresh",
            strRpp:"Records per page: {0}"
        });
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
        Common.movePage("./login.html");
    }
}

/**
   * ONLOAD ACTION
*/
function onLoadAction() {
    Common.checkLogin(sessionStorage.getItem(StringCS.EMPLOYEE));
    onclickAction();
    document.getElementById("factory_name").innerHTML = sessionStorage.getItem("factory_name");
    
}

window.onload = onLoadAction;