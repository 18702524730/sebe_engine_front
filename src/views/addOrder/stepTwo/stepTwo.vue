<template>
	<div class="applysubmit">
		<steps :steps="steps"></steps>
		<apply-fill></apply-fill>
	</div>
</template>
<script>
	import Steps from 'cps/public/steps.vue'
	import ApplyFill from './components/Fill.vue'
	export default {
  	components: {
  		Steps,ApplyFill
    },
    data() {
      return {
      	steps:2,
      }
    },
    methods: {
    },
    mounted() {
    	// this.status = this.$router.query.status;
    }
  }
</script>
