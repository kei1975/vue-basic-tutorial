import Vue from 'vue'
import Router from 'vue-router'
//import ToDo from "./components/Vue0.vue"; //v-onとv-bindの使用例
//import ToDo from "./components/Vue1.vue"; //v-forとv-ifの使用例
//import ToDo from "./components/Vue2.vue"; //外部CSSの使用例
//import ToDo from "./components/Vue3.vue"; //v-bind:classの使用例
// import ToDo from "./components/ToDoListSimple.vue"; //ToDoList App without Validation & Animation
import ToDo from './components/ToDoList.vue' //ToDoList App

import About from './components/About.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'todolist',
            component: ToDo
        },
        {
            path: '/about/',
            name: 'about',
            component: About
        }
    ]
})