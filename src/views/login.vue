<template>
    <div class="loginpagebox">
        <div class="topbgbox">
            <div class="commonWidth">
                <div class="clearfix mb54">
                    <div class="fl sebelogo"><img src="~assets/img/login/logo.png" alt=""></div>
                    <h3 class="fl plat">服务商平台</h3>
                    <p class="fl platintr">阿里巴巴 · 创新保唯一指定合作伙伴</p>
                    <a class="fr tohome" href="">首页</a>
                </div>
            </div>
            <div class="commonWidth">
                <div class="fl yqbox">
                    <img src="~assets/img/login/yq.png" alt="">
                </div>
                <div class="fr loginbox">
                    <h3>登录服务商平台</h3>
                    <div class="acount">
                        <span class="label">账号</span>
                        <input type="text" v-model="name" placeholder="请输入您的用户名">
                    </div>
                    <div class="mima">
                        <span class="label">密码</span>
                        <input type="password" v-model="password" @keyup.enter="login" placeholder="请输入您的密码">
                    </div>
                    <div class="loginbtn" @click="login">登录</div>
                    <p class="loginintr">忘记密码请联系客服：4000-315-426</p>
                </div>
                
            </div>
        </div>
        <div class="commonWidth">
            <ul class="platfeature">
                <li v-for="(item, index) in feature" :key="index">
                    <div class="picbox"><img :src="item.pic" alt=""></div>
                    <h3 class="title">{{item.title}}</h3>
                    <p class="conts">{{item.cont}}</p>
                </li>
            </ul>
        </div>
        <div class="platformdata">
            <div class="commonWidth databox">
                <h3 class="title">平台数据</h3>
                <ul class="datalist">
                    <li v-for="(item, index) in datalists" :key="index">
                        <div class="picbox"><img :src="item.pic" alt=""></div>
                        <h3 class="title">{{item.title}}</h3>
                        <p class="conts">{{item.cont}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="platformfriend ">
            <div class="commonWidth friendbox">
                <h3 class="title">合作伙伴</h3>
                <ul class="friends">
                    <li v-for="(item, index) in friends" :key="index">
                        <div class="picbox"><img :src="item.pic" alt=""></div>
                        <h3 class="title">{{item.title}}</h3>
                        <p class="conts">{{item.cont}}</p>
                    </li>
                </ul>
                <ul class="friendlinks">
                    <li v-for="(it, key) in links" :key="key"><img :src="it.pic" alt=""></li>
                </ul>
            </div>
        </div>
        <div class="platformjoin">
            <div class="commonWidth joinus">
                <h3 class="title">加盟我们</h3>
                
                <ul class="steps">
                    <li v-for="(item, index) in steps" :key="index">
                        <div class="lineitem lineleft"></div>
                        <div class="lineitem lineright"></div>
                        <div class="itembox">
                            <div class="picbox"><img :src="item.pic" alt=""></div>
                            <h3 class="title">{{item.title}}</h3>
                            <p class="conts">{{item.cont}}</p>
                        </div>
                    </li>
                </ul>
                <div class="applyjoin">
                    <span>申请入驻</span>
                </div>
            </div>
        </div>
        <div class="loginfooter">
            <p>© 2017 拾贝 All rights reserved 浙ICP备15042618号 | 浙公网安备 33010402003197号</p>
            <p>杭州拾贝知识产权服务有限公司</p>
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
            feature: [
                { pic: require('assets/img/login/f1.png'), title: '平台智能派单', cont: '平台订单全量分发，解决获客难题自主设计订单智能分派算法，确保订单分配合理、高效、及时'},
                { pic: require('assets/img/login/f2.png'), title: '全流程服务管理', cont: '创造性研发行业软件，帮助服务商完成售前客服、客户管理、子账号管理、财务结算、售后管理等工作'},
                { pic: require('assets/img/login/f3.png'), title: '丰厚服务佣金', cont: '根据服务商服务交付情况提供丰厚佣金，轻松获客的同时，享有高比例利润分成'},
                { pic: require('assets/img/login/f4.png'), title: '全网营销支持', cont: '每年拾贝投入大量的资金、资源支撑平台营销，保障服务商享有稳定的客户来源'},
            ],
            datalists: [
                { pic: require('assets/img/login/d1.png'), title: '150家', cont: '优质服务商入驻'},
                { pic: require('assets/img/login/d2.png'), title: '1000万', cont: '覆盖客户数'},
                { pic: require('assets/img/login/d3.png'), title: '100万', cont: '优质服务（次）'},
            ],
            friends: [
                { pic: require('assets/img/login/caasa.png'), title: '中国反侵权假冒创新战略联盟', cont: '系中国反侵权假冒战略联盟理事长单位《中国反侵权战略假冒年度报告》编辑单位'},
                { pic: require('assets/img/login/al.png'), title: '阿里巴巴知识产权保护平台', cont: '与阿里巴巴集团签署战略合作协议，独家承接平台商家的确权服务'},
                { pic: require('assets/img/login/csj.png'), title: '浙江清华长三角研究院', cont: '系长三院杭州分院知识产权中心,全面负责知识产权研究工作'},
            ],
            links: [
                { pic: require('assets/img/login/360.png'), link: '' },
                { pic: require('assets/img/login/jd.png'), link: '' },
                { pic: require('assets/img/login/hw.png'), link: '' },
                { pic: require('assets/img/login/bd.png'), link: '' },
                { pic: require('assets/img/login/ch.png'), link: '' }
            ],
            steps: [
                { pic: require('assets/img/login/i1.png'), title: '提交申请资料', cont: '提交入驻申请，工作人员进行审核'},
                { pic: require('assets/img/login/i2.png'), title: '确认合作意向', cont: '审核通过，签订入驻平台协议'},
                { pic: require('assets/img/login/i3.png'), title: '入驻成功', cont: '立即开通，成为服务商'},
            ]
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
    background-color: #F5F6F9;
    .mb54 {
        margin-bottom: 54px;
    }
    .topbgbox {
        height: 522px;
        padding-top: 27px;
        background: url('~assets/img/login/bga.png') center center no-repeat;
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
            font-family:'NotoSansHans-Bold','NotoSansHans';
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
    }
    .yqbox {
        width: 368px;
        height: 106px;
        margin-top: 78px;
        > img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .loginbox {
        width:380px;
        height:362px;
        padding: 40px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 4px 0px rgba(0,0,0,0.2);
        border-radius:3px;
        > h3 {
            height:26px;
            margin-bottom: 40px;
            font-size:20px;
            font-family:'MicrosoftYaHei';
            color:rgba(34,51,68,1);
            line-height:26px;
        }
        .acount {
            display: flex;
            padding: 10px 0;
            border-bottom: 1px solid #DFE2E5;
            margin-bottom: 23px;
            .label {
                width:40px;
                height:19px;
                font-size:14px;
                font-family:'MicrosoftYaHei';
                color:rgba(85,102,119,1);
                line-height:19px;
            }
            > input {
                flex: 1;
                padding: 0 10px;
            }
        }
        .mima {
            display: flex;
            padding: 10px 0;
            margin-bottom: 50px;
            border-bottom: 1px solid #DFE2E5;
            .label {
                width:40px;
                height:19px;
                font-size:14px;
                font-family:'MicrosoftYaHei';
                color:rgba(85,102,119,1);
                line-height:19px;
            }
            > input {
                flex: 1;
                padding: 0 10px;
            }
        }
        .loginbtn {
            width:100%;
            height:39px;
            margin-bottom: 18px;
            background:linear-gradient(90deg,rgba(26,138,255,1) 0%,rgba(8,165,255,1) 100%);
            border-radius:3px;
            font-size:16px;
            font-family:'MicrosoftYaHei';
            color:rgba(255,255,255,1);
            line-height:39px;
            text-align: center;
            cursor: pointer;
        }
        .loginintr {
            height:19px;
            font-size:14px;
            font-family:'MicrosoftYaHei';
            color:rgba(153,153,153,1);
            line-height:19px;
            text-align: center;
        }
    }
    .platfeature {
        display: flex;
        padding-top: 150px;
        padding-bottom: 78px;
        justify-content: space-between;
        > li {
            width: 270px;
            height: 300px;
            border-radius: 3px;
            background-color: #fff;
            padding: 65px 30px 20px;
            text-align: center;
            &:hover {
                transform: translateY(-10);
                box-shadow:0px 6px 20px 0px rgba(190,190,207,0.5);
            }
            .picbox {
                width: 74px;
                height: 70px;
                margin-left: auto;
                margin-right: auto;
                margin-bottom: 25px;
                > img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    
                }
            }
            .title {
                height:25px;
                margin-bottom: 15px;
                font-size:18px;
                font-family:'PingFangSC-Regular','PingFang SC';
                color:rgba(34,51,68,1);
                line-height:25px;
            }
            .conts {
                font-size:14px;
                font-family:'PingFangSC-Regular','PingFang SC';
                color:rgba(85,102,119,1);
                line-height:21px;
            }
        }
    }
    .platformdata {
        
        height: 358px;
        width: 100%;
        background: url('~assets/img/login/bg.png') center center no-repeat;
        background-size: 100% 100%;
        .databox {
            position: relative;
            padding-top: 60px;
            .title {
                height:40px;
                font-size:28px;
                font-family:'PingFangSC-Regular','PingFang SC';
                color:rgba(255,255,255,1);
                line-height:40px;
                text-align: center;
            }
            .datalist {
                position: absolute;
                display: flex;
                justify-content: space-between;
                top: 160px;
                width:100%;
                height:253px;
                padding: 60px 140px 20px;
                background:rgba(255,255,255,1);
                box-shadow:0px 6px 20px 0px rgba(190,190,207,0.5);
                border-radius:3px; 
                > li {
                    max-width: 150px;
                    text-align: center;
                }
                .picbox {
                    width: 46px;
                    height: 40px;
                    margin-left: auto;
                    margin-right: auto;
                    margin-bottom: 15px;
                    > img {
                        display: block;
                        width: 100%;
                        height: 100%;
                        
                    }
                }
                .title {
                    margin-bottom: 6px;
                    height:50px;
                    font-size:36px;
                    font-family:'ArialMT';
                    color:rgba(71,156,255,1);
                    line-height:42px;
                }
                .conts {
                    font-size:14px;
                    font-family:'PingFangSC-Regular','PingFang SC';
                    color:rgba(85,102,119,1);
                    line-height:21px;
                }
            }   
        }
        
    }
    .platformfriend {
        height: 510px;
        padding-top: 116px;
        background-color: #fff;
        .friendbox {
            .title {
                height:40px;
                font-size:28px;
                margin-bottom: 40px;
                font-family:'PingFangSC-Regular','PingFang SC';
                color:#234;
                line-height:40px;
                text-align: center;
            }
            .friends {
                display: flex;
                justify-content: space-between;
                margin-bottom: 40px;
                > li {
                    width: 270px;
                    text-align: center;
                }
                .picbox {
                    width: 124px;
                    height: 60px;
                    margin-left: auto;
                    margin-right: auto;
                    margin-bottom: 20px;
                    > img {
                        height: 100%;
                    }
                }
                .title {
                    margin-bottom: 10px;
                    height:22px;
                    font-size:16px;
                    font-family:'PingFangSC-Regular','PingFang SC';
                    color:rgba(34,51,68,1);
                    line-height:22px;
                }
                .conts {
                    font-size:14px;
                    font-family:'PingFangSC-Regular','PingFang SC';
                    color:rgba(85,102,119,1);
                    line-height:21px;
                }
            }
            .friendlinks {
                display: flex;
                justify-content: space-between;
                > li {
                    width: 210px;
                    height: 60px;
                    border: 1px solid #DFE2E5;
                    text-align: center;
                    img {
                        width: 104px;
                        height: 36px;
                        margin-top: 12px;   
                    }
                }
            } 
        }
    }
    .platformjoin {
        padding-bottom: 60px;
        border-bottom: 1px solid #DFE2E5;
        .joinus {
            padding-top: 60px;
            .title {
                height:40px;
                font-size:28px;
                margin-bottom: 40px;
                font-family:'PingFangSC-Regular','PingFang SC';
                color:#234;
                line-height:40px;
                text-align: center;
            }
            .steps {
                display: flex;
                justify-content: space-between;
                margin-bottom: 40px;
                > li {
                    position: relative;
                    width: 390px;
                    padding: 0 60px;
                    .lineitem {
                        position: absolute;
                        top: 48px;
                        width: 52%;
                        border-bottom: 1px solid #DFE2E5;
                    }
                    .lineleft {
                        left: 0;
                    }
                    .lineright {
                        right: 0;
                    }
                    &:first-child {
                        padding: 0;
                        padding-right: 120px;
                        .lineleft {
                            display: none;
                        }
                    }
                    &:last-child {
                        padding: 0;
                        padding-left: 120px;
                        .lineright {
                            display: none;
                        }
                    }

                }
                .itembox {
                    width: 270px;
                    text-align: center;
                }
                .picbox {
                    position: relative;
                    width: 100px;
                    height: 100px;
                    margin-left: auto;
                    margin-right: auto;
                    border-radius: 100%;
                    margin-bottom: 20px;
                    text-align: center;
                    padding-top: 34px;
                    z-index: 9;
                    border: 1px solid #479CFF;
                    background-color: #F5F6F9;
                    > img {
                        height: 36px;
                        width: 32px;
                    }
                }
                .title {
                    margin-bottom: 10px;
                    height:22px;
                    font-size:16px;
                    font-family:'PingFangSC-Regular','PingFang SC';
                    color:#234;
                    line-height:22px;
                }
                .conts {
                    font-size:14px;
                    font-family:'PingFangSC-Regular','PingFang SC';
                    color:rgba(85,102,119,1);
                    line-height:21px;
                }
            }
            .applyjoin {
                font-size: 0;
                text-align: center;
                > span {
                    display: inline-block;
                    width:200px;
                    height:40px;
                    background:linear-gradient(90deg,rgba(26,138,255,1) 0%,rgba(8,165,255,1) 100%);
                    border-radius:3px; 
                    color: #fff;
                    font-size:14px;
                    font-family:'PingFangSC-Regular','PingFang SC';
                    color:rgba(255,255,255,1);
                    line-height:40px;
                    cursor: pointer;
                }
            }
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
    }
}
</style>
