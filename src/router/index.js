import Vue from "vue";
import Router from "vue-router";
import { Home, Content } from "layout/";

import { loginPages, myOrders, addOrder, applicant, official, userCenter } from 'views/'
const originalPush = Router.prototype.push;
const originalReplace = Router.prototype.replace;
Router.prototype.push = function push(location, onResolve, onReject) {
	return originalPush.call(this, location).catch((err) => {
		return err;
	});
};
Router.prototype.replace = function replace(location, onResolve, onReject) {
	return originalReplace.call(this, location).catch((err) => {
		return err;
	});
};
Vue.use(Router);
export default new Router({
	scrollBehavior: () => ({ y: 0 }),
	routes: [
		{
			path: "/",
			hidden: true,
			component: loginPages,
			redirect: "/login",
		},
		{
			path: "/login",
			name: "loginpage",
			meta: {
				name: "登录",
			},
			component: loginPages,
			hidden: true
		},
		{
			path: "/home",
			name: "homepage",
			meta: {
				name: "首页",
			},
			component: Home,
			redirect: "/home/orderhome",
			children: [
				{
					path: "myorder",
					name: "myorder",
					meta: {
						name: "我的订单",
						cname: 'myorders'
					},
					component: Content,
					redirect: '/home/myorder/orderlist',
					children: [
						{
							path: "orderlist",
							name: "orderlist",
							meta: {
								name: "订单列表",
							},
							component: myOrders.myOrderList,
						},
						{
							path: "myorderdetail/:id",
							name: "myorderdetail",
							hidden: true,
							meta: {
								name: "订单详情"
							},
							component: myOrders.myOrderDetail,
						},
					]
				},
				{
					path: "orderhome",
					name: "orderhome",
					hidden: true,
					meta: {
						name: "数据概览"
					},
					component: myOrders.orderHome,
				},
				
				{
					path: "record/:id",
					name: "traderecord",
					hidden: true,
					meta: {
						name: "我的订单"
					},
					component: myOrders.tradeRecord,
				},
				{
					path: "stepone",
					name: "stepone",
					
					meta: {
						name: "新增订单",
					},
					hidden: true,
					component: addOrder.stepOne,
				},
				{
					path: "steptwo",
					name: "steptwo",
					
					meta: {
						name: "新增订单",
					},
					hidden: true,
					component: addOrder.stepTwo,
				},
				{
					path: "stepthree",
					name: "stepthree",
					
					meta: {
						name: "新增订单",
					},
					hidden: true,
					component: addOrder.stepThree,
				},
				{
					path: "stepfour",
					name: "stepfour",
					
					meta: {
						name: "新增订单",
					},
					hidden: true,
					component: addOrder.stepFour,
				},
				{
					path: "applicant",
					name: "applicant",
					
					meta: {
						name: "我的申请人",
						cname: 'applicant'
					},
					component: applicant.applist,
				},
				{
					path: "officialdoc",
					name: "officialdoc",
					
					meta: {
						name: "官文管理",
						cname: 'official'
					},
					component: official.officialList,
				},
				{
					path: "usercenter",
					name: "usercenter",
					meta: {
						name: "个人中心",
						cname: 'usercenter'
					},
					component: Content,
					redirect: '/home/usercenter/acount',
					children: [
						{
							path: "acount",
							name: "acount",
							
							meta: {
								name: "账户信息",
							},
							component: userCenter.userHome,
						},
						{
							path: "userlist",
							name: "userlist",
							
							meta: {
								name: "收支明细",
							},
							component: userCenter.userList,
						},
					]
				},
				// {
				// 	path: "usercenter",
				// 	name: "usercenter",
					
				// 	meta: {
				// 		name: "个人中心",
				// 		cname: 'usercenter'
				// 	},
				// 	component: userCenter.userHome,
				// },
				// {
				// 	path: "userlist",
				// 	name: "userlist",
					
				// 	meta: {
				// 		name: "个人中心",
				// 	},
				// 	hidden: true,
				// 	component: userCenter.userList,
				// },
			],
		},

		{
			path: "*",
			hidden: true,
			name: "others",
			redirect: '/',
		},
	],
});
