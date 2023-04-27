import * as Common from './common/common_function.js';

function changeFormat(value) {
    var d1 = value ? value.split('/') : null;
    return value ? d1[0] + '年' + d1[1] + '月' + d1[2] : "日";
}

function pqDatePicker(ui) {
    var $this = $(this);
    $this
        //.css({ zIndex: 3, position: "relative" })
        .datepicker({
            yearRange: "-25:+0", //25 years prior to present.
            changeYear: true,
            changeMonth: true,
            dateFormat: "yy/mm/dd"
            //showButtonPanel: true
        });
    //default From date
    var $from = $this.filter(".pq-from").datepicker("option", "defaultDate", new Date("01/01/2023"));
    //default To date
    var $to = $this.filter(".pq-to").datepicker("option", "defaultDate", new Date("01/01/2023"));

    var value = changeFormat(ui.column.filter.value),
        value2 = changeFormat(ui.column.filter.value2);

    $from.val(value);
    $to.val(value2);
}

var data = [
    { timestamp: "2023/03/01", drawing_id: "23-01110001", product_type: "外観検査", product_name: "送風機ファン01（〇〇株式会社）", remark: "" },
    { timestamp: "2023/03/01", drawing_id: "23-01160013", product_type: "外観検査", product_name: "送風機ファン03（〇〇株式会社）", remark: "" },
    { timestamp: "2023/03/01", drawing_id: "23-01210004", product_type: "火炎の状態", product_name: "送風機ファン04（〇〇株式会社）", remark: "" },
]

var obj = {
    width: "100%",
    height: 1000,
    cache: true,
    location: "remote",
    resizable: true,
    showBottom: false,
    showButtonPanel: true,
    filterModel: { on: true, mode: "AND", header: true, type: 'remote' },
    scrollModel: { autoFit: true },
    swipeModel: { on: false },
    trackModel: { on: true },
    editor: { select: true },
    historyModel: { checkEditableAdd: true },
    toolbar: {
        items: [
            {
                type: 'button', icon: 'ui-icon-plus', label: '追加', listener: function () {
                }
            },
            { type: 'separator' },
            {
                type: 'button', icon: 'ui-icon-disk', label: '保存', cls: 'changes', listener: function () {
                },
            },
            {
                type: 'button', icon: 'ui-icon-cancel', label: '元に戻す', cls: 'changes', listener: function () {
                    $grid.pqGrid("rollback");
                    $grid.pqGrid("history", { method: 'resetUndo' });
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
        dataIndx: "timestamp",
        dataType: "date",
        align: "center",
        fontWeight: "bold",
        width: "25%",
        title: "実施日",
        render: function (ui) {
            return changeFormat(ui.cellData);
        },
        filter: {
            type: 'textbox',
            condition: "between",
            init: pqDatePicker,
            listeners: [{ 'change': function (evt, ui) {

                ui.value = changeFormat(ui.value); //dd/mm to mm/dd
                ui.value2 = changeFormat(ui.value2); //dd/mm to mm/dd

                $(this).closest(".pq-grid").pqGrid('filter', {
                    oper: "add",
                    data: [ui]
                })
            }
            }]
        }
    },
    {
        dataIndx: "drawing_id",
        align: "center",
        width: "20%",
        title: '管理番号',
        filter: {
            type: "select",
            condition: 'equal',
            prepend: { '': '-Select-' },
            valueIndx: "item_no",
            labelIndx: "item_no",
            listeners: ['change']
        }
    },
    {
        dataIndx: "product_type",
        align: "center",
        width: "10%",
        title: "製品種別",
        filter: {
            type: "select",
            condition: 'equal',
            prepend: { '': '-Select-' },
            valueIndx: "product_type",
            labelIndx: "product_type",
            listeners: ['change']
        }

    },
    {
        dataIndx: "product_name",
        align: "center",
        // width: "10%",
        title: "製品名",
        filter: {
            type: "select",
            condition: 'equal',
            prepend: { '': '-Select-' },
            valueIndx: "product_name",
            labelIndx: "product_name",
            listeners: ['change']
        }

    },
    {
        dataIndx: "remark",
        align: "center",
        width: "10%",
        title: "備考"
    },
    {
        title: "",
        editable: false,
        width: "10%",
        sortable: false,
        render: function (ui) {
            return "<button type='button' class='btn tableBtn' id='showBtn'>表示</button>";
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

    document.getElementById("showBtn").onclick = function () {
        Common.movePage("./page404.html");
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