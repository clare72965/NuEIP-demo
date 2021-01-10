
$(document).ready(function () {
    jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
    });

    validate();
});


function validate() {

    $("#modifyform").validate({
        rules: {
            cnname: {
                required: true
            },
            phone: {
                required: true,
                minlength: 10,
                digits: true
            },
            email: {
                required: true,
                email: true
            }
        },
        //錯誤提示
        messages: {
            cnname: {
                required: "必填"
            },
            phone: {
                required: "必填",
                minlength: "需輸入10碼數字",
                digits: "需輸入10碼數字"
            },
            email: {
                required: "必填",
                email: "email格式錯誤"
            }
        },
        submitHandler: function () {
            var data = {
                cnname: $("#mocnname").val(),
                enname: $("#moenname").val(),
                sex: $('input:radio:checked[name="mosex"]').val(),
                phone: $("#mophone").val(),
                email: $("#moemail").val()
            }
    
            getPersonInfo('put', '/user/userInfo', data);
            modifyModal.hide();
        }
    });
}