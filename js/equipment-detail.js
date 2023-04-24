import * as Common from './common/common_function.js';

var data = [
    { language_no: "0001", item_no: "言語管理", japanese: "保存", english: "Save", vietnamese: "Lưu", remark: "" },
    { language_no: "0002", item_no: "言語管理", japanese: "編集", english: "Edit", vietnamese: "Sửa", remark: "" },
    { language_no: "0003", item_no: "言語管理", japanese: "削除", english: "Delete", vietnamese: "Xoá", remark: "" },
    { language_no: "0004", item_no: "言語管理", japanese: "管理", english: "Manage", vietnamese: "Quản lý", remark: "" },
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
        dataIndx: "item_no",
        editable: true,
        align: "center",
        width: "35%",
        title: '日付<br>'
        + '<input type="date" class="" id="" />　～　<input type="date" class="" id="" />',
    },
    {
        dataIndx: "title",
        align: "center",
        width: "15%",
        title: "タイトル",
    },
    {
        dataIndx: "content",
        align: "center",
        // width: "10%",
        title: "内容"
    },
    {
        dataIndx: "photo_1",
        align: "center",
        width: "15%",
        title: "写真１",
    },
    {
        title: "", 
        editable: false, 
        width: "10%", 
        sortable: false,
        render: function (ui) {
            return "<button type='button' class='btn tableBtn' id='detailBtn'>詳細</button>"
                + "<button type='button' class='btn tableBtn m-t-5' id='deleteBtn'>削除</button>";
        },
    }
]
$("#grid").pqGrid(obj);

/**
   * ONLOAD ACTION
*/
function onclickAction() {
    // document.getElementById("homeBtn").onclick = function () {
    //     Common.movePage("./home.html");
    // }
}

/**
   * ONLOAD ACTION
*/
function onLoadAction() {
	// onclickAction();
	document.getElementById("factory_name").innerHTML = sessionStorage.getItem("factory_name");
}

window.onload = onLoadAction;