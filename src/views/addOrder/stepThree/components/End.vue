<template>
	<div
		class="end_basic_ch"
		v-loading="loading"
		element-loading-text="拼命加载中"
	>
		<div v-if="!loading">
			<div class="basic_lists">
				<p>申请人</p>
				<div class="basic_category clearfix">
					<ul class="fl hasvoucherfw">
						<li>
							<p class="tit">类型</p>
							<p class="txt">{{ infoDetailData.ApplicantType|sqrFormat }}</p>
						</li>
						<li>
							<p class="tit">地区</p>
							<p class="txt">{{ infoDetailData.ApplicantRegion|areaFormat}}</p>
						</li>
						<li>
							<p class="tit">{{infoDetailData.ApplicantType|subjectTypeFormat}}名称</p>
							<p class="txt">{{ infoDetailData.ApplicantName }}</p>
						</li>
						<li>
							<p class="tit" v-if="infoDetailData.ApplicantType==2 &&infoDetailData.ApplicantRegion==1">统一社会信用代码</p>
							<p class="tit" v-if="infoDetailData.ApplicantType==1">身份证号码</p>
							<p class="txt">{{ infoDetailData.CardNumber }}</p>
						</li>
						<li>
							<p class="tit" v-if="infoDetailData.ApplicantType==2 &&infoDetailData.ApplicantRegion==1">营业执照地址</p>
							<p class="tit" v-if="infoDetailData.ApplicantType==1">申请人地址</p>
							<p class="tit" v-if="infoDetailData.ApplicantType==2 && infoDetailData.ApplicantRegion!=1">申请人地址</p>
							<p class="txt">{{ infoDetailData.Address }}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix">
						<div
							class="fl mr30"
							
						>	
							<img :src="infoDetailData.SebePassportOss" alt="" v-if="infoDetailData.ApplicantRegion !=1 && infoDetailData.ApplicantType ==1" @click="preview(infoDetailData.SebePassportOss)" />
							<img :src="infoDetailData.SebeBusinessLicenceOss" alt="" v-else @click="preview(infoDetailData.SebeBusinessLicenceOss)" />
							
							<p title="营业执照" v-if="infoDetailData.ApplicantRegion ==1 && infoDetailData.ApplicantType ==2">营业执照</p>
							<p title="个体工商户营业执照" v-if="infoDetailData.ApplicantRegion ==1 && infoDetailData.ApplicantType ==1">个体工商户营业执照</p>
							<p title="主体资格证明文件" v-if="infoDetailData.ApplicantRegion !=1 && infoDetailData.ApplicantType ==2">主体资格证明文件</p>
							<p title="护照" v-if="infoDetailData.ApplicantRegion !=1 && infoDetailData.ApplicantType ==1">护照</p>
						</div>
						<div
							v-if="infoDetailData.SebeIdCardOss && infoDetailData.ApplicantRegion ==1 && infoDetailData.ApplicantType ==1"
							class="fl"
							@click="preview(infoDetailData.SebeIdCardOss)"
						>
							<img :src="infoDetailData.SebeIdCardOss"  alt="" />
							<p title="身份证">身份证</p>
						</div>
					</div>
				</div>
			</div>
			<div class="basic_lists">
				<p>委托书与法律文件</p>
				<div class="basic_category clearfix">
					<div class="basic_img fl clearfix">
						<div
							class="fl mr30"
							@click="preview(trademarkSubject.SebeLegalNoticeOss)"
						>
							<img :src="trademarkSubject.SebeLegalNoticeOss" alt="" />
							<p title="法律文件">法律文件</p>
						</div>
						<div
							class="fl"
							@click="preview(trademarkSubject.SebeAuthorizationOss)"
						>
							<img :src="trademarkSubject.SebeAuthorizationOss" alt="" />
							<p title="委托书">委托书</p>
						</div>
					</div>
				</div>
			</div>
			
			<div class="basic_lists">
				<p>商标基本信息</p>
				<div class="basic_category clearfix">
					<ul class="fl hasvoucherfw">
						<li>
							<p class="tit">商标名称</p>
							<p class="txt">
								{{ trademarkSubject.trademarkName }}
							</p>
						</li>
						<li>
							<p class="tit">
								商标类型
							</p>
							<p class="txt">
								{{ trademarkSubject.trademarkType |trademarkTypeFormat }}
							</p>
						</li>
						<li>
							<p class="tit">
								商标说明
							</p>
							<p class="txt">{{ trademarkSubject.trademarkDesc }}</p>
						</li>
					</ul>
					<div class="basic_img fl">
						<div>
							<a :href="trademarkSubject.trademarkIcon" target="_blank">
								<img :src="trademarkSubject.trademarkIcon" alt="" />
								<p>商标图样</p>
							</a>
						</div>
					</div>
				</div>
				<ul class="trademarktypes" v-if="curSelectedLists.length">
					<li>
						<div class="tradetype">商标类别：</div>
						<div class="typeinfo">
							<ul>
								<li
									v-for="it in curSelectedLists"
									style="text-align: left;"
									class="mb10"
									:key="it.parentCode"
								>
									<h3 class="itembigname mb10">{{`第${it.parentCode}类 ${it.parentName}`}}</h3>
									<div v-for="group in it.groupSelected" :key="group.classificationCode">
										
										<div class="itemsmalls clearfix"> 
											<!-- <span style="color: #f5a623;">{{`${group.classificationCode}类：`}}</span> -->
											<span v-for="item in group.smallSelected" v-if="item.classificationCode" :key="item.classificationCode"><i v-if="item.officialCode" style="font-style:normal">{{item.officialCode}}类：</i>{{item.classificationName}}； </span>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="confirm_btnbox" v-if="trademarkSubject.orderAmount">
			<p>官费金额：</p>
			<p class="money">￥{{trademarkSubject.orderAmount | priceFormat}}</p>
			<span class="prev" @click="prev">上一步</span>
			<span class="next" @click="submitshow = true">提交</span>
		</div>
		<div class="stepsuccessboxthree" v-if="submitshow">
			<div class="successmsgcont">
				<div class="successmsg">
					<!-- <div class="successicon">
						<i class="el-icon-success"></i>
					</div> -->
					<p>提交后数据将推送至阿里云，请务必保证数据正确！且将从您余额中扣除{{trademarkSubject.orderAmount}}元官费用于申报。</p>
					<p>是否确认提交？</p>
				</div>
				<div class="allbtns">
					<span class="oncemore mr20" @click="submitshow = false">再检查一下</span>
					<span class="back" @click="tosuccess">确认提交</span>
				</div>
			</div>
		</div>
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
import Filters from "utils/filters/";
import { store } from 'utils/'
const infoConfirmQueryUrl = "/api/channelWorkOrderQuery";
const saveDraftUrl = "/api/saveChannelWorkOrder";
const submitUrl = "/api/report";
const pdfToImgUrl = "/api/preview";
const findAsistantRemarkUrl = "/api/findAsistantRemark";
const detailUrl = '/api/describeApplicant'
export default {
	
	data() {
		return {
			applyid: '',
			loading: false,
			price: '',
			previewImg: "",
			voucherUrlImg: "",
			pdfDialogVisible: false,
			isSubmit: false,
			infoDetailData: {
			},
			trademarkSubject: {
				SebeLegalNoticeOss: ''
			}, 
			submitshow: false,
			curSelectedLists: []
		};
	},
	created() {
		const trademsg = store.get('trademarkDatas')
		this.trademarkSubject = trademsg
		this.curSelectedLists = trademsg.curSelectedLists
		this.applyid = trademsg.applicantTbId
		this.price = trademsg.orederAmount
		this.getdetail(this.applyid)
		// this.queryDetail();
	},
	methods: {
		getdetail(id) {
            const data = {
                id: id
            }
            this.$http.get(detailUrl, { params: data }).then(res => {
                const ret = {}
                for(var key in res.data) {
                    var fletter = key.slice(0,1)
                    var oletter = key.slice(1)
                    var nkey = fletter.toUpperCase() + oletter
                    ret[nkey] = res.data[key]
                }
                this.infoDetailData = ret
            })
        },
		tosuccess() {
			if(this.isSubmit) {
				return
			}
			const smallmsg = {}
			this.curSelectedLists.forEach(item => {
				const key = item['parentCode']
				const group = item['groupSelected']
				const ids = []
				group.forEach(gpi => {
					const smalls = gpi['smallSelected']
					for(let i = 0; i < smalls.length; i++) {
						ids.push(smalls[i]['classificationCode'])
					}
				})
				smallmsg[key] = ids.join(',')
			})
			const data = {
				applicantTbId: this.applyid,
				classifications: smallmsg,
				entrustFile: this.trademarkSubject.SebeAuthorizationOss,
				entrustFileOsskey: this.trademarkSubject.AuthorizationOssKey,
				trademarkDesc: this.trademarkSubject.trademarkDesc,
				trademarkName: this.trademarkSubject.trademarkName,
				trademarkType: this.trademarkSubject.trademarkType,
				trademarkIcon: this.trademarkSubject.trademarkIcon,
				trademarkIconOsskey: this.trademarkSubject.trademarkIconOsskey,
				orderAmount: this.trademarkSubject.orderAmount
			}
			this.$http.post('/api/createTrademarkOrder', data).then(res => {
				this.isSubmit = false
				store.remove('trademarkDatas')
				this.$router.push({ name: "stepfour" });
			}).catch(err => {
				this.isSubmit = false
				this.$message.error(err.response.data.msg || '提交失败')
			})
			
		},
		preview(src) {
			this.previewImg = src
			this.pdfDialogVisible = true;
			// window.open(src)
		},
		prev() {
			this.$router.push({ name: "steptwo" });
		}
	},
	filters: {
		sqrFormat: Filters.sqrformat,
        areaFormat: Filters.areaformat,
		subjectTypeFormat: Filters.subjectTypeFormat,
		trademarkTypeFormat: Filters.trademarktypeformat,
		priceFormat: Filters.priceformat
	},
};
</script>
<style lang="less">
.end_basic_ch {
	background-color: #fff;
	padding: 30px;
	border-radius: 0 2px 2px 2px;
	min-height: 500px;
	.basic_lists {
		border: 1px solid #F5F5F5;
		.kpl {
			li {
				width: 33%;
			}
		}
		> p {
			font-size: 14px;
			color: #223344;
			height: 60px;
			line-height: 60px;
			margin-bottom: 10px;
			background-color: #f5f5f5;
			padding-left: 20px;
		}
		//左侧
		//公共部分，主要是间距，字体大小，颜色
		.basic_category {
			text-align: left;
			padding-bottom: 20px;
			padding-top: 10px;
			padding-left: 20px;
			.category_left {
				width: 66%;
			}
			ul {
				width: 33%;
				li {
					overflow-x: hidden;
					p {
						float: left;
						line-height: 18px;
						margin-bottom: 10px;
					}
					// 已支付
					p.topay {
						color: #36af47;
					}
					.tit {
						width: 120px;
						font-size: 13px;
						color: #556677;
					}
					.txt {
						font-size: 13px;
						color: #7f8fa4;
						max-width: 66%;
						margin-left: 10px;
						word-break: break-all;
					}
				}
			}
			.hasvoucherfw {
				width: 60%;
				padding-right: 10px;
			}
			.voucherbox {
				float: left;
				position: relative;
				widows: 100px;
				height: 120px;
				border: 1px solid #dfe2e5;
				cursor: pointer;
				img {
					width: 98px;
					height: 118px;
				}
				p {
					width: 100px;
					text-align: center;
					background: rgba(0, 0, 0, 0.6);
					color: #fff;
					line-height: 26px;
					font-size: 13px;
					position: absolute;
					bottom: 0;
					cursor: pointer;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					left: -1px;
				}
			}
			//右侧图片预览定位
			.basic_img {
				width: 32%;
				text-align: left;
				div {
					position: relative;
					width: 100px;
					height: 120px;
					border: 1px solid #dfe2e5;
					cursor: pointer;
					a {
						display: block;
						width: 100%;
						height: 100%;
					}
					img {
						width: 98px;
						height: 118px;
					}
					p {
						width: 100px;
						text-align: center;
						background: rgba(0, 0, 0, 0.6);
						color: #fff;
						line-height: 26px;
						font-size: 13px;
						position: absolute;
						bottom: 0;
						left: -1px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
		}
	}
	// 预览
	.img_preview {
		.el-dialog--tiny {
			width: 940px;
			img {
				width: 900px;
			}
		}
	}
	.previewDialog {
		width: 900px;
		min-height: 600px;
		.el-carousel {
			.el-carousel__container {
				height: 490px;
				.el-carousel__item {
					.img_wrap {
						overflow-y: auto;
						height: 100%;
						width: 86%;
						margin: 0 auto;
					}
					img {
						width: 100%;
					}
				}
			}
		}
	}
	.previewDialog_trans {
		transform: translate(-50%, -50%);
	}
	.service_data {
		padding-top: 20px;
		.tal {
			text-align: left;
		}
		.tar {
			text-align: right;
		}
		.tb01 {
			width: 15%;
			padding-left: 20px;
		}
		.tb02 {
			width: 23%;
		}
		.tb03 {
			width: 12%;
		}
		.tb04 {
			width: 10%;
			min-width: 40px;
		}
		.tb05 {
			width: 20%;
		}
		.tb06 {
			width: 20%;
			padding-right: 30px;
			a {
				color: #479cff;
				text-decoration: none;
			}
		}
		> p {
			font-size: 14px;
			color: #223344;
			height: 20px;
			line-height: 20px;
			margin-bottom: 10px;
		}
		.service_tab {
			border: 1px solid #dfe2e5;
			.tab_tit {
				background: #f5f5f5;
				line-height: 40px;
				font-size: 13px;
				color: #223344;
			}
			.tab_list {
				line-height: 40px;
				font-size: 13px;
				color: #223344;
				ul {
					border-top: 1px solid #dfe2e5;
				}
			}
		}
	}
	.hov {
		color: #479cff;
	}

	.trademarktypes {
		padding-top: 20px;
		> li {
			display: flex;
			padding: 20px 25px;
			background-color: #F5F5F5;
			font-size:14px;
			color:rgba(34,51,68,1);
			line-height:20px;
			.tradetype {
				width: 130px;
			}
			.typeinfo {
				flex: 1;
				> h3 {
					font-weight: normal;
					margin-bottom: 20px;
				}
				> p {
					word-break: break-all;
				}
			}
		}
	}
	.stepsuccessboxthree {
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		bottom: 0;
		background: rgba(0,0,0,0.7);
		z-index: 999;
		padding:  200px 20px 50px;
		.successmsgcont {
			position: absolute;
			width: 580px;
			height: 300px;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			background-color: #fff;
			border-radius: 4px;
		}
		.successmsg {
			width: 380px;
			margin: 60px auto 0px;
			text-align: center;
			
			.successicon {
				margin-bottom: 30px;
				font-size: 80px;
				color: #234;
			}
			> p {
				font-size: 16px;
				line-height: 30px;
			}
		}
		.allbtns {
			padding-top: 50px;
			font-size: 0;
			text-align: center;
			> span {
				display: inline-block;
				width: 150px;
				height: 40px;
				text-align: center;
				line-height: 40px;
				border-radius: 3px;
				font-size: 16px;
				cursor: pointer;
			}
			.oncemore {
				// box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.6);
				border: 1px solid #29528A;
				color: #29528A;
			}
			.back {
				background-color: #29528A;
				color: #fff;
			}
		}
	}
}
</style>
