<template>
	<div class="applysubmit">
		<steps :steps="steps"></steps>
		<apply-fill></apply-fill>
	</div>
</template>
<script>
	import Vue from 'vue'
	import Steps from 'cps/public/steps.vue'
	import ApplyFill from './components/Fill.vue'
	export default {
  	components: {
  		ApplyFill, Steps
    },
    data() {
      return {
      	steps:1,
      }
    },
    methods: {
    },
    mounted() {
    	// this.status = this.$router.query.status;
    }
  }
</script>
<style lang='less'>
.applysubmit {
	padding-bottom: 120px;
	.confirm_btnbox {
        position: fixed;
        right: 0;
        bottom: 0;
        width: 100%;
        background-color: #fff;
        padding: 30px 100px 30px;
        text-align: right;
        z-index: 6;
        border-top: 1px solid #dfe2e5;
        box-shadow:0px -3px 57px 0px rgba(0,0,0,0.11);
        font-size: 0;
        > span {
            display: inline-block;
            width: 142px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border-radius: 2px;
            font-size: 14px;
            color: #fff;
			cursor: pointer;
			vertical-align: bottom;
            &.prev {
				margin-right: 20px;
				border: 1px solid #DFE2E5;
				color: #29528A;
			}
			&.next {
				background-color: #29528A;
				color: #fff;
			}
        }
        > p {
            display: inline-block;
            font-size: 14px;
            color: #234;
			line-height: 20px;
			vertical-align: bottom;
			&.money{
				font-size: 40px;
				color: #FF9966;
				line-height: 40px;
				margin-right: 40px;
			}
		}
		
    }
}
</style>
