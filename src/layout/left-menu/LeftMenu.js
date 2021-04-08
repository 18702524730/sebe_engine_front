import {store} from 'utils/';
import qs from 'qs'
export default {
  name: 'left-menu',
  data() {
    return {
    	activePath: '',
    	store: store,
    	menusData:[],
    	cMenusData:[],
      menu_list: [],
      win_size: {
          height: '',
      }
    }
  },
  methods: {
  	handleSelect(key, keyPath) {
  		this.$router.push({path: key})
    },
    setSize() {
      this.win_size.height = this.$$lib_$(window).height() + "px";
    },
    toggleMenu() {
      this.$store.dispatch(this.$store.state.leftmenu.menu_flag ? 'set_menu_close' : 'set_menu_open');
    },
    updateCurMenu(route) {
      var route = route || this.$route;
      if (route.matched.length) {
        var rootPath = route.matched[0].path,
            fullPath = route.path;
        this.$store.dispatch('set_cur_route', {
          rootPath,
          fullPath
        });
        var routes = this.$router.options.routes;
        for (var i = 0; i < routes.length; i++) {
          if (routes[i].path === rootPath && !routes[i].hidden) {
            this.menu_list = routes[i].children;
            break;
          }
        }
      } else {
        this.$router.push('/404');
      }
    },
    getPathQuery(r){
  		var path = r.path;
  		var idx = path.indexOf('?');
  		var queryObj = {}
  		if (idx !== -1) {
  			queryObj = qs.parse(path.slice(idx+1))
  		}else{
  			queryObj = ''
  		}
  		return queryObj;
  	},
  	//是否是空对象
  	isEmptyObject(o) {
	    for (var p in o) {
        if (p !== undefined) {
          return false;
        }
	    }
	    return true;
		},
    //匹配路由，高亮左侧导航菜单
    matchRoute(){
    	var self = this;
      var route = this.$route;
      var path = route.path;
      var query = route.query;
      var cMenusData = this.cMenusData;
      //默认高亮当前二级菜单下的第一个三级菜单
      this.activePath = cMenusData[0].children[0].access;
  		cMenusData.forEach((item, i) => {
  			//匹配三级菜单的高亮（针对各列表页3级路由，详情页面4级路由）
  			if (route.matched[0].path + item.path == route.matched[1].path) {
    			var c = item.children;
    			for (var j = c.length - 1; j >= 0; j--) {
    				var queryObj = self.getPathQuery(c[j]);
    				var pathArr = path.split('/');
    				//匹配公用的详情页面路由(4级)
    				if (pathArr.length > 4) {
		    			self.activePath = pathArr.slice(0, 4).join('/')+ (this.isEmptyObject(query) ? '' : '?' +qs.stringify(query));
		    			break;
		    		}
    				//不存在需要匹配查询参数的，直接取三级菜单
    				if (!queryObj) {
    					self.activePath = route.matched[2].path;
    					return;
    				}
    				var ret = true;
						for (var p in queryObj) {
			        if (queryObj.hasOwnProperty(p)) {
			        	if (queryObj[p] != query[p]) {
			        		ret = false;
			        		break;
			        	}
			        }
				    }
				    //存在需要匹配查询参数的，组装完整path
				    if (ret) {
				    	self.activePath = route.matched[2].path+ '?' +qs.stringify(queryObj);
				    	break;
				    }
	    		}
    		}
  		});
  		// console.log(self.activePath)
    },
    getCurRouteData(activePath){
    	var self = this;
    	if (!activePath) {return;}
    	activePath = activePath.slice(1).split('?')[0];
    	var arr = activePath.split('/');
    	var temp = [];
    	var menusData = this.menusData;
    	//console.log(menusData)
    	//console.log(this.$route)
    	var fullPath = this.$route.fullPath;
    	var idx = 0;
    	var getItem = function(menusData){
    		for (var j = menusData.length - 1; j >= 0; j--) {
    			var item = menusData[j];
    			var path = self.$route.matched[idx].path;
    			var index = path.indexOf(':');
    			path = index === -1 ? path : path.slice(0, index-1);
		    	if (idx === 2) {
		    		var pArr = item.access.split('?');
		    		if (pArr.length > 1) {
		    			if (fullPath.indexOf(pArr[0]) !== -1 && fullPath.indexOf(pArr[1]) !== -1) {
		    				temp.push(item);
		    				break;
		    			}
		    		}else{
		    			if (item.access === path) {
				    		temp.push(item);
				    		break;
				    	}
		    		}
		    	}else if (item.access === path) {
		    		temp.push(item);
		    		if (item.children && item.children.length) {
		    			idx ++;
		    			getItem(item.children);
		    		}
		    	}
		    }
	    }
	    getItem(menusData);
	    this.$store.commit('SET_CUR_ROUTE_DATA', temp);
    }
  },
  created() {
  	this.menusData = store.get('menusData');
  	var menusData = this.menusData;
    menusData.forEach((item, i) => {
    	if (item.path === this.$route.matched[0].path) {
    		this.cMenusData = item.children;
    		store.set('cMenusData', this.cMenusData);
    		return false;
    	}
    });
    if (this.$route.matched.length < 3) {
    	this.$router.replace(this.cMenusData[0].children[0].access);
    	return;
    }
    this.matchRoute();

    this.setSize();
    this.$$lib_$(window).resize(() => {
        this.setSize();
    });
    this.updateCurMenu();
  },
  mounted() {
    // console.log(this.$store.state.user.userinfo.access);
  },
  watch: {
    $route(to, from) {
    	this.menusData = store.get('menusData');
	  	var menusData = this.menusData;
	    menusData.forEach((item, i) => {
	    	if (item.path === this.$route.matched[0].path) {
	    		this.cMenusData = item.children;
	    		store.set('cMenusData', this.cMenusData);
	    		return false;
	    	}
	    });
	    if (this.$route.matched.length < 3) {
	    	this.$router.replace(this.cMenusData[0].children[0].access);
	    	return;
	    }
	    this.matchRoute();
      this.updateCurMenu(to);


      if (this.$route.matched.length < 3) {
        this.$router.replace(this.cMenusData[0].children[0].access);
        return;
      }
    },
    activePath(val){
    	this.getCurRouteData(val);
    }
  }
}
