<template>
	<div
		class="myorderdetail"
		v-loading="loading"
		element-loading-text="拼命加载中"
	>
		<div v-if="!loading">
            <div class="detailtab clearfix">
                <span :class="{active: current == 1}" @click="changetb(1)">订单详情</span> <span  @click="changetb(2)" :class="{active: current == 2}">商标进度跟踪</span>
            </div>
            <div class="basic_lists">
				<p>订单信息</p>
				<div class="basic_category clearfix">
					<ul class="twocollist clearfix">
						<li>
							<p class="tit">订单号</p>
							<p class="txt">{{ infoDetailData.orderId }}</p>
						</li>
						<li>
							<p class="tit">订单类型</p>
							<p class="txt">{{ infoDetailData.bsType | bsTypeFormat }}</p>
						</li>
						<li>
							<p class="tit">订单时间</p>
							<p class="txt">{{ infoDetailData.createTime | dateFormat}}</p>
						</li>
						<li>
							<p class="tit">订单状态</p>
							<p class="txt">{{ infoDetailData.state|orderFormat }}</p>
						</li>
						<li>
							<p class="tit">订单金额</p>
							<p class="txt">{{ infoDetailData.orderAmount | priceFormat }}</p>
						</li>
                        <li>
							<p class="tit">商标状态</p>
							<p class="txt">{{ infoDetailData.trademarkState|orderFormat }}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="basic_lists">
				<p>申请人</p>
				<div class="basic_category clearfix">
					<ul class="fl hasvoucherfw">
						<li>
							<p class="tit">类型</p>
							<p class="txt">{{ applicant.applicantType|sqrFormat }}</p>
						</li>
						<li>
							<p class="tit">地区</p>
							<p class="txt">{{ applicant.applicantRegion|areaFormat}}</p>
						</li>
						<li>
							<p class="tit">{{applicant.applicantType|subjectTypeFormat}}名称</p>
							<p class="txt">{{ applicant.applicantName }}</p>
						</li>
						<li>
							<p class="tit" v-if="applicant.applicantType==2 &&applicant.applicantRegion==1">统一社会信用代码</p>
							<p class="tit" v-if="applicant.applicantType==1">身份证号码</p>
							<p class="txt">{{ applicant.cardNumber }}</p>
						</li>
						<li>
							<p class="tit" v-if="applicant.applicantType==2 &&applicant.applicantRegion==1">营业执照地址</p>
							<p class="tit" v-if="applicant.applicantType==1">申请人地址</p>
							<p class="tit" v-if="applicant.applicantType==2 && applicant.applicantRegion!=1">申请人地址</p>
							<p class="txt">{{ applicant.address }}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix">
						<div
							class="fl mr30"
							
						>	
							<img :src="applicant.sebePassportOss" alt="" v-if="applicant.ApplicantRegion !=1 && applicant.ApplicantType ==1" @click="preview(applicant.sebePassportOss)" />
							<img :src="applicant.sebeBusinessLicenceOss" alt="" v-else @click="preview(applicant.sebeBusinessLicenceOss)" />
							<p title="营业执照" v-if="applicant.applicantRegion ==1 && applicant.applicantType ==2">营业执照</p>
							<p title="个体工商户营业执照" v-if="applicant.applicantRegion ==1 && applicant.applicantType ==1">个体工商户营业执照</p>
							<p title="主体资格证明文件" v-if="applicant.applicantRegion !=1 && applicant.applicantType ==2">主体资格证明文件</p>
							<p title="护照" v-if="applicant.applicantRegion !=1 && applicant.applicantType ==1">护照</p>
						</div>
						<div
							v-if="applicant.sebeIdCardOss && applicant.applicantRegion ==1 && applicant.applicantType ==1"
							class="fl"
							@click="preview(applicant.sebeIdCardOss)"
						>
							<img :src="applicant.sebeIdCardOss"  alt="" />
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
							@click="preview(infoDetailData.sebeLegalNoticeOss)"
						>
							<img :src="infoDetailData.sebeLegalNoticeOss" alt="" />
							<p title="法律文件">法律文件</p>
						</div>
						<div
							class="fl"
							@click="preview(infoDetailData.entrustFile)"
						>
							<img :src="infoDetailData.entrustFile" alt="" />
							<p title="委托书">委托书</p>
						</div>
					</div>
				</div>
			</div>
			<!-- <div style="padding: 50px;">
				<qrcode v-if="qcodeUrl" :val="qcodeUrl" :size="180"></qrcode>
			</div> -->
			<div class="basic_lists mb10">
				<p>商标基本信息</p>
				<div class="basic_category clearfix">
					<ul class="fl hasvoucherfw">
						<li>
							<p class="tit">商标名称</p>
							<p class="txt">
								{{ infoDetailData.trademarkName }}
							</p>
						</li>
						<li>
							<p class="tit">
								商标类型
							</p>
							<p class="txt">
								{{ infoDetailData.trademarkType|trademarkTypeFormat }}
							</p>
						</li>
						<li>
							<p class="tit">
								商标说明
							</p>
							<p class="txt">{{ infoDetailData.trademarkDesc }}</p>
						</li>
					</ul>
					<div class="basic_img fl">
						<div @click="preview(infoDetailData.trademarkIcon)">
							<img :src="infoDetailData.trademarkIcon" alt="" />
							<p>商标图样</p>
							<!-- <a  target="_blank" :href="infoDetailData.trademarkIcon">
								<img :src="infoDetailData.trademarkIcon" alt="" />
								<p>商标图样</p>
							</a> -->
						</div>
					</div>
				</div>
				<ul class="trademarktypes">
					<li>
						<div class="tradetype">商标类别：</div>
						<div class="typeinfo">
							<h3>第{{infoDetailData.cls}}类 {{infoDetailData.clsName}}</h3>
							<p>{{infoDetailData.minsName}}</p>
						</div>
					</li>
				</ul>
			</div>
            <div class="basic_lists clearfix" v-if="infoDetailData.supplementId">
				<p>补正信息</p>
				<div class="basic_category clearfix">
					<ul class="twocollist">
						<li>
							<p class="tit">补正ID</p>
							<p class="txt">{{ infoDetailData.supplementId }}</p>
						</li>
						<li>
							<p class="tit">补正状态</p>
							<p class="txt">{{ infoDetailData.supplementState |bzstateformat }}</p>
						</li>
						<li>
							<p class="tit">发文编号</p>
							<p class="txt">{{ infoDetailData.serialNumber }}</p>
						</li>
						<li>
							<p class="tit">补正官文</p>
							<p class="txt" v-if="infoDetailData.supplementOfficialFile"><span class="btnspan" @click="downloadfile(infoDetailData.supplementOfficialFile)">下载</span></p>
						</li>
						<li>
							<p class="tit">商标局发文日期</p>
							<p class="txt">{{ infoDetailData.sendTime|dateFormat }}</p>
						</li>
                        <li>
							<p class="tit">回复截止日期</p>
							<p class="txt">{{ infoDetailData.acceptExpirationDate|dateFormat }}</p>
						</li>
                        <li>
							<p class="tit">有关说明文件</p>
							<p class="txt"><span class="btnspan" v-if="infoDetailData.userFiles" @click="downloadfile(infoDetailData.userFiles)">下载</span></p>
						</li>
						<li>
							<p class="tit">对回文的相关说明</p>
							<p class="txt">{{ infoDetailData.content }}</p>
						</li>
                        <li>
							<p class="tit">用户操作时间</p>
							<p class="txt">{{ infoDetailData.operateTime|dateFormat }}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 图片预览 -->
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
import qrcode from 'cps/qrcode/qrcode.vue'
const infoConfirmQueryUrl = "/api/findTrademarkOrderDetail/{id}";
const saveDraftUrl = "/api/saveChannelWorkOrder";
const submitUrl = "/api/report";
const pdfToImgUrl = "/api/preview";
const findAsistantRemarkUrl = "/api/findAsistantRemark";
export default {
	components: {
		qrcode
	},
	data() {
		return {
			remark: "", // popover 备注
			qcodeUrl: 'https://qr.alipay.com/bax05850tamcwie9inzv80f4',
            confirmVisible: false,
            current: 1,
			reffer: 1,
			loading: false,
			previewImg: "",
			voucherUrlImg: "",
			pdfDialogVisible: false,
			step: 3,
			workOrderSn: "",
			extraMinMum: 0,
			applicant: {

			},
			infoDetailData: {
				voucherUrl: "",
			}, //总的数据集合
			trademark: {
				proxy_url: "",
			}, //商标
			trademarkSubject: {
				standby1: "",
				standby2: "",
			}, //主体
			service_nice_min: {}, //小项
			workOrderInvoice: {}, //发票
			workOrderServiceList: {}, //服务单
			standby1_data: [],
			standby2_data: [],
			voucherUrl_data: [],
			// 委托书
			proxy_url_data: [],
			imgArr: [],
			id_list_delete: [],
			trademark_contact: [], //联系人信息
		};
	},
	mounted() {
		this.workOrderSn = this.$route.params.id;
		this.queryDetail();
	},
	methods: {
        changetb(num) {
            this.current = num
            if (num == 2) {
                this.$router.push({ name: 'traderecord', params: {id: this.workOrderSn} })
            }
            
        },
		preview(src) {
			this.previewImg = src
			this.pdfDialogVisible = true;
			
		},
		downloadfile(url) {
			window.open(url)
		},
		queryDetail() {
			this.loading = true;
			this.$http.get(infoConfirmQueryUrl.replace('{id}',this.workOrderSn))
			.then((res) => {
				this.loading = false;
				this.infoDetailData = res.data
				this.applicant = res.data.applicant
				console.log(this.applicant)
				console.log(res.data)
			})
			.catch((err) => {
				this.loading = false;
				console.log(err);
			});
		}
	},
	filters: {
		sqrFormat: Filters.sqrformat,
		areaFormat: Filters.areaformat,
		bzstateformat: Filters.bzstateformat,
		subjectTypeFormat: Filters.subjectTypeFormat,
		trademarkTypeFormat: Filters.trademarktypeformat,
		priceFormat: Filters.priceformat,
		dateFormat: Filters.formatDate.dateFormat,
		datesFormat: Filters.formatDate.dateFormatYMD,
		orderFormat: Filters.orderstateformat,
		bsTypeFormat: function(inputs) {
			const ret = inputs + ''
			if(ret == '1') {
				return '商标注册'
			}
		}
	},
};
</script>
<style lang="less">
.myorderdetail {
	background-color: #fff;
	padding: 30px;
	border-radius: 0 2px 2px 2px;
    min-height: 500px;
    .detailtab {
        border-bottom: 1px solid #f5f5f5;
        margin-bottom: 20px;
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
            .twocollist {
                width: 100%;
                > li {
                    float: left;
                    width: 50%;
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
        .btnspan {
            margin-right: 20px;
            cursor: pointer;
            color: #379dea;
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
					margin-bottom: 10px;
				}
				> p {
					word-break: break-all;
				}
			}
		}
	}
}
.el-dialog {
	z-index: 3000;
}
</style>
