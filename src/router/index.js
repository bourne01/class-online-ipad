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
				},
				{
					path:'course',
					name:'Course',
					component:() => import('../views/course.vue')
				},
				{
					path:'question',
					name:'Question',
					component:() => import('../views/question.vue')
				},
				{
					path:'counting',
					name:'Counting',
					component:() => import('../views/counting.vue')
				},
				{
					path:'student-manage',
					name:'Student',
					component:() => import('../views/student-manage.vue')
				},
			]
		},			
		{
			path:'',
			redirect:'home',
		}			
	]
})
