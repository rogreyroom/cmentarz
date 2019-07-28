import Vue from 'vue'
import Router from 'vue-router'

import ListGrave from '@/components/SubPages/ListGrave'
import Konfigurator from '@/components/Forms/CmConfig'
import AddGrave from '@/components/SubPages/AddGrave'
import ShowGrave from '@/components/SubPages/ShowGrave'
import EditGrave from '@/components/SubPages/EditGrave'
import AddUser from '@/components/SubPages/AddUser'
import EditUser from '@/components/SubPages/EditUser'
import SearchResult from '@/components/SubPages/SearchResult'
import RaportyNieOplacone from '@/components/SubPages/RaportyNieOplacone'
import RaportyOsobyZmarle from '@/components/SubPages/RaportyOsobyZmarle'
import CmMap from '@/components/SubPages/CmMap'
import EditCMConfig from '@/components/Forms/EditCMConfig'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: ListGrave,
    },
    //Config
    {
      path: '/konfigurator',
      name: 'config-cm',
      component: Konfigurator
    },
    {
      path: '/editCmConfig/:id',
      name: 'edit-cm',
      component: EditCMConfig,
    },

    //Graves
    {
      path: '/addGrave',
      name: 'add-grave',
      component: AddGrave
    },
    {
      path: '/showGrave/:id',
      name: 'show-grave',
      component: ShowGrave,
    },
    {
      path: '/showGrave/editGrave/:id',
      redirect: {
        name: 'edit-grave'
      }
    },
    {
      path: '/showGrave/addUser/:id',
      redirect: {
        name: 'add-user'
      }
    },
    {
      path: '/showGrave/editUser/:id',
      redirect: {
        name: 'edit-user'
      }
    },
    {
      path: '/editGrave/:id',
      name: 'edit-grave',
      component: EditGrave
    },
    {
      path: '/editGrave/addUser/:id',
      redirect: {
        name: 'add-user'
      }
    },
    {
      path: '/editGrave/showGrave/:id',
      redirect: {
        name: 'show-grave'
      }
    },
    //Users
    {
      path: '/addUser/:id',
      name: 'add-user',
      component: AddUser
    },
    {
      path: '/editUser/:id',
      name: 'edit-user',
      component: EditUser
    },
    {
      path: '/editUser/showGrave/:id',
      redirect: {
        name: 'show-grave'
      }
    },
    {
      path: '/addUser/showGrave/:id',
      redirect: {
        name: 'show-grave'
      }
    },
    {
      path: '/searchResult/:data',
      name: 'search-user',
      component: SearchResult
    },
    {
      path: '/searchResult/searchResult/:data',
      redirect: {
        name: 'search-user'
      }
    },
    // Raporty
    //--Nieopłacone
    {
      path: '/raporty/nieOplacone',
      name: 'raporty-nie-oplacone',
      component: RaportyNieOplacone,
    },
    {
      path: '/raporty/nieOplacone/showGrave/:id',
      redirect: {
        name: 'show-grave'
      }
    },
    //--Osoby zmarłe
    {
      path: '/raporty/osobyZmarle',
      name: 'raporty-osoby-zmarle',
      component: RaportyOsobyZmarle,
    },
    {
      path: '/raporty/osobyZmarle/showGrave/:id',
      redirect: {
        name: 'show-grave'
      }
    },
    // Mapa cmentarza
    {
      path: '/raporty/mapa',
      name: 'raporty-mapa',
      component: CmMap,
    },
    {
      path: '/raporty/mapa/showGrave/:id',
      redirect: {
        name: 'show-grave'
      }
    },
    // Default
    {
      path: '*',
      redirect: '/'
    }
  ]
})
