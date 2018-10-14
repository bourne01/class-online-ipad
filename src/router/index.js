import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
	routes: [	
		{
			path:'/home',
			name:'Home',
			component:() => import('../views/home.vue'),
			children:[
				{
					path:'',
					name:'HomeContent',
					component:() => import('../components/home/home.vue')
				},
				{
					path:'draw-pad',
					name:'DrawPad',
					component:() => import('../views/draw-pad.vue')
				}
			]
		},			
		{
			path:'',
			redirect:'home',
		}			
	]
})
