<template>
    <div class="sebeleftmenu">
        <div class="listlogo" @click="tohome">
            <img src="~assets/img/login/logo.png" alt="">
        </div>
        <div class="addcontact" @click="openapply">
            <span class="iconbox"><img src="~assets/img/list/i1.png" alt=""></span>
            <span class="labelname">新增申请人</span>
        </div>
        <div class="addorder" @click="toaddorder">
            <span class="iconbox"><img src="~assets/img/list/i2.png" alt=""></span>
            <span class="labelname">新增订单</span>
        </div>
        <ul class="routeslist">
            <li :class="{active: item.rname == activeroute}" v-for="(item, index) in menulist" :key="index" @click="toroute(item)"><span :class="'iconbox ' + item.pic"></span><span class="labelname">{{item.label}}</span></li>
        </ul>
        <div class="server">
            <p>客服热线</p>
            <p>{{kefu}}</p>
        </div>
        <addapplicant ref="addApplicant"></addapplicant>
    </div>

</template>
<script>
import addapplicant from  'cps/public/addapplicant.vue'
export default {
    name: 'leftMenu',
    
    data() {
        return {
            menulist: [],
            kefu: CONFIG.kefu
        }
    },
    components: {
        addapplicant
    },
    computed: {
        activeroute() {
            return this.$route.matched[1].name
        }
    },
    created() {
        this.getmenus()
        console.log(this.menulist)
        const r =this.$route.matched[1].name
        console.log(r)
    },
    methods: {
        tohome() {
            this.$router.push({ name: 'orderhome' })
        },
        openapply() {
            this.$refs.addApplicant.showmodal()
        },
        toaddorder() {
            this.$router.push({ name: 'stepone'})
        },
        toroute(it) {
            this.$router.push({ name: it.rname})
        },
        getmenus() {
            
            const rts = this.$router.options.routes
            const cmenulist = []
            rts.forEach(item => {
                if (item.path == '/home') {
                    if (item.children && item.children.length) {
                        const clist = item.children
                        clist.forEach(it => {
                            if(!it.hidden) {
                                const cobj = {}
                                cobj.path = '/home/' + it.path
                                cobj.pic = it.meta.cname
                                cobj.rname = it.name
                                cobj.label = it.meta.name
                                cmenulist.push(cobj)
                            }
                        })
                    }
                }
            })
            this.menulist = cmenulist
        }
    }
}
</script>

<style lang="less">
.sebeleftmenu {
    position: fixed;
    left: 0;
    top: 0;
    width: 207px;
    height: 100%;
    padding-top: 50px;
    z-index: 20;
    background:linear-gradient(180deg,rgba(18,59,97,1) 0%,rgba(41,82,138,1) 100%);
    font-family: "思源黑体";
    .listlogo {
        width: 90px;
        height: 35px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 50px;
        cursor: pointer;
        > img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .appname {
        height:28px;
        margin-bottom: 37px;
        font-size:20px;
        font-weight:500;
        color:rgba(165,210,255,1);
        line-height:28px;
        text-align: center;
    }
    .addcontact,
    .addorder {
        width:153px;
        height:58px;
        padding: 18px 0 19px 15px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 34px;
        background:rgba(51,103,162,1);
        border-radius:4px;
        color: #fff; 
        cursor: pointer;
        > span {
            float: left;
        }
        .iconbox {
            width: 22px;
            height: 22px;
            margin-right: 16px;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .labelname {
            font-size:15px;
            color:rgba(255,255,255,1);
            line-height:24px;
        }
    }
    .addorder {
        margin-bottom: 34px;
    }
    .routeslist {
        margin-bottom: 85px;
        > li {
            height: 60px;
            padding: 19px 30px;

            cursor: pointer;
            &.active {
                background-color: #0F2F51;
            }
            > span {
                float: left;
            }
            .iconbox {
                width: 20px;
                height: 20px;
                margin-right: 16px;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-position: center center;
            }
            .myorders {
                background-image: url('~assets/img/list/i3.png')
            }
            .applicant {
                background-image: url('~assets/img/list/i4.png')
            }
            .official {
                background-image: url('~assets/img/list/i5.png')
            }
            .usercenter {
                background-image: url('~assets/img/list/i6.png')
            }
            .labelname {
                font-size:14px;
                color:rgba(255,255,255,1);
                line-height:24px;
            }
        }
    }
    .server {
        position: absolute;
        width: 100%;
        bottom: 50px;
        left: 0;
        font-size:14px;
        color:rgba(255,255,255,0.9);
        line-height:22px;
        text-align: center;
    }
}
</style>

