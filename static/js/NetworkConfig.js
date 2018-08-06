;
var thirdSelectOptions=null;
const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
var ipOld=null;
const addr=true;


/*   loading gif图加载   */
const loadingCon=document.getElementById('loadingCon');
const loadingHeight=parseInt(getComputedStyle(loadingCon).height);
loadingCon.style.top=window.screen.height/2-loadingHeight/2-150+'px';


/*   弹窗   */
$("#close").click(function () {
    $('#myModal').fadeOut();
});
$("#confirm").click(function () {
    $('#myModal').fadeOut();
});

$(function(){

    /*   首次进入页面ajax请求   */
    $.ajax({
        type: "GET",
        url: addr ? '../static/json/networkConfig3.json' : "./Mobisys-NetworkConfig?action=data",
        timeout:10000,
        dataType: "json",
        async: true,
        success: function (data) {
            $('#loadingCon').fadeOut();
            renderPage(data)
        }

    });


    /*  页面渲染  */
    function renderPage(data) {

        /*   lan设置渲染   */
        data.lanset.lanvlanid ? $('#LanSet .form-control').eq(0).val(data.lanset.lanvlanid) : $('#LanSet .form-control').eq(0).val('');
        data.lanset.ipaddr ? $('#LanSet .form-control').eq(1).val(data.lanset.ipaddr) : $('#LanSet .form-control').eq(1).val('');
        data.lanset.netmask ? $('#LanSet .form-control').eq(2).val(data.lanset.netmask) : $('#LanSet .form-control').eq(2).val('');
        data.lanset.gateway ? $('#LanSet .form-control').eq(3).val(data.lanset.gateway) : $('#LanSet .form-control').eq(3).val('');
        data.lanset.maindns ? $('#LanSet .form-control').eq(4).val(data.lanset.maindns) : $('#LanSet .form-control').eq(4).val('');
        data.lanset.subdns ? $('#LanSet .form-control').eq(5).val(data.lanset.subdns) : $('#LanSet .form-control').eq(5).val('');
        ipOld=$('#LanSet .form-control').eq(1).val();


        /*   wan设置渲染   */
        if (data.wanset.wanmode == 'dhcp') {
            $('#firstSelect').val('0');
            $('#pppoeCon').hide();
            $('#staticCon').hide();
            $('#g3g4Con').hide();

            $("#firstSelect").attr('data-wanmode','dhcp')
        }

        if (data.wanset.wanmode == 'static') {
            $('#firstSelect').val('2');
            $('#pppoeCon').hide();
            $('#g3g4Con').hide();
            $('#staticCon').show();

            data.wanset.static.ipaddr ? $('#staticCon .form-control').eq(0).val(data.wanset.static.ipaddr) : $('#staticCon .form-control').eq(0).val('');
            data.wanset.static.netmask ? $('#staticCon .form-control').eq(1).val(data.wanset.static.netmask) : $('#staticCon .form-control').eq(1).val('');
            data.wanset.static.gateway ? $('#staticCon .form-control').eq(2).val(data.wanset.static.gateway) : $('#staticCon .form-control').eq(2).val('');
            data.wanset.static.maindns ? $('#staticCon .form-control').eq(3).val(data.wanset.static.maindns) : $('#staticCon .form-control').eq(3).val('');
            data.wanset.static.subdns ? $('#staticCon .form-control').eq(4).val(data.wanset.static.subdns) : $('#staticCon .form-control').eq(4).val('');

            $("#firstSelect").attr('data-wanmode','static');

        }

        if (data.wanset.wanmode == 'pppoe') {
            $('#firstSelect').val('1');
            $('#g3g4Con').hide();
            $('#staticCon').hide();
            $('#pppoeCon').show();

            data.wanset.pppoe.username ? $('#pppoeCon .form-control').eq(0).val(data.wanset.pppoe.username) : $('#pppoeCon .form-control').eq(0).val('');
            data.wanset.pppoe.password ? $('#pppoeCon .form-control').eq(1).val(data.wanset.pppoe.password) : $('#pppoeCon .form-control').eq(1).val('');
            data.wanset.pppoe.mtu ? $('#pppoeCon .form-control').eq(2).val(data.wanset.pppoe.mtu) : $('#pppoeCon .form-control').eq(2).val('');

            $("#firstSelect").attr('data-wanmode','pppoe');
        }

        if (data.wanset.wanmode == 'g3g4') {
            $('#firstSelect').val('3');
            $('#pppoeCon').hide();
            $('#staticCon').hide();
            $('#g3g4Con').show();

            if (data.wanset.g3g4.mode == "cmnet") {
                $('#handCon').hide();
                $("#secondSelect").val('0');
            }
            if (data.wanset.g3g4.mode == "umts") {
                $('#handCon').hide();
                $("#secondSelect").val('1');
            }
            if (data.wanset.g3g4.mode == "hand") {
                $("#secondSelect").val('2');
                $('#handCon').show();

                data.wanset.g3g4.service ? $('#g3g4Con .form-control').eq(0).val(data.wanset.g3g4.service) : $('#g3g4Con .form-control').eq(0).val('');
                data.wanset.g3g4.apn ? $('#g3g4Con .form-control').eq(1).val(data.wanset.g3g4.apn) : $('#g3g4Con .form-control').eq(1).val('');
                data.wanset.g3g4.pincode ? $('#g3g4Con .form-control').eq(2).val(data.wanset.g3g4.pincode) : $('#g3g4Con .form-control').eq(2).val('');
                data.wanset.g3g4.username ? $('#g3g4Con .form-control').eq(3).val(data.wanset.g3g4.username) : $('#g3g4Con .form-control').eq(3).val('');
                data.wanset.g3g4.password ? $('#g3g4Con .form-control').eq(4).val(data.wanset.g3g4.password) : $('#g3g4Con .form-control').eq(4).val('');
                data.wanset.g3g4.dialnumber ? $('#g3g4Con .form-control').eq(5).val(data.wanset.g3g4.dialnumber) : $('#g3g4Con .form-control').eq(5).val('');
            }


            /*   第三个select渲染   */
            $('#thirdSelect').empty();
            $.each(data.wanset.g3g4.ttyUSBlist, function (key, value) {
                $("#thirdSelect")
                    .append($("<option></option>")
                        .attr("value", key)
                        .text(value)).val(data.wanset.g3g4.ttyUSBlist.indexOf(data.wanset.g3g4.ttyUSB))
            });
            thirdSelectOptions=[];
            $('#thirdSelect option').each(function () {
                thirdSelectOptions.push($(this).text())
            });
            $("#firstSelect").attr('data-wanmode', 'g3g4');
            $("#secondSelect").attr('data-mode', data.wanset.g3g4.mode);

        }

    }


    /* 第一个select事件 */
    $("#firstSelect").change(function(){
        if(!$(this).get(0).selectedIndex){
            $('#pppoeCon').hide();
            $('#staticCon').hide();
            $('#g3g4Con').hide();

            $(this).attr('data-wanmode','dhcp')
        }
        if($(this).get(0).selectedIndex==1){
            $('#pppoeCon').show();
            $('#staticCon').hide();
            $('#g3g4Con').hide();

            $(this).attr('data-wanmode','pppoe');
        }
        if($(this).get(0).selectedIndex==2){
            $('#pppoeCon').hide();
            $('#staticCon').show();
            $('#g3g4Con').hide();

            $(this).attr('data-wanmode','static')

        }
        if($(this).get(0).selectedIndex==3){
            $('#pppoeCon').hide();
            $('#staticCon').hide();
            $('#g3g4Con').show();
            $('#handCon').hide();

            if ($("#secondSelect").val() == '0') {
                $('#handCon').hide();
            }
            if ($("#secondSelect").val() == '1') {
                $('#handCon').hide();
            }
            if ($("#secondSelect").val() == '2') {
                $('#handCon').show();
            }

            $(this).attr('data-wanmode','g3g4');
        }
    });


    /*    第二个select事件    */
    $("#secondSelect").change(function(){
        if(!$(this).get(0).selectedIndex){
            $('#handCon').hide();
            $(this).attr('data-mode','cmnet')
        }
        if($(this).get(0).selectedIndex==1){
            $('#handCon').hide();
            $(this).attr('data-mode','umts')
        }
        if($(this).get(0).selectedIndex==2){
            $('#handCon').show();
            $(this).attr('data-mode','hand')
        }

        $("#secondSelect").attr('data-mode')
    });


    /*   lanset验证   */
    $('#LanSet .form-control').eq(1).focus(function () {
        $('#LanSet .tips').eq(1).hide();
    });
    $('#LanSet .form-control').eq(1).blur(function () {
        if (!$(this).val()) {
            $('#LanSet .tips').eq(1).show();
            $('#LanSet .tips').eq(1).html('IP地址不能为空');
            return;
        }
        if (!reg.test($(this).val()) && $(this).val() != '') {
            $('#LanSet .tips').eq(1).show();
            $('#LanSet .tips').eq(1).html('IP地址格式有误');
            return
        }
        $('#LanSet .tips').eq(1).hide();
    });


    $('#LanSet .form-control').eq(2).focus(function () {
        $('#LanSet .tips').eq(2).hide();
    });

    $('#LanSet .form-control').eq(2).blur(function () {
        if (!$(this).val()) {
            $('#LanSet .tips').eq(2).show();
            $('#LanSet .tips').eq(2).html('子掩护码不能为空');
            return;
        }
        if (!reg.test($(this).val()) && $(this).val() != '') {
            $('#LanSet .tips').eq(2).show();
            $('#LanSet .tips').eq(2).html('子掩护码格式有误');
            return
        }
        $('#LanSet .tips').eq(2).hide();

    });

    var lanSetInputs=document.querySelectorAll('#LanSet .form-control');
    var lanSetTips=document.querySelectorAll('#LanSet .tips');
    var lanSetInputsArr=[],lanSetTipsArr=[];

    for (let i=3;i<lanSetInputs.length;i++) {
        lanSetInputsArr.push(lanSetInputs[i]);
        lanSetTipsArr.push(lanSetTips[i]);
    }

    for (let i=0;i<lanSetInputsArr.length;i++) {
        lanSetInputsArr[i].onfocus=function() {
            lanSetTipsArr[i].style.display='none';
        };

        lanSetInputsArr[i].onblur=function () {
            if (!reg.test(this.value) && this.value != '') {
                lanSetTipsArr[i].style.display='block';
                return
            }

            lanSetTipsArr[i].style.display='none';
        }
    }


    /*   static验证  */
    $('#staticCon .form-control').eq(0).focus(function () {
        $('#staticCon .tips').eq(0).hide();
    });
    $('#staticCon .form-control').eq(0).blur(function () {
        if (!$(this).val()) {
            $('#staticCon .tips').eq(0).show();
            $('#staticCon .tips').eq(0).html('IP地址不能为空');

            return;
        }
        if (!reg.test($(this).val())) {
            $('#staticCon .tips').eq(0).show();
            $('#staticCon .tips').eq(0).html('IP地址格式有误');
            return
        }
        $('#staticCon .tips').eq(0).hide();

    });

    $('#staticCon .form-control').eq(1).focus(function () {
        $('#staticCon .tips').eq(1).hide();
    });

    $('#staticCon .form-control').eq(1).blur(function () {
        if (!$(this).val()) {
            $('#staticCon .tips').eq(1).show();
            $('#staticCon .tips').eq(1).html('子掩护码不能为空');
            return;
        }
        if (!reg.test($(this).val()) && $(this).val() != '') {
            $('#staticCon .tips').eq(1).show();
            $('#staticCon .tips').eq(1).html('子掩护码格式有误');
            return
        }
        $('#staticCon .tips').eq(1).hide();

    });

    var staticInputs=document.querySelectorAll('#staticCon .form-control');
    var staticTips=document.querySelectorAll('#staticCon .tips');

    for (let i=2;i<staticInputs.length;i++) {
        staticInputs[i].onfocus=function () {
            staticTips[i].style.display='none';
        }

        staticInputs[i].onblur=function () {
            if (!reg.test(this.value) && this.value != '') {
                staticTips[i].style.display='block';
                return;
            }
            staticTips[i].style.display='none';
        }
    }


    /*   pppoe验证   */
    $('#pppoeCon .form-control').eq(0).focus(function () {
        $('#pppoeCon .tips').eq(0).hide();
    });
    $('#pppoeCon .form-control').eq(0).blur(function () {
        if (!$(this).val()) {
            $('#pppoeCon .tips').eq(0).show();
            $('#pppoeCon .tips').eq(0).html('用户名不能为空');
            return;
        }
        $('#pppoeCon .tips').eq(0).hide();
    });

    $('#pppoeCon .form-control').eq(1).focus(function () {
        $('#pppoeCon .tips').eq(1).hide();
    });
    $('#pppoeCon .form-control').eq(1).blur(function () {
        if (!$(this).val()) {
            $('#pppoeCon .tips').eq(1).show();
            $('#pppoeCon .tips').eq(1).html('密码不能为空');
            return;
        }
        $('#pppoeCon .tips').eq(1).hide();
    });

    $('#pppoeCon .form-control').eq(2).focus(function () {
        $('#pppoeCon .tips').eq(2).hide();
    });
    $('#pppoeCon .form-control').eq(2).blur(function () {
        if ($(this).val()) {
            if (!/^[0-9]*$/.test($(this).val())) {
                $('#pppoeCon .tips').eq(2).show();
                return;
            }
            $('#pppoeCon .tips').eq(2).hide();

        } else {
            $('#pppoeCon .tips').eq(2).hide();
        }

    });


    /*  获取表单数据  */
    function getJsonData() {
        var curData={
            lanset: {
                lanvlanid: $('#LanSet .form-control').eq(0).val(),
                ipaddr: $('#LanSet .form-control').eq(1).val(),
                netmask: $('#LanSet .form-control').eq(2).val(),
                gateway: $('#LanSet .form-control').eq(3).val(),
                maindns: $('#LanSet .form-control').eq(4).val(),
                subdns: $('#LanSet .form-control').eq(5).val()
            },
            wanset: {
                wanmode: $("#firstSelect").attr('data-wanmode'),
                static: {
                    ipaddr: $('#staticCon .form-control').eq(0).val(),
                    netmask: $('#staticCon .form-control').eq(1).val(),
                    gateway: $('#staticCon .form-control').eq(2).val(),
                    maindns: $('#staticCon .form-control').eq(3).val(),
                    subdns: $('#staticCon .form-control').eq(4).val()
                },
                pppoe: {
                    username: $('#pppoeCon .form-control').eq(0).val(),
                    password: $('#pppoeCon .form-control').eq(1).val(),
                    mtu: $('#pppoeCon .form-control').eq(2).val()
                },
                g3g4: {
                    mode: $("#secondSelect").attr('data-mode'),
                    ttyUSBlist: thirdSelectOptions,
                    ttyUSB: $("#thirdSelect option:selected").text(),
                    service: $('#g3g4Con .form-control').eq(0).val(),
                    apn: $('#g3g4Con .form-control').eq(1).val(),
                    pincode: $('#g3g4Con .form-control').eq(2).val(),
                    username: $('#g3g4Con .form-control').eq(3).val(),
                    password: $('#g3g4Con .form-control').eq(4).val(),
                    dialnumber: $('#g3g4Con .form-control').eq(5).val()
                }
            }
        };
        return curData;
    }


    /*    保存提交   */
    $('#saveBtn').click(function(){

        if (!$('#LanSet .form-control').eq(1).val()) {
            $('#myModal').show();
            $('#textCon').html('ip地址不能为空');
            return;
        }
        if (!$('#LanSet .form-control').eq(2).val()) {
            $('#myModal').show();
            $('#textCon').html('子掩护码不能为空');
            return;
        }

        if ($("#firstSelect").get(0).selectedIndex == 0) {
            $('#WanSet .tips').each(function () {
                $(this).hide();
            })
        }
        
        if ($("#firstSelect").get(0).selectedIndex == 1) {
            $('#staticCon .tips').each(function () {
                $(this).hide();
            });
            if (!$('#pppoeCon .form-control').eq(0).val()) {
                $('#myModal').show();
                $('#textCon').html('用户名不能为空');
                return;
            }
            if (!$('#pppoeCon .form-control').eq(1).val()) {
                $('#myModal').show();
                $('#textCon').html('密码不能为空');
                return;
            }
        }

        if ($("#firstSelect").get(0).selectedIndex == 2) {
            $('#pppoeCon .tips').each(function () {
                $(this).hide();
            })
            if (!$('#staticCon .form-control').eq(0).val()) {
                $('#myModal').show();
                $('#textCon').html('ip地址不能为空');
                return;
            }
            if (!$('#staticCon .form-control').eq(1).val()) {
                $('#myModal').show();
                $('#textCon').html('子掩护码不能为空');
                return;
            }
        }

        var tips=document.querySelectorAll('.tips');
        for (let i=0;i<tips.length;i++) {
            if (tips[i].style.display=='inline' || tips[i].style.display=='block' || tips[i].style.display=='inline-block') {
                $('#myModal').show();
                $('#textCon').html('请先检查一下您的输入内容是否正确 ?');
                return
            }
        }
        var ipNew=$('#LanSet .form-control').eq(1).val();
        if ($('#LanSet .form-control').eq(1).val() !=ipOld) {
            setTimeout(function () {
                parent.window.ipChange(ipNew);
            },1000)
        }
        $('#loadingCon').fadeIn();

        $.ajax({
            type: "POST",
            url: "./Mobisys-NetworkConfig",
            contentType: "application/json; charset=utf-8",
            timeout: 10000,
            data: JSON.stringify(getJsonData()),
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
        console.log(getJsonData())
    });


    /*    刷新页面   */
    $('#resetBtn').click(function () {
        $('#loadingCon').fadeIn();
        $.ajax({
            type: "GET",
            url: addr ? '../static/json/networkConfig.json' : "./Mobisys-NetworkConfig?action=data",
            dataType: "json",
            timeout: 10000,
            async: true,
            success: function (data) {
                $('#loadingCon').fadeOut();
                renderPage(data)
            }
        });
    });
});


