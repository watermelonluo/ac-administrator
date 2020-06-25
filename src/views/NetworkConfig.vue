<template>
    <div class="network-config">     
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
         class="demo-ruleForm">
            <el-form-item label="VLAN号" prop="vlan">
                <el-input v-model="ruleForm.vlan"></el-input>
            </el-form-item>   
            <el-form-item label="IP地址" prop="ip">
                <el-input v-model="ruleForm.ip"></el-input>
            </el-form-item>
            <el-form-item label="子掩护码" prop="netmask">
                <el-input v-model="ruleForm.netmask"></el-input>
            </el-form-item>
            <el-form-item label="网关" prop="gateway">
                <el-input v-model="ruleForm.gateway"></el-input>
            </el-form-item>
            <el-form-item label="主DNS" prop="maindns">
                <el-input v-model="ruleForm.maindns"></el-input>
            </el-form-item>
            <el-form-item label="副DNS" prop="subdns">
                <el-input v-model="ruleForm.subdns"></el-input>
            </el-form-item>        
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>         
        </el-form>                
    </div>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                vlan: '',
                ip: '',
                netmask: '',
                gateway: '',
                maindns: '',
                subdns: ''
            },
            rules: {
                vlan: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
                ip: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                netmask: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
                gateway: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                maindns: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
                subdns: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ]             
            }   
        }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style lang="less">
.network-config{
    padding: 30px;
}
.row{
    padding: 2px 36px 0 36px !important;
}
#pppoeCon .row,#staticCon .row,#g3g4Con .row,#handCon .row{
    padding: 2px 0 0 !important;
}
.col-1{
    height: 31px;
    font-size: 14px;
    padding-left: 30px;
    padding-right: 0;
    line-height: 31px;
    color: #000000;
    min-width: 137px !important;
}
.lanConfigTitle,.wanConfigTitle{
    height: 36px;
    border-radius: 3px;
    border: 1px solid #D0DFED;
    background: #EDF3F8;
    padding: 0 30px;
    margin-bottom: 20px;
    color: #859FBE;
    font-weight: normal;
    font-size: 16px;
    line-height: 36px;
    text-align: left;
}

#LanSet{
    padding-bottom: 25px;
    padding-top: 20px;
}

</style>
