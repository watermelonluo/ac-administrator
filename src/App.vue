<template>
  <div id="app">
    <transition name="fade">
        <router-view></router-view>
    </transition>
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    }
  },
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  letter-spacing: 1px;
}
html,body{
  height: 100%;
  margin: 0;
}
ul,li{
  padding: 0;
  margin: 0;
  list-style: none;
}
p{
  padding: 0;
  margin: 0;
}
h1,h2,h3,h4{
  margin: 0;
}
a{
  text-decoration: none;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.el-form-item__content{
    width: 300px;
    .el-input__inner{
        height: 32px;
        line-height: 32px;
    }
}
.el-form-item{
  margin-bottom: 18px !important;
}
.el-button{
    padding: 10px 25px !important;
    margin-right: 30px !important;
}
</style>
