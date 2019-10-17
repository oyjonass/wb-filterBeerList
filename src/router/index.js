import Vue from 'vue';
import VueRouter from 'vue-router';
import BeerFilterPage from '@/pages/BeersPage';
import RoomPage from '@/pages/RoomPage'
import StatusPage from '@/pages/StatusPage'

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
      {
          path: '/',
          component: BeerFilterPage
      },
      {
        path: '/beerstatus/',
        component: StatusPage
      },
      { 
        path: '/olhall-1-and-2/',
        component: RoomPage, 
        props: { room: 1} 
      },
      { 
        path: '/olhall-3-and-4/',
        component: RoomPage, 
        props: { room: 2} 
      },
      { 
        path: '/maskinhallen/',
        component: RoomPage, 
        props: { room: 3} 
      },
      { 
        path: '/scene-1/',
        component: RoomPage, 
        props: { room: 4} 
      },
      { 
        path: '/scene-2/',
        component: RoomPage, 
        props: { room: 5} 
      },
      { 
        path: '/loftet/',
        component: RoomPage, 
        props: { room: 6} 
      },
    ]
});