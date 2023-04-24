import * as Common from './common/common_function.js';

var data = [
    { language_no: "0001", item_no: "言語管理", key_phrase: "save", japanese: "保存", english: "Save", vietnamese: "Lưu", remark: "" },
    { language_no: "0002", item_no: "言語管理", key_phrase: "edit", japanese: "編集", english: "Edit", vietnamese: "Sửa", remark: "" },
    { language_no: "0003", item_no: "言語管理", key_phrase: "delete", japanese: "削除", english: "Delete", vietnamese: "Xoá", remark: "" },
    { language_no: "0004", item_no: "言語管理", key_phrase: "manage", japanese: "管理", english: "Manage", vietnamese: "Quản lý", remark: "" },
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
        Common.movePage("./login.html");
    }

    document.getElementById("deleteBtn").onclick = function () {
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