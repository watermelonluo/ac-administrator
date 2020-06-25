<template>
    <div class="remote-manage">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="状态" prop="status"  style="text-align: left;">
                <el-switch v-model="ruleForm.status"></el-switch>
            </el-form-item>   
            <el-form-item label="端口" prop="port">
                <el-input v-model="ruleForm.port"></el-input>
            </el-form-item>
            <el-form-item label="超级节点" prop="supernode">
                <el-input v-model="ruleForm.supernode"></el-input>
            </el-form-item>
            <el-form-item label="IP地址" prop="ip">
                <el-input v-model="ruleForm.ip"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
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
                subdns: '',
                status: true
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

<style>
.remote-manage{
    padding: 30px;
}
.el-button{
    padding: 10px 25px;
    margin-right: 30px;
}
</style>
