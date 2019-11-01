# vue-skills
#### [ ガイドサイト ]　[https://jp.vuejs.org/v2/guide/index.html](https://jp.vuejs.org/v2/guide/index.html)
## Vueで簡単なToDoList入力フォームを作る。  

![イメージ図](/screen/001.png)

### １）scriptタグでvue.jsを読み込む方法ですと、効率が悪いのでまずVUE-CLIを入れる流れ

まずnode.jsをインストール
[https://nodejs.org/en/](https://nodejs.org/en/)

バージョンをチェック
```
node -v
npm -v
```

[https://cli.vuejs.org/guide/installation.html](https://cli.vuejs.org/guide/installation.html)
```
npm i -g @vue/cli
```

```
vue create projectname
```
>default(babel, lint...)

```
cd projectname
```
```
npm run serve
```
を実行

その後ローカル環境
```
http://localhost:8080/
```
で確認

### 2）Vee-Validate バリデートの導入
インストール(バージョン２)
[http://vee-validate.logaretm.com/v2/](http://vee-validate.logaretm.com/v2/)

npmでインストール
```
npm install vee-validate@2.0.3
```
またはyarn
```
yarn add vee-validate@2.0.3
```

src/main.jsに下記を追加
```
import VeeValidate, { Validator } from 'vee-validate'

Vue.use(VeeValidate);
```

日本語化
src/main.jsにて
```
// vee-validateの日本語ファイルを読み込み
import ja from 'vee-validate/dist/locale/ja'

Validator.localize('ja', ja);
Vue.use(VeeValidate, { locale: ja });
```

src/components/ToDoList.vueのフォームでの使用例
```
<form @submit.prevent="addToDo">
    <input
        type="text"
        placeholder="あなたのToDoを入れてください"
        v-model="todolist"
        v-validate="'min:3'"
        name="todolist"
    />
    <p class="alert" v-if="errors.has('todolist')">{{errors.first('todolist')}}</p>
</form>
```




### 3）アニメーションについて  
v-if, v-show, 等のディレクティブに割り当てることが可能。  
[https://012-jp.vuejs.org/guide/transitions.html](https://012-jp.vuejs.org/guide/transitions.html)  
name属性にCSSアニメーションclassを割り当てる。  
例）
```
<transition name="animation-in">アニメーションさせたい要素</transition>
```
例）cssスタイル  
```
.animation-in-enter-active {
  animation: bounce-in 0.5s;
}
.animation-in-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
```
#### Animate.cssライブラリーを使用してみる  
[https://daneden.github.io/animate.css/](https://daneden.github.io/animate.css/)  
styleに@importする  
```
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
```
アニメーションさせたい部分に  
enter-active-class="animated flipInX"  
leave-active-class="animated flipOutX"  
を追加 (※他のカスタムアニメーションを設定していても、アニメーションは上書きされる)　　
例）  
```
<transition
    name="animation-in"
    enter-active-class="animated flipInX"
    leave-active-class="animated flipOutX"
>
    アニメーションさせたい要素
</transition>
```

![イメージ図2](/screen/002.png)

### 4) Vue-router（ページ遷移）の追加
※Vue-cliでプロジェクトを新規に作る時にも追加可能  
[https://router.vuejs.org/installation.html](https://router.vuejs.org/installation.html)
  
npmでインストール  
```
npm install vue-router --save-dev
```
またはyarnでインストール  
```
yarn add vue-router
```

srcフォルダ直下にrouter.jsファイルを追加  
src/router.js  
```
import Vue from 'vue'
import Router from 'vue-router'
import ToDo from './components/ToDoList.vue'
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
```
遷移用のページを追加する   
この場合、Aboutページ  
/src/components/About.vue  
```
<template>
  <div class="about">
    <h1>Aboutページです</h1>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
  </div>
</template>
```
main.jsにrouter.jsを登録する  
  
src/main.js
```
import router from './router'
```
Vueインスタンスにrouterを追加
```
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```

src/App.vueで直接ToDoList.vueを読み込むのをやめてナビゲーションを追加して、
<router-view />に変更
```
<!-- <ToDo /> -->
<nav>
    <router-link to="./">Home</router-link>
    <router-link to="./about">About</router-link>
</nav>

<router-view />
```

![イメージ図3](/screen/003.png)
　　
　　
  
　　
　　


## このままプロジェクトをテストされたい場合
　　
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).  

