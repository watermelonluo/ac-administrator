<template>
    <div class="login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
            <el-form-item label="管理员" prop="admin">               
                <el-input v-model="ruleForm.admin" placeholder="请输入用户名" class="input"></el-input>
            </el-form-item>
        
            <el-form-item label="密码" prop="password">               
                <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" class="input"></el-input>
            </el-form-item>
            <div style="height:20px"></div>        
            <el-form-item>
                <el-button round class="btn" @click.native.prevent="submitLogin('ruleForm')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                password: '',
                admin:''       
            },
            rules: {
                admin: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                ]
                                                        
            }
        }
    },
    methods: {
        submitLogin(){
            this.$router.push('/')
        }
    },
}
</script>

<style lang="less">
    .login{
        height: 100%;
        background-color: #313e4a;
        display: flex;
        justify-content: center;
        align-items: center;
        .el-form{
            width: 400px;
            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Chrome/Safari/Opera */
            -khtml-user-select: none; /* Konqueror */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently */
            .el-input__inner{
                background-color: rgba(255, 255, 255, .9);
            }
            .el-form-item__label{
                color: rgba(255, 255, 255, .9);
            }
            .btn{
                width: 200px;
                background-color: #3268ca;
                color: rgba(255, 255, 255, .9);
                font-size: 16px;
                letter-spacing: 2px;
                border: none;           
            }
            .btn:hover{
                background-color: #225dc7;
            }
        }
    }
</style>


