;
const addr=true;

/*   loading gif图加载   */
const loadingCon=document.getElementById('loadingCon');
const loadingHeight=parseInt(getComputedStyle(loadingCon).height);
loadingCon.style.top=window.screen.height/2-loadingHeight/2-150+'px';
function networkStatus() {

    /*   首次进入页面ajax请求   */
    $.ajax({
        type: "GET",
        url: addr ? '../static/json/networkStatus.json' : "./Mobisys-NetworkStatus",
        timeout: 10000,
        dataType: "json",
        async: true,
        success: function (data) {
            $('#loadingCon').fadeOut();

            if (data.interface) {
                $('#interface .statusImg').each(function (i) {
                    $(this).attr('data-mark',data.interface[i]);
                    if ($(this).attr('data-mark')=='1') {
                        $(this).attr('class','statusImg connect-on');
                        $(this).next().next().html('已连接');
                    } else {
                        $(this).attr('class','statusImg connect-off')
                        $(this).next().next().html('未连接');
                    }
                });
            }

            data.lan.ipaddr ? $('.lanStatusItem').eq(0).html(data.lan.ipaddr) : $('.lanStatusItem').eq(0).html('');
            data.lan.netmask ? $('.lanStatusItem').eq(1).html(data.lan.netmask) : $('.lanStatusItem').eq(1).html('');
            data.lan.gateway ? $('.lanStatusItem').eq(2).html(data.lan.gateway) : $('.lanStatusItem').eq(2).html('');
            data.lan.maindns ? $('.lanStatusItem').eq(3).html(data.lan.maindns) : $('.lanStatusItem').eq(3).html('');
            data.lan.subdns ? $('.lanStatusItem').eq(4).html(data.lan.subdns) : $('.lanStatusItem').eq(4).html('');

            data.wan.wanmode ? $('.wanStatusItem').eq(0).html(data.wan.wanmode) : $('.wanStatusItem').eq(0).html('');
            if (data.wan.wanstatus=='1') {
                $('.wanStatusItem').eq(1).html('连接');
                $('.wanStatusItem').eq(1).next().attr('id','faColorOn');
            }else {
                $('.wanStatusItem').eq(1).html('未连接');
                $('.wanStatusItem').eq(1).next().attr('id','faColorOff');
            }
            data.wan.ipaddr ? $('.wanStatusItem').eq(2).html(data.wan.ipaddr) : $('.wanStatusItem').eq(2).html('');
            data.wan.netmask ? $('.wanStatusItem').eq(3).html(data.wan.netmask) : $('.wanStatusItem').eq(3).html('');
            data.wan.gateway ? $('.wanStatusItem').eq(4).html(data.wan.ipaddr) : $('.wanStatusItem').eq(4).html('');
            data.wan.maindns ? $('.wanStatusItem').eq(5).html(data.wan.maindns) : $('.wanStatusItem').eq(5).html('');
            data.wan.subdns ? $('.wanStatusItem').eq(6).html(data.wan.subdns) : $('.wanStatusItem').eq(6).html('');
            data.wan.linetime ? $('.wanStatusItem').eq(7).html(changeLineTime(data.wan.linetime)) : $('.wanStatusItem').eq(7).html('');
        }
    })
}
networkStatus();
setInterval(networkStatus,2000);


/*   转换时间  */
function changeLineTime(maxtime) {
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