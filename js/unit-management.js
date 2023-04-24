import * as Common from './common/common_function.js';

var data = [
    { unit_id: "0001", key: "kg", unit: "Kg", remarks: ""},
    { unit_id: "0002", key: "g", unit: "g", remarks: ""},
    { unit_id: "0003", key: "l", unit: "L", remarks: ""},
    { unit_id: "0004", key: "t", unit: "t", remarks: ""}
]

var obj = {
    width: "100%",
    height: 500,
    resizable: true,
    showBottom: false,
    scrollModel: { autoFit: true },
    swipeModel: { on: false },
    trackModel: { on: true },
    editor: { select: true },
    historyModel: { checkEditableAdd: true },
    toolbar: {
        items: [
            {
                type: 'button',
                icon: 'ui-icon-plus',
                label: '追加',
                listener: function () {
                    var rowData = { idNumber: 12, name: "" };
                    var rowIdx = $grid.pqGrid("addRow", { rowData: rowData, checkEditable: true });
                    $grid.pqGrid("goToPage", { rowIdx: rowIdx });
                    $grid.pqGrid("editFirstCellInRow", { rowIndx: rowIdx });
                }
            },
        ]
    }
};

obj.dataModel = {
    data: data
}

obj.colModel = [
    {
        dataIndx: "unit_id",
        align: "center",
        width: "10%", 
        title: "管理番号"
    },
    {
        dataIndx: "key",
        align: "center",
        width: "10%", 
        title: "キー"
    },
    {
        dataIndx: "unit",
        align: "center",
        width: "10%", 
        title: "単位"
    },
    {
        dataIndx: "remarks",
        align: "center",
        title: "備考"
    },
    {
        title: "", 
        editable: false, 
        width: "10%", 
        sortable: false,
        render: function (ui) {
            return "<button type='button' class='btn tableBtn'>EDIT</button><br><button type='button' class='btn tableBtn'>DELETE</button>";
        },
    }
]
$("#grid").pqGrid(obj);

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
        Common.movePage("./login.html");
    }
}

/**
   * ONLOAD ACTION
*/
function onLoadAction() {
    onclickAction();
    document.getElementById("factory_name").innerHTML = sessionStorage.getItem("factory_name");
}

window.onload = onLoadAction;