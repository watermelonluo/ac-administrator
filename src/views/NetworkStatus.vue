<template>
  <div class="network-status">
    <div class="container-fluid" id="interface">
      <div class="row">
          <div class="col-12 interfaceStateTitle">
              网口状态
          </div>
      </div>
      <div class="row interfaceStateCon text-center" style="border-top: none">
        <div class="col-1" v-for="(item, index) in interfaces" :key="index">
            <img src="../assets/port.png" :class="[item.status?'connect-on':'connect-off']">
            <span>{{item.port}}</span>
            <span class="connectStatus">{{item.status?'已连接':'未连接'}}</span>
        </div>       
      </div>
    </div>

    <div class="container-fluid" id="lanState">

        <div class="row">
            <div class="col-12 lanStateTitle">
                LAN状态
            </div>
        </div>

        <div class="row lanStateCon d-flex" style="border-top: none;padding: 0 36px">          
            <div>
                <span>IP地址 : </span><span class="lanStatusItem">{{lan.ipaddr}}</span>
            </div>
            <div>
                <span>子掩护码 : </span><span class="lanStatusItem">{{lan.netmask}}</span>
            </div>
            <div>
                <span>网关 : </span><span class="lanStatusItem">{{lan.gateway}}</span>
            </div>
            <div>
                <span>主DNS : </span><span class="lanStatusItem">{{lan.maindns}}</span>
            </div>
            <div>
                <span>副DNS : </span><span class="lanStatusItem">{{lan.subdns}}</span>
            </div>
        </div>

    </div>

    <div class="container-fluid" id="wanState">
      <div class="row">
        <div class="col-12 wanStateTitle">
            WAN状态
        </div>
      </div>

      <div class="row wanStateCon d-flex" style="border-top: none;padding: 0 36px">
        <div>
            <span>模式 : </span><span class="wanStatusItem">{{wan.wanmode}}</span>
        </div>
        <div>
            <span>连接状态 : </span><span class="wanStatusItem">{{wan.wanstatus?'已连接':'未连接'}}</span>
        </div>
        <div>
            <span>IP地址 : </span><span class="wanStatusItem">{{wan.ipaddr}}</span>
        </div>
        <div>
            <span>子掩护码 : </span><span class="wanStatusItem">{{wan.netmask}}</span>
        </div>
        <div>
            <span>网关 : </span><span class="wanStatusItem">{{wan.gateway}}</span>
        </div>

        <div>
            <span>主DNS : </span><span class="wanStatusItem">{{wan.maindns}}</span>
        </div>
        <div>
            <span>副DNS : </span><span class="wanStatusItem">{{wan.subdns}}</span>
        </div>
        <div>
            <span>连接时间 : </span><span class="wanStatusItem">{{wan.linetime}}s</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "networkStatus",
  data() {
      return {
         interfaces: [],
         lan:{},
         wan:{}
      }
  },
  created() {
    this.$axios.get('/js/networkStatus.json')
      .then(res=>{  
        console.log(res.data.interface);         
        this.interfaces=res.data.interface;     
        this.lan=res.data.lan;
        this.wan=res.data.wan; 
      })
  },
};
</script>

<style scoped lang="less">
#interface,
#lanState,
#wanState {
  margin-top: 20px;
  padding: 0 36px;
}
.interfaceStateTitle,
.lanStateTitle,
.wanStateTitle {
  font-size: 16px;
  color: #5a82b0;
  padding: 10px 0 10px 20px;
  text-align: left;
}
#interface .row,
#lanState .row,
#wanState .row {
  margin: 0;
  padding: 0;
  border: 1px solid #e7e7e7;
}
.interfaceStateCon .col-1 span:first-of-type {
  display: block;
  font-size: 20px;
  color: #5e666e;
  padding: 5px 0;
}

.interfaceStateCon .col-1:hover {
  box-shadow: 1px 1px 1px #e7e7e7, -1px -1px 1px #e7e7e7;
  background-color: #ffffff;
}

.interfaceStateCon .col-1 {
  padding: 30px 0;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto !important;
  img {
    width: 32px;
    height: 32px;
  }
}

.d-flex div {
  padding: 30px 0;
  margin-right: 30px;
}

#interface #statusList {
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 200px;
}
#statusList .statusTitle {
  font-size: 16px;
  border-bottom: 1px solid #8089a0;
  color: #404040;
  font-weight: bold;
}
#statusList span {
  font-size: 14px;
}
#statusList .container-fluid .row > div {
  height: 30px;
  line-height: 30px;
  color: #545b62;
  font-weight: bold;
}

.connect-on {
  background: #4fd591;
}
.connect-off {
  background: #dadcdf;
}
.wanStateCon,
.lanStateCon,
.interfaceStateCon {
  display: flex;
  flex-wrap: wrap;
  border-top: none;
  padding: 0 36px;
}
.wanStatusItem,
.lanStatusItem {
  color: #67aef5;
  margin-left: 5px;
}
#faColorOn {
  color: #4fd591;
}
#faColorOff {
  color: #dadcdf;
}
#loadingCon {
  position: fixed;
  z-index: 100;
}
</style>
