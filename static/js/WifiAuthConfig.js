;
const addr=true;
const ipAddr=window.location.href.split(':');
$(function () {

    /*   弹窗   */
    $("#close").click(function () {
        $('#myModal').fadeOut();
    });
    $("#confirm").click(function () {
        $('#myModal').fadeOut();
    });

    var authConfigStatus=null; // 根据开关状态来赋值
    var toggleBtn=document.querySelector('.chooseBtn');
    var switchText=document.querySelector('.switchText');

    /*  首次进入页面认证开关请求  */
    $.ajax({
        type: "GET",
        url: addr ? '../static/json/WifiAuthConfig3.json' : './Mobisys-WifiAuthConfig?action=switch',
        timeout: 10000,
        dataType: "json",
        async: true,
        success: function (data) {
            console.log(data);
            if (data) {
                if (data.enable == '0') {
                    toggleBtn.checked=false;
                    authConfigStatus='0';
                    switchText.innerHTML='关闭';
                    switchText.style.color='#9A9A9A';
                } else {
                    toggleBtn.checked=true;
                    authConfigStatus='1';
                    switchText.innerHTML='开启';
                    switchText.style.color='#67AEF5';
                }
            }
        }
    });

    /*    点击开关   */
    toggleBtn.onclick=function () {
            if (this.checked) {
                authConfigStatus='1';
            } else {
                authConfigStatus='0';
            }
            authSwitch();
    };
    function getAuthSwitchData() {
        var curData={
            enable: authConfigStatus
        };
        return curData
    }
    function authSwitch() {
        console.log(getAuthSwitchData());
        $.ajax({
            type: "POST",
            url: "./Mobisys-WifiAuthConfigSwitch",
            data: JSON.stringify(getAuthSwitchData()),
            timeout: 10000,
            contentType: "application/json; charset=utf-8",
            async: true,
            dataType:'json',
            success: function (result) {
                if (result.status == '1') {
                    if (authConfigStatus == '1') {
                        toggleBtn.checked=true;
                        switchText.innerHTML='开启';
                        switchText.style.color='#67AEF5';
                    } else {
                        toggleBtn.checked=false;
                        switchText.innerHTML='关闭';
                        switchText.style.color='#9A9A9A';
                    }

                } else {
                    if (authConfigStatus == '1') {
                        toggleBtn.checked=false;
                        switchText.innerHTML='关闭';
                        switchText.style.color='#9A9A9A';
                        authConfigStatus='0';
                    } else {
                        toggleBtn.checked=true;
                        switchText.innerHTML='开启';
                        switchText.style.color='#67AEF5';
                        authConfigStatus='1';
                    }
                }
            },
            error: function () {
                if (authConfigStatus == '1') {
                    toggleBtn.checked=false;
                    switchText.innerHTML='关闭';
                    switchText.style.color='#9A9A9A';
                    authConfigStatus='0';
                } else {
                    toggleBtn.checked=true;
                    switchText.innerHTML='开启';
                    switchText.style.color='#67AEF5';
                    authConfigStatus='1';
                }
            }
        })
    }

    /*   首次进入页面填充页面数据   */
    $.ajax({
        type: "GET",
        url: addr ? '../static/json/WifiAuthConfig2.json' : './Mobisys-WifiAuthConfig?action=data',
        timeout: 10000,
        dataType: "json",
        async: true,
        success: function (data) {
            $('#loadingCon').fadeOut();
            data.title ? $('#title').html(data.title) : $('#title').html('');
            data.title ? $('#titleVal').val(data.title) : $('#titleVal').val('');
            data.head ? $('#leftCon h3').html(data.head) : $('#leftCon h3').html('');
            data.head ? $('#headVal').val(data.head) : $('#headVal').val('');
            data.text ? $('#setText').html(data.text) : $('#setText').html('');
            data.text ? $('#contentVal').val(data.text) : $('#contentVal').val('');
            //data.imgurl ? $('#img img').attr('src','http:'+ipAddr[1]+':80/'+data.imgurl) : $('#img img').attr('src','/static/images/test2.png');
            data.imgurl ? $('#img img').attr('src',data.imgurl) : $('#img img').attr('src','/static/images/test2.png');
            console.log('http:'+ipAddr[1]+':80/'+data.imgurl);

        }
    });

    function getTextData() {
        if (!$('#titleVal').val()) {
            var titleVal=$('#title').html();
            $('#titleVal').val(titleVal)
        }
        if (!$('#headVal').val()) {
            var headVal=$('#leftCon h3').html();
            $('#headVal').val(headVal)
        }
        if (!$('#contentVal').val()) {
            var headVal=$('#setText').html();
            $('#contentVal').val(headVal)
        }
        const curData={
            title: $('#titleVal').val(),
            head: $('#headVal').val(),
            text: $('#contentVal').val()
        };
        return curData
    }

    $('#submit').click(function () {
        if (!$('#titleVal').val() && !$('#headVal').val() && !$('#contentVal').val()) {
            $('#myModal').show();
            $('#textCon').html('您没有输入任何内容,无需提交');
            return;
        }
        console.log(getTextData());

        $('#loadingCon').fadeIn();
        $.ajax({
            type: "POST",
            url: "./Mobisys-WifiAuthConfig",
            data: JSON.stringify(getTextData()),
            timeout: 10000,
            contentType: "application/json; charset=utf-8",
            async: true,
            dataType:'json',
            success: function (result) {
                $('#loadingCon').fadeOut();
                if (result.status == '1') {
                    $('#myModal').show();
                    $('#textCon').html('提交文字成功,文字部分已更新!');
                    refreshText();
                } else {
                    $('#myModal').show();
                    $('#textCon').html('提交文字异常!');
                }
            },
            error: function () {
                $('#loadingCon').fadeOut();
                $('#myModal').show();
                $('#textCon').html('提交文字失败!');
            }
        })
    });

    function refreshText() {
        $('#titleVal').val('');
        $('#headVal').val('');
        $('#contentVal').val('');
        $('#loadingCon').fadeIn();
        $.ajax({
            type: "GET",
            url: addr ? '../static/json/WifiAuthConfig2.json' : './Mobisys-WifiAuthConfig?action=data',
            timeout: 10000,
            dataType: "json",
            async: true,
            success: function (data) {
                $('#loadingCon').fadeOut();
                console.log(data);
                data.title ? $('#title').html(data.title) : $('#title').html('--');
                data.head ? $('#leftCon h3').html(data.head) : $('#leftCon h3').html('--');
                data.text ? $('#setText').html(data.text) : $('#setText').html('--');
            }
        });
    }

    $('#uploadSubmit').click(function () {
        var imgFile = $("#picture").prop("files")[0];
        if (typeof (imgFile) == "undefined" || imgFile.size <= 0) {
            $('#myModal').show();
            $('#textCon').html('没有选择图片');
            return;
        }
        $('#loadingCon').fadeIn();

        var fd=new FormData();
        //console.log(imgFile);
        fd.append('photo',imgFile);
        console.log(fd.get('photo'));
        $.ajax({
            url: "./Mobisys-WifiAuthConfigImg",
            data: fd,
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
                    $('#textCon').html('图片上传成功,图片区域已更新!');
                    refreshPicture()
                } else {
                    $('#myModal').show();
                    $('#textCon').html('图片异常!');
                }
            },
            error: function () {
                $('#loadingCon').fadeOut();
                $('#myModal').show();
                $('#textCon').html('图片上传失败!');
            }
        })
    });

    function refreshPicture() {
        $('#loadingCon').fadeIn();
        $.ajax({
            type: "GET",
            url: addr ? '../static/json/WifiAuthConfig.json' : './Mobisys-WifiAuthConfig?action=data',
            timeout: 10000,
            dataType: "json",
            async: true,
            success: function (data) {
                $('#loadingCon').fadeOut();
                data.imgurl ? $('#img img').attr('src','http:'+ipAddr[1]+':80/'+data.imgurl) : $('#img img').attr('src','/static/images/test2.png');
            }
        });
    }
});