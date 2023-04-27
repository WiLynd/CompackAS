import * as Common from './common/common_function.js';
var data = [
    { id_number: "0001", japanese: "製糸", english: "Yarn", vietnamese: "Kéo Sợi", area_id: "S-001", employee_id_1:"", employee_id_2: "", remarks: ""},
    { id_number: "0002", japanese: "原反", english: "Fabric", vietnamese: "Dệt", area_id: "S-002", employee_id_1:"", employee_id_2: "", remarks: ""},
    { id_number: "0003", japanese: "製糸", english: "Cutting", vietnamese: "Cắt", area_id: "S-003", employee_id_1:"", employee_id_2: "", remarks: ""},
    { id_number: "0004", japanese: "縫製", english: "Sewing", vietnamese: "May", area_id: "S-003", employee_id_1:"", employee_id_2: "", remarks: ""},
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
            { type: 'button', icon: 'ui-icon-disk', label: 'Save Changes', cls: 'changes', listener: function () {
                saveChanges();                        
            },
            options: { disabled: true }
        },
        ]
    }
};

obj.dataModel = {
    data: data
}

obj.colModel = [
    {
        dataIndx: "id_number",
        align: "center",
        title: "社員番号"
    },
    {
        dataIndx: "japanese",
        align: "center",
        title: "日本語"
    },
    {
        dataIndx: "english",
        align: "center",
        title: "英語"
    },
    {
        dataIndx: "vietnamese",
        align: "center",
        title: "ベトナム語",
    },
    {
        dataIndx: "area_id",
        align: "center",
        title: "管理ID"
    },
    {
        dataIndx: "employee_id_1",
        align: "center",
        title: "責任者正"
    },
    {
        dataIndx: "employee_id_2",
        align: "center",
        title: "責任者副"
    },
    {
        dataIndx: "remarks",
        align: "center",
        title: "備考"
    },
    {
        title: "", editable: false, width: "10%", sortable: false,
        render: function (ui) {
            return "<button type='button' class='btn tableBtn'>編集</button><button type='button' class='btn tableBtn m-t-5'>削除</button>";
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
        Common.setupModal("question", null, Common.setTextMessage("com_w_0003", messageData), Common.setTextList("button_iie", buttonData), Common.setTextList("button_hai", buttonData), null, false);
        Common.logout();
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