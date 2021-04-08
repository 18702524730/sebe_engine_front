<template>
    <div class="userhome" :style="{ minHeight: cheight}">
        <div class="topcont">
            <h3>机构基本信息 </h3>
            <div class="msginfo">
                <div class="infoitem">
                    <span class="itemlabel">机构名称：</span><span class="itemcont">{{info.spName}}</span>
                </div>
                <div class="infoitem">
                    <span class="itemlabel">联系人：</span><span class="itemcont">{{info.spContacts}}</span>
                </div>
                <div class="infoitem">
                    <span class="itemlabel">联系电话：</span><span class="itemcont">{{info.spPhone}}</span>
                </div>
                <div class="infoitem">
                    <span class="itemlabel">账户名：</span><span class="itemcont">{{info.spAccount}}</span>
                </div>
                <p>若存在有误信息请致电客服热线 {{kefu}}</p>
            </div>
        </div>
        <div class="acountmsg">
            <div class="acount">
                <p>账户可用余额：</p>
                <h2 v-if="info.balance">¥ {{info.balance | priceFormat }}</h2>
                <h2 v-if="!info.balance">¥ 0.00</h2>
                <div class="tolistbtn" @click="tolist">查看明细</div>
            </div>
            <div class="voucher">
                <p>请输入您要充值的数额：</p>
                <h2><span class="unit">￥</span><input class="topupnum" v-model="acount" type="text" placeholder="0.00"></h2>
                <div class="topupbtn" @click="topup">立即充值</div>
            </div>
        </div>
        <el-dialog :title="title" :visible.sync="chonzhishow" width="600px" top="30vh" :close-on-click-modal="false" :before-close="resetdata">
            <div class="chongzhimsg">
                <h3>充值金额：{{acount}}元</h3>
                <div class="zhifutype" v-if="!zftype">
                    <div @click="changezf('wx')" :class="{active: zftype == 'wx'}" style="width: 150px;height: 60px; border: 1px solid #f2f2f2;text-align: center;padding-top: 14px">
                        <img src="~assets/img/wx.png" alt="">
                    </div>
                    <div @click="changezf('zfb')" :class="{active: zftype == 'zfb'}" style="width: 150px;height: 60px; border: 1px solid #f2f2f2;text-align: center;padding-top: 14px">
                        <img src="~assets/img/zfb.png" alt="">
                    </div>
                </div>
                <div class="codebox" v-if="zftype">
                    <qrcode v-if="qcodeUrl" :val="qcodeUrl" :size="180"></qrcode>
                    <img class="wx" src="~assets/img/wx_icon.png" alt="" v-if="zftype=='wx' && qcodeUrl">
                    <img class="zfb" src="~assets/img/zfb_icon.png" alt="" v-if="zftype=='zfb' && qcodeUrl">
                    <p @click="qiehuan" v-if="qcodeUrl">切换支付方式</p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import qrcode from 'cps/qrcode/qrcode.vue'
import Filters from 'utils/filters'
const infoUrl = '/api/spInfo'
const codeUrl = '/api/payment'
const stateUrl = '/api/getPaymentState'
export default {
    data() {
        return {
            cheight: '300px',
            acount: '',
            info: {},
            title: '请选择充值方式',
            kefu: CONFIG.kefu,
            chonzhishow: false,
            paymentSn: '',
            qcodeUrl: '',
            zftype: '',
            timer: null
        }
    },
    components: {
		qrcode
    },
    filters: {
        priceFormat: Filters.priceformat
    },
    methods: {
        getheight() {
            const doc = document.body || document.documentElement
            this.cheight = doc.clientHeight  - 84 + 'px'
        },
        changezf(str) {
            this.zftype = str
            this.title = "请扫码充值"
            this.getcodeurl()
        },
        resetdata() {
            this.title = '请选择充值方式'
            this.qcodeUrl = ''
            this.zftype = ''
            this.chonzhishow = false
            clearInterval(this.timer)
        },
        qiehuan() {
            this.zftype = ''
            this.title = "请选择充值方式"
        },
        tolist() {
            this.$router.push({ name: 'userlist' })
        },
        getinfo(){
            this.$http.get(infoUrl).then(res => {
                this.info = res.data
            })
        },
        lunxun() {
            clearInterval(this.timer)
            this.timer = setInterval(() => {
                this.getstate()
            }, 5000);
        },
        getstate() {
            this.$http.get(stateUrl + "?paymentSn=" + this.paymentSn).then(res => {
                if (res.data.paymentState == 1) {
                    this.$message.success('支付成功')
                    clearInterval(this.timer)
                    this.chonzhishow = false
                    this.getinfo()
                }
            }).catch(err => {
                this.$message.success(err.response.data.msg||'请重试')
                clearInterval(this.timer)
                this.zftype = false
            })
        },
        getcodeurl() {
            const data = {
                amount: this.acount
            }
            if (this.zftype == 'wx') {
                data.channel = 'wx_pub_qr'
            }
            if (this.zftype == 'zfb') {
                data.channel = 'alipay_pc_direct'
            }
            this.$http.post(codeUrl, data).then(res => {
                this.qcodeUrl = res.data.codeUrl
                this.paymentSn = res.data.paymentSn
                this.lunxun()
            })
        },
        topup() {
            if (!this.acount) {
                this.$message.error('请输入充值金额')
                return
            }
            const reg = /(^[1-9]$)|(^[1-9]\d+$)|(^\d+\.\d{1,2}$)/
            if (!reg.test(this.acount)) {
                this.$message.error('请输入正确的充值金额')
                return
            }
            if(this.acount > 1000000) {
                this.$message.warning('单次充值最多100万')
                return
            }
            this.chonzhishow = true
        }
    },
    beforeDestroy() {
        const self = this;
        window.removeEventListener('resize', self.getheight)
    },
    mounted() {
        const self = this;
        this.getinfo()
        this.getheight()
        window.addEventListener('resize', self.getheight)
        // this.access();
    }
}
</script>

<style lang="less">
.userhome {
    background-color: #F1F7FA;
    .topcont {
        padding: 25px 30px;
        margin-bottom: 22px;
        background-color: #fff;
        > h3 {
            height:58px;
            padding-left: 25px;
            line-height: 58px;
            background:rgba(245,245,245,1);
            border:1px solid #DFE2E5;
            font-size:14px;
            font-family:'PingFangSC-Regular','PingFang SC';
            font-weight:normal;
            color:rgba(34,51,68,1);
        }
        .msginfo {
            padding: 25px;
            margin-top: -1px;
            background-color: #fff;
            border: 1px solid #DFE2E5;
            font-family:'PingFangSC-Regular','PingFang SC';
            .infoitem {
                font-size: 0;
                margin-bottom: 25px;
                .itemlabel {
                    display: inline-block;
                    width: 150px;
                    height: 20px;
                    line-height: 20px;
                    color: #567;
                    font-size: 14px;
                    vertical-align: middle;
                }
                .itemcont {
                    display: inline-block;
                    height: 20px;
                    line-height: 20px;
                    color: #234;
                    font-size: 14px;
                    vertical-align: middle;
                }
            }
            > p {
                height:17px;
                font-size:12px;
                color:rgba(153,153,153,1);
                line-height:17px;
            }
        }
    }
    .acountmsg {
        overflow: hidden;
        font-family:'PingFangSC-Regular','PingFang SC';
        .acount {
            float: left;
            width:276px;
            height:196px;
            padding: 18px 20px;
            margin-right: 30px; 
            background:rgba(255,255,255,1);
            border-radius:3px;
            > p {
                height:17px;
                margin-bottom: 25px;
                font-size:12px;
                color:rgba(153,153,153,1);
                line-height:17px;
            }
            > h2 {
                height:41px;
                font-size:29px;
                font-weight:normal;
                color:rgba(34,51,68,1);
                line-height:41px;
                margin-bottom: 25px;
            }
            .tolistbtn {
                width:142px;
                height:40px;
                margin-left: auto;
                margin-right: auto;
                border-radius:3px;
                border:1px solid rgba(223,226,229,1);
                font-size:14px;
                color:rgba(41,82,138,1);
                line-height:40px;
                text-align: center;
                cursor: pointer;
            }
        }
        .voucher {
            float: left;
            width:276px;
            height:196px;
            padding: 18px 20px;
            background:rgba(255,255,255,1);
            border-radius:3px;
            > p {
                height:17px;
                margin-bottom: 25px;
                font-size:12px;
                color:rgba(153,153,153,1);
                line-height:17px;
            }
            > h2 {
                height:41px;
                font-size:29px;
                font-weight:normal;
                color:rgba(34,51,68,1);
                border-bottom: 1px solid #DFE2E5;
                margin-bottom: 25px;
                .unit {
                    float: left;
                    height: 40px;
                    line-height: 40px;
                    margin-right: 10px;
                    vertical-align: middle;
                }
                .topupnum {
                    float: left;
                    width: 180px;
                    height: 40px;
                    line-height: 30px;
                    padding: 5px;
                    vertical-align: middle;
                    color: #234;
                }
            }
            .topupbtn {
                width:142px;
                height:40px;
                margin-left: auto;
                margin-right: auto;
                border-radius:3px;
                font-size:14px;
                background-color: #29528A;
                color:#fff;
                line-height:40px;
                text-align: center;
                cursor: pointer;
            }
        }
    }
    .chongzhimsg {
        padding: 30px;
        text-align: center;
        > h3 {
            font-size: 18px;
            color: #234;
            margin-bottom: 30px;
            font-family:'PingFangSC-Regular','PingFang SC';
            font-weight:400;
        }
        .zhifutype {
            width: 350px;
            padding-bottom: 30px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            > div {
                cursor: pointer;
                text-align: center;
            }
            
        }
        .codebox {
            position: relative;
            width: 180px;
            margin-left: auto;
            margin-right: auto;
            .wx {
                position: absolute;
                top: 70px;
                left: 70px;
            }
            .zfb {
                position: absolute;
                top: 70px;
                left: 70px;
            }
            > p {
                font-size: 14px;
                padding-top: 30px;
                cursor: pointer;
            }
        }
    }
}
</style>

