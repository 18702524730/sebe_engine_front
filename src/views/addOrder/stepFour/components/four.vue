<template>
	<div class="stepsuccessbox">
		<div class="successmsg">
			<div class="successicon">
				<i class="el-icon-success"></i>
			</div>
			<p>您的商标注册申请已经提交！</p>
			<p>请耐心等待审核结果！</p>
		</div>
		<div class="allbtns">
			<span class="oncemore mr20" @click="tofirst">继续新增</span>
			<span class="back" @click="tolist">返回订单列表</span>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {}
	},
	mounted() {},
	methods: {
		tofirst() {
			this.$router.push({ name: 'stepone' })
		},
		tolist() {
			this.$router.push({ name: 'myorder' })
		}
	},
};
</script>
<style lang="less">
.stepsuccessbox {
	padding:  100px 20px 50px;
	.successmsg {
		width: 260px;
		margin: 0 auto;
		text-align: center;
		
		.successicon {
			margin-bottom: 30px;
			font-size: 80px;
			color: #29528A;
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
</style>
