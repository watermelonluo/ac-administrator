
const addr=true;
$(function () {

    /*   loading gif图加载   */
    var loadingCon=document.getElementById('loadingCon');
    var loadingHeight=parseInt(getComputedStyle(loadingCon).height);
    loadingCon.style.top=window.screen.height/2-loadingHeight/2-150+'px';


    /*   开关   */
    var toggleBtn=document.querySelector('.chooseBtn');
    var switchText=document.querySelector('.switchText');
    var vpnSetSave=document.getElementById('saveBtn');
    var vpnSetReset=document.getElementById('resetBtn');

    var switchStatus=null;
    var modeListArr=[];
    toggleBtn.onclick=function () {
        if (this.checked) {
            switchStatus='1';
            switchText.innerHTML='开启';
            switchText.style.color='#67AEF5';
        } else {
            switchStatus='0';
            switchText.innerHTML='关闭';
            switchText.style.color='#9A9A9A';
        }
    };


    /*   弹窗   */
    $("#close").click(function () {
        $('#myModal').fadeOut();
    });
    $("#confirm").click(function () {
        $('#myModal').fadeOut();
    });


    /*   首次进入页面ajax请求   */
    $.ajax({
        type: "GET",
        url: addr ? '../static/json/vpnConfig.json' : "./Mobisys-VpnConfig?action=data",
        dataType: "json",
        async: true,
        success: function (data) {
            $('#loadingCon').fadeOut();
            renderVPNSetPage(data);
        }
    });


    /*  渲染页面  */
    function renderVPNSetPage(data) {

        if (data.enable == '1') {
            switchStatus='1';
            toggleBtn.checked=true;
            switchText.innerHTML='开启';
            switchText.style.color='#67AEF5';
        } else {
            switchStatus='0';
            toggleBtn.checked=false;
            switchText.innerHTML='关闭';
            switchText.style.color='#9A9A9A';
        }

        $('#modeList').empty();
        if (data.modelist) {
            $.each(data.modelist, function (key, value) {
                $("#modeList")
                    .append($("<option></option>")
                        .attr("value", key)
                        .text(value)).val(data.modelist.indexOf(data.mode));
            });
        }

        $('#modeList option').each(function () {
            modeListArr.push($(this).text())
        });

        data.server ? $('#service').val(data.server) : $('#service').val('');
        data.username ? $('#userName').val(data.username) : $('#userName').val('');
        data.password ? $('#pwd').val(data.password) : $('#pwd').val('');
    }


    /*  获取页面数据  */
    function getVPNSetData() {

        var curData={
            enable: switchStatus,
            modelist: modeListArr,
            mode: $('#modeList option:selected').text(),
            server: $('#server').val(),
            username: $('#userName').val(),
            password: $('#pwd').val(),
        };
        return curData
    }


    /*  保存数据提交  */
    vpnSetSave.addEventListener('click',function () {
        console.log(getVPNSetData());
        $('#loadingCon').fadeIn();
        $.ajax({
            type: "POST",
            url: "./Mobisys-VpnConfig",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(getVPNSetData()),
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
    vpnSetReset.addEventListener('click',function () {
        $('#loadingCon').fadeIn();
        $.ajax({
            type: "GET",
            url: addr ? '../static/json/vpnConfig.json' : "./Mobisys-VpnConfig?action=data",
            dataType: "json",
            async: true,
            success: function (data) {
                $('#loadingCon').fadeOut();
                renderVPNSetPage(data);
            }
        });
    })
});