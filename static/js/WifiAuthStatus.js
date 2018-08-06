;
const addr=true;

/*   loading gif图加载   */
const loadingCon=document.getElementById('loadingCon');
const loadingHeight=parseInt(getComputedStyle(loadingCon).height);
loadingCon.style.top=window.screen.height/2-loadingHeight/2-150+'px';

function wifiAuthStatus () {

    /*   首次进入页面请求   */
    $.ajax({
        type: "GET",
        url: addr ? '../static/json/WifiAuthStatus.json' : './Mobisys-WifiAuthStatus?action=list',
        timeout: 10000,
        dataType: "json",
        async: true,
        success: function (data) {
            $('#loadingCon').fadeOut();
            wifiAuthStatusPage(data);
        }
    });

    function wifiAuthStatusPage(data) {
        console.log(data);
        data.status ? $('#spansOne').html(data.status) : $('#spansOne').html('');
        if (data.uptime) {
            var splitDay=data.uptime.split('d');
            var days=splitDay[0];
            var splitHour=splitDay[1].split('h');
            var hours=splitHour[0];
            var splitMinute=splitHour[1].split('m');
            var minutes=splitMinute[0];
            var splitSecond=splitMinute[1].split('s');
            var seconds=splitSecond[0];

            $('#spansTwo').html(days+'天'+hours+'时'+minutes+'分'+seconds+'秒')
        }

        data.internet ? $('#spansThree').html(data.internet) : $('#spansThree').html('');
        data.auth ? $('#spansFour').html(data.auth) : $('#spansFour').html('');
        data.clients ? $('#spansFive').html(data.clients) : $('#spansFive').html('');

        /*  客户列表  */
        if (data.clientlist) {
            if (data.clientlist.length > 0) {
                var list='';
                $('.table tbody').html('');
                $.each(data.clientlist,function (i) {
                    list+= '<tr>' +
                        '<td>'+parseInt(i+1)+'</td>' +
                        '<td class="ifOverFlow">'+data.clientlist[i].ipaddr+'</td>' +
                        '<td class="ifOverFlow">'+data.clientlist[i].mac+'</td>' +
                        '<td>'+data.clientlist[i].down+'</td>' +
                        '<td>'+data.clientlist[i].up+'</td>' +
                        '</tr>';
                });
                $('.table tbody').html(list);
            }
        }
    }
}
wifiAuthStatus();
setInterval(wifiAuthStatus,2000);
