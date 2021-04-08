<template>
	<div id="addapplicant" v-if="applicantshow">
		<div class="applicantbox">
			<h3 class="addtitle">
				新增申请人 <i class="el-icon-close" @click="close"></i>
			</h3>
            <div class="contentbox">
                <div class="clearfix mb20">
                    <div class="leftpart">
                        <el-form
                            ref="applicantform"
                            :model="form"
                            :rules="rules"
                            label-width="160px"
                        >
                            <el-form-item label="申请人类型" required>
                                <el-radio-group v-model="ApplicantType">
                                    <el-radio label="2">企业</el-radio>
                                    <el-radio label="1">个人</el-radio>
                                    
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="国家地区" required>
                                <el-select v-model="ApplicantRegion">
                                    <el-option
                                        v-for="(item, key) in countries"
                                        :key="key"
                                        :label="item.label"
                                        :value="item.value"
                                        >{{ item.label }}</el-option
                                    >
                                </el-select>
                            </el-form-item>
                            <template v-if="ApplicantType == '1'">
                                <el-form-item label="国家" prop="Country" key="a1" v-if="ApplicantRegion == 5">
                                    <el-select v-model="form.Country" filterable clearable>
                                        <el-option :label="item" :value="item" v-for="(item,index) in othercountry" :key="index">{{item}}</el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="申请人名称" prop="ApplicantName" key="a2">
                                    <el-input
                                        placeholder="请输入申请人名称"
                                        v-model="form.ApplicantName"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="申请人名称(英文)" prop="EName" v-if="ApplicantRegion != '1'" key="a3">
                                    <el-input
                                        placeholder="请输入"
                                        v-model="form.EName"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="申请人身份证号" prop="CardNumber" key="a4">
                                    <el-input
                                        placeholder="请输入申请人身份证号"
                                        v-model="form.CardNumber"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="申请人地址" required key="a5">
                                    <div class="specselect" v-if="ApplicantRegion == '1'">
                                        <el-select v-model="province" filterable clearable>
                                            <el-option :label="item" :value="item" v-for="(item, index) in provincedata" :key="index">{{item}}</el-option>
                                        </el-select>
                                    </div>
                                    <div class="" :class="{specinput: ApplicantRegion == '1'}">
                                        <el-input
                                            placeholder="请输入详细地址"
                                            v-model="form.Address"
                                            type="textarea"
                                            :autosize="{minRows: 1, maxRows: 4}"
                                        ></el-input>
                                    </div>
                                </el-form-item>
                                <el-form-item label="申请人地址(英文)" required v-if="ApplicantRegion != '1'" key="a6">
                                    <el-input
                                        placeholder="请输入"
                                        v-model="form.EAddress"
                                        type="textarea"
                                        :autosize="{minRows: 1, maxRows: 4}"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="邮编" prop="postcode" key="a7">
                                    <el-input
                                        placeholder="请输入邮编号码"
                                        v-model="form.postcode"
                                    ></el-input>
                                </el-form-item>
                            </template>
                            <template v-if="ApplicantType == '2'">
                                <el-form-item label="国家" prop="Country" key="b1" v-if="ApplicantRegion == 5">
                                    <el-select v-model="form.Country" filterable clearable>
                                        <el-option :label="item" :value="item" v-for="(item,index) in othercountry" :key="index">{{item}}</el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="企业名称" prop="ApplicantName" key="b2">
                                    <el-input
                                        placeholder="请输入企业名称"
                                        v-model="form.ApplicantName"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="企业名称(英文)" prop="EName" v-if="ApplicantRegion != '1'" key="b3">
                                    <el-input
                                        placeholder="请输入"
                                        v-model="form.EName"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="统一社会信用代码" prop="CardNumber" v-if="ApplicantRegion =='1'" key="b4">
                                    <el-input
                                        placeholder="请输入统一社会信用代码"
                                        v-model="form.CardNumber"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="营业执照地址" required v-if="ApplicantRegion =='1'" key="b5">
                                    <div class="specselect">
                                        <el-select v-model="provincedl" filterable clearable>
                                            <el-option :label="item" :value="item" v-for="(item, index) in provincedata" :key="index">{{item}}</el-option>
                                        </el-select>
                                    </div>
                                    <div class="specinput">
                                        <el-input
                                            placeholder="请严格按照营业执照地址填写，不用填写省级单位（含直辖市、自治区）"
                                            v-model="form.Address"
                                            type="textarea"
                                            :autosize="{minRows: 2, maxRows: 4}"
                                        ></el-input>
                                    </div>
                                </el-form-item>
                                <el-form-item label="申请人地址" required v-if="ApplicantRegion !='1'" key="b6">
                                    <div class="specselect">
                                        <el-input v-model="provincec" disabled></el-input>
                                    </div>
                                    <div class="specinput">
                                        <el-input
                                            placeholder="请输入详细地址"
                                            v-model="form.Address"
                                            type="textarea"
                                            :autosize="{minRows: 1, maxRows: 4}"
                                        ></el-input>
                                    </div>
                                </el-form-item>
                                <el-form-item label="申请人地址(英文)" required v-if="ApplicantRegion != '1'" key="b7">
                                    <el-input
                                        placeholder="请输入"
                                        v-model="form.EAddress"
                                        type="textarea"
                                        :autosize="{minRows: 1, maxRows: 4}"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="邮编" prop="postcode" key="b8">
                                    <el-input
                                        placeholder="请输入邮编号码"
                                        v-model="form.postcode"
                                    ></el-input>
                                </el-form-item>
                            </template>
                        </el-form>
                    </div>
                    <div class="rightpart" v-if="ApplicantType == '1'" key="person">
                        <div class="itemuploaderbox mb20" v-if="ApplicantRegion == 1" key="pa">
                            <h3 class="uploaderlabel hasrequired">身份证正反面</h3>
                            <div class="uploaderbox">
                                <uploader
                                    @complete="setUploadedMaterialcard"
                                    @resetUploader="resetUploader"
                                    :fileName="idcard_name"
                                    :canPreview="true"
                                    :postAction="'/sebe_engine/api/file/uploadAdapt?access_token=' + token + '&fileType=1&discern=1'"
                                    :url="idcard"
                                    :valueName="'idcard'"
                                    :extensions="'jpg,JPG,png,PNG,bmp,BMP,jpeg,JPEG'"
                                    :isDialog="true"
                                    :size="2"
                                ></uploader>
                            </div>
                            <div class="uploadertip">
                                <p>规格：</p>
                                <p>文件大小：小于2M</p>
                                <p>文件类型：JPG,JPEG,PNG,BMP</p>
                            </div>
                        </div>
                        <div class="itemuploaderbox" v-if="ApplicantRegion!=1" key="pb">
                            <h3 class="uploaderlabel hasrequired">护照</h3>
                            <div class="uploaderbox">
                                <uploader
                                    @complete="setUploadedMaterial"
                                    @resetUploader="resetUploader"
                                    :fileName="passport_name"
                                    :canPreview="true"
                                    :postAction="'/sebe_engine/api/file/uploadAdapt?access_token=' + token + '&fileType=3&discern=0'"
                                    :url="passport"
                                    :valueName="'passport'"
                                    :extensions="'jpg,JPG,png,PNG,bmp,BMP,jpeg,JPEG'"
                                    :isDialog="true"
                                    :size="2"
                                ></uploader>
                            </div>
                            <div class="uploadertip">
                                <p>规格：</p>
                                <p>文件大小：小于2M</p>
                                <p>文件类型：JPG,JPEG,PNG,BMP</p>
                            </div>
                        </div>
                        <div class="itemuploaderbox" v-if="ApplicantRegion == 1" key="pd">
                            <h3 class="uploaderlabel hasrequired">个体工商户营业执照</h3>
                            <div class="uploaderbox">
                                <uploader
                                    @complete="setUploadedMaterial"
                                    @resetUploader="resetUploader"
                                    :fileName="licence_name"
                                    :canPreview="true"
                                    :postAction="'/sebe_engine/api/file/uploadAdapt?access_token=' + token + '&fileType=2&discern=0'"
                                    :url="licence"
                                    :valueName="'licence'"
                                    :extensions="'jpg,JPG,png,PNG,bmp,BMP,jpeg,JPEG'"
                                    :isDialog="true"
                                    :size="2"
                                ></uploader>
                            </div>
                            <div class="uploadertip">
                                <p>规格：</p>
                                <p>文件大小：小于2M</p>
                                <p>文件类型：JPG,JPEG,PNG,BMP</p>
                            </div>
                        </div>
                    </div>
                    <div class="rightpart" v-if="ApplicantType == '2'" key="company">
                        <div class="itemuploaderbox mb20">
                            <h3 class="uploaderlabel hasrequired" v-if="ApplicantRegion == '1'">营业执照复印件</h3>
                            <h3 class="uploaderlabel hasrequired" v-if="ApplicantRegion != '1'">主体资格证明文件</h3>
                            <div class="uploaderbox" v-if="ApplicantRegion == '1'" key="u1">
                                <uploader
                                    @complete="setUploadedMaterialcompany"
                                    @resetUploader="resetUploader"
                                    :fileName="licence_name"
                                    :canPreview="true"
                                    :postAction="'/sebe_engine/api/file/uploadAdapt?access_token=' + this.token + '&fileType=2&discern=1'"
                                    :url="licence"
                                    :valueName="'licence'"
                                    :extensions="'jpg,JPG,png,PNG,bmp,BMP,jpeg,JPEG'"
                                    :isDialog="true"
                                    :size="2"
                                ></uploader>
                            </div>
                            <div class="uploaderbox" v-if="ApplicantRegion != '1'" key="u2">
                                <uploader
                                    @complete="setUploadedMaterial"
                                    @resetUploader="resetUploader"
                                    :fileName="licence_name"
                                    :canPreview="true"
                                    :postAction="'/sebe_engine/api/file/uploadAdapt?access_token=' + this.token + '&fileType=2&discern=0'"
                                    :url="licence"
                                    :valueName="'licence'"
                                    :extensions="'jpg,JPG,png,PNG,bmp,BMP,jpeg,JPEG'"
                                    :isDialog="true"
                                    :size="2"
                                ></uploader>
                            </div>
                            <div class="uploadertip">
                                <p>规格：</p>
                                <p>文件大小：小于2M</p>
                                <p>文件类型：JPG,JPEG,PNG,BMP</p>
                            </div>
                        </div>
                    </div>
                </div>
            
                <!-- <div class="itemuploaderbox mb20">
                    <h3 class="uploaderlabel hasrequired">委托书上传</h3>
                    <div class="uploaderbox">
                        <uploader
                            @complete="setUploadedMaterial"
                            @resetUploader="resetUploader"
                            :fileName="authorization_name"
                            :canPreview="true"
                            :postAction="'/sebe_engine/api/file/uploadFile?access_token=' + token + '&verifyType=1&uploadFilePolicy=ATTORNEY'"
                            :url="authorization"
                            :valueName="'authorization'"
                            :isDialog="true"
                            :extensions="'jpg,JPG,jpeg,JPEG'"
                            :size="10"
                        ></uploader>
                    </div>
                    <div class="uploadertip">
                        <p><span class="downloadbtn"><i class="el-icon-download"></i> 委托书下载</span><span class="downloadtip"><i class="el-icon-warning"></i>注：下载后盖章（公司）或签字（个人）上传</span></p>
                        <p>重要提示：</p>
                        <p>上传委托书模板只需在右下角签字，请勿盖章，委托书的其他信息都不需要填写</p>
                        <p>请确保上传委托书模板图片分辨率在800*800-3900*3900之间</p>
                        <p>请确保上传委托书模板图片大小不能超过2000K的JPG或JPEG格式图片</p>
                        <p>扫描或拍照前，请确保委托书模板纸面工整顺平，不能有褶皱、反光等</p>
                    </div>
                </div> -->
                <div class="itemuploaderbox mb20">
                    <h3 class="uploaderlabel hasrequired">法律文件上传</h3>
                    <div class="uploaderbox">
                        <uploader
                            @complete="setUploadedMaterial"
                            @resetUploader="resetUploader"
                            :fileName="legal_name"
                            :canPreview="true"
                            :postAction="'/sebe_engine/api/file/uploadFile?access_token=' + token + '&uploadFilePolicy=LEGAL_NOTICE'"
                            :url="legal"
                            :isDialog="true"
                            :valueName="'legal'"
                            :extensions="'jpg,JPG,png,PNG,bmp,BMP,jpeg,JPEG,pdf,PDF'"
                            :size="2"
                        ></uploader>
                    </div>
                    <div class="extext">
                        样例：
                    </div>
                    <div class="example" @click="preview('legeal')">
                        <img src="~assets/img/legeal.jpg" alt="">
                    </div>
                    <div class="uploadertip">
                        <p v-loading.fullscreen='legloading' element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-text='文件生成中'><span class="downloadbtn" @click="downloadlegeal"><i class="el-icon-download"></i> 法律文件下载</span><span class="downloadtip"><i class="el-icon-warning"></i>注：下载后盖章（公司）或签字（个人）上传</span></p>
                        <p>重要提示：</p>
                        <p>您需要上传由商标申请人签字或盖章的声明文件，以证明您的在线操作行为已经获得了商标申请人合法授权</p>
                        <p>文件类型：JPG,JPEG,PNG,BMP,PDF</p>
                    </div>
                </div>
                
            </div>
            <div class="submitbox">
                <span class="submitbtn" @click="createapp">提交</span>
            </div>
		</div>
        <el-dialog
			:visible.sync="pdfDialogVisible"
            :lock-scroll="false"
            :append-to-body="true"
			width="700px"
		>
			<img width="100%" v-if="wtsshow" src="~assets/img/wts.jpg" alt="" />
            <img width="100%" v-if="legealshow" src="~assets/img/legeal.jpg" alt="" />
		</el-dialog>
	</div>
</template>
<script>
import VueCookie from 'vue-cookie'
import uploader from "cps/uploader/uploader.vue";
import country from 'utils/countries.js'
import provinces from 'utils/provinces.js'
const cUrl = '/api/createApplicant'
const formData = {
    ApplicantType: null,
    ApplicantRegion: null,
    ApplicantName: null,
    CardNumber: null,
    Province: null,
    Address: null,
    EName: null,
    EAddress: null,
    Country: null,
    BusinessLicenceOssKey: null,
    SebeBusinessLicenceOss: null,
    IdCardOssKey: null,
    SebeIdCardOss: null,
    AuthorizationOssKey: null,
    SebeAuthorizationOss: null,
    PassportOssKey: null,
    SebePassportOss: null,
    LegalNoticeOssKey: null,
    SebeLegalNoticeOss: null,
    postcode: null
}
const personRules = {
    ApplicantName: [
        { required: true, message: "请输入申请人名称", trigger: "blur" },
    ],
    EName: [
        { required: true, message: "请输入申请人名称英文", trigger: "blur" },
    ],
    CardNumber: [
        { required: true, message: "请输入身份证号", trigger: "blur" },
    ],
    Country: [
        { required: true, message: "请选择国家", trigger: "blur" },
    ],
    postcode: [
        { required: true, message: "请输入邮编号码", trigger: "blur" },
    ],
}
const companyRules = {
    ApplicantName: [
        { required: true, message: "请输入企业名称", trigger: "blur" },
    ],
    EName: [
        { required: true, message: "请输入企业名称英文", trigger: "blur" },
    ],
    CardNumber: [
        { required: true, message: "请输入统一社会信用代码", trigger: "blur" },
    ],
    Country: [
        { required: true, message: "请选择国家", trigger: "blur" },
    ],
    postcode: [
        { required: true, message: "请输入邮编号码", trigger: "blur" },
    ],
}
const companyoRules = {
    ApplicantName: [
        { required: true, message: "请输入企业名称", trigger: "blur" },
    ],
    EName: [
        { required: true, message: "请输入企业名称英文", trigger: "blur" },
    ],
    Country: [
        { required: true, message: "请选择国家", trigger: "blur" },
    ],
    postcode: [
        { required: true, message: "请输入邮编号码", trigger: "blur" },
    ],
}
export default {
    name: 'addApplicant',
    inject: ['reload'],
	data() {
		return {
            applicantshow: false,
            othercountry: country,
            ApplicantType: '2',
            ApplicantRegion: '1',
			idcard: null,
			idcard_name: null,
            idcard_Data: [],
            idcard_oss: null,
			licence: null,
			licence_name: null,
            licence_Data: [],
            licence_oss: null,
            passport: null,
			passport_name: null,
            passport_Data: [],
            passport_oss: null,
            authorization: null,
			authorization_name: null,
            authorization_Data: [],
            authorization_oss: null,
			legal: null,
			legal_name: null,
            legal_Data: [],
            legal_oss: null,
            token: '',
			countries: [
				{ label: "大陆", value: '1' },
				{ label: "中国香港", value: '2' },
				{ label: "中国澳门", value: '3' },
				{ label: "中国台湾", value: '4' },
				{ label: "海外", value: '5' },
            ],
            province: null,
            provincedl: null,
            form: Object.assign({}, formData),
            provincedata: provinces,
            rules: Object.assign({}, companyRules),
            legloading: false,
            pdfDialogVisible: false,
            legealshow: false,
            wtsshow: false
		};
	},
	components: {
		uploader,
    },
    watch: {
        ApplicantType() {
            if (this.ApplicantType == 1) {
                this.rules = Object.assign({}, personRules)
            }
            if (this.ApplicantType == 2 ) {
                if (this.ApplicantRegion == 1) {
                    this.rules = Object.assign({}, companyRules)
                } else {
                    this.rules = Object.assign({}, companyoRules)
                }
            }
            setTimeout(() => {
                this.$refs.applicantform.resetFields()
            }, 50)
        },
        ApplicantRegion() {
            if (this.ApplicantType == 1) {
                this.rules = Object.assign({}, personRules)
            }
            if (this.ApplicantType == 2 ) {
                if (this.ApplicantRegion == 1) {
                    this.rules = Object.assign({}, companyRules)
                } else {
                    this.rules = Object.assign({}, companyoRules)
                }
            }
            setTimeout(() => {
                this.$refs.applicantform.resetFields()
            }, 50)
            
        },
    },
    computed: {
        provincec() {
            if (this.ApplicantRegion == 1 || this.ApplicantRegion == 5) {
                return null
            } else {
                if (this.ApplicantRegion == 2) {
                    return "中国香港"
                }
                if (this.ApplicantRegion == 3) {
                    return "中国澳门"
                }
                if (this.ApplicantRegion == 4) {
                    return "中国台湾"
                }
            }
        }
    },
    created() {
        this.token = VueCookie.get('engine_service_token')
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
        downloadlegeal() {
            if(!this.form.ApplicantName) {
                this.$message.warning('请先填写申请人名称')
                return 
            }
            const data  =  {
                applicant: this.form.ApplicantName
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
		close() {
            this.resetdata()
			this.applicantshow = false;
        },
        resetdata() {
            this.form = Object.assign({}, formData)
            this.province = null
            this.provincedl = null
            this.ApplicantType='2'
            this.ApplicantRegion = '1'
			this.idcard = null
			this.idcard_name = null
            this.idcard_oss = null
			this.licence = null
			this.licence_name = null
            this.licence_oss = null
            this.passport = null
			this.passport_name = null
            this.passport_oss = null
            this.authorization = null
			this.authorization_name = null
            this.authorization_oss = null
			this.legal = null
			this.legal_name = null
            this.legal_oss = null
        },
        submit() {
            this.close()
            this.reload()
        },
		showmodal() {
			this.applicantshow = true;
        },
        setUploadedMaterialcompany(data) {
            var dat = data.data;
			let d = Object.assign({}, dat);
			if (d.url) {
				this[data.valueName] = d.url;
                this[data.valueName + "_name"] = d.fileName;
                this[data.valueName + "_oss"] = d.ossKey
                
                this.form.ApplicantName = this.form.ApplicantName || d.applyName
                this.form.CardNumber = this.form.CardNumber || d.applyNumber
                this.form.Address = this.form.Address || d.address
                this.form.postcode = this.form.postcode || d.postcode
                this.provincedl = this.provincedl || d.provinceName
                
			} else {
				this.uploaderErrCallback(d);
			}
        },
        setUploadedMaterialcard(data) {
            var dat = data.data;
			let d = Object.assign({}, dat);
			if (d.url) {
				this[data.valueName] = d.url;
                this[data.valueName + "_name"] = d.fileName;
                this[data.valueName + "_oss"] = d.ossKey
                
                this.form.ApplicantName = this.form.ApplicantName || d.applyName
                this.form.CardNumber = this.form.CardNumber || d.applyNumber
                this.form.Address = this.form.Address || d.address
                this.form.postcode = this.form.postcode || d.postcode
                this.province = this.province || d.provinceName
                
			} else {
				this.uploaderErrCallback(d);
			}
        },
		setUploadedMaterial(data) {
			var dat = data.data;
			let d = Object.assign({}, dat);
			let md = this[data.valueName + "_Data"];
			if (d.url) {
				this[data.valueName] = d.url;
                this[data.valueName + "_name"] = d.fileName;
                this[data.valueName + "_oss"] = d.ossKey
				md.unshift(d);
				// this.trademarkData.contract_url = d.url;
			} else {
				this.uploaderErrCallback(d);
			}
			console.log(data);
		},
		resetUploader(valueName) {
			this[valueName] = "";
            this[valueName + "_name"] = "";
            this[valueName + "_oss"] = ""
		},
		uploaderErrCallback(data) {
			this.$alert(data.msg);
        },
        checkaddress() {
            if (this.ApplicantType == 1) {
                if (this.ApplicantRegion == 1) {
                    if (!this.province) {
                        this.$message.warning('请选择申请人省份')
                        return false
                    }
                    if (!this.form.Address) {
                        this.$message.warning('请填写申请人详细地址')
                        return false
                    }
                } else {
                    if (!this.form.EAddress) {
                        this.$message.warning('请填写申请人地址(英文)')
                        return false
                    }
                }
            }
            if (this.ApplicantType == 2) {
                if (this.ApplicantRegion == 1) {
                    if (!this.provincedl) {
                        this.$message.warning('请选择营业执照地址省份')
                        return false
                    }
                    if (!this.form.Address) {
                        this.$message.warning('请填写营业执照详细地址')
                        return false
                    }
                } else {
                    if (!this.form.Address) {
                        this.$message.warning('请填写申请人详细地址')
                        return false
                    }
                    if (!this.form.EAddress) {
                        this.$message.warning('请输入申请人地址(英文)')
                        return false
                    }
                }
            }
            return true
        },
        checkupload() {
            if (this.ApplicantType == 1) {
                if (this.ApplicantRegion == 1) {
                    if (!this.idcard) {
                        this.$message.warning('请上传身份证正反面')
                        return false
                    }
                    if (!this.licence) {
                        this.$message.warning('请上传个体工商户营业执照')
                        return false
                    }
                } else {
                    if (!this.passport) {
                        this.$message.warning('请上传护照')
                        return false
                    }
                }
            }
            if (this.ApplicantType == 2) {
                if (this.ApplicantRegion == 1) {
                    if (!this.licence) {
                        this.$message.warning('请上传营业执照')
                        return false
                    }
                } else {
                    if (!this.licence) {
                        this.$message.warning('请上传主体资格证明文件')
                        return false
                    }
                }
            }
            // if (!this.authorization) {
            //     this.$message.warning('请上传委托书')
            //     return false
            // }
            if (!this.legal) {
                this.$message.warning('请上传法律文件')
                return false
            }
            return true
        },
        senddata() {
            let data = Object.assign({}, this.form)
            data.ApplicantType = this.ApplicantType - 0 
            data.ApplicantRegion = this.ApplicantRegion - 0
            // 营业执照
            data.BusinessLicenceOssKey = this.licence_oss
            data.SebeBusinessLicenceOss = this.licence
            // 身份证
            data.IdCardOssKey = this.idcard_oss
            data.SebeIdCardOss = this.idcard
            // 护照
            data.PassportOssKey = this.passport_oss
            data.SebePassportOss = this.passport
            // 委托书
            // data.AuthorizationOssKey = this.authorization_oss
            // data.SebeAuthorizationOss = this.authorization
            // 法律文件
            data.LegalNoticeOssKey = this.legal_oss
            data.SebeLegalNoticeOss = this.legal
            if (this.ApplicantType == 1) {
                if (this.ApplicantRegion == 1) {
                    data.Province = this.province
                    delete data['PassportOssKey']
                    delete data['SebePassportOss']
                } else {
                    delete data['Province']
                    delete data['BusinessLicenceOssKey']
                    delete data['SebeBusinessLicenceOss']
                    delete data['IdCardOssKey']
                    delete data['SebeIdCardOss']
                }
            }
            if (this.ApplicantType == 2) {
                if (this.ApplicantRegion == 1) {
                    data.Province = this.provincedl
                } else {
                    data.Province = this.provincec
                }
                delete data['PassportOssKey']
                delete data['SebePassportOss']
                delete data['IdCardOssKey']
                delete data['SebeIdCardOss']
            }
            this.$http.post(cUrl, data).then(res => {
                this.$message.success('添加成功')
                this.resetdata()
                this.close()
                this.reload()
            }).catch(err => {
                this.$message.error(err.response.data.msg || "操作失败")
            })
            
            console.log('right')
        },
        createapp() {
            this.$refs['applicantform'].validate((valid) => {
                if (valid) {
                    if (this.checkaddress() && this.checkupload()) {
                        this.senddata()
                    }
                }
            })
        }
	},
};
</script>
<style lang="less">
#addapplicant {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	overflow: auto;
	margin: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 200;
	.applicantbox {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
        width: 1100px;
        height: 700px;
		padding: 20px 30px;
        background-color: #fff;
        .submitbox {
            padding: 10px 20px;
            font-size: 0;
            text-align: right;
        }
        .submitbtn {
            display: inline-block;
            width: 120px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border-radius: 4px;
            background-color: #379dea;
            color: #fff;
            font-size: 14px;
            cursor: pointer;
        }
		.contentbox {
			height: 540px;
			overflow-y: auto;
			.el-form-item__content,
			.el-form-item__label {
				line-height: 30px;
			}
			.el-input__icon {
				line-height: 30px;
            }
            .specselect {
                float: left;
                width: 160px;
                margin-bottom: 10px;
            }
            .specinput {
                float: left;
                width: 100%;
            }
			.leftpart {
                float: left;
                margin-right: 20px;
				width: 450px;
            }
            .rightpart {
                float: left;
                width: 510px;
            }
            .downloadbtn {
                margin-right: 20px;
                color: #379dea;
                cursor: pointer;
            }
            .downloadtip {
                color: #f00;
            }
            
        }
        .itemuploaderbox {
            height: 120px;
        }
        .uploaderlabel {
            float: left;
            width: 160px;
            text-align: right;
            padding-right: 20px;
            font-size: 14px;
            font-weight: normal;
        }
        .uploaderbox {
            float: left;
            margin-right: 20px;
        }
        .extext {
            float: left;
            height: 120px;
            line-height: 120px;
            margin-right: 10px;
            font-size:14px;
            color:rgba(34,51,68,1);
            
        }
        .example {
            float: left;
            width: 100px;
            height: 120px;
            
            margin-right: 20px;
            background-color: #ccc;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .uploadertip {
            float: left;
            max-width: 480px;
            font-size: 12px;
            color: #666;
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
		.addtitle {
			height: 20px;
			margin-bottom: 30px;
			font-size: 16px;
			color: #234;
			line-height: 20px;
			.el-icon-close {
				float: right;
				margin-top: 2px;
				cursor: pointer;
			}
		}
    }
    .contentbox::-webkit-scrollbar {
        width: 4px;
    }
    .contentbox::-webkit-scrollbar-track {
        width: 4px;
        background-color: #ccc;
    }
    .contentbox::-webkit-scrollbar-thumb {
        width: 4px;
        background-color: #379dea;
    }
}
</style>
