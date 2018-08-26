;
const regIP = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
const regMac=/^[a-f0-9]{1,2}\:[a-f0-9]{1,2}\:[a-f0-9]{1,2}\:[a-f0-9]{1,2}\:[a-f0-9]{1,2}\:[a-f0-9]{1,2}$/;
const addr=true;
$(function () {

    var actionData=null; //用来存数据

    /*   开关   */
    var dchpServiceStatus=null; // 根据开关状态来赋值
    var toggleBtn=document.querySelector('.chooseBtn');
    var switchText=document.querySelector('.switchText');
    toggleBtn.onclick=function () {
        if (this.checked) {
            dchpServiceStatus='1';
            switchText.innerHTML='开启';
            switchText.style.color='#67AEF5';
        } else {
            dchpServiceStatus='0';
            switchText.innerHTML='关闭';
            switchText.style.color='#9A9A9A';
        }
    };


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
        $(this).hide();
        $('#confirm2').hide();
        $('#confirm').show();
        $('#myModal').fadeOut();
    });

    /*   mouseEnter  */

    var tabs=document.querySelectorAll('.titleCon .col-1');

    function getMarkedEle () {
        var marked=document.querySelector('[data-click="mark"]');
        return marked;
    }

    for (let i=0;i<tabs.length;i++) {
        tabs[i].onclick=function () {
            for (let j=0;j<tabs.length;j++) {
                tabs[j].id='';
                tabs[j].setAttribute('data-click','');
            }
            this.id='clicked';
            this.setAttribute('data-click','mark');
        };
        tabs[i].onmouseenter=function () {
            for (let j=0;j<tabs.length;j++) {
                tabs[j].id='';
            }
            this.id='clicked';
        };
        tabs[i].onmouseleave=function () {
            for (let j=0;j<tabs.length;j++) {
                tabs[j].id='';
            }
            getMarkedEle().id='clicked';
        }
    }


    /*   首次进入页面ajax请求   */
    $.ajax({
        type: "GET",
        url: addr ? '../static/json/networkDhcp.json' : "./Mobisys-NetworkDhcp?action=data",
        timeout: 10000,
        dataType: "json",
        async: true,
        success: function (data) {
            $('#loadingCon').fadeOut();
            renderDhcpTopCon(data);
            renderDhcpSetList(data);
            console.log(data)
        }
    });


    /*  渲染dhcp set input输入框  */
    function renderDhcpTopCon(data) {
        if (data.enable == '0') {
            toggleBtn.checked=false;
            dchpServiceStatus='0';
            switchText.innerHTML='关闭';
            switchText.style.color='#9A9A9A';
        } else {
            toggleBtn.checked=true;
            dchpServiceStatus='1';
            switchText.innerHTML='开启';
            switchText.style.color='#67AEF5';
        }

        data.start ? $('#startAddr').val(data.start) : $('#startAddr').val('');
        data.limit ? $('#custmerNum').val(data.limit) : $('#custmerNum').val('');
        if (data.leasetime) {
            if (data.leasetime.indexOf('d') > 0) {
                $('.form-control-2').val(data.leasetime.split('d')[0]);
                $('.custom-select-2').val('0');
            }
            if (data.leasetime.indexOf('h') > 0) {
                $('.form-control-2').val(data.leasetime.split('h')[0]);
                $('.custom-select-2').val('1');
            }
            if (data.leasetime.indexOf('m') > 0) {
                $('.form-control-2').val(data.leasetime.split('m')[0]);
                $('.custom-select-2').val('2');
            }
        }
    }


    /*  渲染dhcp set 表格数据  */
    function renderDhcpSetList(data) {
        actionData=data.staticlist;
        if (data.staticlist) {
            if (data.staticlist.length > 0) {
                var trList='';
                $('#staticTableList tbody').html('');
                $.each(data.staticlist,function (i) {
                    trList+='<tr data-order="'+i+'" class="dhcpTr">' +
                        '<td><input type="checkbox" style="margin-top: 4px"></td>' +
                        '<td>'+parseInt(i+1)+'</td>' +
                        '<td>'+data.staticlist[i].mac+'</td>' +
                        '<td>'+data.staticlist[i].ip+'</td>' +
                        '</tr>'
                });
                $('#staticTableList tbody').html(trList);
            }
        }

        /*   声明勾选框checkbox的勾选个数checkedNum   */
        var checkedNum=0;

        var allSelect=document.querySelector('#staticTableList thead input');
        var tbodyInputs=document.querySelectorAll('#staticTableList tbody input');
        allSelect.onclick=function() {
            for (let i=0;i<tbodyInputs.length;i++) {
                if (this.checked) {
                    tbodyInputs[i].checked=true;
                    checkedNum=tbodyInputs.length;
                    tbodyInputs[i].parentNode.parentNode.setAttribute('class','active dhcpTr');
                } else {
                    tbodyInputs[i].checked=false;
                    checkedNum=0;
                    tbodyInputs[i].parentNode.parentNode.setAttribute('class','dhcpTr');
                }
            }

        };

        for(let i=0;i<tbodyInputs.length;i++){
            tbodyInputs[i].onclick=function(){
                tbodyInputs[i].parentNode.parentNode.className=this.checked ? 'active dhcpTr' : 'dhcpTr';
                this.checked ? checkedNum++ : checkedNum--;
                allSelect.checked=checkedNum==tbodyInputs.length ? true : false;
                console.log(checkedNum)
            };
        }


        /*  删除操作  */
        var deleteOneList=document.getElementById('deleteStaticList');
        var confirmDelete=document.getElementById('confirm2');
        deleteOneList.onclick=function() {
            if (checkedNum == 0) {
                $('#myModal').fadeIn();
                $('#textCon').html('请先选中一条');
                return;
            }
            if (checkedNum > 1) {
                $('#myModal').fadeIn();
                $('#textCon').html('只能选中一条');
                return;
            }
            $('#myModal').fadeIn();
            $('#cancel').show();
            $('#confirm2').show();
            $('#confirm').hide();
            $('#textCon').html('确定要删除吗?');
        };

        confirmDel(data);
        function confirmDel(delData) {
            confirmDelete.onclick=function() {
                $('#cancel').hide();
                $('#confirm2').hide();
                $('#confirm').show();
                $('#myModal').fadeOut();

                var activeNum=$('#staticTableList tbody tr.active').attr('data-order');
                delData.staticlist.splice(parseInt(activeNum),1);
                renderDhcpSetList(delData);
            }
        }


        /*   添加操作   */
        var addOneList=document.getElementById('addOneList');
        var collapseTips=document.getElementsByClassName('tips');
        confirmAdd(data);
        function confirmAdd(addData) {
            addOneList.onclick=function() {
                if (!$('#macAddr').val()) {
                    $('#myModal').show();
                    $('#textCon').html('mac地址不能为空');
                    return;
                }
                if (!$('#ipAddr').val()) {
                    $('#myModal').show();
                    $('#textCon').html('ip地址不能为空');
                    return;
                }
                for (let i=0;i<collapseTips.length;i++) {
                    if (collapseTips[i].style.display=='inline' || collapseTips[i].style.display=='block' || collapseTips[i].style.display=='inline-block') {
                        $('#myModal').show();
                        $('#textCon').html('请检查一下您的输入内容是否正确?');
                        this.setAttribute('data-target','');
                        return
                    }
                }
                this.setAttribute('data-target','#collapseExample');
                addData.staticlist.push({'mac':$('#macAddr').val(),'ip':$('#ipAddr').val()})
                renderDhcpSetList(addData);
                $('#macAddr').val('');
                $('#ipAddr').val('');
            }
        }
    }


    /*   添加时mac格式验证  */
    $('#macAddr').focus(function () {
        $('#collapseExample .tips').eq(0).hide();
    });

    $('#macAddr').change(function () {
        if (!$(this).val()) {
            $('#collapseExample .tips').eq(0).show();
            $('#collapseExample .tips').eq(0).html('mac地址不能为空');
            console.log(777)
            return;
        }
        if (!regMac.test($(this).val()) && $(this).val() != '') {
            $('#collapseExample .tips').eq(0).show();
            $('#collapseExample .tips').eq(0).html('mac地址格式有误');
            return
        }
        $('#collapseExample .tips').eq(0).hide();
    });

    /*   添加时ip格式验证  */
    $('#ipAddr').focus(function () {
        $('#collapseExample .tips').eq(1).hide();
    });
    $('#ipAddr').change(function () {
        if (!$(this).val()) {
            $('#collapseExample .tips').eq(1).show();
            $('#collapseExample .tips').eq(1).html('ip地址不能为空');
            return;
        }
        if (!regIP.test($(this).val()) && $(this).val() != '') {
            $('#collapseExample .tips').eq(1).show();
            $('#collapseExample .tips').eq(1).html('ip地址格式有误');
            return
        }
        $('#collapseExample .tips').eq(1).hide();

    });


    /*  取消添加  */
    $('#giveUp').click(function () {
        $('#macAddr').val('');
        $('#ipAddr').val('');
        $('#collapseExample .tips').eq(0).hide();
        $('#collapseExample .tips').eq(1).hide();
    });


    /*  租约时间input输入后验证  */
    const reg4= /^[1-9]\d*$/;
    $('.form-control-2').change(function () {
        var leaseTimeVal=$(this).val();
        if (!reg4.test(leaseTimeVal)) {
            $('#leaseTimeTips').show();
            $('#leaseTimeTips').html('请输入整数数字');
            return;
        }

        if ($('.custom-select-2').get(0).selectedIndex == 0) {
            if (parseInt(leaseTimeVal)>365) {
                $('#leaseTimeTips').show();
                $('#leaseTimeTips').html('天数不能大于365');
                return;
            }
        }
        if ($('.custom-select-2').get(0).selectedIndex == 1) {
            if (parseInt(leaseTimeVal)>24) {
                $('#leaseTimeTips').show();
                $('#leaseTimeTips').html('小时数不能大于24');
                return;
            }
        }
        if ($('.custom-select-2').get(0).selectedIndex == 2) {
            if (parseInt(leaseTimeVal)>60) {
                $('#leaseTimeTips').show();
                $('#leaseTimeTips').html('分钟数不能大于60');
                return;
            }
        }
        $('#leaseTimeTips').hide();
    });


    /*   租约时间select选择后验证    */
    $('.custom-select-2').change(function () {
        var leaseTimeVal2=$('.form-control-2').val();
        if ($(this).get(0).selectedIndex == 0) {
            if (parseInt(leaseTimeVal2)>365) {
                $('#leaseTimeTips').show();
                $('#leaseTimeTips').html('天数不能大于365');
                return;
            }
        }
        if ($(this).get(0).selectedIndex == 1) {
            if (parseInt(leaseTimeVal2)>24) {
                $('#leaseTimeTips').show();
                $('#leaseTimeTips').html('小时数不能大于24');
                return;
            }
        }
        if ($(this).get(0).selectedIndex == 2) {
            if (parseInt(leaseTimeVal2)>60) {
                $('#leaseTimeTips').show();
                $('#leaseTimeTips').html('分钟数不能大于60');
                return;
            }
        }
        $('#leaseTimeTips').hide();
    });


    /*   客户数验证    */
    $('#custmerNum').change(function () {
        if (!reg4.test($(this).val())) {
            $('#custmerNumTip').show();
            return;
        }
        $('#custmerNumTip').hide();
    });


    /*    获取dhcp set页面数据   */
    function getDhcpSetData() {
        if ($('.custom-select-2').get(0).selectedIndex == 0) {
            var leaseTimeData=$('.form-control-2').val()+'d';
        }
        if ($('.custom-select-2').get(0).selectedIndex == 1) {
            var leaseTimeData=$('.form-control-2').val()+'h';
        }
        if ($('.custom-select-2').get(0).selectedIndex == 2) {
            var leaseTimeData=$('.form-control-2').val()+'m';
        }
        
        var curData={
            leasetime: leaseTimeData,
            limit:$('#custmerNum').val(),
            staticlist:actionData,
            start:$('#startAddr').val(),
            enable:dchpServiceStatus
        };
        return curData;
    }

    /*   dhcp set页面保存提交  */
    var dhcpSave=document.getElementById('saveBtn');
    dhcpSave.onclick=function() {
        var tips=document.querySelectorAll('.tips');
        for (let i=0;i<tips.length;i++) {
            if (tips[i].style.display == 'block' || tips[i].style.display == 'inline' || tips[i].style.display == 'inline-block') {
                $('#myModal').show();
                $('#textCon').html('请检查输入框填写是否正确');
                return;
            }
        }
        $('#loadingCon').fadeIn();
        $.ajax({
            type: "POST",
            url: "./Mobisys-NetworkDhcp",
            timeout: 10000,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(getDhcpSetData()),
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
        console.log(getDhcpSetData());
    };


    /*   dhcp set页面刷新  */
    $('#resetBtn').click(function() {
        $('#loadingCon').fadeIn();
        $.ajax({
            type: "GET",
            url: addr ? '../static/json/networkDhcp.json' : "./Mobisys-NetworkDhcp?action=data",
            timeout: 10000,
            dataType: "json",
            async: true,
            success: function (data) {
                $('#loadingCon').fadeOut();
                renderDhcpTopCon(data);
                renderDhcpSetList(data);
            }
        });
    });


    /*   dhcp set页面切换  */
    $('.titleCon .col-1').eq(0).click(function () {
        $('#loadingCon').fadeIn();
        $('#dhcp-set').fadeIn();
        $('#dhcp-status').fadeOut();
        $('#dhcp-ap').fadeOut();
        $.ajax({
            type: "GET",
            url: addr ? '../static/json/networkDhcp.json' : "./Mobisys-NetworkDhcp?action=data",
            timeout: 10000,
            dataType: "json",
            async: true,
            success: function (data) {
                $('#loadingCon').fadeOut();
                renderDhcpTopCon(data);
                renderDhcpSetList(data);
            }
        });
    });


    /*   dhcp status页面切换  */
    $('.titleCon .col-1').eq(1).click(function () {
        $('#loadingCon').fadeIn();
        $('#dhcp-set').fadeOut();
        $('#dhcp-status').fadeIn();
        $('#dhcp-ap').fadeOut();
        $.ajax({
            type: "GET",
            url: addr ? '../static/json/networkDhcp2.json' : "./Mobisys-NetworkDhcp?action=list",
            timeout: 10000,
            dataType: "json",
            async: true,
            success: function (data) {
                $('#loadingCon').fadeOut();
                renderDhcpStatusPage(data)
            }
        });

    });


    /*   dhcp status页面渲染  */
    function renderDhcpStatusPage(data) {
        if (data.dhcplist) {
            if (data.dhcplist.length > 0) {
                var statusList='';
                $('#dhcp-status tbody').html('');
                $.each(data.dhcplist,function (i) {
                    statusList+= '<tr>' +
                        '<td>'+parseInt(i+1)+'</td>' +
                        '<td class="ifOverFlow">'+data.dhcplist[i].name+'</td>' +
                        '<td class="ifOverFlow">'+data.dhcplist[i].ipaddr+'</td>' +
                        '<td>'+data.dhcplist[i].mac+'</td>' +
                        '<td>'+changeSecondTime(data.dhcplist[i].time)+'</td>' +
                        '</tr>'
                });
                $('#dhcp-status tbody').html(statusList);
            }
        }
    }


    /*   dhcp ap页面切换  */
    $('.titleCon .col-1').eq(2).click(function () {
        $('#loadingCon').fadeIn();
        $('#dhcp-set').fadeOut();
        $('#dhcp-status').fadeOut();
        $('#dhcp-ap').fadeIn();

        $.ajax({
            type: "GET",
            url: addr ? '../static/json/networkDhcp3.json' : "./Mobisys-NetworkDhcp?action=aplist",
            timeout: 10000,
            dataType: "json",
            async: true,
            success: function (data) {
                $('#loadingCon').fadeOut();
                renderDhcpApPage(data)
            }
        });
    });


    /*   dhcp ap页面渲染  */
    function renderDhcpApPage(data) {
        if (data.dhcplist) {
            if (data.dhcplist.length > 0) {
                var apList='';
                $('#dhcp-ap tbody').html('');
                $.each(data.dhcplist,function (i) {
                    apList+= '<tr>' +
                        '<td>'+parseInt(i+1)+'</td>' +
                        '<td class="ifOverFlow">'+data.dhcplist[i].name+'</td>' +
                        '<td class="ifOverFlow">'+data.dhcplist[i].ipaddr+'</td>' +
                        '<td>'+data.dhcplist[i].mac+'</td>' +
                        '<td>'+changeSecondTime(data.dhcplist[i].time)+'</td>' +
                        '</tr>';
                });
                $('#dhcp-ap tbody').html(apList);
            }
        }
    }


    /*   转换时间  */
    function changeSecondTime(maxtime) {
        var days1 = Math.floor(maxtime/86400);
        var hours1 = Math.floor((maxtime%86400)/3600);
        var minutes1 = Math.floor(((maxtime%86400)%3600)/60);
        var seconds1 = Math.floor(((maxtime%86400)%3600)%60);
        if (days1>0) {
            if (hours1==0) {
                return days1+'天'
            }
            if (hours1>0) {
                return days1+'天'+hours1+'时'
            }
        } else {
            if (hours1>0) {
                if (minutes1 == 0) {
                    return hours1+'时'
                }
                if (minutes1>0) {
                    return hours1+'时'+minutes1+'分'
                }
            } else {
                if (minutes1>0) {
                    if (seconds1 == 0) {
                        return minutes1+'分'
                    }
                    if (seconds1>0) {
                        return minutes1+'分'+seconds1+'秒'
                    }
                } else {
                    if (seconds1 == 0) {
                        return '';
                    }
                    if (seconds1>0) {
                        return seconds1+'秒'
                    }
                }
            }
        }
    }
});