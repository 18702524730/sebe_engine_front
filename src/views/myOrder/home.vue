<template>
    <div class="homepage" :style="{ minHeight: cheight}">
        <div class="datasbox">
            <h3 class="title">数据概述 </h3>
            <ul class="datamsgs clearfix">
                <li @click="toapplist">
                    <div class="lefticon bg1"><img src="~assets/img/f1.png" alt=""></div>
                    <div class="rightcount">
                        <div>
                            <h3 class="num c1">{{appnum}}</h3>
                            <p class="shuoming">申请人个数</p>
                        </div>
                    </div>
                </li>
                <li @click="tolist('1')">
                    <div class="lefticon bg2"><img src="~assets/img/f2.png" alt=""></div>
                    <div class="rightcount">
                        <div>
                            <h3 class="num c2">{{info.auditWaited}}</h3>
                            <p class="shuoming">待审核订单数</p>
                        </div>
                    </div>
                </li>
                <li @click="tolist('3')">
                    <div class="lefticon bg3"><img src="~assets/img/f3.png" alt=""></div>
                    <div class="rightcount">
                        <div>
                            <h3 class="num c3">{{info.auditFail}}</h3>
                            <p class="shuoming">审核未通过订单数</p>
                        </div>
                    </div>
                </li>
                <li @click="tolist('3')">
                    <div class="lefticon bg4"><img src="~assets/img/f4.png" alt=""></div>
                    <div class="rightcount">
                        <div>
                            <h3 class="num c4">{{info.auditPass}}</h3>
                            <p class="shuoming">审核通过订单数</p>
                        </div>
                    </div>
                </li>
                <li @click="tolist('29')">
                    <div class="lefticon bg5"><img src="~assets/img/f5.png" alt=""></div>
                    <div class="rightcount">
                        <div>
                            <h3 class="num c5">{{info.trademarkOfficeReject}}</h3>
                            <p class="shuoming">商标局驳回数</p>
                        </div>
                    </div>
                </li>
                <li @click="tolist('22')">
                    <div class="lefticon bg6"><img src="~assets/img/f6.png" alt=""></div>
                    <div class="rightcount">
                        <div>
                            <h3 class="num c6">{{info.trademarkOfficeDismiss}}</h3>
                            <p class="shuoming">商标局不予受理数</p>
                        </div>
                    </div>
                </li>
                <li @click="tolists">
                    <div class="lefticon bg7"><img src="~assets/img/f7.png" alt=""></div>
                    <div class="rightcount">
                        <div>
                            <h3 class="num c7">{{info.supplementWaited}}</h3>
                            <p class="shuoming">待补正数</p>
                        </div>
                    </div>
                </li>

            </ul>
            <h3 class="title">订单趋势图 </h3>
            <div class="linechartsbox">
                <div id="stackChart">

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
const infoUrl = '/api/statisticTrademarkOrder'
export default {
    data() {
        return {
            cheight: '300px',
            acount: '',
            info: {
                auditFail: '',
                auditPass: '',
                auditWaited: '',
                supplementWaited: '',
                trademarkOfficeDismiss: '',
                trademarkOfficeReject: ''
            },
            appnum: '',
            timedata: [],
            numdata: []
        }
    },
    methods: {
        toapplist() {
            this.$router.push({name: 'applicant'})
        },
        tolists() {
            this.$router.push({name: 'myorder', query: {supplementState: '2'}})
        },
        getheight() {
            const doc = document.body || document.documentElement
            this.cheight = doc.clientHeight  - 84 + 'px'
        },
        tolist(num) {
            this.$router.push({ name: 'myorder', query: {state: num} })
        },
        createStack(){
            var stackOption = {
                title: {
                    text: '订单趋势',
                    show: false,
                    left:'20',
                    top:'20',
                    textStyle:{
                        fontSize: '14',
                        fontWeight:'normal',
                        color: '#666'
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line',
                        // label: {
                        //     backgroundColor: '#6a7985'
                        // }
                    },
                    formatter: '{b}<br/>订单数：{c}'
                },
                color:['#5B8FF9'],//折线颜色
                legend: {
                    top:'20',
                    right:'30',
                    textStyle:{
                        fontSize:'12',
                        color: '#234',
                },
                itemWidth:15,
                itemHeight:15, //图例标记的图形高度
                // show: false,
                    data:[{name:'订单数',icon:'line'}],
                },
                // toolbox: {
                // 	right:'30',
                // 	top:'10',
                // 	feature: {
                // 		saveAsImage: {},
                // 		magicType:{
                // 			type:['line','bar','stack','tiled']
                // 		}
                // 	}
                // },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                    // show: true,
                    // backgroundColor:'red'
                },
                xAxis : [
                    {
                        type : 'category',
                        axisTick:{
                        show:false
                        },
                        axisLine:{
                        // show: false
                            lineStyle:{
                                color:'#f5f5f5'
                            }
                        },
                        boundaryGap : false,
                        axisLabel:{
                            interval:0,
                            textStyle:{
                                color: '#234',
                                fontSize:'12'
                            },
                        },
                        data : this.timedata
                        // data:['11/1','11/2','11/3','11/4','11/5','11/6','11/7','11/8','11/9','11/10','11/11','11/12','11/13','11/14','11/15','11/16','11/17','11/18','11/19','11/20','11/21','11/22','11/23','11/24','11/25','11/26','11/27','11/28','11/29','11/30']
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisTick:{
                        show:false
                        },
                        axisLine:{
                        // show: false
                            lineStyle:{
                                color: '#f5f5f5'
                            },
                        },
                        axisLabel:{
                            textStyle:{
                                color: '#234'
                            },
                        },
                        splitLine:{
                            show: true,
                            lineStyle: {
                                color: '#f5f5f5'
                            }
                        },
                        
                    }
                ],
                // series: this.patdata
                series : [
                    {
                        name:'订单数',
                        type:'line',
                        symbol:'none',
                        lineStyle:{
                        width:1,
                        },
                        label:{
                        normal:{
                            show:false
                        }
                        },
                        data: this.numdata
                        // data:['11','112','113','114','115','116','117','118','119','110','111','112','1113','114','115','116','117','118','19','110','11','112','113','124','15','16','11','11','11','130']
                    },
                ]
            };
            var stackCharts = echarts.init(document.getElementById('stackChart'), 'shine');
                stackCharts.setOption(stackOption);
        },
        getinfo() {
            this.$http.get(infoUrl).then(res => {
                this.info = res.data
                const maps = res.data.orderTrendMap
                const tdata = []
                const ndata = []
                for(var key in maps) {
                    tdata.push(key)
                    ndata.push(maps[key])
                    
                }
                this.timedata = tdata
                this.numdata = ndata
                this.createStack()
            }).catch(err => {
                this.$message.error(err.response.data.msg)
            })
        },
        getapp() {
            this.$http.get('/api/applicantStatistics').then(res => {
                this.appnum = res.data.total
            })
        }
    },
    beforeDestroy() {
        const self = this;
        window.removeEventListener('resize', self.getheight)
    },
    mounted() {
        const self = this;
        this.getapp()
        this.getinfo()
        this.getheight()
        window.addEventListener('resize', self.getheight)
        
    }
}
</script>

<style lang="less">
.homepage {
    background-color: #F1F7FA;
    .datasbox {
        font-size: 14px;
        font-family:'PingFangSC-Medium','PingFang SC';
        .title {
            height:25px;
            margin-bottom: 28px;
            font-size:18px;
            font-weight:500;
            color:rgba(85,102,119,1);
            line-height:25px;
        }
        .datamsgs {
            > li {
                display: flex;
                float: left;
                width: 288px;
                height: 128px;
                margin-right: 30px;
                margin-bottom: 30px;
                cursor: pointer;
                .lefticon {
                    display: flex;
                    width: 108px;
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                    
                    > img {
                        width: 40px;
                        height: 40px;
                    }
                }
                .bg1 {
                    background-color: #2DA1FB;
                }
                .c1 {
                    color:#2DA1FB;
                }
                .bg2 {
                    background-color: #FDB440;
                }
                .c2 {
                    color:#FDB440;
                }
                .bg3 {
                    background-color: #F96B02;
                }
                .c3 {
                    color:#F96B02;
                }
                .bg4 {
                    background-color: #B0D26A;
                }
                .c4 {
                    color:#B0D26A;
                }
                .bg5 {
                    background-color: #EF8281;
                }
                .c5 {
                    color:#EF8281;
                }
                .bg6 {
                    background-color: #68D6E5;
                }
                .c6 {
                    color:#68D6E5;
                }
                .bg7 {
                    background-color: #78AAEE;
                }
                .c7 {
                    color:#78AAEE;
                }
                .rightcount {
                    flex: 1;
                    display: flex;
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                    background-color: #fff;
                    .num {
                        height:52px;
                        font-size:45px;
                        margin-bottom: 8px;
                        font-family:'DINAlternate-Bold','DINAlternate';
                        font-weight:bold;
                        text-align: center;
                        line-height:52px;
                    }
                    .shuoming {
                        height:20px;
                        font-size:14px;
                        font-family:'PingFangSC-Regular','PingFang SC';
                        color:rgba(85,102,119,1);
                        line-height:20px;
                        text-align: center;
                    }
                }
            }
        }
        .linechartsbox {
            height: 340px;
            background-color: #fff;
            #stackChart {
                height: 340px;
            }
        }
    }
}
</style>

