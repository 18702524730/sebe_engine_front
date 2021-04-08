<template>
    <div class="loginpagebox">
        <div class="topbgbox">
                <div class="fl yqbox">
                    <!-- <img src="~assets/img/login/logo.png" alt=""> -->
                </div>
                <div class="fr loginbox">
                    <h3>登录</h3>
                    <div class="acount">
                        <div class="label">
                           账号
                        </div>
                        
                        <input type="text" v-model="name" placeholder="请输入您的用户名">
                    </div>
                    <div class="mima">
                        <div class="label">密码</div>
                        <input type="password" v-model="password" @keyup.enter="login" placeholder="请输入您的密码">
                    </div>
                    <div class="loginbtn" @click="login">登录</div>
                    <p class="loginintr">忘记密码请联系客服：{{kefu}}</p>
                </div>
                <!-- <div class="sebeengine">
                    <h3 class="enname">SEBE ENGINE</h3>
                    <h3 class="cnname">拾贝引擎</h3>
                </div> -->
        </div>
        
        <div class="loginfooter">
            <a href="https://beian.miit.gov.cn" target="_blank">浙ICP备15042618号-1</a> | <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010402001523" target="_blank">浙公网安备 33010402001523号</a> © 2015-现在 拾贝公司 All Rights Reserved
        </div>
    </div>
</template>
<script>
import md5 from 'md5'
import store from 'utils/store/'
const loginUrl = '/api/login'
export default {
    data() {
        return {
            name: '',
            password: '',
           kefu: CONFIG.kefu
        }
    },
    methods: {
        login() {
            if (!this.name) {
                this.$message.warning('请输入用户名')
                return 
            }
            if (!this.password) {
                this.$message.warning('请输入密码')
                return 
            }
            const data = {
                name: this.name,
                password: md5(this.password)
            }
            this.$http.post(loginUrl, data).then(res => {
                const userinfo = res.data
                store.set('userinfo', userinfo)
                this.name = ''
                this.password = ''
                this.tohome()
                console.log(res.data)
            }).catch( err=> {
                this.$message.error(err.response.data.msg || '登录失败')
            })
        },
        tohome() {
            this.$router.push({ name: 'homepage' })
        }
    }
}
</script>

<style lang="less">
.loginpagebox {
    width: 100%;
    height: 100%;
    background:url('~assets/img/login/loginbg.png') center center no-repeat;
    background-size: auto 100%;
    background-color: #072549;
    display: flex;
    align-items: center;
    .mb54 {
        margin-bottom: 54px;
    }
    .topbgbox {
        position: relative;
        height:800px;
        width: 1280px;
        margin: 0 auto;
        // padding: 57px 57px 60px 102px;
        padding: 38px 0 38px 38px; 
        background: url('~assets/img/login/bgl.png') center center no-repeat;
        background-size: 100% 100%;
        .sebelogo {
            width: 130px;
            height: 21px;
            margin-right: 10px;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .plat {
            height:22px;
            margin-right: 15px;
            font-size:22px;
            font-weight:bold;
            color:#fff;
            line-height:22px;
        }
        .platintr {
            height:22px;
            padding-top: 8px;
            font-size:14px;
            font-family:'MicrosoftYaHei';
            color:rgba(255,255,255,0.8);
            line-height:14px;
        }
        .tohome {
            height:21px;
            font-size:16px;
            font-family:'MicrosoftYaHei';
            color:rgba(255,255,255,1);
            line-height:21px;
        }
        .sebeengine {
            position: absolute;
            left: 350px;
            bottom: 180px;
            padding-left: 300px;
            color: #fff;
            > h3 {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-weight: normal;
                
            }
            .enname {
                font-size: 50px;
                padding-left: 300px;
            }
            .cnname {
                padding-left: 300px;
            }
        }
    }
    .yqbox {
        width: 95px;
        height: 30px;
        margin-top: 32px;
        > img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .loginbox {
        width:357px;
        height: 100%;
        padding: 100px 50px;
        background:url('~assets/img/login/login.png') left top no-repeat;
        background-size: 100% 100%;
        background-color: #fff;
        border-radius:3px;
        > h3 {
            width: 50px;
            text-align: center;
            height:30px;
            font-size:20px;
            font-family:'PingFangSC-Regular','PingFang SC';
            font-weight:400;
            color:rgba(31,45,61,1);
            line-height:28px;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 88px;
            border-bottom: 2px solid #3367A2;
        }
        .acount {
            // display: flex;
            // padding: 10px 0;
            // border-bottom: 1px solid #DFE2E5;
            margin-bottom: 20px;
            .label {
                height:20px;
                margin-bottom: 5px;
                font-size:14px;
                font-family:'PingFangSC-Regular','PingFang SC';
                font-weight:400;
                color:rgba(31,45,61,1);
                line-height:20px;
            }
            > input {
                // flex: 1;
                width: 100%;
                height: 36px;
                padding: 0 10px;
                border:1px solid #DFE2E5;
                border-radius: 2px;
            }
        }
        .mima {
            // display: flex;
            // padding: 10px 0;
            margin-bottom: 58px;
            // border-bottom: 1px solid #DFE2E5;
            .label {
                height:20px;
                margin-bottom: 5px;
                font-size:14px;
                font-family:'PingFangSC-Regular','PingFang SC';
                font-weight:400;
                color:rgba(31,45,61,1);
                line-height:20px;
            }
            > input {
                width: 100%;
                height: 36px;
                padding: 0 10px;
                border:1px solid #DFE2E5;
                border-radius: 2px;
            }
        }
        .loginbtn {
            width:100%;
            height:48px;
            margin-bottom: 58px;
            background:rgba(51,103,162,1);
            box-shadow:0px 7px 11px 0px rgba(51,103,162,0.26);
            border-radius:4px;
            color:rgba(255,255,255,1);
            line-height:48px;
            text-align: center;
            cursor: pointer;
        }
        .loginintr {
            font-size:14px;
            font-family:'MicrosoftYaHei';
            color:rgba(153,153,153,1);
            line-height:19px;
            text-align: center;
        }
    }
    .loginfooter {
        width: 1200px;
        padding: 20px 15px;
        margin: 0 auto;
        text-align: center;
        font-size:12px;
        font-family:'MicrosoftYaHei';
        color:rgba(153,153,153,1);
        line-height:16px;
        position: absolute;
        width: 100%;
        bottom: 20px;
        color: #fff;
        a{color: #fff;}
    }
}
</style>
