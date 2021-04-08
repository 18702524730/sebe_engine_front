<template>
    <div id="app">
        <transition name="bounce">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
	export default {
		name      : 'app',
		components: {},
		data(){
			return {

            }
		},
        methods:{
			init(){

            },
        },
        mounted(){
			this.init();
        },
        watch:{
        	$route(to,from){

            }
        }
	}
</script>

<style lang="less">
    *{
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin:0px;
        padding:0px;
    }

    .bounce-enter-active {
        animation: bounce-in .5s;
        -webkit-animation:bounce-in .5s;
    }

    .bounce-leave-active {
        animation: bounce-out .2s;
        -webkit-animation: bounce-out .2s;
    }
    #app {
        height: 100%;
        .el-pager li.active {
            color: #3367a2;
        }
        .el-radio__input.is-checked .el-radio__inner  {
            border-color: #29528A;
            background: #29528A;
        }
        .el-radio__input.is-checked+.el-radio__label {
            color: #29528A
        }
        .el-textarea__inner:hover {
            border-color:#29528A!important;
        }
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes bounce-out {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.95);
        }
        100% {
            transform: scale(0);
        }
    }
</style>
