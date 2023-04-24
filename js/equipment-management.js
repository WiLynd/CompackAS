import * as Common from './common/common_function.js';

var picture = "mc-01"

var data = [
    { language_no: "", item_no: "", japanese: "", english: "", vietnamese: "", remark: ""}
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
                    var rowData = { language_no
            : 12, name: "" };
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
        dataIndx: "checkitem_id",
        align: "center",
        minWidth: "5%",
        title: "エリア管理番号<br>"
        + '<select name="checkitem" id="checkitem_id">'
        + '<option value="" selected></option>'
    },
    {
        dataIndx: "area_id",
        align: "center",
        title: 'ページ<br>'
        + '<select name="area" id="area_id">'
        + '<option value="" selected></option>'
    },
    {
        dataIndx: "equip_id",
        align: "center",
        title: "設備管理番号<br>"
        + '<select name="equip" id="equip_id">'
        + '<option value="" selected></option>'
    },
    {
        dataIndx: "name",
        align: "center",
        title: "設備名<br>"
        + '<select name="equip" id="equip_id">'
        + '<option value="" selected></option>'
    },
    {
        title: "", 
        sortable: false,
        minWidth: 150,
        render: function (ui) {
            return "<img src='../lib/imgs/" + picture + ".jpg' alt=''>";
        },
    },
    {
        title: "", 
        editable: false, 
        sortable: false,
        render: function (ui) {
            return "<button type='button' class='btn tableBtn'>設備詳細</button>";
        },
    },
    {
        dataIndx: "remark",
        align: "center",
        title: "備考"
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