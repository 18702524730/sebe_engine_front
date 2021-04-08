<template>
	<div class="myordersbox">
		<ul class="myordertab">
			<li
				v-for="(item, index) in tablist"
				:key="index"
				:class="{ active: current == item.id }"
			>
				<span>{{ item.label }}</span>
			</li>
		</ul>
		<div class="myorderlist">
			<div class="conditionsbox clearfix">
				<div class="formcontrol">
					<el-input v-model="dataObj.tradeSn" placeholder="请输入交易编号"></el-input>
				</div>
				<div class="formcontrol">
					<el-input v-model="dataObj.paymentSn" placeholder="请输入订单号"></el-input>
				</div>
				<div class="formdatecontrol">
                    <el-date-picker
                        v-model="payment_time"
                        type="daterange"
                        align="right"
                        start-placeholder="支付时间开始"
                        end-placeholder="结束"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
				<div class="formcontrol">
					<el-select placeholder="收支类型" v-model="dataObj.inandexType">
						<el-option label="收入" value="1">收入</el-option>
						<el-option label="支出" value="2">支出</el-option>
					</el-select>
				</div>
				<div class="formcontrol">
					<el-select placeholder="交易类型" v-model="dataObj.tradeType">
						<el-option label="充值" value="1">充值</el-option>
						<el-option label="消费" value="2">消费</el-option>
						<el-option label="退款" value="3">退款</el-option>
					</el-select>
				</div>
				<div class="searchbtnbox">
					<span class="searchbtn" @click="search(true)">搜索</span>
					<span class="resetbtn" @click="resets">重置</span>
				</div>
			</div>
			<div class="mytablebox">
				<el-table :data="dataList" style="width: 100%;">
					<el-table-column prop="tradeSn" label="交易编号" min-width="150" align="center">
					</el-table-column>
					<el-table-column label="交易时间" min-width="150" align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.tradeTime | dateFormat }}</span>
						</template>
					</el-table-column>
					<el-table-column label="收支类型" min-width="100" align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.inandexType | shouzhiFormat}}</span>
						</template>
					</el-table-column>
					<el-table-column label="交易类型" min-width="100" align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.tradeType | jiaoyiFormat }}</span>
						</template>
					</el-table-column>
					<el-table-column label="金额（元）" min-width="100" align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.money | priceFormat }}</span>
						</template>
					</el-table-column>
					
                    <el-table-column label="订单号" min-width="120" align="center"> 
						<template slot-scope="scope">
							<span>{{ scope.row.paymentSn }}</span>
						</template>
					</el-table-column>
                    <el-table-column label="余额" min-width="120" align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.balance | priceFormat }}</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
            <div class="mypagination">
                <el-pagination class="fr" :total="total" :page-size="pgCount" :current-page="pgIndex" @current-change="handeCurrentChange" layout="total,prev,pager,next"></el-pagination>
            </div>
		</div>
	</div>
</template>
<script>
import Filters from 'utils/filters/'
const listUrl = '/api/findCapitalDetailList'
const dataObj = {
	tradeSn: null,
	paymentSn: null,
	inandexType: null,
	tradeType: null
}
export default {
	// inject:['addapplicant'],
	data() {
		return {
			dataObj: Object.assign({}, dataObj),
			tablist: [
				{ id: 1, label: "收支明细", count: 0 }
			],
			state: '',
			states: '',
			current: 1,
			dataList: [
			],
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
            pgIndex: 1,
            pgCount: 10,
            total: 0,
            loading: false
		};
	},
	created() {
		this.search(true)
	},
	filters: {
		shouzhiFormat: Filters.shouzhiformat,
		jiaoyiFormat: Filters.jiaoyiformat,
		priceFormat: Filters.priceformat,
		dateFormat: Filters.formatDate.dateFormat
	},
	methods: {
		changetab(it) {
			this.current = it.id;
		},
		addorder() {
			this.$router.push({ name: 'stepone' })
		},
        handleClick(it) {
            // const ret = {}
            // ret.payment_start_time = this.payment_time[0] ? new Date(this.payment_time[0]).getTime() : null;
            // ret.payment_end_time = this.payment_time[1] ? new Date(this.payment_time[1]).getTime() + 86390000 : null;
            // this.payment_time = queryObj.payment_start_time && [new Date(queryObj.payment_start_time-0), new Date(queryObj.payment_end_time-86390000)];
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
			ret.pgIndex = isf ? 1 : this.pgIndex
			ret.pgCount = this.pgCount
			if (this.payment_time) {
				ret.tradeTimeBegin = this.payment_time[0] ? new Date(this.payment_time[0]).getTime() : null;
				ret.tradeTimeEnd = this.payment_time[1] ? new Date(this.payment_time[1]).getTime() + 86390000 : null;
			}
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
}
</style>
