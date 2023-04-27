import * as Common from './common/common_function.js';
import * as StringCS from './common/string.js';
import * as Message from './common/message.js';
import * as ValueCS from './common/values.js';


var data;
const modal = document.getElementById("myModal");

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
        dataIndx: "language_no",
        align: "center",
        fontWeight: "bold",
        width: "10%",
        title: "管理番号"
    },
    {
        dataIndx: "item_no",
        align: "center",
        width: "20%",
        title: 'ページ',
        filter: {
            type: "select",
            condition: 'equal',
            prepend: { '': '--Select--' },
            valueIndx: "item_no",
            labelIndx: "item_no",
            listeners: ['change']
        }
    },
    {
        dataIndx: "key_phrase",
        align: "center",
        width: "10%",
        title: "キーフレーズ"
    },
    {
        dataIndx: "japanese",
        align: "center",
        width: "10%",
        title: "日本語"
    },
    {
        dataIndx: "english",
        align: "center",
        width: "10%",
        title: "英語"
    },
    {
        dataIndx: "vietnamese",
        align: "center",
        width: "10%",
        title: "ベトナム語",
    },
    {
        dataIndx: "remark",
        align: "center",
        // width: "29%",
        title: "備考"
    },
    {
        title: "",
        editable: false,
        width: "10%",
        sortable: false,
        render: function (ui) {
            return "<button type='button' class='btn tableBtn' id='editBtn'>編集</button>"
                + "<button type='button' class='btn tableBtn m-t-5' id='deleteBtn'>削除</button>";
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