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
					<el-input placeholder="请输入申请人名称" v-model="dataObj.ApplicantName"></el-input>
				</div>
				<div class="formcontrol">
					<el-select placeholder="申请人类型" v-model="dataObj.ApplicantType">
						<el-option label="企业" value="2">企业</el-option>
						<el-option label="个人" value="1">个人</el-option>
					</el-select>
				</div>
				<div class="formcontrol">
					<el-select placeholder="申请人状态" v-model="dataObj.auditStatus">
						<el-option label="未审核" value="1">未审核</el-option>
						<el-option label="审核中" value="2">审核中</el-option>
						<el-option label="审核通过" value="3">审核通过</el-option>
						<el-option label="审核不通过" value="4">审核不通过</el-option>
					</el-select>
				</div>
                
                <div class="searchbtnbox">
					<span class="searchbtn" @click="search(true)">搜索</span>
					<span class="resetbtn" @click="resets">重置</span>
				</div>
				<div class="newaddapp"  @click="addapp">
					<i class="el-icon-plus"></i> 新增申请人
				</div>
			</div>
			<div class="mytablebox">
				<el-table :data="dataList" style="width: 100%;">
					<el-table-column label="类型" min-width="100" align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.applicantType | sqrFormat }}</span>
						</template>
					</el-table-column>
					<el-table-column label="地域" min-width="100" align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.applicantRegion | areaFormat }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="applicantName" label="申请人名称" min-width="200" align="center">
					</el-table-column>
					<el-table-column prop="cardNumber" label="证件号" min-width="200" align="center">
					</el-table-column>
					<el-table-column label="状态" min-width="100" align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.auditStatus | sqztFormat }}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" min-width="100" align="center">
						<template slot-scope="scope">
							<el-button
								@click="handleClick(scope.row)"
								type="text"
								size="small"
								>查看</el-button
							>
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
	</div>
</template>
<script>
import auditapplicant from 'cps/public/auditapplicant.vue'
import Filters from 'utils/filters/'
const dataObj = {
	ApplicantName: null,
	ApplicantType: null,
	auditStatus: null
}
const listUrl = '/api/listApplicants'
const detailUrl = '/api/describeApplicant'
const numUrl = '/api/applicantStatistics'
export default {
	inject:['addapplicant'],
	data() {
		return {
			tablist: [
				{ id: 0, label: "全部", count: '' },
				{ id: '2', label: "企业", count: '' },
				{ id: '1', label: "个人", count: '' }
			],
			dataObj: Object.assign({}, dataObj),
			current: 0,
			dataList: [
			],
			itemid: '',
			viewitemshow: false,
            pgIndex: 1,
            pgCount: 10,
            total: 0,
            loading: false
		};
	},
	components: {
		auditapplicant
	},
	filters: {
		sqrFormat: Filters.sqrformat,
		sqztFormat: Filters.sqztformat,
		areaFormat: Filters.areaformat
	},
	created() {
		this.getquery()
		this.search(true)
	},
	methods: {
		
		changetab(it) {
			this.current = it.id;
			this.dataObj.ApplicantType = this.current ? this.current : null
			this.search(true)
		},
		addapp() {
			this.addapplicant()
		},
		addorder() {
			this.$router.push({ name: 'stepone' })
		},
		closethis() {
			this.viewitemshow = false
		},
		refresh() {
			this.viewitemshow = false
			this.search()
		},
        handleClick(it) {
			this.itemid = it.id
			this.viewitemshow = true
			
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
			}
		},
		resets() {
			this.dataObj = Object.assign({}, dataObj)
			this.current = 0
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
			if(ret.ApplicantType) {
				this.current = ret.ApplicantType
			} else {
				this.current = 0
			}
			this.$router.replace({ name: 'applicant', query: ret })
			this.getlist(ret)
		},
		getlist(datas) {
			const data = datas || {}
			this.$http.get(listUrl, { params: data }).then(res => {
				const alldata = res.data
				this.dataList = alldata.elements
				this.total = alldata.totalElements
				if (!this.current) {
					this.tablist[this.current]['count'] = this.total
				}
				
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
    }
    .formdatecontrol {
        float: left;
		width: 240px;
		height: 30px;
		margin-right: 10px;
        margin-bottom: 10px;
        .el-date-editor.el-input, .el-date-editor.el-input__inner {
            width: 100%;
        }
        .el-date-editor .el-range__icon{
            line-height: 24px;
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
.mytablebox {
    border: 1px solid #dfe2e5;
	border-bottom: none;
	.el-table {
		font-size: 13px;
	}
    .el-table thead th {
        background-color: #F5F5F5;
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
