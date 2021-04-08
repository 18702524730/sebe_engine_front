<template>
	<div class="state_type" v-loading="loading">
    <div class="state mt20">
      <!-- 已提交到商标局 -->
      <div class="state_list" v-if="(stateData[20]&&stateData[20].length)">
        <!-- 最大的圆 -->
        <i class="max_round" :class="{'success_bg' : stateData[20]}"></i>
        <div class="list_top" :class="{'success_border' : stateData[20],'success_color':stateData[20]}">
          <p>已提交到商标局</p>
        </div>
        <div class="list_bot" :class="{'success_border' : stateData[20]}" v-for="item in stateData[20]" :key="item.operating_time">
          <p><span>_</span>{{item.bs_feedback_operate || '--'}}</p>
          <ul class="clearfix">
            <li class="fl clearfix list_l">
              <p class="tit fl">操作时间</p>
              <p class="txt fl">{{item.operating_time | dateFormat}}</p>
            </li>
            <li class="fl clearfix list_m">
              <p class="tit fl">操作人</p>
              <p class="txt operation fl">{{item.operator}}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 商标局已接受  -->
      <div class="state_list" v-if="(stateData[21]&&stateData[21].length)">
        <!-- 最大的圆 -->
        <i class="max_round" :class="{'success_bg' : stateData[21]}"></i>
        <div class="list_top" :class="{'success_border' : stateData[21],'success_color':stateData[21]}">
          <p>商标局已接受 </p>
        </div>
        <div class="list_bot" :class="{'success_border' : stateData[21]}" v-for="item in stateData[21]" :key="item.operating_time">
          <p><span>_</span>{{item.bs_feedback_operate || '--'}}</p>
          <ul class="clearfix">
            <li class="fl clearfix list_l">
              <p class="tit fl">操作时间</p>
              <p class="txt fl">{{item.operating_time | dateFormat}}</p>
            </li>
            <li class="fl clearfix list_m">
              <p class="tit fl">操作人</p>
              <p class="txt operation fl">{{item.operator}}</p>
            </li>
            <li class="fl clearfix list_r" v-if="item.url">
              <p class="tit fl">官文</p>
              <p class="txt note_txt fl">{{item.type | fileStateName}}</p>
              <a class="fl note_button" :href="rootUrl+'/api/downFile?url='+item.url+'&access_token='+token" target="_blank">下载</a>
              <p class="fl note_button" @click="previewImg(item.url)">预览</p>
            </li>
          </ul>
          <ul class="clearfix">
            <li class="fl clearfix list_l">
              <p class="tit fl">官文下发时间</p>
              <p class="txt fl">{{item.state_update_time | dateFormat('date')}}</p>
            </li>
            <li class="fl clearfix list_r">
              <p class="tit fl">备注</p>
              <p class="txt note_txt fl">{{item.memo || '--'}}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 商标局不予受理  -->
      <div class="state_list" v-if="stateData[22]&&stateData[22].length">
        <!-- 最大的圆 -->
        <i class="max_round" :class="{'success_bg' : stateData[22]}"></i>
        <div class="list_top" :class="{'success_border' : stateData[22],'success_color':stateData[22]}">
          <p>商标局不予受理</p>
        </div>
        <div class="list_bot" :class="{'success_border' : stateData[22]}"  v-for="data in stateData[22]" :key="data.operating_time">
          <p><span>_</span>{{data.bs_feedback_operate || '--'}}</p>
          <ul class="clearfix">
            <li class="fl clearfix list_l">
              <p class="tit fl">操作时间</p>
              <p class="txt fl">{{data.operating_time | dateFormat}}</p>
            </li>
            <li class="fl clearfix list_m">
              <p class="tit fl">操作人</p>
              <p class="txt operation fl">{{data.operator}}</p>
            </li>
            <li class="fl clearfix list_r" v-if="data.url">
              <p class="tit fl">官文</p>
              <p class="txt note_txt fl">{{data.type | fileStateName}}</p>
              <a class="fl note_button" :href="rootUrl+'/api/downFile?url='+data.url+'&access_token='+token" target="_blank">下载</a>
              <p class="fl note_button" @click="previewImg(data.url)">预览</p>
            </li>
          </ul>
          <ul class="clearfix">
            <li class="fl clearfix list_l">
              <p class="tit fl">官文下发时间</p>
              <p class="txt fl">{{data.state_update_time | dateFormat('date')}}</p>
            </li>
            <li class="fl clearfix list_r">
              <p class="tit fl">备注</p>
              <p class="txt note_txt fl">{{data.memo || '--'}}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 商标局受理通过 -->
      <div class="state_list" v-if="stateData[23]&&stateData[23].length">
        <!-- 最大的圆 -->
        <i class="max_round" :class="{'success_bg' : stateData[23]}"></i>
        <div class="list_top" :class="{'success_border' : stateData[23],'success_color':stateData[23]}">
          <p>商标局受理通过</p>
        </div>
        <div class="list_bot" :class="{'success_border' : stateData[23]}" v-for="item in stateData[23]" :key="item.operating_time">
          <p><span>_</span>{{item.bs_feedback_operate || '--'}}</p>
          <ul class="clearfix">
            <li class="fl clearfix list_l">
              <p class="tit fl">操作时间</p>
              <p class="txt fl">{{item.operating_time | dateFormat}}</p>
            </li>
            <li class="fl clearfix list_m">
              <p class="tit fl">操作人</p>
              <p class="txt operation fl">{{item.operator}}</p>
            </li>
            <li class="fl clearfix list_r" v-if="item.url">
              <p class="tit fl">官文</p>
              <p class="txt note_txt fl">{{item.type | fileStateName}}</p>
              <a class="fl note_button" :href="rootUrl+'/api/downFile?url='+item.url+'&access_token='+token" target="_blank">下载</a>
              <p class="fl note_button" @click="previewImg(item.url)">预览</p>
            </li>
          </ul>
          <ul class="clearfix">
            <li class="fl clearfix list_l">
              <p class="tit fl">官文下发时间</p>
              <p class="txt fl">{{item.state_update_time | dateFormat('date')}}</p>
            </li>
            <li class="fl clearfix list_r">
              <p class="tit fl">备注</p>
              <p class="txt note_txt fl">{{item.memo || '--'}}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 商标局部分驳回 -->
      <div class="state_list" v-if="stateData[29]&&stateData[29].length">
        <!-- 最大的圆 -->
        <i class="max_round" :class="{'success_bg' : stateData[29]}"></i>
        <div class="list_top" :class="{'success_border' : stateData[29],'success_color':stateData[29]}">
          <p>商标局部分驳回</p>
        </div>
        <div class="list_bot" :class="{'success_border' : stateData[29]}"  v-for="info in stateData[29]" :key="info.operating_time">
          <p><span>_</span>{{info.bs_feedback_operate || '--'}}</p>
          <ul class="clearfix">
            <li class="fl clearfix list_l">
              <p class="tit fl">操作时间</p>
              <p class="txt fl">{{info.operating_time | dateFormat}}</p>
            </li>
            <li class="fl clearfix list_m">
              <p class="tit fl">操作人</p>
              <p class="txt operation fl">{{info.operator}}</p>
            </li>
            <li class="fl clearfix list_r" v-if="info.url">
              <p class="tit fl">官文</p>
              <p class="txt note_txt fl">{{info.type | fileStateName}}</p>
              <a class="fl note_button" :href="rootUrl+'/api/downFile?url='+info.url+'&access_token='+token" target="_blank">下载</a>
              <p class="fl note_button" @click="previewImg(info.url)">预览</p>
            </li>
          </ul>
          <ul class="clearfix">
            <li class="fl clearfix list_l">
              <p class="tit fl">官文下发时间</p>
              <p class="txt fl">{{info.state_update_time | dateFormat('date')}}</p>
            </li>
            <li class="fl clearfix list_r">
              <p class="tit fl">备注</p>
              <p class="txt note_txt fl">{{info.memo || '--'}}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 商标局驳回 -->
      <div class="state_list" v-if="stateData[30]&&stateData[30].length">
        <!-- 最大的圆 -->
        <i class="max_round" :class="{'success_bg' : stateData[30]}"></i>
        <div class="list_top" :class="{'success_border' : stateData[30],'success_color':stateData[30]}">
          <p>商标局驳回</p>
        </div>
        <div class="list_bot" :class="{'success_border' : stateData[30]}" v-for="item in stateData[30]" :key="item.operating_time">
          <p><span>_</span>{{item.bs_feedback_operate || '--'}}</p>
          <ul class="clearfix">
            <li class="fl clearfix list_l">
              <p class="tit fl">操作时间</p>
              <p class="txt fl">{{item.operating_time | dateFormat}}</p>
            </li>
            <li class="fl clearfix list_m">
              <p class="tit fl">操作人</p>
              <p class="txt operation fl">{{item.operator}}</p>
            </li>
            <li class="fl clearfix list_r" v-if="item.url">
              <p class="tit fl">官文</p>
              <p class="txt note_txt fl">{{item.type | fileStateName}}</p>
              <a class="fl note_button" :href="rootUrl+'/api/downFile?url='+item.url+'&access_token='+token" target="_blank">下载</a>
              <p class="fl note_button" @click="previewImg(item.url)">预览</p>
            </li>
          </ul>
          <ul class="clearfix">
            <li class="fl clearfix list_l">
              <p class="tit fl">官文下发时间</p>
              <p class="txt fl">{{item.state_update_time | dateFormat('date')}}</p>
            </li>
            <li class="fl clearfix list_r">
              <p class="tit fl">备注</p>
              <p class="txt note_txt fl">{{item.memo || '--'}}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 商标局审核通过 -->
      <div class="state_list" v-if="stateData[31]&&stateData[31].length">
        <!-- 最大的圆 -->
        <i class="max_round" :class="{'success_bg' : stateData[31]}"></i>
        <div class="list_top" :class="{'success_border' : stateData[31],'success_color':stateData[31]}">
          <p>商标局审核通过</p>
        </div>
        <div class="list_bot" :class="{'success_border' : stateData[31]}"  v-for="info in stateData[31]" :key="info.operating_time ">
          <p><span>_</span>{{info.bs_feedback_operate || '--'}}</p>
          <ul class="clearfix">
            <li class="fl clearfix list_l">
              <p class="tit fl">操作时间</p>
              <p class="txt fl">{{info.operating_time | dateFormat}}</p>
            </li>
            <li class="fl clearfix list_m">
              <p class="tit fl">操作人</p>
              <p class="txt operation fl">{{info.operator}}</p>
            </li>
            <li class="fl clearfix list_r" v-if="info.url">
              <p class="tit fl">官文</p>
              <p class="txt note_txt fl">{{info.type | fileStateName}}</p>
              <a class="fl note_button" :href="rootUrl+'/api/downFile?url='+info.url+'&access_token='+token" target="_blank">下载</a>
              <p class="fl note_button" @click="previewImg(info.url)">预览</p>
            </li>
          </ul>
          <ul class="clearfix">
            <li class="fl clearfix list_l">
              <p class="tit fl">官文下发时间</p>
              <p class="txt fl">{{info.state_update_time | dateFormat('date')}}</p>
            </li>
            <li class="fl clearfix list_r">
              <p class="tit fl">备注</p>
              <p class="txt note_txt fl">{{info.memo || '--'}}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 办理终止 -->
      <!-- <div class="state_list" v-if="!stateData[99]">
        <i class="max_round" :class="{'success_bg' : stateData[18]}"></i>
        <div class="list_end" :class="{'success_border' : stateData[18],'success_color':stateData[18]}">
          <p>办理终止</p>
        </div>
        <div class="list_bot_end" v-for="item in stateData[18]" :key="item.operating_time">
          <p>{{item.bs_feedback_operate || '--'}}</p>
          <ul class="clearfix">
            <li class="fl clearfix list_l">
              <p class="tit fl">操作时间</p>
              <p class="txt fl">{{item.operating_time | dateFormat}}</p>
            </li>
            <li class="fl clearfix list_m">
              <p class="tit fl">操作人</p>
              <p class="txt operation fl">{{item.operator}}</p>
            </li>
            <li class="fl clearfix list_r" v-if="item.url">
              <p class="tit fl">官文</p>
              <p class="txt note_txt fl">{{item.type | fileStateName}}</p>
              <a class="fl note_button" :href="rootUrl+'/api/downFile?url='+item.url+'&access_token='+token" target="_blank">下载</a>
              <p class="fl note_button" @click="previewImg(item.url)">预览</p>
            </li>
          </ul>
          <ul class="clearfix">
            <li class="fl clearfix list_l">
              <p class="tit fl">官文下发时间</p>
              <p class="txt fl">{{item.state_update_time | dateFormat('date')}}</p>
            </li>
            <li class="fl clearfix list_r">
              <p class="tit fl">备注</p>
              <p class="txt note_txt fl">{{item.memo || '--'}}</p>
            </li>
          </ul>
        </div>
      </div> -->
      <!-- 申请成功结束 -->
      <div class="state_list" v-if="stateData[99]">
        <!-- 最大的圆 -->
        <i class="max_round" :class="{'success_bg' : stateData[99]}"></i>
        <div class="list_end" :class="{'success_border' : stateData[99],'success_color':stateData[99]}">
          <p>申请成功结束</p>
        </div>
        <div class="list_bot_end" v-for="item in stateData[99]" :key="item.operating_time">
          <p>{{item.bs_feedback_operate || '--'}}</p>
          <ul class="clearfix">
            <li class="fl clearfix list_l">
              <p class="tit fl">操作时间</p>
              <p class="txt fl">{{item.operating_time | dateFormat}}</p>
            </li>
            <li class="fl clearfix list_m">
              <p class="tit fl">操作人</p>
              <p class="txt operation fl">{{item.operator}}</p>
            </li>
            <li class="fl clearfix list_r" v-if="item.url">
              <p class="tit fl">官文</p>
              <p class="txt note_txt fl">{{item.type | fileStateName}}</p>
              <a class="fl note_button" :href="rootUrl+'/api/downFile?url='+item.url+'&access_token='+token" target="_blank">下载</a>
              <p class="fl note_button" @click="previewImg(item.url)">预览</p>
            </li>
          </ul>
          <ul class="clearfix">
            <li class="fl clearfix list_l">
              <p class="tit fl">官文下发时间</p>
              <p class="txt fl">{{item.state_update_time | dateFormat('date')}}</p>
            </li>
            <li class="fl clearfix list_r">
              <p class="tit fl">备注</p>
              <p class="txt note_txt fl">{{item.memo || '--'}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
		<!-- 证书预览 -->
    <el-dialog
      :visible.sync="dialogImg"
      size="tiny" class="img_preview" :modal-append-to-body="true">
      <!-- <el-carousel indicator-position="none" :interval="5000" arrow="always" :autoplay='false' trigger="click">
        <el-carousel-item v-for="(imgSrc,$index) in proxyImg" :key="$index">
          <img :src="imgSrc" alt="">
        </el-carousel-item>
      </el-carousel> -->
      <div style="position:relative">
        <el-carousel indicator-position="none" :interval="5000" arrow="always" :autoplay='false' trigger="click">
        <el-carousel-item v-for="(imgSrc,$index) in proxyImg" :key="$index">
          <img :src="imgSrc" alt="">
        </el-carousel-item>
      </el-carousel>
      </div>
    </el-dialog>
	</div>
</template>
<script>
  import VueCookie from 'vue-cookie'
	import Filters from 'utils/filters/'
	const stateUrl = './api/findOrderFeedbacks';
  const rootUrl = CONFIG.rootUrl;
	export default {
    props:['order_id','registration'],
    data() {
      return {
        rootUrl:rootUrl,
      	// 当前进行的步骤
      	steps:0,
      	handleClose:'',
      	// 详情
      	stateData:[],
      	loading:false,
      	proxyImg:{},
      	dialogImg:false,
        token:'',
      }
    },
    methods: {
      // 状态图片预览
	  previewImg(url){
      this.loading = true;
	    this.$http.get('./api/preview?pdf_url='+url)
	    .then((response) => {
        this.loading = false;
        this.proxyImg = response.data.urls;
        this.dialogImg = true;
	    })
	    .catch((error) => {
        this.loading = false;
	    });
	  }
    },
    mounted() {
    	var self = this;
    	self.loading = true;
    	this.$http.get(stateUrl+'?order_id=' + this.order_id)
    	.then((resp) => {
    		self.stateData = resp.data.feedbacks;
    		self.loading = false;
    	}).catch((error) => {
    		self.loading = false;
        console.log(error);
      });
    	// this.status = this.$router.query.status;
      this.token = VueCookie.get('service_token');
    },
    filters: {
    	format:	Filters.formatDate.dateFormat,
    	dateFormat:Filters.formatDate.dateFormat,
		  fileStateName:Filters.fileStateName
    }
  }
</script>
<style lang="less">
	.state_type{padding:20px;background-color:#fff;
		//完成该状态
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

    .service_state{padding-top: 20px;
      .service_tit{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
      .service_btn{width:118px;height:30px;line-height:30px;text-align:center;border: 1px solid #479CFF;border-radius: 2px;color: #479CFF;cursor:pointer;}
      .service_table{margin-top: 10px;
        >p{font-size: 13px;color: #556677;margin-bottom:10px;}
        .tb01{width:25%;text-align:left;}
        .tb02{width:20%;text-align:left;}
        .tb03{width:25%;text-align:left;}
        .tb04{width:30%;text-align:left;}
        ul{
          li{line-height: 40px;height: 40px;}
        }
        .table_tit{background: #F5F5F5;border: 1px solid #DFE2E5;
          li{font-size: 13px;color: #223344;}
        }
        .record{border-bottom:1px solid #DFE2E5;border-left:1px solid #DFE2E5;border-right:1px solid #DFE2E5;padding-bottom:15px;
          .table_list{padding-top:15px;
            li{line-height:18px;height: 18px;
              p{text-overflow: ellipsis;white-space: nowrap;color: #556677;font-size: 13px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding:0 5px;
                i{height:10px;width:10px;background-color:#d8d8d8;display:inline-block;border-radius:100%;position: absolute;top:23px;left:-5px;}
                .listBgc{background: #09BB07;left:-4px;}
              }
              .listL{position: relative;height:25px;margin-top: -20px;width:15px;}
              .list_l{border-left:1px dashed #ddd;position: relative;height:25px;margin-top: -20px;width:15px;}
            }
          }
        }
      }
    }
		// 预览
    .img_preview{
      .el-dialog--tiny{width:940px;
        img{width:900px;}
      }
    }
    .img_preview{
      .el-carousel{margin:0 auto;width:900px;padding:0 40px;
        .el-carousel__container{margin:0 auto;height:650px;
          .el-carousel__arrow--right{right:-40px;}
          .el-carousel__arrow--left{left:-40px;}
          .el-carousel__item{text-align:center;width:820px;overflow-y: auto;
            img{width:820px;}
          }
        }
      }
    }
		.service_table{
			p{font-size: 13px;color: #223344;
				span{font-size: 13px;color: #7F8FA4;}
			}
		}
	}
</style>
