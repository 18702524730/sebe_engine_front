<template>
    <div class='bread'>
        <span class="leftborder"></span>
        <el-breadcrumb separator-class="el-icon-arrow-right" class='el-bread fl'>
            <el-breadcrumb-item
                v-for='(item,index) in curRouteData'
                :key='index'>{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <span class="logoutbox" @click="logout"><img src="~assets/img/logout.png" alt=""></span><span class="nowuser" @click="touser">{{username}} </span>
    </div>
</template>

<script>
    import {store} from 'utils/'
    import VueCookie from 'vue-cookie'
    const logoutUrl = "/api/logout"
    export default {
        name: 'bread',
        data () {
          return {
            strong:'',
            username: ''
          }
        },
        created() {
          this.username = VueCookie.get('engine_service_trueName')
        },
        methods:{
          logout() {
            this.$confirm('确认退出吗？','提示', {
              type: 'warning'
            }).then(() => {
              this.$http.put(logoutUrl).then(res => {
                this.$router.replace({ name: 'loginpage' })
              }).catch(err => {
                this.$message.error(err.response.data.msg)
              })
            }).catch(() => {})
          },
          touser() {
            this.$router.push({ name: 'usercenter'})
          }
        },
        computed: {
				  curRouteData () {
            const arr = []
            
            const rts = this.$route.matched
            rts.forEach(item => {
              const obj = {}
              obj.name = item.meta.name
              obj.rname = item.name
              arr.push(obj)
            })
            return arr
				    // return this.$store.state.router.curRouteData || [];
				  }
				},
        watch:{
          // $route(to,from){
          //   this.strong=this.getPageText(to.meta.name);
          // }
        }
    }
</script>

<style lang='less'>
    .bread{
        height: 44px;
        padding: 12px 30px 12px 20px;
        line-height: 20px;
        strong{font-size: 14px;}
        .leftborder {
          float: left;
          border-left: 2px solid #479CFF;
          height: 12px;
          margin-right: 5px;
          margin-top: 2px;
        }
        .nowuser {
          float: right;
          font-size: 14px;
          line-height: 20px;
          vertical-align: middle;
          cursor: pointer;
          .logout {
            width: 30px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            float: right;
            color: #333;
          }
        }
        .logoutbox {
          float: right;
          margin-left: 30px;
          margin-top: 2px;
          height: 14px;
          vertical-align: middle;
          cursor: pointer;
          > img {
            height: 100%;
          }
        }
    }
    .el-breadcrumb__item__inner a:hover, .el-breadcrumb__item__inner:hover{cursor: default;color: inherit;}
</style>
