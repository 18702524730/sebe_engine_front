<template>
    <div class="recordbox">
        <div class="detailtab clearfix">
            <span :class="{active: current == 1}" @click="changetb(1)">订单详情</span> <span  @click="changetb(2)" :class="{active: current == 2}">商标进度跟踪</span>
        </div>
        <div class="toptrademarkmsg">
            <ul class="trademsg">
                <li class="clearfix">
                    <p class="tit">商标名称</p>
                    <p class="txt">{{ infoDetailData.trademarkName }}</p>
                </li>
                <li class="clearfix">
                    <p class="tit">商标类别</p>
                    <p class="txt">{{ infoDetailData.cls }}</p>
                </li>
                <li class="clearfix">
                    <p class="tit">申请/注册号</p>
                    <p class="txt">{{ infoDetailData.trademarkNumber}}</p>
                </li>
            </ul>
        </div>
        <ul v-if="list.length" class="zhuangtailist">
            <li v-for="info in list" :key="info.deliveryTime">
                <div class="state_list">
                    <!-- 最大的圆 -->
                    <i class="max_round success_bg"></i>
                    <div class="list_top success_border success_color" >
                    <p>{{info.state | orderstateFormat}}</p>
                    </div>
                    <div class="list_bot success_border" >
                    <p><span>_</span></p>
                    <ul class="clearfix">
                        <li class="fl clearfix list_l">
                        <p class="tit fl">上传时间</p>
                        <p class="txt fl">{{info.uploadTime | dateFormat}}</p>
                        </li>
                        <li class="fl clearfix list_m">
                        <p class="tit fl">发文时间</p>
                        <p class="txt operation fl">{{info.deliveryTime | dateFormat}}</p>
                        </li>
                        <li class="fl clearfix list_r" v-if="info.officialFile">
                        <p class="tit fl">官文</p>
                        <!-- <p class="txt note_txt fl">{{info.type | fileStateName}}</p> -->
                        <a class="fl note_button" :href="info.officialFile" target="_blank">下载</a>
                        <!-- <p class="fl note_button" @click="preview(info.officialFile)">预览</p> -->
                        </li>
                    </ul>
                    </div>
                </div>
            </li>
        </ul>
        <div v-if="!list.length">
            暂无数据
        </div>
        <!-- <single-state :order_id="id" :registration="registration"></single-state> -->
        <!-- <span class="recordback" @click="back">返回</span> -->
        <el-dialog
			:visible.sync="pdfDialogVisible"
            :lock-scroll="false"
			width="700px"
		>
			<img width="100%" :src="previewImg" alt="" />
		</el-dialog>
    </div>
</template>
<script>
// import SingleState from 'cps/public/State.vue'
import Filters from "utils/filters/";
const infoConfirmQueryUrl = "/api/findTrademarkOrderDetail/{id}";
const rootUrl = CONFIG.rootUrl;
export default {
    
    data() {
        return {
            id:'',
            registration:'',
            current: 2,
            rootUrl:rootUrl,
            previewImg: '',
            pdfDialogVisible: false,
            infoDetailData: {},
            list: []
        }
    },
    components:{
        // SingleState
    },
    created() {
        this.id = this.$route.params.id;
        this.queryDetail()
    },
    filters: {
        dateFormat:Filters.formatDate.dateFormat,
        orderstateFormat: Filters.orderstateformat
    },
    methods: {
        queryDetail() {
			this.loading = true;
			this.$http.get(infoConfirmQueryUrl.replace('{id}',this.id))
				.then((res) => {
					this.loading = false;
                    this.infoDetailData = res.data
					this.list = res.data.trademarkFeedbacks || []
				})
				.catch((err) => {
					this.loading = false;
					console.log(err);
				});
        },
        preview(src) {
			this.previewImg = src
			this.pdfDialogVisible = true;
			
		},
        changetb(num) {
            this.current = num
            if (num == 1) {
                this.$router.push({ name: 'myorderdetail',params: {id: this.id} })
            }
            
        },
        back(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less">
.recordbox {
    position: relative;
    padding: 30px;
    .recordback {
        position: absolute;
        right: 30px;
        top: 20px;
        width: 80px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        background-color: #f5f5f5;
        color: #000;
        border-radius: 4px;
        font-size: 14px;
    }
    .detailtab {
        border-bottom: 1px solid #f5f5f5;
        > span {
            float: left;
            padding: 10px 15px;
            margin-right: 20px;
            font-size: 14px;
            cursor: pointer;
            &.active {
                color: #3367A2;
                border-bottom: 2px solid #3367A2;
            }
        }
    }
    .state_list{position: relative;left: 5px;
      .list_end{padding-left: 15px;padding-bottom:25px;z-index: 10;position: relative;z-index:1;
        p{font-size: 14px;color: #7F8FA4;letter-spacing: 0;line-height: 14px;}
      }
			// 圆
			i{background-color:#DFE2E5;}
			// 颜色判断
			.success_bg{background-color:#36AF47;z-index:100;}

			.max_round{width:11px;height:11px;border-radius:50%;display:block;position: absolute;top: 0px;left:-5px;}
			.min_round{width:9px;height:9px;border-radius:50%;display:block;position: absolute;top: 38px;left:-4px;}
			.list_top{border-left:1px solid #dfe2e5;padding-left: 15px;padding-bottom:25px;z-index: 10;position: relative;
				p{font-size: 14px;color: #7F8FA4;letter-spacing: 0;line-height: 14px;}
			}
			.list_fotter{padding-left: 15px;padding-bottom:25px;z-index: 10;position: relative;
				p{font-size: 14px;color: #7F8FA4;letter-spacing: 0;line-height: 14px;}
			}
			// 边框颜色判断
			div.success_border{border-color:#36AF47;}
			div.success_color >p{color:#36AF47;}
			.list_bot{padding-bottom: 20px;border-left:1px solid #dfe2e5;padding-left: 30px;z-index:1;margin-top: -5px;
				>p{font-size: 13px;color: #223344;line-height:100%;position: relative;
          span{position: absolute;left:-30px;top:-10px;color: #36AF47;font-size:20px;display:inline-block;}
        }
				ul{padding-top: 10px;
					.list_l{width:30%;}
					.list_m{width:25%;}
					.list_r{width:45%;}
					li{
						.tit{text-align:left;color:#556677;}
						.txt{color: #7F8FA4;margin-left:30px;}
						.note_txt{max-width: 77%;min-width:100px;word-break:break-all;}
						.operation{max-width:77%;word-break:break-all;}
						.note_button{width:60px;text-align:center;height:24px;line-height:24px;background: #479CFF;color:#fff;font-size:13px;border-radius:2px;margin-left:10px;margin-top:-3px;cursor:pointer;}
					}
				}
			}
      .list_bot_end{padding-bottom: 20px;padding-left: 30px;z-index:1;margin-top: -5px;
        >p{font-size: 13px;color: #556677;line-height:100%;position: relative;
          span{position: absolute;left:-30px;top:-10px;color: #36AF47;font-size:20px;display:inline-block;}
        }
        ul{padding-top: 10px;
          .list_l{width:30%;}
          .list_m{width:25%;}
          .list_r{width:45%;
            a{text-decoration:none}
          }
          li{
            .tit{text-align:left;color:#556677;}
            .txt{color: #7F8FA4;margin-left:30px;word-break:break-all;}
            .note_txt{max-width: 77%;min-width:100px;}
            .operation{max-width:180px;}
            .note_button{width:60px;text-align:center;height:24px;line-height:24px;background: #479CFF;color:#fff;font-size:13px;border-radius:2px;margin-left:10px;margin-top:-3px;cursor:pointer;}
          }
        }
      }
    }
    .toptrademarkmsg {
        margin-bottom: 30px;
        .trademsg {
            padding-top: 30px;
            > li {
                margin-bottom: 24px;
            }
        }
        .tit {
            float: left;
            width: 150px;
            font-size:14px;
            font-family:'PingFangSC-Regular','PingFang SC';
            font-weight:400;
            color:rgba(85,102,119,1);
            line-height:20px;
        }
        .txt {
            float: left;
            font-size:14px;
            font-family:'PingFangSC-Regular','PingFang SC';
            font-weight:400;
            color:rgba(34,51,68,1);
            line-height:20px;
        }
    }
}
</style>


