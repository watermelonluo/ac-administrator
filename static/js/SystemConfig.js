
const addr=true;
$(function () {

    /*   弹窗   */
    $("#close").click(function () {
        $('#cancel').hide();
        $('#confirm2').hide();
        $('#confirm').show();
        $('#myModal').fadeOut();
    });
    $("#confirm").click(function () {
        $('#myModal').fadeOut();
    });
    $('#cancel').click(function () {
        $('#confirm2').hide();
        $('#confirm').show();
        $(this).hide();
        $('#myModal').fadeOut();

    });


    /*   首次进入页面ajax请求   */
    $.ajax({
        type: "GET",
        url: addr ? '../static/json/systemconfig.json' : './Mobisys-SystemPasswd?action=data',
        timeout: 10000,
        dataType: "json",
        async: true,
        success: function (data) {
            $('#loadingCon').fadeOut();

            data.username ? $('#userName').val(data.username) : $('#userName').val('');
            data.oldpassword ? $('#oldPwd').val(data.oldpassword) : $('#oldPwd').val('');
            data.newpassword ? $('#newPwd').val(data.newpassword) : $('#newPwd').val('');
        }
    });


    /*   系统重启   */
    $('#reboot').click(function () {
        $('#myModal').show();
        $('#confirm2').show();
        $('#cancel').show();
        $('#confirm').hide();
        $('#textCon').html('确定重启吗?');
        $('#confirm2').click(function () {
            $(this).hide();
            $('#cancel').hide();
            $('#myModal').hide();
            $('#loadingCon').fadeIn();
            $.ajax({
                type: "GET",
                url: './Mobisys-SystemTool?action=reboot',
                timeout: 10000,
                dataType:'json',
                async: true,
                success: function (result) {
                    $('#loadingCon').fadeOut();
                    if (result.status == '1') {
                        $('#loadingCon').fadeIn();
                        $('#myModal').show();
                        $('#confirm2').hide();
                        $('#cancel').hide();
                        $('#confirm').hide();
                        $('#textCon').html('正在重启,请耐心等待');
                        setTimeout(function () {
                            setInterval(function () {
                                $.ajax({
                                    type: "GET",
                                    url: 'http://'+result.ip+':8080',
                                    contentType: "application/text; charset=utf-8",
                                    timeout: 5000,
                                    //dataType: "json",
                                    async: true,
                                    success: function () {
                                        $('#loadingCon').fadeOut();
                                        $('#confirm').show();
                                        $('#myModal').hide();
                                        parent.window.ipChange(result.ip);
                                    }
                                });
                            },5000)
                        },30000);
                    } else {
                        $('#myModal').show();
                        $('#confirm').show();
                        $('#textCon').html('重启失败');
                    }
                }
            });
        })
    });


    /*   系统重置   */
    $('#reset').click(function () {
        $('#myModal').show();
        $('#confirm2').show();
        $('#cancel').show();
        $('#confirm').hide();
        $('#textCon').html('确定重置吗?');
        $('#confirm2').click(function () {
            $(this).hide();
            $('#cancel').hide();
            $('#confirm').hide();
            $('#myModal').hide();
            $('#loadingCon').fadeIn();
            $.ajax({
                type: "GET",
                url: './Mobisys-SystemTool?action=reset',
                timeout: 10000,
                dataType:'json',
                async: true,
                success: function (result) {
                    $('#loadingCon').fadeOut();
                    if (result.status == '1') {
                        $('#loadingCon').fadeIn();
                        $('#myModal').show();
                        $('#cancel').hide();
                        $('#confirm').hide();
                        $('#textCon').html('正在重置,请耐心等待');

                        setTimeout(function () {
                            setInterval(function () {
                                $.ajax({
                                    type: "GET",
                                    url: 'http://'+result.ip+':8080',
                                    contentType: "application/text; charset=utf-8",
                                    timeout: 5000,
                                    //dataType: "json",
                                    async: true,
                                    success: function () {
                                        $('#loadingCon').fadeOut();
                                        $('#confirm').show();
                                        $('#myModal').hide();
                                        parent.window.ipChange(result.ip);
                                    }
                                });
                            },5000)
                        },30000);
                    } else {
                        $('#myModal').show();
                        $('#confirm').show();
                        $('#textCon').html('重置失败');
                    }
                }
            });
        })
    });


    /*   文件上传与系统升级   */
    $("#uploadBtn").click(function () {
        var fileObj = $("#FileUpload").prop("files")[0];// js 获取文件对象

        if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
            $('#myModal').show();
            $('#cancel').hide();
            $('#confirm2').hide();
            $('#confirm').show();
            $('#textCon').html('请选择文件');
            return;
        }
        console.log(fileObj);
        $('#loadingCon').fadeIn();

        var formData = new FormData();
        formData.append('firmware',fileObj);
        $.ajax({
            url: "./Mobisys-SystemUpgrade",
            data: formData,
            type: "POST",
            timeout: 60000,
            cache: false,//上传文件无需缓存
            processData: false,//用于对data参数进行序列化处理 这里必须false
            contentType: false, //必须
            dataType:'json',
            success: function (result) {
                $('#loadingCon').fadeOut();

                if (result.status == '1') {
                    $('#myModal').show();
                    $('#confirm2').show();
                    $('#cancel').show();
                    $('#confirm').hide();
                    $('#textCon').html('文件上传成功,是否升级?');
                    $('#confirm2').click(function () {
                        confirmUpdate();
                        $(this).hide();
                        $('#cancel').hide();
                    })
                } else {
                    $('#myModal').show();
                    $('#confirm').show();
                    $('#textCon').html('文件异常');
                }
            },
            error: function () {
                $('#loadingCon').fadeOut();
                $('#myModal').show();
                $('#confirm2').hide();
                $('#cancel').hide();
                $('#confirm').show();
                $('#textCon').html('文件上传失败!');
            }
        })
    });


    /*   保留配置勾选框   */
    var isCheck=document.getElementById('isCheck');
    var confVal=null;

    /*   确定升级   */
    function confirmUpdate() {
        if (isCheck.checked) {
            confVal=1;
        } else {
            confVal=0;
        }
        var updateAddr='./Mobisys-SystemUpgrade?action=apply&conf='+confVal;
        $('#loadingCon').fadeIn();
        $.ajax({
            type: "GET",
            url: updateAddr,
            timeout: 10000,
            async: true,
            dataType:'json',
            success: function (result) {
                $('#loadingCon').fadeOut();

                if (result.status == '1') {
                    $('#loadingCon').fadeIn();
                    $('#myModal').show();

                    $('#cancel').hide();
                    $('#confirm').hide();
                    $('#textCon').html('正在升级,请耐心等待');
                    setTimeout(function () {
                        setInterval(function () {
                            $.ajax({
                                type: "GET",
                                url: 'http://'+result.ip+':8080',
                                timeout: 5000,
                                contentType: "application/text; charset=utf-8",
                                //dataType: "json",
                                async: true,
                                success: function () {
                                    $('#confirm').show();
                                    $('#myModal').hide();
                                    $('#loadingCon').fadeOut();
                                    parent.window.ipChange(result.ip);
                                }
                            });
                        },5000)
                    },30000);
                } else {
                    $('#myModal').show();
                    $('#confirm').show();
                    $('#textCon').html('升级失败');
                }
            }
        });
    }

    /*   用户名与密码提交   */
    $('#saveBtn').click(function () {
        /*if (!$('#userName').val()) {
            $('#myModal').show();
            $('#textCon').html('用户名不能为空');
            $('#confirm2').hide();
            $('#cancel').hide();
            $('#confirm').show();
            return;
        }*/
        if (!$('#oldPwd').val()) {
            $('#myModal').show();
            $('#textCon').html('旧密码不能为空');
            $('#confirm2').hide();
            $('#cancel').hide();
            $('#confirm').show();
            return;
        }
        if (!$('#newPwd').val()) {
            $('#myModal').show();
            $('#textCon').html('新密码不能为空');
            $('#confirm2').hide();
            $('#cancel').hide();
            $('#confirm').show();
            return;
        }
        if ($('#newPwd').val() == $('#oldPwd').val()) {
            $('#myModal').show();
            $('#textCon').html('新密码与旧密码不能相同');
            $('#confirm2').hide();
            $('#cancel').hide();
            $('#confirm').show();
            return;
        }
        $('#myModal').show();
        $('#textCon').html('确定修改吗?');
        $('#confirm2').show();
        $('#cancel').show();
        $('#confirm').hide();
        $('#confirm2').click(function () {
            $('#confirm').show();
            $('#cancel').hide();
            $(this).hide();
            $('#myModal').hide();

            $('#loadingCon').fadeIn();
            $.ajax({
                type: "POST",
                url: "./Mobisys-SystemPasswd",
                data: JSON.stringify(userPwd()),
                timeout: 10000,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (result) {
                    $('#loadingCon').fadeOut();

                    if (result.status == '1') {
                        $('#myModal').show();
                        $('#textCon').html('保存成功');
                        parent.window.logout();
                        return;
                    }
                    if (result.status == '0') {
                        $('#myModal').show();
                        $('#textCon').html('密码不正确');
                    }
                },
                error: function () {
                    $('#loadingCon').fadeOut();
                    $('#myModal').show();
                    $('#textCon').html('保存失败');
                }
            });
        })
    });

    /*   获取用户名与密码数据   */
    function userPwd() {
        var userPassword={
            username: $('#userName').val(),
            oldpassword: $('#oldPwd').val(),
            newpassword: $('#newPwd').val()
        };
        return userPassword;
    }

    /*   刷新用户名与密码   */
    $('#resetBtn').click(function () {
        $('#loadingCon').fadeIn();
        $.ajax({
            type: "GET",
            url: './Mobisys-SystemPasswd?action=data',
            timeout: 10000,
            dataType: "json",
            async: true,
            success: function (data) {
                $('#loadingCon').fadeOut();
                data.username ? $('#userName').val(data.username) : $('#userName').val('');
                data.oldpassword ? $('#oldPwd').val(data.oldpassword) : $('#oldPwd').val('');
                data.newpassword ? $('#newPwd').val(data.newpassword) : $('#newPwd').val('');
            }
        });
    })
});

