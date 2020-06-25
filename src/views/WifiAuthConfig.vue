<template>
    <div class="wifi-auth-config">   
        <div class="switch-con">
            <span>认证开关</span>
            <el-switch style="text-align: left;" v-model="value"></el-switch>
        </div>
        <div class="container">
           <div class="form-container">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">           
                    <el-form-item label="设置标题" prop="title">
                        <el-input v-model="ruleForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="内容描述" prop="content">
                        <el-input v-model="ruleForm.content"></el-input>
                    </el-form-item>                      
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    </el-form-item>         
                </el-form>
                <div class="pic-upload">
                    <h3 class="title">图片上传</h3>
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
           </div>             
            <div id="leftCon">
                <div id="title">这里是标题</div>
                <p id="setText">这里是描述内容</p>                  
                <div id="img">
                    <img src="../assets/test2.png">
                </div>
                <div class="freeNetWork">
                    <a>免 费 上 网</a>
                </div>
                <footer>
                    <a class="cellphone">手机认证</a>
                    <a class="wechat">微信认证</a>
                </footer>
            </div> 
        </div>       
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: false,
            ruleForm: {
                title: '',
                content: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                ],
                content: [
                    { required: true, message: '请输入描述内容', trigger: 'blur' }
                ]             
            },
            dialogImageUrl: '',
            dialogVisible: false
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
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      } 
    }
}
</script>

<style lang="less">
.wifi-auth-config{
    padding: 30px 40px;
    .switch-con{
        text-align: left;
        margin-bottom: 30px;
        span{
            margin-right: 10px;
        }
    }
    .container{
        display: flex;
    }
}
.pic-upload{
    text-align: left;
    .title{
        font-size: 16px;
        margin-bottom: 10px;
        font-weight: normal;
    }
}
.form-container{
    .el-form{
        margin-bottom: 50px;
    }
}
#leftCon{
    border: 1px solid #CCCCCC;
    width: 270px;
    height: 480px;
    box-shadow: 1px 2px 10px #bbc;
    margin-left: 100px;
}

#leftCon img{
    width: 100%;
    display: block;
}
#leftCon #title{
    padding: 6px 0;
    font-size: 16px;
    color: #071c31;
    margin-bottom: 10px;
}
#leftCon section{
    padding: 0 10px;
}
#leftCon h3{
    font-size: 20px;
    padding-top: 20px;
    margin-bottom: 15px;
    font-weight: 500;
    color: #071c31;
}
#leftCon #setText{
    color: #4a577d;
    margin-bottom: 15px;
    font-size: 14px;
    padding: 0 20px;
}
 #img{
    overflow: hidden;
}
.freeNetWork{
    margin-top: 15px;
    padding: 0 30px;
}
.freeNetWork a{
    display: block;
}
footer{
    display: flex;
    padding: 5px 30px;
    justify-content: space-between;
}
footer .cellphone,footer .wechat,.freeNetWork a{
    font-size: 16px;
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #47be46;
    color: white !important;
    border-radius: 3px;
    font-weight: 500;
}

#rightCon span{
    font-size: 14px;
}

#rightCon #titleVal,#rightCon #contentVal,#headVal{
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 3px 10px;
    outline: none;
    color: #4a577d;
    font-size: 14px;
    margin-left: 12px;
}
</style>
