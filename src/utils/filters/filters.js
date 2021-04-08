
/**
 * 过滤器
 */
var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
	var len = len - (s + '').length;
	for (var i = 0; i < len; i++) { s = '0' + s; }
	return s;
};

export default {
	getQueryStringByName: function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		var context = "";
		if (r != null)
				context = r[2];
		reg = null;
		r = null;
		return context == null || context == "" || context == "undefined" ? "" : context;
	},
	secondToHour: function(input){
		if(typeof input !='number' && parseInt(input)!=input){
			return input
		}
		let h = Math.floor(input/3600)
		let m = Math.floor(input/60)
		let s = input%60;
		let hh = h<10?'0'+h:h
		let mm = m<10?'0'+m:m
		let ss = s<10?'0'+s:s
		return hh+':'+mm+':'+ss
	},
	formatDate: {
		//日期转时间戳
		timeStamp:function(date){
			var timestamp = Date.parse(new Date(date));
			timestamp = timestamp / 1000;
			return timestamp
		},
		//日期格式转换
		dateFormat: function (input,type) {
			if(input == null || input=='' || typeof(input) == "undefined"){
					return "--";
			}
			var _date = new Date(input);
			var year = _date.getFullYear();
			var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
			var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
			var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
			var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
			var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
			if(type == "date"){
					return year + "-" + month + "-" + day;
			} else if(type == "time") {
					return hour + ":" + minutes + ":" + seconds;
			} else {
					return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
			}
			return "--";
		},
		datesFormat: function (input) {
			if(input == null || input=='' || typeof(input) == "undefined"){
					return "--";
			}
			var _date = new Date(input);
			var year = _date.getFullYear();
			var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
			var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
			return year + "-" + month + "-" + day;
		},
		FormatTime: function (input,type) {
			if(input == null || input=='' || typeof(input) == "undefined"){
					return "--";
			}
			var _date = new Date(input);
			var year = _date.getFullYear();
			var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
			var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
			var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
			var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
			var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
			if(type == "date"){
					return year + "-" + month + "-" + day;
			} else if(type == "time") {
					return hour + ":" + minutes + ":" + seconds;
			} else {
					return year + "-" + month + "-" + day;
			}
			return "--";
		}
	},
	// 订单状态
	orderstateformat: function (input) {
		var ret = ''
		switch (input+''){
			case '0':
				ret = "已支付";
				break;
			case '1':
				ret = "待审核";
				break;
			case '2':
				ret = "审核不通过";
				break;
			case '3':
				ret = "审核通过";
				break;
			case '4':
				ret = "订单关闭";
				break;
			case '20':
				ret = "已提交到商标局";
				break;
			case '21':
				ret = "商标局已接受";
				break;
			case '22':
				ret = "商标局不予受理";
				break;
			case '23':
				ret = "商标局受理通过";
				break;
			case '29':
				ret = "商标局部分驳回";
				break;
			case '30':
				ret = "商标局驳回";
				break;
			case '31':
				ret = "商标局审通过";
				break;
			case '99':
				ret = "申请成功结束";
				break;
		}
		return ret;
	},
	// 补正状态
	bzstateformat: function (input) {
		var ret = ''
		switch (input+''){
			case '1':
				ret = "初始化";
				break;
			case '2':
				ret = "待补正";
				break;
			case '3':
				ret = "放弃补正";
				break;
			case '4':
				ret = "已补正";
				break;
			case '5':
				ret = "补正超时";
				break;
			case '6':
				ret = "补正已递交";
				break;
		}
		return ret;
	},
	//收支类型
	shouzhiformat: function (input) {
		var ret = ''
		switch (input+''){
			case '1':
				ret = "收入";
				break;
			case '2':
				ret = "支出";
				break;
		}
		return ret;
	},
	// 交易类型
	jiaoyiformat: function (input) {
		var ret = ''
		switch (input+''){
			case '1':
				ret = "充值";
				break;
			case '2':
				ret = "消费";
				break;
			case '3':
				ret = "退款";
				break;
		}
		return ret;
	},
	//申请人类型
	sqrformat: function (input) {
		var ret = ''
		switch (input+''){
			case '1':
				ret = "个人";
				break;
			case '2':
				ret = "企业";
				break;
		}
		return ret;
	},
	//申请状态
	sqztformat: function (input) {
		var ret = ''
		switch (input+''){
			case '1':
				ret = "未审核";
				break;
			case '2':
				ret = "审核中";
				break;
			case '3':
				ret = "审核通过";
				break;
			case '4':
				ret = "审核不通过";
				break;
			case '5':
				ret = "暂存状态";
				break;
			case '6':
				ret = "未确认";
				break;
		}
		return ret;
	},
	//地域
	areaformat: function (input) {
		var ret = ''
		switch (input+''){
			case '1':
				ret = "大陆";
				break;
			case '2':
				ret = "中国香港";
				break;
			case '3':
				ret = "中国澳门";
				break;
			case '4':
				ret = "中国台湾";
				break;
			case '5':
				ret = "海外";
				break;
		}
		return ret;
	},
	//商标类型
	trademarktypeformat: function (input) {
		var ret = ''
		switch (input+''){
			case '1':
				ret = "文字商标";
				break;
			case '2':
				ret = "图形商标";
				break;
			case '3':
				ret = "图文组合商标";
				break;
		}
		return ret;
	},
	//价格保留两位小数
	priceformat: function (input) {
		var ret = '';
		// input 有可能是数字0
		if (input !== null && input !== undefined) {
			ret = input - 0 +'';
			if(ret === 0){
				ret = 0;
			}else{
				ret = (ret-0).toFixed(2);
			}
		}
		return ret;
	},
	//价格转换为万元
	priceUnitFilter(td){
		var ret = td/10000+'';
		if(ret.indexOf('.') !== -1){
			ret = (ret-0).toFixed(2);
			ret = ret.replace(/((\.0{1,2})|0)$/, '');
		}
		return ret;
	},
	refundStateFilter(input){
		var ret = ''
		switch (input+''){
			case '0':
				ret = "待受理";
				break;
			case '1':
				ret = "退款中";
				break;
			case '2':
				ret = "已退款";
				break;
			case '3':
				ret = "已驳回";
				break;
		}
		return ret;
	},
	notarizationStatusformat(input){
		var ret = ''
		switch (input+''){
			case '0':
				ret = "待存证";
				break;
			case '1':
				ret = "存证中";
				break;
			case '2':
				ret = "存证失败";
				break;
			case '3':
				ret = "存证成功";
				break;
		}
		return ret;
	},
	orderStatus: function (input) {
		var ret = ''
		switch (input+''){
			case '1':
				ret = "待服务";
				break;
			case '2':
				ret = "服务中";
				break;
			case '3':
				ret = "服务完成";
				break;
			case '4':
				ret = "服务关闭";
				break;
		}
		return ret;
	},
	fileSizeFilter(v){
		if (!v) {
			return '';
		}
		var ret = v;
		if (v > 1024*1024) {
			ret = (ret/1024/1024).toFixed(1) + 'M';
		}else{
			var t = (ret/1024).toFixed(1);
			ret = (t === '0.0' ? '0.1' : t) + 'KB';
		}
		return ret;
	},
	//申请主体类型
	subjectTypeFormat(input) {
		const inputs = input + ""
		switch (inputs){
			case '2':
				return "企业";
			case '1':
				return "申请人";
		}
		return ''
	},

	//申请主体类型(cxb)
	subjectTypeCxbFormat(input) {
		switch (input){
			case 0:
				return "国内个体";
			case 1:
				return "国内企业";
			case 2:
				return "国外自然人";
			case 3:
				return "国外企业";
		}
	},
	titleLengthFormat (input, num) {
		if (input && input.length>num+1) {
			return input.slice(0,num)+'...';
		}
		return input;
	},
	// 售后状态 
  refundState: function(txt){
    var ret = '';
    // input 有可能是数字0
    switch (txt +''){
      case '0':
        ret = "退款审核中";
        break;
      case '1':
        ret = "已退款";
        break;
      case '2':
        ret = "退款已驳回";
        break;
      case 'null':
        ret = "--";
        break;
		}
		return ret;
	},
	//性别
  sex: function (input) {
    var ret = ''
    switch (input+''){
      case '1':
        ret = "男";
        break;
      case '2':
        ret = "女";
        break;
    }
    return ret;
  },
  //申请主体类型
	invoiceTypeFormat(input) {
		switch (input){
			case 1:
				return "增值税普通发票";
			case 2:
				return "增值税专用发票";
		}
	},
	// 是否费减feeDeduct
	feeDeductFormat(input) {
		switch (input){
			case 0:
				return "否";
			case 1:
				return "是";
		}
	},
	//发票类型
	patentInvoiceTypeFormat(input) {
		switch (input){
			case 1:
				return "专票";
			case 2:
				return "普票";
		}
	},
	//电子发票、纸质发票
	paperFormat(input) {
		switch (input){
			case 1:
				return "电子发票";
			case 2:
				return "纸质发票";
		}
	},
	//寄送方式
	sendTypeFormat(input) {
		switch (input){
			case 1:
				return "快递邮寄";
			case 2:
				return "商务代领";
		}
	},
	//监控状态
	monitorStateFormat(input) {
		switch (input){
			case 1:
				return "未逾期";
			case 2:
				return "已逾期";
		}
	},
	//审查结果
	trialReviewResultFormat(input){
		switch (input){
			case 1:
				return "通过";
			case 2:
				return "补正/审查";
			case 3:
				return '驳回'
		}
	},
	//专利类型
	patentTypeFormat(input){
		switch (input){
			case 1:
				return "外观专利";
			case 2:
				return "发明专利";
			case 3:
				return '实用新型'
		}
	},
	// 年费缴纳方式
	yearFeeTurnInTypeFormat(input){
		var ret = '';
		if(input ==1){
			ret = '我司代缴'
		}
		if(input ==2){
			ret = '客户自缴'
		}
		return ret
	},
  //主体信息显示
  mainBodeSbj(input) {
    switch (input){
      case 1:
        return "申请人";
      case 2:
        return "企业";
      case 3:
        return "申请人";
      case 4:
        return "企业";
      case 5:
        return "申请人";
    }
  },
  // 开票信息
  mainBodeNumber(input) {
    switch (input){
      case 1:
        return "申请人身份证号";
      case 2:
        return "企业营业执照号";
      case 3:
        return "申请人护照号";
      case 4:
        return "";
      case 5:
        return "申请人身份证号";
    }
  },
  fileName: function(data){
    var ret = ''
    switch (data+''){
      case '1':
        ret = "申请人身份证";
        break;
      case '2':
        ret = "企业营业执照副本复印件";
        break;
      case '3':
        ret = "申请人护照";
        break;
      case '4':
        ret = "企业登记证件";
        break;
    }
    return ret;
  },
  licenseName: function(data){
    var ret = ''
    switch (data+''){
      case '1':
        ret = "个体工商户营业执照";
        break;
      case '2':
        ret = "";
        break;
      case '3':
        ret = "中文护照译本";
        break;
      case '4':
        ret = "企业登记证件译本";
        break;
    }
    return ret;
  },
  picType: function (input) {
		var ret = ''
		switch (input+''){
			case '1':
				ret = "黑白色";
				break;
			case '2':
				ret = "指定色";
				break;
		}
		return ret;
	},
};

