<template>
    <div class="wifi-auth-status">
        <div class="detailCon">
            <div class="col-2">
                <h4>运行状态</h4><span id="spansOne" class="authState">{{ was.status || '--'}}</span>
            </div>
            <div class="col-2">
                <h4>运行时间</h4><span id="spansTwo" class="authState">{{ was.uptime || '--'}}</span>
            </div>
            <div class="col-2">
                <h4>互联网状态</h4><span id="spansThree" class="authState">{{ was.internet || '--'}}</span>
            </div>
            <div class="col-2">
                <h4>服务器状态</h4><span id="spansFour" class="authState">{{ was.auth || '--'}}</span>
            </div>
            <div class="col-2">
                <h4>已连接客户数</h4><span id="spansFive" class="authState">{{ was.clients || '--'}}</span>
            </div>
        </div>
        <el-table border :data="tableData" height="300" style="width: 100%">
            <el-table-column
                prop="id" label="#" width="100">
            </el-table-column>
            <el-table-column
                prop="ipaddr" label="IP地址">
            </el-table-column>
            <el-table-column
                prop="mac"  label="MAC地址">
            </el-table-column>
            <el-table-column
                prop="download" label="下载流量">
            </el-table-column>
            <el-table-column
                prop="upload" label="上传流量">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
          tableData: [{
            id: 1,
            ipaddr: '192.168.89.75',
            mac: 'e4:46:da:fd:1d:98',
            download: '6900',
            upload: '2045'
          }, {
            id: 2,
            ipaddr: '192.168.89.75',
            mac: 'e4:46:da:fd:1d:98',
            download: '1524879',
            upload: '132144'
          }, {
            id: 3,
            ipaddr: '192.168.89.75',
            mac: '00:27:10:e5:2d:68',
            download: '69033',
            upload: '27'
          }, {
            id: 4,
            ipaddr: '192.168.89.244',
            mac: '00:27:10:e5:2d:68',
            download: '3689',
            upload: '12'          
          }],
           was:{
                status:"yes",
                uptime:"365d23h35m59s",
                internet:"yes",
                auth:"yes",
                clients:"4"
            }
        }
    }
}
</script>

<style lang="less">
.wifi-auth-status{
    padding: 20px 40px;
    .el-table{
        thead{         
            th{
                text-align: center;
                background-color: #fcf5ed !important;
                
            }           
        }
        tr{
            td{
                text-align: center;
            }
        }
    }
}
.detailCon{
    padding: 0 20px;
    border: 1px solid #E7E7E7;
    box-sizing: border-box;
    font-size: 14px;
    display: flex;
    justify-content: space-around;
    margin-bottom: 50px;
}
.detailCon div:first-child{
    padding-left: 22px;
}
.detailCon h4{
    font-size: 14px;
    margin: 0 0 10px 0;
    font-weight: normal;
}

.detailCon .authState{
    color: #32788f;
}
.detailCon .col-2{
    padding-top: 20px;
    padding-bottom: 20px;
}
</style>
