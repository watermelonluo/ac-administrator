
const addr=true;
$(function () {

    /*   loading gif图加载   */
    var loadingCon=document.getElementById('loadingCon');
    var loadingHeight=parseInt(getComputedStyle(loadingCon).height);
    loadingCon.style.top=window.screen.height/2-loadingHeight/2-150+'px';


    /*   开关按钮   */
    var toggleBtn=document.querySelector('.chooseBtn');
    var switchText=document.querySelector('.switchText');
    var remoteManageSave=document.getElementById('saveBtn');
    var remoteManageReset=document.getElementById('resetBtn');
    var switchStatus=null;

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


    /*   下拉表单   */
    $('.custom-select').change(function () {
        if ($(this).get(0).selectedIndex == 0) {
            $('#commonNodeCon').show();
        }
        if ($(this).get(0).selectedIndex == 1) {
            $('#commonNodeCon').hide();
        }
    });


    /*   首次进入页面ajax请求   */
    $.ajax({
        type: "GET",
        url: addr ? '../static/json/remoteManage.json' : "./Mobisys-RemoteManage?action=data",
        timeout: 10000,
        dataType: "json",
        async: true,
        success: function (data) {
            $('#loadingCon').fadeOut();
            renderRemoteManagePage(data);
        }
    });


    /*   页面渲染   */
    function renderRemoteManagePage(data) {

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

        if (data.type == 'edge') {
            $('.custom-select').val('edge');
            $('#commonNodeCon').show();
        }

        if (data.type == 'supernode') {
            $('.custom-select').val('supernode');
            $('#commonNodeCon').hide();
        }

        data.port ? $('#port').val(data.port) : $('#port').val('');
        data.supernode ? $('#super').val(data.supernode) : $('#super').val('');
        data.ipaddr ? $('#ipaddr').val(data.ipaddr) : $('#ipaddr').val('');
        data.community ? $('#user').val(data.community) : $('#user').val('');
        data.key ? $('#pswd').val(data.key) : $('#pswd').val('');

    }


    /*   获取页面数据   */
    function getRemoteManageData() {
        var curData={
            enable: switchStatus,
            type: $('.custom-select option:selected').val(),
            ipaddr: $('#ipaddr').val(),
            supernode: $('#super').val(),
            port: $('#port').val(),
            community: $('#user').val(),
            key: $('#pswd').val()
        };

        return curData
    }


    /*   提交页面数据   */
    remoteManageSave.addEventListener('click',function () {
        $('#loadingCon').fadeIn();
        $.ajax({
            type: "POST",
            url: "./Mobisys-RemoteManage",
            contentType: "application/json; charset=utf-8",
            timeout: 10000,
            data: JSON.stringify(getRemoteManageData()),
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


    /*   刷新页面   */
    remoteManageReset.addEventListener('click',function () {
        $('#loadingCon').fadeIn();
        $.ajax({
            type: "GET",
            url: addr ? '../static/json/remoteManage.json' : "./Mobisys-RemoteManage?action=data",
            timeout: 10000,
            dataType: "json",
            async: true,
            success: function (data) {
                $('#loadingCon').fadeOut();
                renderRemoteManagePage(data);
            }
        });
    })
});