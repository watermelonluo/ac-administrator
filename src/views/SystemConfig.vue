<template>
    <div class="system-config">
        <div class="container-fluid" id="rebootReset">
            <div class="row">
                <div class="col-12 rebootResetTitle">
                    系统重启 / 系统重置
                </div>
            </div>

            <div class="rebootResetCon text-center" style="border-top: none;padding: 36px 0">
                <span id="reboot">重启</span>
                <span id="reset">重置</span>

            </div>
        </div>


        <div class="container-fluid" id="update">

            <div class="row">
                <div class="col-12 uploadTitle">
                    系统固件升级
                </div>
            </div>

            <div class="row uploadCon" style="border-top: none;padding: 36px 15px;border-bottom: none">
                <div class="col-12" style="padding: 30px">
                    <div style="margin-left:50px;">
                        <input type="file" name="FileUpload" id="FileUpload">
                        <input type="checkbox" id="isCheck">
                        <span class="saveConfig">保留配置</span>
                    </div>
                </div>
            </div>
            <div class="row handleBtn" style="border-top: none;padding-bottom: 36px">
                <div class="col-3" style="padding: 30px; margin-left:50px;">
                     <el-button type="primary">上传</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.system-config{
    text-align: left;
}
#reboot,#reset{
    text-align: center;
    width: 56px;
    height: 56px;
    display: inline-block;
    color: white;
    border-radius: 50%;
    cursor: pointer;
    font-size: 14px;
    line-height: 56px;
    transition: background-color 0.3s;
}
#reboot{
    background-color: #65B2F9;
    margin-left: 100px;
}
#reset{
    background-color: #6f777b;
    margin-left: 100px;
}
#reboot:hover{
    background-color: #2693f7;
}
#reset:hover{
    background-color: #5a5c5e;
}


#uploadBtn:hover{
    background-color: #2693f7;
}

#update input[type='file']{
    color: #4a577d;
    background: #cce5ff;
    margin-right: 30px;
    font-size: 14px;
}
#isCheck{
    margin-right: 2px;
    height: 14px;
    width: 14px;
    vertical-align: middle;
    margin-bottom: 2px;
}
.saveConfig{
    color: #4a577d;
    font-size: 14px;
}
#rebootReset,#update{
    margin-top: 36px;
    padding: 0 36px;
}
.rebootResetTitle,.uploadTitle{
    font-size: 16px;
    color: #5A82B0;
    padding: 10px 0 10px 20px;
}
#rebootReset .row,#update .row{
    border: 1px solid #E7E7E7;
}
.rebootResetCon{
    display: flex;
    border: 1px solid #E7E7E7;
}
</style>
