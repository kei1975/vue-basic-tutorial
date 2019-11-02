# vue-skills
#### [ ガイドサイト ]　[https://jp.vuejs.org/v2/guide/index.html](https://jp.vuejs.org/v2/guide/index.html)
## Vueで簡単なToDoList入力フォームを作る。  

![イメージ図](/screen/001.png)

### １）scriptタグでvue.jsを読み込む方法ですと、効率が悪いのでまずVUE-CLIを入れる流れ

まずnode.jsをインストール
[https://nodejs.org/en/](https://nodejs.org/en/)

バージョンをチェック
```console
node -v
npm -v
```



[https://cli.vuejs.org/guide/installation.html](https://cli.vuejs.org/guide/installation.html)
```console
npm i -g @vue/cli
```
<small>*※もしパーミッションエラーでグローバルインストール(rootが所有する{prefix}/lib/node_modules/にパッケージをインストール)できない場合、下記URLが参考になります。  
https://qiita.com/okohs/items/ced3c3de30af1035242d?fbclid=IwAR2FZufuHXmIwb28pRJhhHhyk1t66ICq9ZEwYGSfCOWKTXlirOKN05jxN0w  
もし上記でうまくインストールができない場合は、ローカルでinstallしてください。[プロジェクトフォルダを作り、その中で"npm i @vue/cli"(-gを省いた記述)とターミナルでインストール]*</small>

<br/>

新規プロジェクトを生成する
```
vue create projectname
```  
<small>※"projectname"部分は好きな名称でOK。</small>

![vue-create-project](/screen/vue-create-project.jpg)

とりあえずデフォルトの  
<pre>default(babel, eslint)</pre>
を選択  
<br/>
![vue-create-project-after](/screen/vue-create-project-after.png)  

プロジェクト生成後、プロジェクトフォルダに移動する
```
cd projectname
```
<br/>

開発モードで起動する
```
npm run serve
```
を実行

<br/>

その後ローカル環境
```
http://localhost:8080/
```
で確認 (ブラウザで上記のURLを開く)  


※もしプロジェクトのファイルを出力されたい場合は、プロダクトモード（静的ファイルが生成されます）
```
npm run build
```
を実行してください。
実行後、"dist"というフォルダが生成され、静的ファイルがその中に配置されます。

  
___
※Vue CLI関連のリンク  
https://qiita.com/isihigameKoudai/items/eee3eb6a435675fdfd73
___
<br/>

## プロジェクトの構成図
![project-structure](/screen/project-structure.png)

![vuecli-project-template-structure.png](/screen/vuecli-project-template-structure.png)  

とりあえずApp.vueの中身をみてみましょう。

```js
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```
主に３つの項目でvueファイルは構成されています。

＜template＞タグの中身がHTML部分（描画される部分）になります。

＜script＞タグの中がjavascriptを記述する場所になります。

＜style＞タグの中にcssを記述する場所になります。


このプロジェクト雛形では、
templateタグの中に＜HelloWorld＞というタグがありますが、
こちらは/projectname/src/components/HelloWorld.vueを読み込んで表示している形になっています。

＜script＞タグでimportをし、
```js
import HelloWorld from './components/HelloWorld.vue'
```

componentsとして登録することによって、
```js
components: {
    HelloWorld
  }
```
＜template＞タグの中で呼び出すようになっています。
```js
<HelloWorld msg="Welcome to Your Vue.js App"/>
```



<br/><br/><br/>

#### ↓時間があれば

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
```javascript
// vee-validateの日本語ファイルを読み込み
import ja from 'vee-validate/dist/locale/ja'

Validator.localize('ja', ja);
Vue.use(VeeValidate, { locale: ja });
```

src/components/ToDoList.vueのフォームでの使用例
```javascript
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
```javascript
<transition name="animation-in">アニメーションさせたい要素</transition>
```
例）cssスタイル  
```css
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

