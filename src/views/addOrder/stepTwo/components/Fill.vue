<template>
    <div class="applicantmsgbox">
        <h3 class="person">
            申请人信息
        </h3>
        <div class="searchappbox">
            <div class="selectbox">
                <el-select v-model="type">
                    <el-option label="全部" value="全部">全部</el-option>
                    <el-option label="企业" value="2">企业</el-option>
                    <el-option label="个人" value="1">个人</el-option>
                </el-select>
            </div>
            <div class="sbox">
                <el-input v-model="dataObj.ApplicantName" placeholder="请输入申请人名称"></el-input>
            </div>
            <div class="searchbtn" @click="search(true)">搜索</div>
            <div class="clearfix fr" >
                <el-pagination class="fr" :total="total" :page-size="pgCount" :current-page="pgIndex" @current-change="handeCurrentChange" layout="total,prev,pager,next"></el-pagination>
            </div>
        </div>
        
        <ul class="datalistbox">
            <li class="xinzengbtn" @click="addapp">
                <i class="el-icon-plus"></i> <span>新增申请人</span>
            </li>
            <li v-for="item in dataList" :key="item.id" @click="selecteditem(item)" :class="{now: current == item.id}">
                <h3 class="tit">{{item.applicantRegion|areaFormat}}{{item.applicantType | sqrFormat }}</h3>
                <p class="aname">{{item.applicantName}}</p>
                <p class="msg">{{item.cardNumber}}</p>
                <span class="status" v-if="item.auditStatus" :class="{pass: item.auditStatus == '3', error: item.auditStatus == '4', work: item.auditStatus == '2'}">{{item.auditStatus | sqztFormat}}</span>
            </li>
        </ul>
        <div key="auth" v-loading.fullscreen='wtsloading' element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-text='文件生成中'>
        <div class="itemfiles">
            委托书下载
        </div>
        <p class="itemfilesop"><span class="downloadbtn" @click="downloadwts"><i class="el-icon-download"></i> 委托书下载</span><span class="downloadtip"><i class="el-icon-warning"></i> 注：下载后盖章（公司）或签字（个人）上传</span></p>
        <div class="itemfiles">
            委托书上传
        </div>
        <div class="itemuploaderbox clearfix">
            <div class="uploaderbox">
                <uploader
                    @complete="setUploadedMaterial"
                    @resetUploader="resetUploader"
                    :fileName="wts_name"
                    :canPreview="true"
                    :postAction="'/sebe_engine/api/file/uploadFile?access_token=' + token + '&verifyType=1&uploadFilePolicy=ATTORNEY'"
                    :url="wts"
                    :valueName="'wts'"
                    :extensions="'jpg,JPG,png,PNG,bmp,BMP,jpeg,JPEG'"
                    :size="2"
                ></uploader>
            </div>
            <div class="extext">
                样例：
            </div>
            <div class="example" @click="preview('wts')">
                <img src="~assets/img/wts.jpg" alt="">
            </div>
            <div class="uploadertip">
                <p>重要提示：</p>
                <p>-上传委托书模板只需完成盖章（企业申请人）或签字（个人申请人），委托书的其他信息都不需要填写</p>
                <p>-请确保上传委托书模板图片分辨率在800*800-3900*3900之间</p>
                <p>-请确保上传委托书模板图片大小不能超过2000K的JPG或JPEG格式图片</p>
                <p>-扫描或拍照前，请确保委托书模板纸面工整顺平，不能有褶皱、反光等</p>
            </div>
        </div>
        </div>
        <div key="legeal" v-loading.fullscreen='legloading' element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-text='文件生成中'>
        <!-- <div class="itemfiles">
            法律文件下载
        </div>
        <p class="itemfilesop"><span class="downloadbtn" @click="downloadlegeal"><i class="el-icon-download"></i> 法律文件下载</span><span class="downloadtip"><i class="el-icon-warning"></i> 注：下载后盖章（公司）或签字（个人）上传</span></p>
        <div class="itemfiles">
            法律文件上传
        </div>
        <div class="itemuploaderbox clearfix">
            <div class="uploaderbox">
                <uploader
                    @complete="setUploadedMaterial"
                    @resetUploader="resetUploader"
                    :fileName="flwj_name"
                    :canPreview="true"
                    :postAction="'/sebe_engine/api/file/uploadFile?access_token=' + token + '&uploadFilePolicy=LEGAL_NOTICE'"
                    :url="flwj"
                    :valueName="'flwj'"
                    :extensions="'jpg,JPG,png,PNG,bmp,BMP,jpeg,JPEG'"
                    :size="10"
                ></uploader>
            </div>
            <div class="extext">
                样例：
            </div>
            <div class="example" @click="preview('legeal')">
                <img src="~assets/img/legeal.jpg" alt="">
            </div>
            <div class="uploadertip">
                <p>重要提示：</p>
                <p>-您需要上传由商标申请人签字或盖章的声明文件，以证明您的在线操作行为已经获得了商标申请人合法授权。</p>
            </div>
        </div> -->
        </div>
        
        <div class="confirm_btnbox" v-if="price">
            <p>官费金额：</p>
			<p class="money">￥{{price | priceFormat}}</p>
			<span class="prev" @click="prev">上一步</span>
			<span class="next" @click="nextStep(true)">下一步</span>
		</div>
        <el-dialog
			:visible.sync="pdfDialogVisible"
            :lock-scroll="false"
			width="700px"
		>
			<img width="100%" v-if="wtsshow" src="~assets/img/wts.jpg" alt="" />
            <img width="100%" v-if="legealshow" src="~assets/img/legeal.jpg" alt="" />
		</el-dialog>
    </div>
</template>
<script>
import uploader from "cps/uploader/uploader.vue";
import VueCookie from 'vue-cookie'
import { store } from 'utils/'
import Filters from 'utils/filters/'
const listUrl = '/api/listApplicants'
const detailUrl = '/api/describeApplicant'
const dataObj = {
	ApplicantName: null,
	ApplicantType: null
}
export default {
    inject: ['addapplicant'],
    data() {
        return {
            type: '全部',
            dataObj: Object.assign({}, dataObj),
            dataList: [],
            token: null,
            imageUrl: null,
            total: 0,
            pgIndex: 1,
            pgCount: 20,
            loading: false,
            legloading: false,
            wtsloading: false,
            wts: "",
			wts_name: "",
			wts_oss: '',
			flwj: "",
			flwj_name: "",
            flwj_oss: '',
            price:'',
            current: '',
            currentstate: '',
            comdetail: {},
            applymsg: {},
            previewImg: '',
            pdfDialogVisible: false,
            legealshow: false,
            wtsshow: false
        }
    },
    components: {
        uploader
    },
    filters: {
        sqrFormat: Filters.sqrformat,
        sqztFormat: Filters.sqztformat,
        areaFormat: Filters.areaformat,
        priceFormat: Filters.priceformat
    },
    created() {
        this.token = VueCookie.get('engine_service_token')
        const trademsg = store.get('trademarkDatas')
        
        if(trademsg) {
            this.price = trademsg.orderAmount
            this.wts = trademsg.SebeAuthorizationOss
            this.wts_oss = trademsg.AuthorizationOssKey
            if(trademsg.applicantTbId) {
                this.current = trademsg.applicantTbId
                this.getdetail(this.current)
            }
        }
        this.search(true)
    },
    methods: {
        preview(tp) {
			if(tp =='wts') {
                this.legealshow = false;
                this.wtsshow = true;
                
            }
			if(tp =='legeal') {
                this.wtsshow = false;
                this.legealshow = true;
            }
            this.pdfDialogVisible = true
		},
        downloadwts() {
            if(!this.current) {
                this.$message.warning('请先选择申请人')
                return 
            }
            const data  =  {
                applicant: this.comdetail.applicantName,
                country: this.comdetail.country ? this.comdetail.country : '中国',
                trademarkName:this.comdetail.trademarkName,
                province: this.comdetail.province,
                address: this.comdetail.address,
                postcode: this.comdetail.postcode
            }
            this.wtsloading = true
            this.$http.post('/api/downloadEntrustFile', data).then(res => {
                this.wtsloading = false
                window.open(res.data.url)
            }).catch(err => {
                this.wtsloading = false
                this.$message.error(err.response.data.msg)
            })
        },
        downloadlegeal() {
            if(!this.current) {
                this.$message.warning('请先选择申请人')
                return 
            }
            const data  =  {
                applicant: this.comdetail.applicantName
            }
            this.legloading = true
            this.$http.post('/api/downloadLegalNotice', data).then(res => {
                this.legloading = false
                window.open(res.data.url)
            }).catch(err => {
                this.legloading = false
                this.$message.error(err.response.data.msg)
            })
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
		},
		uploaderErrCallback(data) {
			this.$alert(data.msg);
		},
        selecteditem(it) {
            if (it.auditStatus == '1' || it.auditStatus == '2' || it.auditStatus == '3') {
                this.current = it.id
                this.currentstate = it.auditStatus
                this.getdetail(it.id)
                
            } else {
                this.$message.error('不能选择该申请人，请前往我的申请人查看并修改')
            }
        },
        getdetail(id) {
            const datas = {
                id: id
            }
            this.$http.get(detailUrl, { params: datas }).then(res => {
                this.comdetail = res.data
                const ret = {}
                for(var key in res.data) {
                    var fletter = key.slice(0,1)
                    var oletter = key.slice(1)
                    var nkey = fletter.toUpperCase() + oletter
                    ret[nkey] = res.data[key]
                }
                this.applymsg = ret
                this.flwj = ret.SebeLegalNoticeOss
                this.flwj_oss = ret.LegalNoticeOssKey
                this.sebePassportOss = ret.SebePassportOss
                this.passportOssKey = ret.PassportOssKey
            })
        },
        addapp() {
            this.addapplicant()
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
			ret.ApplicantType = this.type =='全部' ? null: this.type
			this.$router.replace({ query: ret })
			this.getlist(ret)
		},
		getlist(datas) {
			this.$http.get(listUrl, { params: datas }).then(res => {
				const alldata = res.data
				this.dataList = alldata.elements
				this.total = alldata.totalElements
				if (!this.current) {
					this.tablist[this.current]['count'] = this.total
				}
				
			}).catch(err => {
                console.log(err)
				// this.$message.error(err.response.data.msg||'获取申请人列表失败')
			})
		},
        nextStep() {
            if(!this.current) {
                this.$message.warning('请选择申请人')
                return
            }
            if(!this.wts) {
                this.$message.warning('请上传委托书')
                return
            }
            // if(!this.flwj) {
            //     this.$message.warning('请上传法律文件')
            //     return
            // }
            const trademsg = store.get('trademarkDatas')
            trademsg.AuthorizationOssKey = this.wts_oss
            trademsg.SebeAuthorizationOss = this.wts
            trademsg.applicantTbId = this.current
            trademsg.LegalNoticeOssKey = this.flwj_oss
            trademsg.SebeLegalNoticeOss = this.flwj
            trademsg.SebePassportOss = this.sebePassportOss
            trademsg.PassportOssKey = this.passportOssKey
            // const datass = Object.assign({}, this.applymsg)
            // datass.LegalNoticeOssKey = this.flwj_oss
            // datass.SebeLegalNoticeOss = this.flwj
            // datass.id = this.current

            store.set('trademarkDatas',trademsg)
            this.$router.push({ name: 'stepthree' })
            // this.$http.post('/api/createApplicant', datass).then(res => {
            //     store.set('trademarkDatas',trademsg)
            //     this.$router.push({ name: 'stepthree' })
            // }).catch(err => {
            //     this.$message.error(err.response.data.msg || "申请人信息更新失败")
            // })
            
        },
        prev() {
            this.$router.push({ name: 'stepone' })
        }
    }
}
</script>
<style lang="less">
.applicantmsgbox {
    padding: 30px 20px;
    .person {
        font-size: 14px;
        font-weight: normal;
        color: #234;
        height: 20px;
        line-height: 20px;
        margin-bottom: 20px;
    }
    .searchappbox {
        height: 30px;
        margin-bottom: 30px;
        .selectbox {
            float: left;
            width: 100px;
            .el-input__icon {
				line-height: 30px;
            }
        }
        .sbox {
            float: left;
            width: 300px;
        }
        .searchbtn {
            float: left;
            width: 100px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            border-radius: 0 3px 3px 0;
            color: #fff;
            background-color: #29528a;
            cursor: pointer;
        }
    }
    
    .datalistbox {
        overflow: hidden;
        > li {
            position: relative;
            float: left;
            width: 260px;
            height: 126px;
            padding: 10px;
            border: 1px solid #DFE2E5;
            margin-right: 25px;
            margin-bottom: 25px;
            color: #234;
            font-size: 14px;
            cursor: pointer;
            &.now {
                border-color: #3367A2;
                // background-color: #379dea;
            }
            .tit {
                margin-bottom: 20px;
                font-weight: normal;
                line-height: 20px;
                min-height: 20px;
                color:#3367A2;
            }
            .aname {
                font-size: 18px;
                line-height: 20px;
                margin-bottom: 5px;
            }
            .msg {
                line-height: 20px;
                font-size: 16px;
                color: #234;
            }
            .status {
                position: absolute;
                right: 10px;
                top: 10px;
                width: 80px;
                font-size: 14px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                background-color: #00E3D0;
                color: #fff;
                &.pass {
                    background-color: #A37DF6;
                    
                }
                &.error {
                    background-color: #F67D7D;
                }
                &.work {
                    background: #FFC13F;
                }
            }
        }
        .xinzengbtn {
            width: 260px;
            height: 126px;
            border: 1px dashed #DFE2E5;
            background-color: #f9f9f9;
            text-align: center;
            line-height: 106px;
            cursor: pointer;
            font-size: 18px;
            color: #234
        }
    }
    .itemfiles {
        padding: 15px;
        background:#F5F5F5;
        border:1px solid #DFE2E5;
        font-size:14px;
        font-weight:500;
        color:rgba(34,51,68,1);
        line-height:28px;
        margin-top: -1px;
    }
    .itemfilesop{
        padding: 30px 15px;
        margin-top: -1px;
        background:rgba(255,255,255,1);
        border:1px solid #DFE2E5;
        font-size: 0;
        .downloadbtn {
            display: inline-block;
            width: 150px;
            height: 32px;
            line-height: 30px;
            margin-right: 28px;
            color: #1F4879;
            border-radius:2px;
            border:1px solid #1F4879;
            cursor: pointer;
            vertical-align: middle;
            font-size: 14px;
            text-align: center;
        }
        .downloadtip {
            height:20px;
            font-size:14px;
            color:rgba(153,153,153,1);
            line-height:20px;
            vertical-align: middle;
        }
    }
    .itemuploaderbox {
        padding: 30px 15px 60px;
        margin-top: -1px;
        border:1px solid #DFE2E5;
    }
    .uploaderbox {
        float: left;
        margin-right: 30px;
    }
    .extext {
        float: left;
        height: 120px;
        line-height: 120px;
        margin-right: 20px;
        font-size:14px;
        color:rgba(34,51,68,1);
        
    }
    .example {
        float: left;
        width: 100px;
        height: 120px;
        margin-right: 60px;
        background-color: #ccc;
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .uploadertip {
        float: left;
        font-size: 12px;
        color: #234;
    }
    .hasrequired {
        font-size: 14px;
        line-height: 20px;
        color: #234;
        &:before {
            content: "*";
            color: #f00;
            line-height: 20px;
        }
    }
}
</style>


