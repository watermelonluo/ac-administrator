<template>
    <div class="speed-limit">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
         class="demo-ruleForm">
            <el-form-item label="总宽带" style="text-align: left;margin-bottom: 10px !important">
                <el-switch v-model="ruleForm.allNetStatus"></el-switch>
            </el-form-item>   
            <el-form-item label="下载(Kb/s)" prop="allDownload">
                <el-input v-model="ruleForm.allDownload"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 30px" label="上传(Kb/s)" prop="allUpload">
                <el-input v-model="ruleForm.allUpload"></el-input>
            </el-form-item>
            <el-form-item label="用户宽带" style="text-align: left;margin-bottom: 10px !important">
                <el-switch v-model="ruleForm.userNetStatus"></el-switch>
            </el-form-item>
            <el-form-item label="下载(Kb/s)" prop="userDownload">
                <el-input v-model="ruleForm.userDownload"></el-input>
            </el-form-item>
            <el-form-item label="上传(Kb/s)" prop="userUpload" style="margin-bottom: 30px !important">
                <el-input v-model="ruleForm.userUpload"></el-input>
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
                allNetStatus: true,
                allDownload: '',
                allUpload: '',
                userNetStatus: true,
                userDownload: '',
                userUpload: ''
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
.speed-limit{
    padding-top: 30px;
    padding-left: 50px;
}
</style>
