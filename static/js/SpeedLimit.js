;
const addr=true;
$(function () {

    /*   开关按钮   */
    var toggleBtns=document.querySelectorAll('.chooseBtn');
    var allBroadbandStatus=null,userBroadbandStatus=null;
    var allSwitchText=document.getElementById('allSwitchText');
    var userSwitchText=document.getElementById('userSwitchText');
    toggleBtns[0].onclick=function () {
        if (this.checked) {
            allBroadbandStatus='1';
            allSwitchText.innerHTML='开启';
            allSwitchText.style.color='#67AEF5';
        } else {
            allBroadbandStatus='0';
            allSwitchText.innerHTML='关闭';
            allSwitchText.style.color='#9A9A9A';
        }
    };
    toggleBtns[1].onclick=function () {
        if (this.checked) {
            userBroadbandStatus='1';
            userSwitchText.innerHTML='开启';
            userSwitchText.style.color='#67AEF5';
        } else {
            userBroadbandStatus='0';
            userSwitchText.innerHTML='关闭';
            userSwitchText.style.color='#9A9A9A';
        }
    };


    /*   弹窗   */
    $("#close").click(function () {
        $('#myModal').fadeOut();
    });
    $("#confirm").click(function () {
        $('#myModal').fadeOut();
    });


    $('#download').change(function () {
        if (Number($(this).val()) <0 || isNaN(Number($(this).val()))) {
            $('.tips').eq(0).show();
            return;
        }
        $('.tips').eq(0).hide();
    });
    $('#upload').change(function () {
        if (Number($(this).val()) <0 || isNaN(Number($(this).val()))) {
            $('.tips').eq(1).show();
            return;
        }
        $('.tips').eq(1).hide();
    });
    $('#userDownload').change(function () {
        if (Number($(this).val()) <0 || isNaN(Number($(this).val()))) {
            $('.tips').eq(2).show();
            return;
        }
        $('.tips').eq(2).hide();
    });
    $('#userUpload').change(function () {
        if (Number($(this).val()) <0 || isNaN(Number($(this).val()))) {
            $('.tips').eq(3).show();
            return;
        }
        $('.tips').eq(3).hide();
    });


    /*  首次进入页面请求  */
    $.ajax({
        type: "GET",
        url: addr ? '../static/json/speedlimit.json' : "./Mobisys-SpeedLimit?action=data",
        timeout: 10000,
        dataType: "json",
        async: true,
        success: function (data) {
            $('#loadingCon').fadeOut();
            renderSpeedLimitPage(data);
        }
    });

    function renderSpeedLimitPage(data) {
        if (data.wanenable == '1') {
            allBroadbandStatus='1';
            toggleBtns[0].checked=true;
            allSwitchText.innerHTML='开启';
            allSwitchText.style.color='#67AEF5';
        } else {
            allBroadbandStatus='0';
            toggleBtns[0].checked=false;
            allSwitchText.innerHTML='关闭';
            allSwitchText.style.color='#9A9A9A';
        }

        if (data.lanenable == '1') {
            userBroadbandStatus='1';
            toggleBtns[1].checked=true;
            userSwitchText.innerHTML='开启';
            userSwitchText.style.color='#67AEF5';
        } else {
            userBroadbandStatus='0';
            toggleBtns[1].checked=false;
            userSwitchText.innerHTML='关闭';
            userSwitchText.style.color='#9A9A9A';
        }
        data.wandownload ? $('#download').val(data.wandownload) : $('#download').val('');
        data.wanupload ? $('#upload').val(data.wanupload) : $('#upload').val('');
        data.landownload ? $('#userDownload').val(data.landownload) : $('#userDownload').val('');
        data.lanupload ? $('#userUpload').val(data.lanupload) : $('#userUpload').val('');
    }

    /*  获取页面数据 */
    function getSpeedLimitData() {
        var curData={
            wanenable: allBroadbandStatus,
            wandownload: $('#download').val(),
            wanupload: $('#upload').val(),
            lanenable: userBroadbandStatus,
            landownload: $('#userDownload').val(),
            lanupload: $('#userUpload').val()
        };
        return curData
    }


    var speedLimitSave=document.getElementById('saveBtn');
    var speedLimitReset=document.getElementById('resetBtn');


    /* 提交保存 */
    speedLimitSave.addEventListener('click',function () {
        var tips=document.querySelectorAll('.tips');
        for (let i=0;i<tips.length;i++) {
            if (tips[i].style.display == 'block' || tips[i].style.display == 'inline' || tips[i].style.display == 'inline-block') {
                $('#myModal').show();
                $('#textCon').html('请先检查一下输入内容是否有误');
                return;
            }
        }

        $('#loadingCon').fadeIn();
        $.ajax({
            type: "POST",
            url: "./Mobisys-SpeedLimit",
            contentType: "application/json; charset=utf-8",
            timeout: 10000,
            data: JSON.stringify(getSpeedLimitData()),
            dataType: "json",
            async: true,
            success: function (result) {
                $('#loadingCon').fadeOut();
                if (result.status == '1') {
                    $('#myModal').show();
                    $('#textCon').html('保存成功!');
                }
            },
            error: function () {
                $('#loadingCon').fadeOut();
                $('#myModal').show();
                $('#textCon').html('保存失败!');
            }
        });
    });

    /*  刷新页面  */
    speedLimitReset.addEventListener('click',function () {
        $('#loadingCon').fadeIn();
        $.ajax({
            type: "GET",
            url: addr ? '../static/json/speedlimit.json' : "./Mobisys-SpeedLimit?action=data",
            timeout: 10000,
            dataType: "json",
            async: true,
            success: function (data) {
                $('#loadingCon').fadeOut();
                renderSpeedLimitPage(data);
            }
        });
    })
});