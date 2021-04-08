<template >
  <div id="homepage">
    <left-menu ref='leftmenu'></left-menu>
    <div class="content" >
      <div class="breadbox"><bread></bread></div>
      <div id="contentbox" :style="{minHeight: cheight}">
        <router-view v-if="isRouterAlive"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
// import HeadNav from '../head-nav/HeadNav.vue';
import LeftMenu from '../leftmenu/menu.vue';
import Bread from '../bread/Bread.vue';
import {store} from 'utils/';
const adminUrl = CONFIG.adminUrl;
export default {
  name: 'home',
  provide() {
    return {
      addapplicant: this.addapp,
      reload: this.reload
    }
  },
  data(){
  	return {
  		menuIsDone:false,
      isDone: false,
      isRouterAlive: true,
      cheight: '300px'
  	}
  },
  components:{
    Bread,LeftMenu
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    },
    addapp() {
      this.$refs.leftmenu.openapply()
    },
    getheight() {
      const doc = document.body || document.documentElement
      this.cheight = doc.clientHeight  - 84 + 'px'
    },
    access() {
      store.set('permission', '');
      store.set('userinfo', '');
      this.$http.get(adminUrl+'/api/privilege', {})
      .then((resp) => {
        this.isDone = true;
        var data = resp.data;
        store.set('userinfo', data);
        store.set('permission', data.purviews);
      })
      .catch((err) => {
        console.log(err);
      });
    },
  },
  beforeDestroy() {
    const self = this;
    window.removeEventListener('resize', self.getheight)
  },
  mounted() {
    const self = this;
    this.getheight()
    window.addEventListener('resize', self.getheight)
    // this.access();
  }
}
</script>
<style scoped lang='less'>
#homepage {
  padding-left: 207px;
  height: 100%;
  .content{
    height: 100%;
    background: #F1F7FA;
    .breadbox{
      background-color: #fff;
    }
  }
}
#contentbox {
  background-color: #fff;
  margin: 20px 20px;
}

</style>
