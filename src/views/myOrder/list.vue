<template>
	<div class="myordersbox">
		<ul class="myordertab">
			<li
				v-for="(item, index) in tablist"
				:key="index"
				:class="{ active: current == item.id }"
				@click="changetab(item)"
			>
				<span>{{ item.label }}</span
				><span v-if="item.count">({{ item.count }})</span>
			</li>
		</ul>
		<div class="myorderlist">
			<div class="conditionsbox clearfix">
				<div class="formcontrol">
					<el-input v-model="dataObj.orderId" placeholder="请输入订单号"></el-input>
				</div>
				<div class="formcontrol">
					<el-input v-model="dataObj.trademarkName" placeholder="请输入商标名称"></el-input>
				</div>
				<div class="formcontrol">
					<el-input v-model="dataObj.applicant" placeholder="请输入申请人名称"></el-input>
				</div>
				<div class="formdatecontrol">
                    <el-date-picker
                        v-model="payment_time"
                        type="daterange"
                        align="right"
                        start-placeholder="时间开始"
                        end-placeholder="结束"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
				<div class="formcontrol">
					<el-select v-model="dataObj.state" clearable placeholder="订单状态">
						<el-option
							v-for="item in payStatusOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="formcontrol">
					<el-select placeholder="补正状态" v-model="dataObj.supplementState">
						<el-option label="初始化" value="1">初始化</el-option>
						<el-option label="待补正" value="2">待补正</el-option>
						<el-option label="放弃补正" value="3">放弃补正</el-option>
						<el-option label="已补正" value="4">已补正</el-option>
						<el-option label="补正超时" value="5">补正超时</el-option>
						<el-option label="补正已提交" value="6">补正已提交</el-option>
					</el-select>
				</div>
				<div class="searchbtnbox">
					<span class="searchbtn" @click="search(true)">搜索</span>
					<span class="resetbtn" @click="resets">重置</span>
				</div>
				<div class="newaddapp"  @click="addorder">
					<i class="el-icon-plus"></i> 新增订单
				</div>
			</div>
			<div class="mytableboxspec">
				<el-table :data="dataList" style="width: 100%;">
					<el-table-column prop="orderId" label="订单号" min-width="150" align="center">
					</el-table-column>
					<el-table-column label="业务类型" min-width="100" align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.bsType | bstypeFormat }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="applicant" label="申请人名称" min-width="200" align="center">
					</el-table-column>
					<el-table-column prop="trademarkName" label="商标名称" min-width="120" align="center">
					</el-table-column>
					<el-table-column label="申请类别" min-width="80" align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.cls }}</span>
						</template>
					</el-table-column>
					<el-table-column label="金额（元）" min-width="100" align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.orderAmount | priceFormat}}</span>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" min-width="150" align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.createTime | dateFormat }}</span>
						</template>
					</el-table-column>
                    <el-table-column label="订单状态" min-width="120" align="center"> 
						<template slot-scope="scope">
							<span>{{ scope.row.state | orderFormat }}</span>
							<span v-if="scope.row.state==2" class="errortipsbox" @mouseover="showtip(scope.row)" @mouseout="closetip"><i class="el-icon-warning"></i><span class="errortip" v-if="scope.row.id == nowid">{{scope.row.note}}</span></span>
						</template>
					</el-table-column>
                    <el-table-column label="补正状态" min-width="120" align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.supplementState | bzstateFormat }}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" min-width="80" align="center">
						<template slot-scope="scope">
							<el-button
								@click="handleClick(scope.row)"
								type="text"
								size="small"
								>查看</el-button
							>
							<el-button type="text" size="small" v-if="scope.row.state == 2" @click="reselect(scope.row)">重选申请人</el-button>
                            <el-button type="text" size="small" v-if="scope.row.state == 2" @click="xiugai(scope.row)">修改申请人</el-button>
							<el-button type="text" size="small" v-if="scope.row.state == 2" @click="closeorder(scope.row)">关闭订单</el-button>
							<el-button type="text" v-if="scope.row.supplementState==2" size="small" @click="openbz(scope.row)">补正</el-button>
						</template>
					</el-table-column>
                    <el-table-column label="复制订单内容" min-width="100" align="center">
						<template slot-scope="scope">
                            <span @click="copycont(scope.row)"><img src="~assets/img/login/copy.png" alt=""></span>
						</template>
					</el-table-column>
				</el-table>
			</div>
            <div class="mypagination">
                <el-pagination class="fr" :total="total" :page-size="pgCount" :current-page="pgIndex" @current-change="handeCurrentChange" layout="total,prev,pager,next"></el-pagination>
            </div>
		</div>
		<div v-if="viewitemshow">
			<auditapplicant :id="itemid" @complete="refresh" @close="closethis"></auditapplicant>
		</div>
		<el-dialog
			:visible.sync="pdfDialogVisible"
			:lock-scroll="false"
			:append-to-body="true"
			width="700px"
		>
			<img width="100%" :src="previewImg" alt="" />
		</el-dialog>
		<el-dialog width="700px" title="商标补正" :visible.sync="bzshow" :close-on-click-modal="false" :before-close="cancel">
			<div>
				<div class="itembzmsg clearfix">
					<div class="bzlabel">发文编号：</div>
					<div class="bzcont">{{nowdetail.serialNumber}}</div>
				</div>
				<div class="itembzmsg clearfix">
					<div class="bzlabel">申请号：</div>
					<div class="bzcont">{{nowdetail.trademarkNumber}}</div>
				</div>
				<div class="itembzmsg clearfix" v-if="nowdetail.supplementOfficialFile">
					<div class="bzlabel">补正官文：</div>
					<div class="bzcont"><span class="yulanbtn" @click="preview(nowdetail.supplementOfficialFile)">预览</span><span class="yulanbtn" @click="downloadfile(nowdetail.supplementOfficialFile)">下载</span></div>
				</div>
				<div class="itembzmsg clearfix">
					<div class="bzlabel">商标局发文日期：</div>
					<div class="bzcont">{{nowdetail.sendTime|datesFormat}}</div>
				</div>
				<div class="itembzmsg clearfix">
					<div class="bzlabel">回复截止日期：</div>
					<div class="bzcont">{{nowdetail.acceptExpirationDate|datesFormat}}</div>
				</div>
				<div class="huiwen">
					<div class="linehw"></div>
					<div class="huiwenh">回文</div>
				</div>
				<div class="itembzmsg clearfix">
					<div class="bzlabel">是否补正：</div>
					<div class="bzcont">
						<el-radio-group v-model="bzinfo.ifSupplement">
							<el-radio :label="1">补正</el-radio>
							<el-radio :label="2">放弃补正</el-radio>
						</el-radio-group>
					</div>
				</div>
				<div class="itembzmsg clearfix" v-if="bzinfo.ifSupplement==1">
					<div class="bzlabel">有关说明文件：</div>
					<div class="bzcont">
						<uploader
							@complete="setUploadedMaterial"
							@resetUploader="resetUploader"
							:fileName="intrfile_name"
							:canPreview="true"
							:postAction="'/sebe_engine/api/file/uploadFile?access_token=' + this.token + '&uploadFilePolicy=SUPPLEMENT'"
							:url="intrfile"
							:valueName="'intrfile'"
							:extensions="'jpg,JPG,png,PNG,jpeg,JPEG'"
							:isDialog="true"
							:size="10"
						></uploader>
					</div>
				</div>
				<div class="itembzmsg clearfix" v-if="bzinfo.ifSupplement==1">
					<div class="bzlabel">对回文的相关说明：</div>
					<div class="bzcont">
						<el-input type="textarea" v-model="bzinfo.content" :autosize="{minRow: 1, maxRow: 3}"></el-input>
					</div>
				</div>
				<div class="caozuobtns">
					<span class="qx" @click="cancel">取消</span>
					<span class="tj" @click="qrsubmit">确认提交</span>
				</div>
			</div>
		</el-dialog>
		<el-dialog width="1000px" :visible.sync="selectapplyshow" title="申请人信息">
			<selectapplicant @closemodal="selectapplyshow = false" @selectedapplicant="selectedapplicantid"></selectapplicant>
		</el-dialog>
	</div>
</template>
<script>
import Filters from 'utils/filters/'
import uploader from "cps/uploader/uploader.vue";
import VueCookie from 'vue-cookie'
import auditapplicant from 'cps/public/auditapplicant'
import selectapplicant from 'cps/public/selectapplicant'
const dataObj = {
	orderId: null,
	trademarkName: null,
	applicant: null,
	supplementState: null,
	state: null
}
const payStatusOptions = [
		{
			value: '0',
			label: '已支付'
		}, {
			value: '1',
			label: '待审核'
		},
		{
			value: '2',
			label: '审核不通过'
		}, {
			value: '3',
			label: '审核通过'
		},
		{
			value: '4',
			label: '订单关闭'
		}, {
			value: '20',
			label: '已提交到商标局'
		},
		{
			value: '21',
			label: '商标局已接受'
		}, {
			value: '22',
			label: '商标局不予受理'
		},
		{
			value: '23',
			label: '商标局受理通过'
		}, {
			value: '29',
			label: '商标局部分驳回'
		},
		{
			value: '30',
			label: '商标局驳回'
		}, {
			value: '31',
			label: '商标局审通过'
		},
		{
			value: '99',
			label: '申请成功结束'
		}
	];
const listUrl = '/api/findTrademarkOrderList'
const detailUrl = '/api/findTrademarkOrderDetail/{id}'
const closeUrl = '/api/closeTrademarkOrder'
export default {
	// inject:['addapplicant'],
	data() {
		return {
			tablist: [
				{ id: 'all', label: "全部订单", count: 0 },
				{ id: '1', label: "待审核", count: 0 },
				{ id: '2', label: "审核不通过", count: 0 },
				{ id: '3', label: "审核通过", count: 0 },
			],
			payStatusOptions: payStatusOptions,
			state: '',
			states: '',
			current: 'all',
			viewitemshow: false,
			previewImg: "",
			pdfDialogVisible: false,
			selectapplyshow: false,
			selectedid: '',
			itemid: '',
			token: '',
			bzshow: false,
			bzinfo: {
				ifSupplement: 1,
				content: '',
				userFileOsskeys: '',
				id: ''
			},
			dataList: [],
			intrfile: '',
			intrfile_name: '',
			intrfile_oss: '',
			intrfile_data: [],
			pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
			payment_time: [],
			dataObj: Object.assign({}, dataObj),
            pgIndex: 1,
            pgCount: 10,
            total: 0,
			loading: false,
			nowid: 0,
			nowdetail: {

			}
		};
	},
	components: {
		uploader,
		auditapplicant,
		selectapplicant
	},
	filters: {
		priceFormat: Filters.priceformat,
		dateFormat: Filters.formatDate.dateFormat,
		datesFormat: Filters.formatDate.datesFormat,
		orderFormat: Filters.orderstateformat,
		bzstateFormat: Filters.bzstateformat,
		bstypeFormat: function(inpt) {
			var inputs = inpt + ''
			if (inputs == '1') {
				return '商标注册'
			}
			return ''
		}
	},
	created() {
		this.token = VueCookie.get('engine_service_token')
		this.getquery()
		this.search(true)
	},
	methods: {
		copycont(it) {
			this.$router.push({ name: 'stepone', query: {id: it.id}})
		},
		selectedapplicantid(data) {
			const pdata = Object.assign({}, data)
			pdata.id = this.selectedid
			this.$http.post('/api/reSelectBindApplicant', pdata).then(res => {
				this.$message.success('操作成功')
				this.search()
				this.selectapplyshow = false
			}).catch(err => {
				this.$message.error(err.response.data.msg||'操作失败')
			})
		},
		preview(src) {
			this.previewImg = src
			this.pdfDialogVisible = true;
			
		},
		downloadfile(url) {
			window.open(url)
		},
		cancel() {
			this.bzinfo.ifSupplement = 1
			this.bzinfo.content = ''
			this.bzinfo.userFileOsskeys = ''
			this.intrfile = ''
			this.intrfile_name = ''
			this.intrfile_oss = ''
			this.bzshow = false
		},
		qrsubmit() {
			if(this.bzinfo.ifSupplement == 1) {
				if(!this.intrfile) {
					this.$message.warning('请上传有关说明文件')
					return
				}
				if(!this.bzinfo.content) {
					this.$message.warning('请填写对回文的相关说明')
					return
				}
				const ndata = {
					ifSupplement: 1,
					content: this.bzinfo.content,
					userFiles: this.intrfile,
					userFileOsskeys: this.intrfile_oss,
					id: this.bzinfo.id
				}
				this.$http.post('/api/operateSupplement', ndata).then(res => {
					this.cancel()
					this.search()
					this.$message.success('操作成功')
				}).catch(err => {
					this.$message.error(err.response.data.msg||'操作失败')
				})
			}
			if(this.bzinfo.ifSupplement == 2) {
				this.$confirm('是否确认拒绝补正？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const ndatas = {
						ifSupplement: 0,
						id: this.bzinfo.id
					}
					this.$http.post('/api/operateSupplement', ndatas).then(res => {
						this.cancel()
						this.search()
						this.$message.success('操作成功')
					}).catch(err => {
						this.$message.error(err.response.data.msg||'操作失败')
					})
				}).catch(() => {
				})
				
			}
			
		},
		setUploadedMaterial(data) {
			var dat = data.data;
			let d = Object.assign({}, dat);
			if (d.url) {
				this[data.valueName] = d.url;
                this[data.valueName + "_name"] = d.fileName;
                this[data.valueName + "_oss"] = d.ossKey
			} else {
				this.uploaderErrCallback(d);
			}
			console.log(data);
		},
		resetUploader(valueName) {
			this[valueName] = "";
            this[valueName + "_name"] = "";
            this[data.valueName + "_oss"] = ""
		},
		uploaderErrCallback(data) {
			this.$alert(data.msg);
        },
		changetab(it) {
			this.current = it.id;
			if(it.id == 'all') {
				this.dataObj.state = null
			}else {
				this.dataObj.state = it.id
			}
			
			this.search(true)
		},
		addorder() {
			this.$router.push({ name: 'stepone' })
		},
		openbz(it){
			this.$http.get(detailUrl.replace('{id}',it.id))
			.then((res) => {
				this.nowdetail = res.data
				this.bzinfo.id = it.id
				this.bzshow = true
				console.log(res.data)
			})
			.catch((err) => {
				this.$message.error(err.response.data.msg)
			});
			
		},
		reselect(it){
			this.selectedid = it.id
			this.selectapplyshow = true
		},
		xiugai(it) {
			this.itemid = it.applicantTbId
			this.viewitemshow = true
		},
		closethis() {
			this.viewitemshow = false
		},
		refresh() {
			this.viewitemshow = false
			this.search()
		},
		closeop(id) {
			const data = {
				id: id
			}
			this.$http.post(closeUrl,data).then(res => {
				this.search()
				this.$message.success('操作成功')
			}).catch(err => {
				this.$message.error(err.response.data.msg || '操作失败')
			})
		},
		closeorder(it) {
			const self = this
			this.$confirm('确认关闭此订单吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              	self.closeop(it.id)
            }).catch(() => {
            })
			
		},
        handleClick(it) {
			this.$router.push({ name: 'myorderdetail', params: { id: it.id } })
        },
        getquery() {
			const query = this.$route.query
			console.log(query)
			if (query) {
				const ret = {}
				for (const k in query) {
					if(query[k]) {
						ret[k] = query[k]
					}
				}
				this.dataObj = Object.assign({}, ret)
				if (ret.startTime) {
					this.payment_time = ret.startTime && [new Date(ret.startTime-0), new Date(ret.endTime-86390000)];
				}
			}
		},
		resets() {
			this.dataObj = Object.assign({}, dataObj)
			this.payment_time = []
			this.current = 'all'
			this.search(true)
		},
        handeCurrentChange(i) {
			this.pgIndex = i
			this.search()
        },
		search(isf) {
			const ret = Object.assign({}, this.dataObj)
			if (ret.state > 3 || ret.state == 0 || !ret.state) {
				this.current = 'all'
			} else {
				this.current = ret.state
			}
			if (this.payment_time) {
				ret.startTime = this.payment_time[0] ? new Date(this.payment_time[0]).getTime() : null;
				ret.endTime = this.payment_time[1] ? new Date(this.payment_time[1]).getTime() + 86390000 : null;
			}
			ret.pgIndex = isf ? 1 : this.pgIndex
			ret.pgCount = this.pgCount
			this.$router.replace({ query: ret })
			this.getlist(ret)
		},
		getlist(datas) {
			const data = datas || {}
			this.$http.get(listUrl, { params: data }).then(res => {
				const alldata = res.data
				this.dataList = alldata.elements
				this.total = alldata.totalElements
				
			}).catch(err => {
				this.$message.error(err.response.data.msg)
			})
		},
		showtip(row) {
			this.nowid = row.id
		},
		closetip() {
			this.nowid = 0
		}
	},
};
</script>
<style lang="less">
.conditionsbox {
	padding: 20px 0 10px;
	.formcontrol {
		float: left;
		width: 150px;
		height: 30px;
		margin-right: 10px;
		margin-bottom: 10px;
		.el-select .el-input .el-input__icon {
			line-height: 30px;
		}
	}
	.formdatecontrol {
        float: left;
		width: 240px;
		height: 30px;
		margin-right: 10px;
        margin-bottom: 10px;
        .el-date-editor.el-input, .el-date-editor.el-input__inner {
			height: 30px;
            width: 100%;
        }
        .el-date-editor .el-range__icon{
            line-height: 24px;
		}
		.el-date-editor .el-range-input {
			width: 45%;
		}
        .el-date-editor .el-range-separator,
        .el-date-editor .el-range__close-icon {
            line-height: 22px;
		}
		
    }
	.searchbtnbox {
		float: left;
		height: 30px;
		margin-right: 10px;
		margin-bottom: 10px;
		> span {
			float: left;
			width: 68px;
			height: 30px;
			border-radius: 2px;
			cursor: pointer;
			font-size: 14px;
			text-align: center;
			line-height: 30px;
		}
		.searchbtn {
			margin-right: 10px;
			font-family: "PingFangSC-Regular", "PingFang SC";
			color: rgba(255, 255, 255, 1);
			background-color: #3367a2;
		}
		.resetbtn {
			font-family: "PingFangSC-Regular", "PingFang SC";
			color: #556677;
			border: 1px solid #556677;
		}
	}
	.newaddapp {
		float: right;
		width: 120px;
		height: 30px;
		text-align: center;
		font-size: 14px;
		line-height: 30px;
		border-radius: 2px;
		cursor: pointer;
		font-family: "PingFangSC-Regular", "PingFang SC";
		color: rgba(255, 255, 255, 1);
		background-color: #3367a2;
	}
}
.mytableboxspec {
	
    border: 1px solid #dfe2e5;
	border-bottom: none;
	.el-table {
		font-size: 13px;
	}
    .el-table thead th {
        background-color: #F5F5F5;
	}
	.el-table .cell {
		overflow: visible;
	}
	.el-button--mini, .el-button--small {
		font-size: 13px;
	}
	.el-table td, .el-table th.is-leaf {
		border-bottom: 1px solid #dfe2e5;
	}
}
.mypagination {
    padding-top: 20px;
    overflow: hidden;
}
.myordersbox {
	height: 100%;
	padding-bottom: 20px;
	background-color: #fff;
	border-radius: 4px;
	.myordertab {
		height: 60px;
		padding: 0 38px;
		border-bottom: 1px solid #dfe2e5;
		> li {
			float: left;
			margin-right: 50px;
			height: 59px;
			line-height: 59px;
			padding: 0 15px;
			font-size: 14px;
			font-family: "PingFangSC-Regular", "PingFang SC";
			color: rgba(85, 102, 119, 1);
			cursor: pointer;
			&.active {
				color: #3367a2;
				border-bottom: 2px solid #3367a2;
			}
		}
	}
	.myorderlist {
		padding: 0 38px;
	}
	.itembzmsg {
		display: flex;
		margin-bottom: 10px;
		.bzlabel {
			width: 140px;
			vertical-align: top;
			line-height: 30px;
			font-size: 14px;
			color: #666;
		}
		.bzcont {
			flex: 1;
			line-height: 30px;
			font-size: 14px;
			color: #000;
			.yulanbtn {
				margin-right: 30px;
				color: #379dea;
				cursor: pointer;
			}
		}
	}
	.huiwen {
		position: relative;
		height: 40px;
		.linehw {
			position: absolute;
			top: 20px;
			width: 100%;
			border-top: 1px solid #ccc;
		}
		.huiwenh {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 60px;
			height: 20px;
			font-size: 16px;
			text-align: center;
			background-color: #fff;
			z-index: 2;
		}
	}
	.caozuobtns {
		padding: 10px 0;
		text-align: right;
		font-size: 0;
		> span {
			display: inline-block;
			width: 120px;
			height: 40px;
			font-size: 14px;
			border-radius: 2px;
			cursor: pointer;
			line-height: 40px;
			text-align: center;
			&.qx {
				border: 1px solid #ccc;
				color: #666
			}
			&.tj {
				margin-left: 20px;
				background-color: #3367a2;
				color: #fff;
			}
		}

	}
	.errortipsbox {
		position: relative;
		color: #e44848;
		.errortip {
			position: absolute;
			left: 20px;
			top: -10px;
			z-index: 999999;
			font-size: 12px;
			color: #333;
			width: 200px;
			border: 1px solid #ccc;
			border-radius: 2px;
			padding: 0 5px;
			line-height: 20px;
			max-height: 70px;
			word-break: break-all;
			background-color: #fff;
			text-align: left;
		}
	}
}

</style>
