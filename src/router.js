import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Test from './views/Test.vue';
import RecipesNew from './views/RecipesNew.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  hash: false,
  routes: [
    {path: '/', name: 'home', component: Home },
    {path: '/about', name: 'about', component: About },
    {path: '/test', name: 'test', component: Test },
    {path: '/recipes/new', name: 'recipes-new', component: RecipesNew }
  ]
})
