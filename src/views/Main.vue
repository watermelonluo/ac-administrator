<template>
  <el-container class="home">        
    <el-aside style="width:200px;">
      <div class="logo">
        <img src="../assets/mobisys.png">
      </div>
      <ul>
        <li>
          <router-link :class="[isActive==='networkStatus'?'active':'']" to="/networkStatus">网络状态</router-link>
        </li>
        <li>
          <router-link :class="[isActive==='networkConfig'?'active':'']" to="/networkConfig">网络设置</router-link>
        </li>
        <!-- <li>
          <router-link :class="[isActive==='networkDhcp'?'active':'']" to="/networkDhcp">DHCP服务</router-link>
        </li>                -->
        <li>
          <router-link :class="[isActive==='remoteManage'?'active':'']" to="/remoteManage">远程管理</router-link>
        </li>
        <li>
          <router-link :class="[isActive==='speedLimit'?'active':'']" to="/speedLimit">网络限速</router-link>
        </li>
        <!-- <li>
          <router-link :class="[isActive==='vpnConfig'?'active':'']" to="/vpnConfig">VPN设置</router-link>
        </li>                 -->
        <li>
          <router-link :class="[isActive==='wifiAuthStatus'?'active':'']" to="/wifiAuthStatus">热点认证状态</router-link>
        </li>
        <li>
          <router-link :class="[isActive==='wifiAuthConfig'?'active':'']" to="/wifiAuthConfig">配置热点</router-link>
        </li>                      
        <li>
          <router-link :class="[isActive==='systemConfig'?'active':'']" to="/systemConfig">系统设置</router-link>
        </li>                 
      </ul>    
      <div class="company">
          <p>Copyright © 2018</p>
          <p>盟贝特网络科技</p>
      </div>            
    </el-aside>
    <el-container>
      <el-header style="padding:0;height:70px">
        <div class="navbar-container text-center" id="navbar-container">
          <div class="navbar-header" style="float: left">            
              <span class="text-white adminName">高级网络管理平台</span>
          </div><!-- /.navbar-header -->

          <div class="navbar-header" role="navigation" style="float: right">
              <div>
                  <i class="fa el-icon-user-solid"></i><span class="userName">管理员</span>
                  <a class="logout" href="#">退出</a>
              </div>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>       
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  },
  data() {
    return {    
      isActive: false
    }
  },
  mounted() {
    this.isActive=this.$route.name
  },
  watch: {
    $route(to,from){   
      this.isActive=to.name;
    }
  },
}
</script>

<style lang="less">
.el-container{
  height: 100%; 
}
#navbar-container{
  height: 70px;
  background-color: #242431;
}
.navbar-header{
    height: 70px;
    line-height: 70px;
    text-align: left;
}
.singleLine{
    margin: 0 60px 0 20px;
    font-size: 20px;
    color: white;
}

.navbar-header .adminName{
    font-size: 1rem;
    font-weight: bold;
    line-height: 70px;
    color: white;
    margin-left: 50px;
}
.navbar-header .userName{
    font-size: 14px;
    color: #869AB2;
    margin-right: 2rem;
    margin-left: 4px;
}
.el-icon-user-solid{
   color: #869AB2;
}
.navbar-header .logout{
  font-size: 14px;
    color: #869AB2;
    padding-right: 2rem;
}
.navbar-header .logout:hover{
    color: #a6b4c4;
}

  .el-aside{
    height: 100%;
    background-color: #2E2E38;  
    .logo{
      height: 70px;
      line-height: 70px;
      img{
        height: 28px;
        vertical-align: middle;
      }
    }
    ul{
      padding-top: 30px;
      margin-bottom: 130px;
      li{
        padding: 12px;
        a{
          color: #99A9B9;
          font-size: 16px;
          font-weight: 550;
        }
        a:hover{
          color: rgba(255, 255, 255, .8);
        }
        a.active{
          color: rgba(255, 255, 255, .9);
        }         
      }
    }
    .company{
      font-size: 12px;
      color: #8E8E8E;
      
      p:first-child{
        margin-bottom: 5px;
      }
    }
  }
</style>
