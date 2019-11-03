import Vue from 'vue'
import Router from 'vue-router'

////サンプルを確認されたい場合は、各ToDo項目をコメントアウトしながら切り替えていきます。

//v-onとv-bindの使用例
// import ToDo from "./components/Vue0.vue";

//v-forとv-ifの使用例
//import ToDo from "./components/Vue1.vue"; 

//外部CSSの使用例
//import ToDo from "./components/Vue2.vue";

//v-bind:classの使用例
//import ToDo from "./components/Vue3.vue"; 

//ToDoList App (Validation & Animation無しバージョン)
import ToDo from "./components/ToDoListSimple.vue";

//ToDoList App (Validation & Animation有りバージョン)
// import ToDo from './components/ToDoList.vue';


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