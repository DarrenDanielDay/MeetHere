import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/Home.vue'),
  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: () => import('../views/home/Home.vue'),
  // },
  {
    path: '/venues',
    name: 'venues',
    component: ()=> import('../views/venue/VenueList.vue')
  },
  {
    path:'/venue-detail/:venueID',
    props: true,
    name:'venue-detail',
    component: () => import('../views/venue/VenueDetail.vue')
  },
  {
    path: '/search/:keyword',
    props: true,
    name: 'search',
    component: () => import('../views/venue/VenueList.vue')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/news/NewsList.vue')
  },
  {
    path: '/news-detail/:newsID',
    props: true,
    name: 'news-detail',
    component: () => import('../views/news/NewsDetail.vue')
    
  },
  {
    path: '/comments',
    name: 'comments',
    component: () => {
      return import('../views/comment/WebSiteComments.vue')
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user/Base.vue'),
    children: [
      {
        path: 'info-room',
        name: 'user-info',
        component: () => {
          return import('../views/user/InfoRoom.vue')
        }
      },
      {
        path: 'order-room',
        name: 'user-order',
        component: () => {
          return import('../views/user/OrderRoom.vue')
        }
      },
      {
        path: 'make-order/:siteID',
        props: true,
        name: 'make-order',
        component: () => {
          return import('../views/user/MakeOrder.vue')
        }
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin/Base.vue'),
    children:[
      {
        path: 'order-statistics',
        name: 'statistics',
        component: () => import('../views/admin/Statistics.vue')
      },
      {
        path: 'news-room',
        name: 'admin-news-room',
        component: () => {
          return import('../views/admin/NewsRoom.vue')
        }
      },
      {
        path: 'venue-room',
        name: 'admin-venue-room',
        component: () => {
          return import('../views/admin/VenueRoom.vue')
        }
      },
      {
        path: 'user-room',
        name: 'admin-user-room',
        component: () => {
          return import('../views/admin/UserRoom.vue')
        }
      },
      {
        path: 'order-room',
        name: 'admin-order-room',
        component: () => {
          return import('../views/admin/OrderRoom.vue')
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
