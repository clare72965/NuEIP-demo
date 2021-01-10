$(document).ready(function () {

    getPersonInfo('get', '/user/userInfo');

    // 新增按鈕
    $("#addbutton").click(function () {
        var addModalEl = document.getElementById('dialog-addconfirm');
        addModalEl.addEventListener('hidden.bs.modal', function (event) {
            $("#dialog-addconfirm .confirm").unbind();
            $("#dialog-addconfirm .cancel").unbind();
            $("#addResetForm").unbind();
            resetForm('addform');
        });
        showAddModal();
    })

    // 搜尋按鈕
    $("#searchbutton").click(function () {
        var addModalEl = document.getElementById('dialog-searchconfirm');
        addModalEl.addEventListener('hidden.bs.modal', function (event) {
            $("#dialog-searchconfirm .confirm").unbind();
            $("#dialog-searchconfirm .cancel").unbind();
            $("#searcResetForm").unbind();
            resetForm('searchform');
        });
        showSearchModal();
    })
});



var modifyModal;

function refreshTable(data) {
    var personInfo;
    $("#cardtable tbody > tr").remove();
    $.each(data, function (key, item) {
        personInfo = formatPersonInfo(item);
        var row = $("<tr id=" + item.s_sn + "></tr>");

        row.append($("<td data-th='中文名字'  data-bs-toggle='tooltip' data-bs-placement='bottom' title=" + personInfo.name + " class='name'></td>").html(item.cnname));
        row.append($("<td data-th='英文名字'  data-bs-toggle='tooltip' data-bs-placement='bottom' title=" + personInfo.name + " class='name'></td>").html(item.enname));
        row.append($("<td data-th='性別'></td>").html('<span>' + personInfo.strsex + '</span>'));
        row.append($("<td data-th='手機' class='phone' data-bs-container='body' data-bs-toggle='popover' data-bs-placement='bottom' data-bs-content=" + personInfo.phone + "></td>").html(item.phone));
        row.append($("<td data-th='電子信箱'></td>").html(item.email));
        row.append($("<td data-th='修改'></td>").html('<i id="modifybutton' + item.s_sn + '" class="fas fa-edit modifybutton"></i>'));
        row.append($("<td data-th='刪除'></td>").html('<i id="deletebutton' + item.s_sn + '" class="fas fa-trash-alt deletebutton"  data-bs-toggle="modal" data-bs-target="#dialog-deleteconfirm"></i>'));
        $("#cardtable").append(row);


        $("#modifybutton" + item.s_sn).click(() => {
            console.log('aa');
            var modifyModalEl = document.getElementById('dialog-modifyconfirm');
            // 取消時清除錯誤提示
            modifyModalEl.addEventListener('hidden.bs.modal', function (event) {
                $(this).find('input.error').next('label').remove();
            });

            modifyModal = new bootstrap.Modal(modifyModalEl, {});
            modifyModal.show();
            showModifyModal(item);
        })


        $("#deletebutton" + item.s_sn).click(() => {
            var deleteModalEl = document.getElementById('dialog-deleteconfirm');
            // 取消時清除錯誤提示
            deleteModalEl.addEventListener('hidden.bs.modal', function (event) {
                $("#dialog-deleteconfirm .confirm").unbind();
            });
            showDeleteModal(item);
        })


        // hover十字線上的列/欄都要變色
        $('tbody').bind('mouseover', () => {
            var index = event.target.cellIndex;
            var hoverItems = $(event.target).parent('tr').parents('tbody').children('tr');
            $('tbody tr td').css('background-color', 'unset');
            hoverItems.get().forEach((item) => {
                $(item).find('td').eq(index).css('background-color', 'rgba(0, 0, 0, 0.075)');
            })
        })

        $('tbody').bind('mouseleave', () => {
            var index = event.target.cellIndex;
            var hoverItems = $(event.target).parent('tr').parents('tbody').children('tr');
            hoverItems.get().forEach(function (item) {
                $(item).find('td').eq(index).css('background-color', 'rgba(0, 0, 0, 0)');
            })
        })
    });

    // Enable popovers everywhere
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
}

// 格式化資料
function formatPersonInfo(info) {
    var formatInfo = {
        strsex: "",
        name: "",
        phome: ""
    }

    info.sex == 0 ? formatInfo.strsex = '男' : formatInfo.strsex = '女';
    formatInfo.name = `[${formatInfo.strsex}]${info.cnname}(${info.enname})`;
    formatInfo.phone = info.phone.substring(0, 4) + '-' + info.phone.substring(4, 7) + '-' + info.phone.substring(7, 10);
    return formatInfo;
}

// 新增資料彈窗
function showAddModal() {
    $("#dialog-addconfirm .confirm").bind('click', (e) => {

        var data = {
            cnname: $("#addcnname").val(),
            enname: $("#addenname").val(),
            sex: $('input:radio:checked[name="addsex"]').val(),
            phone: $("#addphone").val(),
            email: $("#addemail").val()
        }

        getPersonInfo('post', '/user/userInfo', data);
        resetForm('addform');
    });


    $("#addResetForm").click((e) => {
        resetForm('addform');
    });
}

// 搜尋資料彈窗
function showSearchModal() {
    $("#dialog-searchconfirm .confirm").bind('click', (e) => {

        var data = {
            cnname: 123,//$("#secnname").val(),
            enname: 123//$("#seenname").val(),
            // sex: $('input:radio:checked[name="sesex"]').val(),
            // phone: $("#sephone").val(),
            // email: $("#seemail").val(),
        }

        getPersonInfo('get', '/user/userInfo/searchdata', data);
        resetForm('searchform');
    });

    $("#searcResetForm").click(() => {
        resetForm('searchform');
    });
}


// 修改資料彈窗
function showModifyModal(item) {

    $("#mocnname").val(item.cnname);
    $("#moenname").val(item.enname);
    $("#mophone").val(item.phone);
    $("#moemail").val(item.email);

    if (item.sex == 0) {
        $("#modifyman").prop("checked", true);
        $("#modifywoman").prop("checked", false);
    }
    else {
        $("#modifyman").prop("checked", false);
        $("#modifywoman").prop("checked", true);
    }

    $("#modifyResetform").click(() => {
        resetForm('modifyform');
        $("#modifyform").submit();
    });
}

// 刪除資料彈窗
function showDeleteModal(item) {
    $("#dialog-deleteconfirm .modal-body .name").text(item.cnname + '(' + item.enname + ')');
    $("#dialog-deleteconfirm .confirm").bind('click', () => {
        var deleteid = item.s_sn;

        $('#' + deleteid).fadeOut(1000, () => {
            getPersonInfo('delete', '/user/userInfo', deleteid);
        });
    });
}


// 獲取人員資料
function getPersonInfo(type, url, data = null) {
    $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: 'json',
        success: function (data) {
            refreshTable(data);
        },
        error: function () {
            alert('出錯了!!!');
        }
    })
}

// 重新填寫表單
function resetForm(id) {
    $("#" + id)[0].reset();
}


// /**
//  * 
//  * @param string
//  *          url 呼叫controller的url
//  * @param string
//  *          datatype 資料傳回格式
//  * @uses refreshTable 利用ajax傳回資料更新Table
//  */
// function AjaxObject(url, datatype) {
//     this.url = url;
//     this.datatype = datatype;
// }
// AjaxObject.prototype.cnname = '';
// AjaxObject.prototype.enname = '';
// AjaxObject.prototype.sex = '';
// AjaxObject.prototype.id = 0;
// AjaxObject.prototype.alertt = function () {
//     alert("Alert:");
// }
// AjaxObject.prototype.getall = function () {
//     response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0","phone":"0945632158","email":"aa@123.com"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0","phone":"0945741587","email":"bb@123.com"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","sex":"0","phone":"0945486221","email":"cc@123.com"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","sex":"1","phone":"0945755002","email":"dd@123.com"}]';
//     refreshTable(JSON.parse(response));
// }
// AjaxObject.prototype.add = function () {
//     response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0","phone":"0945632158","email":"aa@123.com"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0","phone":"0945741587","email":"bb@123.com"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","sex":"0","phone":"0945486221","email":"cc@123.com"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","sex":"1","phone":"0945755002","email":"dd@123.com"},{"s_sn":"52","cnname":"新增帳號","enname":"NewAccount","sex":"1","phone":"0945784124","email":"ee@123.com"}]';
//     refreshTable(JSON.parse(response));
// }
// AjaxObject.prototype.modify = function () {
//     response = '[{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0","phone":"0945741587","email":"bb@123.com"}]';
//     refreshTable(JSON.parse(response));
// }
// AjaxObject.prototype.modify_get = function () {
//     response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0","phone":"0945632158","email":"aa@123.com"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","sex":"0"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","sex":"1"}]';
// }
// AjaxObject.prototype.search = function () {
//     response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0","phone":"0945632158","email":"aa@123.com"}]';
//     refreshTable(JSON.parse(response));
// }
// AjaxObject.prototype.delete = function () {
//     response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0","phone":"0945632158","email":"aa@123.com"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0","phone":"0945741587","email":"bb@123.com"}]';
//     refreshTable(JSON.parse(response));
// }