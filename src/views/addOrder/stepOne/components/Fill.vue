<template>
	<div
		class="trademarkmessagesebe"
		v-loading="loading"
		element-loading-text="拼命加载中"
	>
		<p class="mb20">商标基本信息</p>
		<el-form
			class="basic_info"
			ref="tmForm"
			:model="trademarkData"
			:rules="tmFormRules"
			:inline="true"
			auto-complete="off"
			label-width="120px"
			v-if="!loading"
		>
			<el-form-item
				label="商标类型："
				prop="trademarkType"
				style="width: 53%;"
				required
			>
				<el-radio-group v-model="trademarkData.trademarkType">
					<el-radio
						class="radio"
						
						:label="1"
						>文字商标</el-radio
					>
					<el-radio
						class="radio"
						:label="2"
						>图形商标</el-radio
					>
					<el-radio
						class="radio"
						:label="3"
						>图文组合商标</el-radio
					>
				</el-radio-group>
			</el-form-item>

			<el-form-item
				label="商标名称："
				style="width: 53%;"
				v-if="trademarkData.trademarkType!=2"
				required
			>
				<el-input
					size="small"
					v-model="trademarkData.trademarkName"
					placeholder="请输入商标名称"
					:maxlength="50"
				></el-input>
			</el-form-item>

			<el-form-item
				label="商标说明："
				style="width: 53%;"
			>
				<el-input
					type="textarea"
					v-model="trademarkData.trademarkDesc"
					:autosize="{ minRows: 4, maxRows: 6 }"
					size="small"
					placeholder="请输入商标说明，限90个汉字"
					:maxlength="90"
				></el-input>
			</el-form-item>

			<el-form-item
				v-if="trademarkData.trademarkType!=1"
				label="商标图样："
				style="width: 53%;"
				required
			>
				<el-radio-group v-model="trademarkData.trademarkIconType"> 
					<el-radio class="radio" :label="1"
						>黑白图样</el-radio
					>
					<el-radio class="radio" :label="2"
						>彩色图样</el-radio
					>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="上传图样：" style="width: 80%;" required>
				<!-- <div class="upload_component" v-if="trademarkData.pic_type == 2" style="margin-bottom:20px;">
					<uploader @complete="setUploadedDataSpecify" @resetUploader="resetUploader" :fileName="standby2_name" :postAction="'iprp_servicer/api/file/uploadPic'" :url="standby2" :valueName="'standby2'" :size="0.2" :extensions="'jpg,jpeg'"></uploader>
					<div class="upload_tip">
						<p>指定色图片</p>
						<p class="format">格式说明：格式为jpg，图形应清晰，图样文件大小应小于200KB且图形像素介于“400×400”－“1500×1500”之间。</p>
					</div>
				</div> -->
				<div class="upload_component">
					<uploader
						@complete="setUploadedDataBlack"
						@resetUploader="resetUploader"
						:fileName="standby1_name"
						:postAction="'sebe_engine/api/file/uploadFile?verifyType=2&uploadFilePolicy=ICON'"
						:url="standby1"
						:valueName="'standby1'"
						:size="0.2"
						:extensions="'jpg,jpeg,JPG,JPEG'"
					></uploader>
					<div class="upload_tip">
						<p class="autocreate">
							<a href="javascript:void 0" v-if="trademarkData.trademarkType==1" @click.prevent="autocreatepic"
								>自动生成</a
							>
						</p>
						<!-- <p>黑白色图片<span v-if="trademarkData.pic_type == 2">(可选填)</span></p>
						<p class="format">格式说明：格式为jpg，图形应清晰，图样文件大小应小于200KB且图形像素介于“400×400”－“1500×1500”之间。</p> -->
						<p>
							<i class="el-icon-warning-outline"></i>
							商标含有文字不应过多，文字过多易造成商标显著性不强而被驳回。
						</p>
						<p>
							申请商标应符合法律规定，请勿模仿或复制他人已经注册的商标，以免侵权他人的合法权益。
						</p>
					</div>
				</div>
			</el-form-item>
		</el-form>

		<div class="trademarkmsg">
			<p>请选择分类及小项<span style="font-size:12px;color: #999">（若有多个大类，请先提交该订单，再从订单列表中点击“复制订单”后调整大类快速提交）</span></p>
			<!-- 45大类 -->
			<ul class="clearfix mt15">
				<li
					v-for="(item, $index) in bigState"
					:class="{
						click_li: selectedBigItemCode == item.classificationCode,
						notChoose: selectedBigs.indexOf(item.classificationCode) != -1
					}"
					class="fl mr10 mb10"
					@click="selected(item)"
					:key="$index"
				>
					{{ item.classificationCode }} {{ item.classificationName }}
				</li>
			</ul>
			<div
				class="events clearfix mt10"
				style="padding-right: 10px;"
				v-show="selectedBigItemCode || curSelectedLists.length"
			>
				<div class="events_left fl">
					<div class="head clearfix" v-if="niceEventsData.length">
						<!-- 选中名称 -->
						<p>{{ selectedBigItem.classificationCode}} {{ selectedBigItem.classificationName }}</p>
						<!-- <button class="fr" @click="DataFuzzyQuery(searchEvents)">搜索</button> -->
						<input
							type="text"
							v-model="searchEvents"
							class="fr"
							placeholder="请输入小项名称、编号或关键词"
							@keyup="DataFuzzyQuery(searchEvents)"
							@focus="DataFuzzyQuery(searchEvents)"
							@blur="blurclick"
						/>
						<ul class="fuzzyqueryList" v-if="FuzzyQueryData.length">
							<li
								v-for="item in FuzzyQueryData"
								@click="FuzzyQueryClick(item.classificationCode)"
								v-html="item.namestr"
								:key="item.classificationCode"
							></li>
						</ul>
						<img src="~assets/img/Searchicon.png" alt="" />
					</div>
					<!-- {{curSelectedSmallIdList}} -->
					<div class="list_over" v-loading="smallLoading" v-if="niceEventsData.length">
						<div
							class="events_list"
							v-for="(item, $index) in niceEventsData"
							:key="$index"
						>
							<!-- 小项头部 -->
							<div
								class="list_state clearfix"
								:class="{ mt20: $index != 0 }"
								@click="toggleSmallNav(item)"
							>
								<p class="list_name fl">
									<i
										class="el-icon-caret-bottom"
										v-show="!item.shrinkage"
										style="background-color: #f5f5f5;"
									></i>
									<i
										class="el-icon-caret-right"
										v-show="item.shrinkage"
										style="background-color: #f5f5f5;"
									></i>
									{{ item.classificationCode }} {{ item.classificationName }}
								</p>
								<p class="state_num fr">{{ item.total }}项</p>
							</div>
							<!-- 小项 -->
							<div class="itemsmallbox" v-if="item.shrinkage">
								<template>
									<el-checkbox-group
										@change="selectSmallChange(item)"
										v-model="smallCheckedIds"
									>
										<el-checkbox
											v-for="(eventsName, eventsindex) in item.mins"
											:label="eventsName.classificationCode"
											:value="eventsName.classificationCode"
											:key="eventsindex"
											>{{eventsName.officialCode}} {{ eventsName.classificationName }}</el-checkbox
										>
									</el-checkbox-group>
								</template>
							</div>
						</div>
					</div>
				</div>
				<div class="events_right fl">
					
					<div class="right_num clearfix">
						<p class="right_tit fl" >已选择的商标类别</p>
						<p class="right_btn fr" @click="resetEvent">清空</p>
					</div>
					<div class="right_list" v-if="curSelectedLists.length">
						<ul>
							<li
								v-for="it in curSelectedLists"
								style="text-align: left;"
								class="mb10"
								:key="it.parentCode"
							>
								<h3 class="itembigname">{{`第${it.parentCode}类`}} <span style="color:#f5a623;font-size: 14px;font-weight:normal">(已选{{it.count}}项，10项以内{{priceinfo.trademarkRegistClassUnitPrice}}元)</span></h3>
								<div v-for="group in it.groupSelected" :key="group.classificationCode">
									<div style="margin-bottom: 10px;color: #f5a623;">{{`${group.classificationCode}：${group.classificationName}`}}</div>
									<div class="itemsmalls clearfix"> 
										<span v-for="item in group.smallSelected" v-if="item.classificationCode" :key="item.classificationCode"><i v-if="item.officialCode" style="font-style:normal">{{item.officialCode}}</i> {{item.classificationName}} <i class="el-icon-circle-close delbig" @click="moveSmall(item, group)"></i></span>
								</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="confirm_btnbox" v-if="!loading">
			<p>官费金额：</p>
			<p class="money">￥{{price | priceFormat}}</p>
			<span class="next" @click="nextStep(true)">下一步</span>
		</div>
		<el-dialog :visible.sync="haserrmsg" width="500px" title="风险提示" :close-on-click-modal="false" class="errtipsmsg" top="0">
			<div>
				<p class="mb10">{{errmsg}}</p>
				<div class="errtipbtn">
					<div class="fl"><el-checkbox v-model="isagree">我已知晓此风险</el-checkbox></div>
					<span :class="{hasagree: isagree}" @click="closeerrmsg">确定</span>
				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import Vue from "vue";
import { store } from "utils/";
import uploader from "cps/uploader/uploader.vue";
import Filters from 'utils/filters'
const rootUrl = CONFIG.rootUrl;
const niceUrl = "/api/findNiceClassification";
const priceUrl = '/api/queryServiceUnitPrice'
const checkUrl = '/api/checkTrademarkName'
const typeCheckUrl = '/api/checkDuplicateClassification'
const detailUrl = '/api/findTrademarkOrderDetail/{id}'

const InfoUrl = "/api/channelWorkOrderQuery";
const draftUrl = "/api/createTrademarkOrder";
const submitUrl = "/api/createTrademarkOrder";
const autocreateUrl = "/api/file/autoTrademarkImage"; // 自动生成商标图样
const downProxyTemplateUrl = "/api/downProxyTemplate"; //下载委托书模板
const downContractTemplateUrl = "/api/downContractTemplate"; //下载合同书模板
const downConfirmTemplateUrl = "/api/downConfirmTemplate"; //下载商标确认书模板
const findAsistantRemarkUrl = "/api/findAsistantRemark";
// 查询载入工单详情
const queryLoadInfoUrl = "/api/queryLoadInfo";
export default {
	components: {
		uploader,
	},
	data() {
		return {
			haserrmsg:false,
			errmsg: '',
			isagree: false,
			link: "",
			price: '',
			// 黑白色
			uploadedFileDataBlack: {
				url: "",
				fileName: "",
			},
			// 指定色
			uploadedFileDataSpecify: {
				url: "",
				fileName: "",
			},
			// 委托书
			uploadedFileDataProxy: {
				url: "",
				fileName: "",
			},
			textareaV: "", //小项剪切板文本框数据
			showMinClipboard: false, //小项剪切板
			infoDetailData: {},
			remark: "", // popover 备注
			timer: null,
			orignBigsData: {}, // 保存原有的大类
			checkedBigList: [],
			bigClassVisible: false,
			confirmVisible: false,
			showMoreSmallTip: false,
			reffer: 1,
			tmFormRules: {
				trademarkName: [
					{ required: true, message: "请输入商标名称", trigger: "blur" },
				],
			},
			sebePassportOss:'',
			passportOssKey: '',
			// 上传图片地址
			imgUrl: "",
			loading: false,
			standby1: "",
			standby1_oss: "",
			standby2: "",
			standby3: "",
			standby4: "",
			standby5: "",
			standby1_name: "",
			standby2_name: "",
			standby3_name: "",
			standby4_name: "",
			standby5_name: "",
			// 查询的草稿信息 workOrderServiceList
			draftInfo: [],
			// 当前展开的服务单的索引
			draftIndex: "",
			dialogVisible: false,
			// 总体输入内容
			trademarkData: {
				trademarkType: 1,
				trademarkName: null,
				trademarkDesc: null,
				trademarkIcon: null,
				trademarkIconType: 1,
				trademarkIconOsskey: null,
				// entrustFile: null,
				// entrustFileOsskey: null,
				// orderAmount: null,
				// classifications: null,
				// applicantTbId: null
			},
			curSelectedLists: [],
			// 当前选中的小项id列表
			curSelectedSmallIdList: [],
			// 当前选中的小项列表[{}]
			curSelectedSmallList: [],
			// 搜索小项
			searchEvents: "",
			// 提交时候的所有内容
			results: [],
			// 所有选中的小项和分类
			allEvents: {
				confirmStep: 2,
			},
			// 是否选中
			selectedState: true,
			//当前选中的大项code，
			selectedBigItemCode: "",
			//当前服务单对应的index
			serviceIndex: "",
			// 查询到的小项
			niceEventsData: [],
			// 小项加载loading
			smallLoading: false,
			//该商标下所有服务单信息
			work_order_service_list: [],
			// 查询出的大类
			bigState: [],
			// 当前选中的大类
			selectedBigItem: {},
			selectedBigs: [],
			selectedGroups: [],
			// 当前选中的小项
			smallCheckedIds: [],
			// 当前临时选中的大类,用于二次确认
			tempSelectedBigItem: {},
			// 模糊查询的结果
			FuzzyQueryData: [],
			// 各服务单已选中的大类
			allSelectedBigData: [],
			// 当前选中的服务单数据
			curOrderInfo: {},
			isIE: false, //判断浏览器是不是小于等于9的IE
			niceMinPrice: 30, //小项超出费用
			workOrderSn: "",
			workOrderId: "",
			isrepeat: false,
			isSaved: false,
			queryid:'',
			priceinfo: {}
		};
	},
	filters: {
        priceFormat: Filters.priceformat
    },
	methods: {
		getprice(){
			this.$http.get('/api/queryServiceUnitPrice').then(res => {
				this.priceinfo = res.data
				// this.price = res.data.trademarkRegistClassUnitPrice
			})
		},
		closeerrmsg() {
			if(this.isagree) {
				this.haserrmsg = false;
				const saveData = Object.assign({}, this.trademarkData)
				saveData.trademarkIcon = this.standby1
				saveData.trademarkIconOsskey = this.standby1_oss
				saveData.curSelectedLists = this.curSelectedLists
				saveData.smallCheckedIds = this.smallCheckedIds
				saveData.orderAmount = this.price
				store.set('trademarkDatas',saveData)
				this.$router.push({ name: 'steptwo' })
			}
		},
		querydetail() {
			this.$http.get(detailUrl.replace('{id}',this.queryid)).then(res => {
				const typeid = res.data.cls
				const tyepname = res.data.clsName
				const selectids = res.data.mins
				this.selectedBigItemCode = typeid
				this.selectedBigItem.classificationCode = typeid
				this.selectedBigItem.classificationName = tyepname
				this.smallCheckedIds = selectids.split(',')
				this.trademarkData =  {
					trademarkType: res.data.trademarkType,
					trademarkName: res.data.trademarkName,
					trademarkDesc: res.data.trademarkDesc,
					trademarkIcon: res.data.trademarkIcon,
					trademarkIconType: res.data.trademarkIconType,
					trademarkIconOsskey: res.data.trademarkIconOsskey,
				}
				this.standby1 = res.data.trademarkIcon
				this.standby1_oss = res.data.trademarkIconOsskey
				this.price = res.data.orderAmount
				this.querytypesname(typeid)
			}).catch(err=> {
				this.$message.error(err.response.data.msg || '获取信息失败')
			})
		},
		querytypesname(class_id) {
			var self = this;
			self.smallLoading = true;
			self.$http.get(niceUrl+'?parentCode='+class_id)
			.then((resp) => {
				self.smallLoading = false;
				for (var i = 0; i < resp.data.length; i++) {
					// 添加用来识别小项收缩和展开
					resp.data[i].shrinkage = false;
				}
				self.niceEventsData = resp.data;
				const groupSelected = []
				self.niceEventsData.forEach(item => {
					const amins = item['mins']
					
					const groupobj = {
						parentCode: item.parentCode,
						classificationCode: item.classificationCode,
						classificationName: item.classificationName,
						smallSelected: []
					}
					for(let j=0;j<amins.length;j++) {
						for(let k=0;k<self.smallCheckedIds.length;k++) {
							if(amins[j].classificationCode == self.smallCheckedIds[k]){
								groupobj.smallSelected.push(amins[j])
							}
						}
					}
					if(groupobj.smallSelected.length) {
						groupSelected.push(groupobj)
					}
				})
				self.curSelectedLists = [
					{
						parentCode: self.selectedBigItem.classificationCode,
						parentName: self.selectedBigItem.classificationName,
						groupSelected: groupSelected
					}
				]
				this.curSelectedLists.forEach(itclass => {
					const group = itclass['groupSelected']
					let num = 0
					group.forEach(small => {
						const n = small['smallSelected'].length
						num += n
					})
					itclass.count = num
				})
			})
			.catch((error) => {
				self.smallLoading = false;
			});
		},
		resetUploader(valueName) {
			this[valueName] = "";
			this[valueName + "_name"] = "";
		},
		resetForm() {
			this.trademarkData.trademarkType = 1;
			this.trademarkData.trademarkDesc = "";
			this.trademarkData.trademarkName = "";
			this.trademarkData.trademarkIconType = ''
			this.standby1 = "";
			this.standby1_name = "";
		},
		uploaderErrCallback(data) {
			this.$alert(data.msg);
		},
		// 上传图片部分
		setUploadedDataBlack(data) {
			var d = data.data;
			this.uploadedFileDataBlack = d;
			if (d.url) {
				this.standby1 = d.url;
				this.standby1_name = d.fileName;
				this.standby1_oss = d.ossKey;
			} else {
				this.uploaderErrCallback(d);
			}
		},
		// 搜索框初始化
		blurclick() {
			setTimeout(() => {
				this.FuzzyQueryData = [];
				this.searchEvents = "";
			}, 200);
		},
		// 获取尼斯分类
		obtainNice() {
			var self = this;
			self.$http
				.get(niceUrl)
				.then(function (resp) {
					self.bigState = resp.data;
				})
				.catch((error) => {});
		},
		// 保存草稿
		async saveDraft(isNext, fn) {
			const self = this;
			const saveData = Object.assign({}, this.trademarkData)
			saveData.trademarkIcon = this.standby1
			saveData.trademarkIconOsskey = this.standby1_oss
			saveData.curSelectedLists = this.curSelectedLists
			saveData.smallCheckedIds = this.smallCheckedIds
			saveData.orderAmount = this.price
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
			if(saveData.trademarkType != 2) {
				try {			
						const data1 = {
							trademarkName: saveData.trademarkName
						}
						const data2 = {
							trademarkName: saveData.trademarkName,
							classification: smallmsg
						}
						let tradecheck = await this.checkTrademarkName(data1)
						let smallcheck = await this.checkTrademarkSmall(data2)
						if(tradecheck.data.Result == 'BLOCK') {
							this.$message.error(tradecheck.data.Message)
							return
						}
						if(smallcheck.data.Result == 'BLOCK') {
							const idarr = smallcheck.data.Data.DuplicateSecondaryClassification.SecondaryClassification || []
							const str = idarr.join(',')
							if(idarr.length) {
								this.errmsg = smallcheck.data.Message+',重复申请群组:' + str
								this.haserrmsg = true
							}
							// this.$message.error(smallcheck.data.Message)
							return
						}
						if(tradecheck.data.Result == 'PASS' && smallcheck.data.Result == 'PASS') {
							store.set('trademarkDatas',saveData)
							this.$router.push({ name: 'steptwo' })
						}
					
					
				} catch (error) {
					console.log(error)
				}
			}else{
				store.set('trademarkDatas',saveData)
				this.$router.push({ name: 'steptwo' })
			}
			// 保存草稿接口
			// this.$http.post(draftUrl, saveData)
			// 	.then((resp) => {
			// 		this.isSaved = true;
			// 		this.$message.success('操作成功')
					
			// 	})
			// 	.catch((err) => {
			// 		this.$message.error(err.response.data.msg || '操作失败');
			// 	});
		},
		// 保存，初始化
		closeCurOrder(item) {
			this.draftIndex = "";
			item.PackUp = true;
		},

		// 删除选中的小项
		moveSmall(it,pare) {
			var self = this;
			const code = it.classificationCode
			var smalls = self.smallCheckedIds;
			let arr = ''
			for (var i = 0; i < this.niceEventsData.length; i++) {
				if (this.niceEventsData[i]['classificationCode'] == pare['classificationCode']) {
					arr = this.niceEventsData[i]
					break;
				}
			}
			for (var k = 0; k < smalls.length; k++) {
				if(smalls[k] == code) {
					smalls.splice(k,1)
				}
			}
			this.selectSmallChange(arr)
		},
		// 重置选中的小项
		resetEvent(data) {
			this.curSelectedLists = [];
			this.smallCheckedIds = [];
			this.price = 0
		},
		// 点击选中查询的内容
		FuzzyQueryClick(id) {
			const self = this
			var curSelectedSmallIdList = this.smallCheckedIds;
			let its = {}
			if (curSelectedSmallIdList.indexOf(id) === -1) {
				curSelectedSmallIdList.push(id);
				for (var i = 0; i < self.niceEventsData.length; i++) {
					for (var h = 0; h < self.niceEventsData[i].mins.length; h++) {
						var classificationCode = self.niceEventsData[i].mins[h]['classificationCode'];
						if(classificationCode == id) {
							its = self.niceEventsData[i]
						}
					}
				}
			} else {
				this.$message.warning("该小项已添加");
			}
			this.selectSmallChange(its)
			console.log(its)
			this.FuzzyQueryData = [];
			this.searchEvents = "";
		},
		// 根据小项id,从大类下所有小项数据中取得单条小项数据
		getSmallItem(id, arr) {
			arr.forEach(item => {
				if(item.classificationCode == id) {
					return item
				}
			})
		},
		// 点击左侧小项触发
		selectSmallChange(it) {
			// this.smallCheckedIds it.smallchecked 
			const self = this
			const idList = this.smallCheckedIds
			
			const parentCode = it.parentCode
			const parentName = this.selectedBigItem.classificationName
			const classificationCode = it.classificationCode
			const classificationName = it.classificationName
			const minarr = it.mins
			// 当前大类当前群组的小项数据
			const smallarr = (function () {
				let arr = [];
				idList.forEach((id, i) => {
					minarr.forEach(item => {
						if(item.classificationCode == id) {
							arr.push(item);
						}
					})
				});
				return arr;
			})();

			const groupobj = {
				parentCode: parentCode,
				classificationCode: classificationCode,
				classificationName: classificationName,
				smallSelected: smallarr
			}
			const eachobj = {
				parentCode: parentCode,
				parentName: parentName,
				groupSelected: []
			}
			const carr = this.curSelectedLists
			if(carr.length) {
				let ishas = false
				for(let i = 0; i < carr.length; i++) {
					if(carr[i]['parentCode'] == parentCode ) {
						const group = carr[i]['groupSelected']
						let issame = false
						ishas = true
						for(let j=0;j<group.length;j++) {
							if (group[j]['classificationCode']== classificationCode) {
								
								group.splice(j,1,groupobj)
								issame = true
							}
							if(!group[j]['smallSelected'].length) {
								group.splice(j,1)
							}
						}
						if(!issame) {
							group.push(groupobj)
						}
						
					}
				}
				if(!ishas) {
					eachobj.groupSelected.push(groupobj)
					this.curSelectedLists.push(eachobj)
				}
			} else {
				eachobj.groupSelected.push(groupobj)
				this.curSelectedLists.push(eachobj)
			}
			
			
			if(idList.length > 10) {
				this.price =(idList.length - 10) * this.priceinfo.trademarkRegistMinUnitPrice + this.priceinfo.trademarkRegistClassUnitPrice
			}else {
				this.price = this.priceinfo.trademarkRegistClassUnitPrice
			}
			
			
			this.curSelectedLists.forEach(itclass => {
				const group = itclass['groupSelected']
				let num = 0
				group.forEach(small => {
					const n = small['smallSelected'].length
					num += n
				})
				itclass.count = num
			})
			if(!idList.length) {
				this.curSelectedLists.length = 0
			}
			console.log(this.curSelectedLists)
		},
		//点击45大类选中
		selected(item) {
			//查询小项数据
			if(item.classificationCode == this.selectedBigItemCode) {
				return
			} 
			if(this.selectedBigItemCode) {
				if(this.smallCheckedIds.length) {
					this.$confirm('确定要选择该类吗?选择的小项将清除','提示',{type:'warning'}).then(() => {
						this.selectedBigItem.classificationCode = item.classificationCode
						this.selectedBigItem.classificationName = item.classificationName
						this.selectedBigItemCode = item.classificationCode
						this.selectedGroups = []
						this.curSelectedLists = []
						this.smallCheckedIds = []
						this.niceEvents(item.classificationCode);
					}).catch(() => {})
				} else {
					this.selectedBigItem.classificationCode = item.classificationCode
					this.selectedBigItem.classificationName = item.classificationName
					this.selectedBigItemCode = item.classificationCode
					this.selectedGroups = []
					this.niceEvents(item.classificationCode);
				}
			} else {
				this.selectedBigItem.classificationCode = item.classificationCode
				this.selectedBigItem.classificationName = item.classificationName
				this.selectedBigItemCode = item.classificationCode
				this.selectedGroups = []
				this.niceEvents(item.classificationCode);
			}

			
		},
		async checkTrademarkName(data) {
			return await this.$http.get('/api/checkTrademarkName', {params: data})
		},
		async checkTrademarkSmall(data) {
			return await this.$http.get('/api/checkDuplicateClassification', {params: data})
		},
		//设置当前展开订单的大类名和id
		setSelectedInfo(item) {
			this.curOrderInfo.classificationName = item.classificationName;
			this.curOrderInfo.classificationCode = item.classificationCode;
		},
		// 查询小项
		niceEvents(class_id) {
			var self = this;
			self.smallLoading = true;
			self.$http.get(niceUrl+'?parentCode='+class_id)
				.then((resp) => {
					self.smallLoading = false;
					for (var i = 0; i < resp.data.length; i++) {
						// 添加用来识别小项收缩和展开
						resp.data[i].shrinkage = false;
					}
					self.niceEventsData = resp.data;
				})
				.catch((error) => {
					self.smallLoading = false;
				});
		},
		// 小项展开收缩切换
		toggleSmallNav(item) {
			item.shrinkage = !item.shrinkage;
		},
		//判断所有字段是否都填写完整
		hasSomething(info) {
			return info.service_nice_min && info.service_nice_min.length;
		},
		// 下载检查
		downcheckUploadFile() {
			if (!this.standby1) {
				this.$message.warning("请上传商标图样");
				return false;
			}
			return true;
		},
		//检查所有服务单
		checkAllOrders() {
			var self = this;
			var draftInfo = self.curSelectedLists;
			if(!draftInfo.length) {
				this.$message.warning("请完善商标信息")
				return false
			}
			return true;
		},
		// 下一步
		nextStep(isnext, fn) {
			if(this.trademarkData.trademarkType==1 ||this.trademarkData.trademarkType==3) {
				if(!this.trademarkData.trademarkName) {
					this.$message.error('请填写商标名称')
					return
				}
			} else {
				if(!this.trademarkData.trademarkIconType) {
					this.$message.error('请选择商标图样')
					return
				}
			}
			if(this.downcheckUploadFile() && this.checkAllOrders()){
				this.saveDraft(isnext,fn);
			}
			// this.$refs['tmForm'].validate((valid) => {
			// 	if (valid) {
					
			// 	} else {
			// 		this.$message.warning('请检查信息是否填写完整')
			// 	}
			// });
			
		},
		// 模糊查询
		DataFuzzyQuery(data) {
			var self = this;
			data = data.toUpperCase();
			self.FuzzyQueryData = [];
			if (!data) {
				return;
			}
			for (var i = 0; i < self.niceEventsData.length; i++) {
				for (var h = 0; h < self.niceEventsData[i].mins.length; h++) {
					var min_name = self.niceEventsData[i].mins[h].classificationName;
					if(self.niceEventsData[i].mins[h].officialCode) {
						min_name = self.niceEventsData[i].mins[h].officialCode + ' ' + self.niceEventsData[i].mins[h].classificationName
					}
					var idx1 = min_name.indexOf(data);
					var idx2 = min_name.indexOf(data.toLowerCase());
					var index = idx1 != -1 ? idx1 : idx2 != -1 ? idx2 : -1;
					if (index != -1) {
						var ret = Object.assign({}, self.niceEventsData[i].mins[h]);
						ret.namestr = min_name.slice(0, index) + '<b>'+ data + '</b>' + min_name.slice(index+data.length);
						self.FuzzyQueryData.push(ret);
						//console.log(self.FuzzyQueryData)
						if (self.FuzzyQueryData.length >= 30) {
							return false;
						}
					}
				}
			}
		},
		// 自动生成图样
		autocreatepic() {
			if(!this.trademarkData.trademarkName){
				this.$message.error('请输入商标名称')
				return
			}
			this.isrepeat = true;
			this.$http
				.post(autocreateUrl+'?trademarkName='+this.trademarkData.trademarkName)
				.then((resp) => {
					this.isrepeat = false;
					var data = resp.data;
					if (data.url) {
						this.standby1 = data.url;
						this.standby1_name = data.fileName;
						this.standby1_oss = data.ossKey
						// this.uploadedFileDataBlack= data
						// this.optionBlack.update =true;
						// this.optionBlack.show =true;
					}
				})
				.catch((err) => {
					this.isrepeat = false;
					this.$message.error(err.response.data.msg || "生成失败");
				});
		},
		//删除二次确认
		askDelete(index) {
			if (this.draftInfo.length === 1) {
				return;
			}
			//收缩展开的大类
			if (this.draftInfo[index].PackUp) {
				this.draftInfo.forEach((item) => {
					item.PackUp = true;
				});
			}
			this.confirmVisible = true;
			this.draftIndex = index;
		},
		deleteBig() {
			// 删除黑名单中的大类id
			var curItem = this.draftInfo[this.draftIndex];
			var allSelectedBigData = this.allSelectedBigData;
			var idx = allSelectedBigData.indexOf(curItem.class_id);
			if (idx !== -1) {
				allSelectedBigData.splice(idx, 1);
			}
			this.draftInfo.splice(this.draftIndex, 1);
			this.confirmVisible = false;
		},
		hideMoreSmallTip() {
			if (this.showMoreSmallTip) {
				var timer = this.timer;
				timer && clearTimeout(timer);
				this.timer = setTimeout(() => {
					this.showMoreSmallTip = false;
				}, 3000);
			}
		},
		// 判断浏览器
		judegBroswerFn() {
			function getExplore() {
				var sys = {},
					ua = navigator.userAgent.toLowerCase(),
					s;
				(s = ua.match(/rv:([\d.]+)\) like gecko/))
					? (sys.ie = s[1])
					: (s = ua.match(/msie ([\d\.]+)/))
					? (sys.ie = s[1])
					: (s = ua.match(/edge\/([\d\.]+)/))
					? (sys.edge = s[1])
					: (s = ua.match(/firefox\/([\d\.]+)/))
					? (sys.firefox = s[1])
					: (s = ua.match(/(?:opera|opr).([\d\.]+)/))
					? (sys.opera = s[1])
					: (s = ua.match(/chrome\/([\d\.]+)/))
					? (sys.chrome = s[1])
					: (s = ua.match(/version\/([\d\.]+).*safari/))
					? (sys.safari = s[1])
					: 0;
				// 根据关系进行判断
				if (sys.ie) return "IE: " + sys.ie;
				if (sys.edge) return "EDGE: " + sys.edge;
				if (sys.firefox) return "Firefox: " + sys.firefox;
				if (sys.chrome) return "Chrome: " + sys.chrome;
				if (sys.opera) return "Opera: " + sys.opera;
				if (sys.safari) return "Safari: " + sys.safari;
				return "Unkonwn";
			}
			// 判断浏览器低于IE9时提示用户升级
			var browser = getExplore(),
				browserName,
				browserNum;
			browserName = browser.slice(0, browser.indexOf(":"));
			browserNum = parseInt(browser.slice(browser.indexOf(":") + 1));
			console.log(browserName);
			if (browserName === "IE" && browserNum <= 9) {
				// this.$alert('温馨提醒:您当前的浏览器版本过低,为了跟高的体验, 请使用谷歌浏览器或者使用浏览器的高速模式！')
				this.isIE = true;
			}
		},
	},
	mounted() {
		//获取45大类数据

		this.obtainNice();
		this.getprice()
		const trademsg = store.get('trademarkDatas')
		this.queryid = this.$route.query.id || null
		console.log(this.queryid)
		if(this.queryid) {
			this.querydetail()
		}else{
			console.log(trademsg)
			if(trademsg) {
				this.trademarkData = trademsg
				this.standby1 = trademsg.trademarkIcon
				this.standby1_oss = trademsg.trademarkIconOsskey
				this.curSelectedLists = trademsg.curSelectedLists || []
				this.smallCheckedIds = trademsg.smallCheckedIds || []
				this.selectedBigItemCode = this.curSelectedLists[0]['parentCode'] 
				this.selectedBigItem.classificationCode = this.curSelectedLists[0]['parentCode']
				this.selectedBigItem.classificationName = this.curSelectedLists[0]['parentName']
				this.price = trademsg.orderAmount
				if(this.selectedBigItemCode) {
					this.niceEvents(this.selectedBigItemCode)
				}
			}
		}
		
		
	},
};
</script>
<style lang="less">
.trademarkmessagesebe {
	padding: 30px 60px;
	background-color: #fff;
	min-height: 500px;
	.el-form-item__content,
	.el-form-item__label {
		line-height: 30px;
	}
	.el-checkbox__label {
		width: 170px;
		vertical-align: top;
	}
	.el-form-item__content {
		min-width: 500px;
	}
	
	.notPassReason {
		top: -40px;
	}
	// 字体淡黄色
	.cy {
		color: #f5a623;
	}
	.errtipsmsg {
		.el-dialog {
			top: 50%;
			transform: translateY(-50%);
		}
		.el-checkbox__label {
			color: #409EFF;
		}
		.errtipbtn {
			padding-top: 20px;
			overflow: hidden;
			> span {
				float: right;
				width: 120px;
				height: 40px;
				border-radius: 2px;
				text-align: center;
				line-height: 40px;
				cursor: not-allowed;
				background-color: #e2e2e2;
				color: #999;
				&.hasagree {
					background-color: #29528A;
					color: #fff;
					cursor: pointer;
				}
			}
		}
	}
	// msg color
	.sometips {
		margin-top: -30px;
		margin-bottom: 30px;
		padding-left: 120px;
		font-size: 14px;
		color: #f64744;
	}
	.msgColor {
		color: #f64744 !important;
	}
	// 上传图片
	.upload_component {
		position: relative;
		.upload_tip {
			position: absolute;
			left: 140px;
			bottom: 0;
			width: 400px;
			font-size: 12px;
			color: #556677;
			line-height: 16px;
			p.format {
				color: #a8afb5;
				padding-top: 5px;
			}
			.downloadbtn {
				color: #29528a;
			}
			p.delfile {
				color: #29528a;
				cursor: pointer;
			}
		}
		.autocreate a {
			display: inline-block;
			padding: 0 15px;
			height: 24px;
			line-height: 24px;
			border-radius: 12px;
			background-color: #29528a;
			color: #fff;
			text-decoration: none;
			margin-bottom: 10px;
		}
	}
	.updown {
		font-size: 13px;
		color: #479cff;
		width: 110px;
		line-height: 100%;
		cursor: pointer;
		.download {
			cursor: pointer;
		}
		img {
			vertical-align: top;
		}
	}
	.btn_wrap {
		button {
			font-size: 14px;
			color: #479cff;
			border: 1px solid #479cff;
			border-radius: 2px;
			line-height: 30px;
			margin-right: 10px;
			background-color: #fff;
			margin-left: 0;
			width: 88px;
		}
		button:hover {
			border-color: #408ce6;
			color: #408ce6;
		}
	}
	label {
		text-align: left;
	}
	> p {
		font-size: 16px;
		color: #223344;
	}
	// 小项
	.trademarkmsg {
		padding-top: 20px;
		.itemsmallbox {
			padding-top: 15px;
			.el-checkbox, .el-checkbox__input{
				word-break: break-all;
				white-space: normal;
			}
		}
		> p {
			font-size: 14px;
			color: #556677;
			font-weight: 600;
		}
		ul {
			padding-left: 0;
			padding-right: 0;
			li {
				border: 1px solid #dfe2e5;
				border-radius: 2px;
				width: 116px;
				line-height: 30px;
				padding: 0 15px;
				font-size: 13px;
				color: #556677;
				cursor: pointer;
				background-color: #fff;
			}
			.click_li {
				border: 1px solid #479cff;
				color: #479cff;
				background: #f8fcff;
			}
			.notChoose {
				background: #f5f5f5;
				color: #a8afb5;
				cursor: text;
			}
		}
		// 小项选择
		.events {
			> div {
				border: 1px solid #dfe2e5;
			}
			.events_left {
				height: 470px;
				width: 50%;
				background-color: #fff;
				padding: 20px;
				position: relative;
				.head {
					position: relative;
					.min_clip {
						height: 30px;
						line-height: 30px;
						font-size: 14px;
						color: #479cff;
						cursor: pointer;
					}
					p {
						width: 116px;
						height: 30px;
						line-height: 30px;
						border: 1px solid #479cff;
						border-radius: 2px;
						font-size: 13px;
						color: #479cff;
						text-align: center;
						display: inline-block;
						background: #f8fcff;
					}
				}
				input {
					width: 300px;
					height: 30px;
					border: 1px solid #dfe2e5;
					border-radius: 2px;
					padding-left: 30px;
				}
				.fuzzyqueryList {
					position: absolute;
					top: 35px;
					right: 0;
					max-height: 300px;
					overflow-y: auto;
					z-index: 10;
					width: 300px;
					border-radius: 3px;
					border: 1px solid #dfe2e5;
					background-color: #fff;
					li {
						width: 100%;
						border: 0;
						text-align: left;
						padding-left: 10px;
						line-height: 30px;
						font-size: 13px;
						color: #556677;
						box-sizing: border-box;
						b {
							font-weight: normal;
							color: #f5a623;
						}
					}
					li:hover {
						background-color: #f5f5f5;
					}
				}
				button {
					background: #479cff;
					border-radius: 2px;
					font-size: 14px;
					color: #ffffff;
					height: 30px;
					line-height: 30px;
					display: inline-block;
					width: 60px;
					vertical-align: top;
				}
				img {
					width: 14px;
					height: 14px;
					position: absolute;
					right: 278px;
					top: 8px;
				}
				.min_lipboard_wrap {
					position: absolute;
					top: 68px;
					left: 0;
					width: 100%;
					height: 380px;
					background-color: #fff;
					z-index: 3;
					padding: 10px 20px;
					.confirm_tip {
						margin-top: 20px;
						text-align: right;
						a.button {
							display: inline-block;
							width: 88px;
							height: 30px;
							line-height: 30px;
							text-align: center;
							background-color: #479cff;
							color: #fff;
							font-size: 14px;
							border: 1px solid #479cff;
							border-radius: 2px;
							cursor: pointer;
						}
						a.button:hover {
							text-decoration: none;
							background-color: #387ccc;
							border-color: #387ccc;
						}
						a.no {
							color: #479cff;
							background-color: #fff;
							margin-right: 30px;
						}
						a.no:hover {
							background-color: #fff;
							color: #387ccc;
						}
					}
				}
				.list_over {
					overflow: auto;
					height: 380px;
					margin-top: 18px;
					margin-bottom: 18px;
				}
				// 小项部分
				.events_list {
					.list_state {
						width: 100%;
						height: 30px;
						opacity: 0.9;
						background: #f5f5f5;
						padding-left: 27px;
						padding-right: 10px;
						position: relative;
						cursor: pointer;
						p {
							font-size: 13px;
							color: #556677;
							line-height: 30px;
						}
						i {
							position: absolute;
							top: 9px;
							width: 14px;
							height: 14px;
							left: 8px;
						}
					}
				}
			}
			.events_right {
				width: 50%;
				height: 470px;
				border-left: 0;
				background-color: #fff;
				.right_tit {
					font-size: 16px;
					color: #556677;
				}
				.right_num {
					background-color: #f6f6f6;
					margin-bottom: 10px;
					padding: 10px 30px;
					.right_txt {
						font-size: 13px;
						color: #7f8fa4;
						line-height: 24px;
					}
					.right_btn {
						border: 1px solid #29528A;
						border-radius: 2px;
						font-size: 12px;
						color: #29528A;
						width: 60px;
						height: 24px;
						line-height: 22px;
						text-align: center;
						cursor: pointer;
					}
				}
				.right_list {
					ul {
						height: 420px;
						box-sizing: border-box;
						padding: 15px 15px;
						overflow-y: auto;
						li {
							border: 0;
							width: 100%;
							position: relative;
							line-height: 16px;
							cursor: default;
							background: rgba(0, 0, 0, 0);
							.itembigname {
								overflow: hidden;
								margin-bottom: 10px;
								font-size: 14px;
								color: #333;
								padding-right: 50px;
							}
							.itemsmalls {
								font-size: 0;
								> span {
									position: relative;
									float: left;
									font-size: 12px;
									white-space: nowrap;
									padding: 3px 15px 3px 5px;
									margin-right: 10px;
									margin-bottom: 10px;
									border: 1px solid #999;
									.delbig {
										position: absolute;
										right: -6px;
										top: -8px;
										background-color: #fff;
										font-size: 18px;
										color: #f00;
										cursor: pointer;
									}
								}
							}
						}
					}
					.add_cost {
						background: #ffffff;
						border-top: 1px solid #dfe2e5;
						height: 30px;
						p {
							font-size: 13px;
							color: #556677;
							line-height: 30px;
							text-align: right;
							padding-right: 10px;
							.cy {
								padding-right: 20px;
								cursor: default;
							}
						}
					}
				}
			}
		}
	}
	

}
</style>
