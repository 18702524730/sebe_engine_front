<template>
	<div class="myordersbox">
		<ul class="myordertab">
			<li
				v-for="(item, index) in tablist"
				:key="index"
				:class="{ active: current == item.id }"
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
				<div class="searchbtnbox">
					<span class="searchbtn" @click="search(true)">搜索</span>
					<span class="resetbtn" @click="resets">重置</span>
				</div>
				<div class="downloadbtn" @click="downloadall">
					批量下载
				</div>
			</div>
			<div class="mytablebox">
				<el-table :data="dataList" style="width: 100%;" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55" align="center">
					</el-table-column>
					<el-table-column prop="orderId" label="订单号" min-width="150" align="center">
					</el-table-column>
					<el-table-column prop="trademarkName" label="商标名称" min-width="120" align="center">
					</el-table-column>
					<el-table-column prop="cls" label="类别" min-width="100" align="center">
					</el-table-column>
					
					<el-table-column label="下发时间" min-width="150" align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.deliveryTime | dateFormat}}</span>
						</template>
					</el-table-column>
					<el-table-column label="申请人" min-width="150" align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.applicant }}</span>
						</template>
					</el-table-column>
					<el-table-column label="申请号" min-width="150" align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.trademarkNumber }}</span>
						</template>
					</el-table-column>
                    <el-table-column label="官文类型" min-width="120" align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.officialName }}</span>
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
							<el-button type="text" size="small" @click="dload(scope.row)">下载</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
            <div class="mypagination">
                <el-pagination class="fr" :total="total" :page-size="pgCount" :current-page="pgIndex" @current-change="handeCurrentChange" layout="total,prev,pager,next"></el-pagination>
            </div>
		</div>
		<el-dialog title="查看官文" width="600px" :visible.sync="pdfshow">
			<div class="pdfbox">
				<object
					:data="nowpdf"
					type="application/pdf"
					style="width:560px;height:600px;"
				>
					<strong>返回内容：</strong>该浏览器不支持PDFS <a :href="nowpdf" target="_blank">点击查看</a>
				</object>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import Filters from 'utils/filters'
import VueCookie from 'vue-cookie'
const listUrl = '/api/findOfficialDocuemntList'
const dataObj = {
	orderId: null,
	trademarkName: null,
	applicant: null
}
export default {
	// inject:['addapplicant'],
	data() {
		return {
			tablist: [
				{ id: 1, label: "官文管理", count: 0 },
			],
			dataObj: Object.assign({}, dataObj),
			current: 1,
			pdfshow: false,
			dataList: [],
			nowpdf: '',
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
			multipleSelection: [],
			token: '',
            pgIndex: 1,
            pgCount: 10,
            total: 0,
            loading: false
		};
	},
	filters: {
		dateFormat: Filters.formatDate.dateFormat
	},
	created() {
		this.token = VueCookie.get('engine_service_token')
		this.search(true)
	},
	methods: {
		changetab(it) {
			this.current = it.id;
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
			console.log(val)
		},
		downloadall() {
			if(!this.multipleSelection.length){
				this.$message.error('请选择需要下载订单')
				return
			}
			const arr = this.multipleSelection
			const ret = []
			let str = ''
			arr.forEach(item => {
				ret.push(item.officialFile)
			})
			str = ret.join(',')
			const url = `${CONFIG.rootUrl}/api/batchDownloadOfficialDocument?access_token=${this.token}&officialFiles=${str}`
			window.open(url)
		},
		dload(it) {
			// const url = `${CONFIG.rootUrl}/api/batchDownloadOfficialDocument?officialFiles=${str}`
			window.open(it.officialFile)
		},
        handleClick(it) {
			this.nowpdf = it.officialFile
			this.pdfshow = true;
        },
        getquery() {
			const query = this.$router.query
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
			this.search(true)
		},
        handeCurrentChange(i) {
			this.pgIndex = i
			this.search()
        },
		search(isf) {
			const ret = Object.assign({}, this.dataObj)
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
	.downloadbtn {
		float: right;
		width: 100px;
		height: 30px;
		margin-bottom: 10px;
		color: rgba(255, 255, 255, 1);
		background-color: #3367a2;
		border-radius: 2px;
		cursor: pointer;
		font-size: 14px;
		text-align: center;
		line-height: 30px;
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
}
.mypagination {
    padding-top: 20px;
    overflow: hidden;
}
.myordersbox {
	border-radius: 4px;
	.myordertab {
		height: 60px;
		padding: 0 38px;
		border-bottom: 1px solid #dfe2e5;
		> li {
			float: left;
			margin-right: 50px;
			height: 59px;
			padding: 0 15px;
			line-height: 59px;
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
	.pdfbox {
		height: 600px;
	}
}

</style>
