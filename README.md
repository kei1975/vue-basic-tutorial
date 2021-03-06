# Vue勉強会用
<br/>

#### [ Vueガイドサイト ]　[https://jp.vuejs.org/v2/guide/index.html](https://jp.vuejs.org/v2/guide/index.html)
## 勉強会の最後にVueで簡単なToDoList入力フォームを作る。

![イメージ図](/screen/001.png)

<br/>

### ０）vueをcdn経由で読み込む

> ## htmlからvueを読み込んだ方法で、まずはライブコーディング開始


>> ライブコーディングしたソースコードは[こちら](#vuecdn)
---

> htmlフォーマッターがない方へ<br>
> 空のhtmlファイルに下記のフォーマットをコピペしてください。

```html
<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>

</body>

</html>
```

bodyタグに下記のscriptタグをコピペしてください。
```html
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

[ ダミーデータ ] 
※ライブコーディングの途中でコピペして頂きます
```javascript
games: [
  { "name": "Cities:Skylines", "url": "https://www.youtube.com/results?search_query=Cities:Skylines" },
  { "name": "fifa20", "url": "https://www.youtube.com/results?search_query=fifa20" },
  { "name": "Last of us 2", "url": "https://www.youtube.com/results?search_query=Last of us 2" },
  { "name": "Cities:Skylines", "url": "https://www.youtube.com/results?search_query=GTA" },
]
```


[ ダミーapiを取得する ] (dummy.jsonと同じ内容を登録しています。)
```
created() { //< createdはvueのライフサイクルフックのひとつ　詳細：　https://jp.vuejs.org/v2/api/#created
                fetch('https://api.myjson.com/bins/tw4ls') //ダミーで作成したjsonをapiで取得(http://myjson.com/tw4ls)
                    .then(response => response.json())
                    .then(json => {
                        this.gamesapi = json.products
                    })
            },
```
[ computedの例 ]
```javascript
computed: {　//computed = vueの算出プロパティ　詳細：https://jp.vuejs.org/v2/guide/computed.html
    /*算出プロパティとは
    Vue.jsではテンプレート内に計算や式を記述することができますが、使いすぎるとテンプレートにロジックが増えて、メンテナンスしづらくなってしまいます。
    算出プロパティは処理に名前をつけて、テンプレートに記述することでテンプレートを簡潔にし、この問題を解決してくれます。
    定義した算出プロパティは、テンプレート上では、あたかも変数であるかのように扱えます。*/
    totalProducts() {
        // es6 reduceメソッド ＝ http://js.studio-kingdom.com/javascript/array/reduce
        /*reduce()メソッドは配列に対して関数を適用し、その処理によって配列の各値を(左から右に)一つの値にまとめます。*/
        /*reduceを使う理由：for文で記述するより楽だから*/
        return this.gamesapi.reduce((sum, item) => {
            return sum + item.stock
        }, 0)//ここの0はsumの初期値

    }
}
```
[ computedとmethodsの違い ]
> /samples/method-vs-computed-sample.htmlを参照

[ v-bindとv-modelの違い]
> v-bindはModelの値をHTMLコンポーネントに出力します。HTMLコンポーネントの値が変わっても、Modelの値は変わりません。ModelからHTMLへの One-Way Binding (一方通行)です。<br><br>
> v-modelはModelとView（HTML）のTwo-Way Binding (双方向)に影響します。 HTMLコンポーネントの値に変更があった場合、自動で Model の値を更新します。入力フォームに割り当て、viewから変更する時に使用する。

[ vueのディレクティブとは ]
> ディレクティブは、それ自身を Vue インスタンスのプロパティやインスタンスの文脈の中で評価される表現にバインドすることができます。配下のプロパティや表現の値が変更されたら、それらのディレクティブの update() 関数が同期的に呼ばれます。<br>
> https://012-jp.vuejs.org/api/directives.html


[ ライブコーディングで利用するcss ]
```css
<style type="text/css">
        #app {
            display: flex;
            justify-content: center;
            flex-direction: column;
            border: 1px solid #ccc;
            padding: 20px;
        }

        h1 {
            font-style: oblique;
            margin: 0;
            padding: 0;
        }

        h2 {
            font-size: 60px;
        }

        a {
            text-decoration: none;
            color: darkcyan;
            font-weight: bold;
            padding: 5px;
        }

        a:hover {
            text-decoration: none;
            background: darkcyan;
            color: #fff;
            font-weight: bold;
        }

        ul {
            list-style-type: none;
        }

        ul li {
            border-left: 8px solid yellowgreen;
            padding: 4px;
            margin-bottom: 4px;
        }

        input {
            height: 40px;
            font-size: 18px;
            padding: 0 10px;
        }

        .cart {
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 20px;
            background: yellowgreen;
            color: #fff;

        }
    </style>
```
<br/>

### １）scriptタグでvue.jsを読み込む方法ですと、アプリを作っていく上で効率が悪いのでVUE-CLIをインストールする


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

```console
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
```

もし上記でうまくインストールができない場合は、ローカルでinstallしてください。[プロジェクトフォルダを作り、その中で"npm i @vue/cli"(-gを省いた記述)とターミナルでインストール]*</small>

<br/>

新規プロジェクトを生成する
```console
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
```console
cd projectname
```
<br/>

開発モードで起動する
```console
npm run serve
```
を実行

<br/>

その後ローカル環境
```
http://localhost:8080/
```
で確認 (ブラウザで上記のURLを開く)  


※プロジェクトのファイルを出力されたい場合は、プロダクトモード（静的ファイルが生成されます）
```console
npm run build
```
を実行してください。
実行後、"dist"というフォルダが生成され、静的ファイルがその中に配置されます。

  
___
※Vue CLI関連のリンク  
https://qiita.com/isihigameKoudai/items/eee3eb6a435675fdfd73

> Vue CLI UI　ターミナルから"vue ui"でUIサーバーが起動し、ブラウザ上でプロジェクト管理が可能
___
<br/>

## 2) プロジェクトの構成図について
![project-structure](/screen/project-structure.png)

![vuecli-project-template-structure.png](/screen/vuecli-project-template-structure.png)  

とりあえず/projectname/src/App.vueの中身をみてみましょう。

```javascript
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
```javascript
import HelloWorld from './components/HelloWorld.vue'
```

componentsとして登録することによって、
```javascript
components: {
    HelloWorld
  }
```
＜template＞タグの中で呼び出すようになっています。
```javascript
<HelloWorld msg="Welcome to Your Vue.js App"/>
```

＜HelloWorld＞タグのmsg属性とは何か？
```
msg="Welcome to Your Vue.js App"
```
それを理解するには、HelloWorld.vueの中身を確認する必要があります。
では早速みてみましょう。

/projectname/src/components/HelloWorld.vue
```javascript
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    以下省略・・・
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

```
コンポーネントタグの属性でパラメータを渡したい場合はプロパティ(props)を設定する必要があります。
＜script＞タグの中にあるpropsという部分、こちらが先ほど親コンポーネントから渡されているmsgという属性の値を定義しています。
```javascript
props: {
    msg: String
  }
```
propsでは、
データの型を記述し、(String = 文字列)
その後、＜template＞タグの中で渡ってくる値を表示します。
```html
<h1>{{ msg }}</h1>
```
この
```
{{  }}
```
はデータバインディングのもっとも基本的な形、”Mustache” 構文(二重中括弧)を利用したテキスト展開になります。  
詳細：https://jp.vuejs.org/v2/guide/syntax.html

パラメータからわたってこないデータバイディングの場合は、
下記のようにdata()内にデータとして持つことができます。
例）
```javascript
export default {
  name: 'HelloWorld',
  //例えばnameというデータを用意し、"山田太郎"という値を入れてあげる。
  data() {
    return {
      name: "山田太郎"
    };
  },
  props: {
    msg: String
  }
}
```
その後、＜template＞内に＜p＞タグの行を追加してみましょう。
```html
<h1>{{ msg }}</h1>
<p>ハロー{{ name }}さん！</p>
```
結果：
```html
Welcome to Your Vue.js App
ハロー山田太郎さん！
```
と表示されます。

## 3) ここからはサンプルを利用しながら進めていきましょう。
まずこのページの一番右上に配置されている"clone or download"ボタンからプロジェクト（vue-basic-tutorial-master.zip）をダウンロードしましょう。
![download-project](/screen/download-project.png)

とりあえずわかりやすい場所に保存しましょう。（デスクトップなど）

vue-basic-tutorial-master.zipを解凍し、
vue-basic-tutorial-masterというフォルダが展開されます。
ターミナルでそのフォルダ内に入り、
```console
npm i
```
で、プロジェクトに必要なモジュールをインストールします。  
例）

![install-project](/screen/install-project.png)

無事モジュールがインストールした後に、[ 開発モード ]でプロジェクトを立ち上げてみましょう。
```console
npm run serve
```

プロジェクトが立ち上がったら、またブラウザで下記URLを開きます。
```console
http://localhost:8080/ 
```
ダウンロードされたプロジェクトの構成は先ほど新規で作られたプロジェクトの構成と同じになります。

![project-structure2](/screen/project-structure2.png)

プロジェクトにページ遷移のサンプルを実装しているため、
新しくrouter.jsというファイルが追加されています。ページ遷移用の設定ファイルになります。
先ほどの新規で作られたプロジェクトに追加したい場合は、このページの

> [6) Vue-router（ページ遷移）の追加](#vuerouter) 

を参照してみてください。


サンプルを確認する場合は、
このrouter.jsファイルに記述されている部分を変更致します。

/vue-basic-tutorial-master/src/router.js

```javascript
////サンプルを確認されたい場合は、各ToDo項目をコメントアウトしながら切り替えていきます。
//v-xxxxはディレティブ（HTML5の拡張属性を利用した指令方法）
//v-onとv-bindの使用例
//import ToDo from "./components/Vue0.vue";

//v-forとv-ifの使用例
//import ToDo from "./components/Vue1.vue"; 

//外部CSSの使用例
//import ToDo from "./components/Vue2.vue";

//v-bind:classの使用例
//import ToDo from "./components/Vue3.vue"; 

//ToDoList App (Validation & Animation無しバージョン)
// import ToDo from "./components/ToDoListSimple.vue"; 

//ToDoList App (Validation & Animation有りバージョン)
import ToDo from './components/ToDoList.vue';

```
このプロジェクトのダウンロードした状態は、デモの完成版ToDo Listが表示されていますが、
例えば"v-on"と"v-bind"の使用例を確認されたい場合は、下記のようにコメント部分（スラッシュが２つある部分）を変更します。

```javascript
////サンプルを確認されたい場合は、各ToDo項目をコメントアウトしながら切り替えていきます。
//v-xxxxはディレティブ（HTML5の拡張属性を利用した指令方法）
//v-onとv-bindの使用例
import ToDo from "./components/Vue0.vue";

//v-forとv-ifの使用例
//import ToDo from "./components/Vue1.vue"; 

//外部CSSの使用例
//import ToDo from "./components/Vue2.vue";

//v-bind:classの使用例
//import ToDo from "./components/Vue3.vue"; 

//ToDoList App (Validation & Animation無しバージョン)
// import ToDo from "./components/ToDoListSimple.vue"; 

//ToDoList App (Validation & Animation有りバージョン)
//import ToDo from './components/ToDoList.vue';
```
" // "（スラッシュ２つ）がないimportの行のあたまに" // "を追加し、
表示したいimportの" // "を外す感じなります。

![import-sample1](/screen/import-sample1.png)
各サンプルのコンポーネントは/vue-basic-tutorial-master/src/componentsフォルダに配置されています。
上記の場合は、
```
./components/Vue0.vue
```
をimportしていますので、
/vue-basic-tutorial-master/src/components/Vue0.vue
というファイルが表示しているコンポーネントになります。

/vue-basic-tutorial-master/src/components/Vue0.vue
```javascript
<template>
  <div class="hello">
    <div class="holder">
      <div class="title">
        <h3>[ v-onとv-bindの使用例 ]</h3>
      </div>
      <h2>{{ name }}</h2>
      <br />
      {{btnState ? 'ボタンは無効化されています' : 'ボタンは有効です'}}
      <br />
      <button v-on:click="changeName" v-bind:disabled="btnState">名前を変更</button>
    </div>
  </div>
</template>

<script>
//イベントハンドリング
//v-on > https://jp.vuejs.org/v2/guide/events.html @で省略も可能です。
//クラスとスタイルのバインディング
//v-bind > https://jp.vuejs.org/v2/guide/class-and-style.html

export default {
  name: "Skills",
  data() {
    return {
      name: "山田太郎",
      btnState: true
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.holder {
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>

```
ここでは、v-onとv-bindの使用例になります。
data()内に
nameというデータおよび
btnStateという変数が存在します。
＜template＞タグの中で、
```js
<h2>{{ name }}</h2>
```
および
```javascript
{{btnState ? 'ボタンは無効化されています' : 'ボタンは有効です'}}

<button v-on:click="changeName" v-bind:disabled="btnState">名前を変更</button>

```
部分でデータバインディングしています。
試しに btnState を false にしてみましょう。
```javascript
data() {
    return {
      name: "山田太郎",
      btnState: true
    };
  }
```
から
```javascript
data() {
    return {
      name: "山田太郎",
      btnState: false
    };
  }
```

![import-sample1-1](/screen/import-sample1-1.png)


 このように他のサンプルもみてみましょうー
 ### v-forとv-ifの使用例
 router.jsファイル
```javascript
////サンプルを確認されたい場合は、各ToDo項目をコメントアウトしながら切り替えていきます。
//v-xxxxはディレティブ（HTML5の拡張属性を利用した指令方法）
//v-onとv-bindの使用例
//import ToDo from "./components/Vue0.vue";

//v-forとv-ifの使用例
import ToDo from "./components/Vue1.vue"; 

//外部CSSの使用例
//import ToDo from "./components/Vue2.vue";

//v-bind:classの使用例
//import ToDo from "./components/Vue3.vue"; 

//ToDoList App (Validation & Animation無しバージョン)
// import ToDo from "./components/ToDoListSimple.vue"; 

//ToDoList App (Validation & Animation有りバージョン)
//import ToDo from './components/ToDoList.vue';
```
[ソースファイル]
/vue-basic-tutorial-master/src/components/Vue1.vue


### 外部CSSの使用例
 router.jsファイル
```javascript
////サンプルを確認されたい場合は、各ToDo項目をコメントアウトしながら切り替えていきます。
//v-xxxxはディレティブ（HTML5の拡張属性を利用した指令方法）
//v-onとv-bindの使用例
//import ToDo from "./components/Vue0.vue";

//v-forとv-ifの使用例
//import ToDo from "./components/Vue1.vue"; 

//外部CSSの使用例
import ToDo from "./components/Vue2.vue";

//v-bind:classの使用例
//import ToDo from "./components/Vue3.vue"; 

//ToDoList App (Validation & Animation無しバージョン)
// import ToDo from "./components/ToDoListSimple.vue"; 

//ToDoList App (Validation & Animation有りバージョン)
//import ToDo from './components/ToDoList.vue';
```
[ソースファイル]
/vue-basic-tutorial-master/src/components/Vue2.vue


### v-bind:classの使用例
 router.jsファイル
```javascript
////サンプルを確認されたい場合は、各ToDo項目をコメントアウトしながら切り替えていきます。
//v-xxxxはディレティブ（HTML5の拡張属性を利用した指令方法）
//v-onとv-bindの使用例
//import ToDo from "./components/Vue0.vue";

//v-forとv-ifの使用例
//import ToDo from "./components/Vue1.vue"; 

//外部CSSの使用例
//import ToDo from "./components/Vue2.vue";

//v-bind:classの使用例
import ToDo from "./components/Vue3.vue"; 

//ToDoList App (Validation & Animation無しバージョン)
// import ToDo from "./components/ToDoListSimple.vue"; 

//ToDoList App (Validation & Animation有りバージョン)
//import ToDo from './components/ToDoList.vue';
```
[ソースファイル]
/vue-basic-tutorial-master/src/components/Vue3.vue


### ToDoList App (Validation & Animation無しバージョン)
 router.jsファイル
```javascript
////サンプルを確認されたい場合は、各ToDo項目をコメントアウトしながら切り替えていきます。
//v-xxxxはディレティブ（HTML5の拡張属性を利用した指令方法）
//v-onとv-bindの使用例
//import ToDo from "./components/Vue0.vue";

//v-forとv-ifの使用例
//import ToDo from "./components/Vue1.vue"; 

//外部CSSの使用例
//import ToDo from "./components/Vue2.vue";

//v-bind:classの使用例
//import ToDo from "./components/Vue3.vue"; 

//ToDoList App (Validation & Animation無しバージョン)
import ToDo from "./components/ToDoListSimple.vue"; 

//ToDoList App (Validation & Animation有りバージョン)
//import ToDo from './components/ToDoList.vue';
```
[ソースファイル]
/vue-basic-tutorial-master/src/components/ToDoListSimple.vue

#### [ v-bindとv-modelの違い ]

> v-bindはModelの値をHTMLコンポーネントに出力します。HTMLコンポーネントの値が変わっても、Modelの値は変わりません。ModelからHTMLへの One-Way Binding (一方通行)です。

> v-modelはModelとView（HTML）のTwo-Way Binding (双方向)に影響します。 HTMLコンポーネントの値に変更があった場合、自動で Model の値を更新します。入力フォームに割り当て、viewから変更する時に使用する。

<br/><br/><br/>

#### ↓時間があれば

### 4）Vee-Validate バリデートの導入
インストール(バージョン２)
[http://vee-validate.logaretm.com/v2/](http://vee-validate.logaretm.com/v2/)

npmでインストール
```console
npm install vee-validate@2.0.3
```
またはyarn
```console
yarn add vee-validate@2.0.3
```

src/main.jsに下記を追加
```javascript
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
<br/><br/>



### 5）アニメーションについて  
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


### ToDoList App (Validation & Animation有りバージョン)
 router.jsファイル
```js
////サンプルを確認されたい場合は、各ToDo項目をコメントアウトしながら切り替えていきます。
//v-xxxxはディレティブ（HTML5の拡張属性を利用した指令方法）
//v-onとv-bindの使用例
//import ToDo from "./components/Vue0.vue";

//v-forとv-ifの使用例
//import ToDo from "./components/Vue1.vue"; 

//外部CSSの使用例
//import ToDo from "./components/Vue2.vue";

//v-bind:classの使用例
//import ToDo from "./components/Vue3.vue"; 

//ToDoList App (Validation & Animation無しバージョン)
//import ToDo from "./components/ToDoListSimple.vue"; 

//ToDoList App (Validation & Animation有りバージョン)
import ToDo from './components/ToDoList.vue';
```
[ソースファイル]
/vue-basic-tutorial-master/src/components/ToDoList.vue  
<br/><br/>




  
  
### <a name="vuerouter"></a>6) Vue-router（ページ遷移）の追加
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
　　

### <a name="vuecdn"></a>7) CDNを利用したVueのサンプル

> Vue.jsファイルを直接 ＜script＞ タグで読み込む方法

詳細：https://jp.vuejs.org/v2/guide/index.html

### [ 基本的な設定 ]

埋め込む方法
```js
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```
適当に"app"というIDのdivタグをhtml内に配置する
```html
<div id="app"></div>
```

vue.jsの読み込みをしている下にVueインスタンスを生成する
```javascript
<script>
        var App = new Vue({ //Vueインスタンスの生成
            el: '#app', //id "app"というDOM要素に割り当てます
            data: { //適当なデータを用意
                name: "山田太郎",
                //以下省略
            }
        });
</script>
```

サンプルソース
```html
<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CDNを利用したVueのサンプル</title>
    <style>
        #app {
            display: flex;
            justify-content: center;
            flex-direction: column;
            border: 1px solid #ccc;
            padding: 20px;
        }

        h1 {
            font-style: oblique;
            margin: 0;
            padding: 0;
        }

        h2 {
            font-size: 60px;
        }

        a {
            text-decoration: none;
            color: darkcyan;
            font-weight: bold;
            padding: 5px;
        }

        a:hover {
            text-decoration: none;
            background: darkcyan;
            color: #fff;
            font-weight: bold;
        }

        ul {
            list-style-type: none;
        }

        ul li {
            border-left: 8px solid yellowgreen;
            padding: 4px;
            margin-bottom: 4px;
        }

        input {
            height: 40px;
            font-size: 18px;
            padding: 0 10px;
        }

        .cart {
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 20px;
            background: yellowgreen;
            color: #fff;

        }
    </style>
</head>

<body>
    <div id="app">
        <h1>{{name}}さん、いらっしゃい</h1><br />
        <ul>
            <li v-for="game in games"><a v-bind:href="game.url" target="_blank">{{game.name}}</a>
            </li>
        </ul>

        <ul>
            <li v-for="game in gamesapi">
                <input type="number" v-model.number="game.stock">
                商品名：{{game.name}} |
                <span v-if="game.stock === 0">在庫無し</span>
                <span v-else>在庫：{{game.stock}}個</span>
                <button @click="game.stock += 1">在庫を増やす</button>
            </li>
        </ul>


        <h2 class="cart">全商品の在庫：{{totalProducts}}個</h2>
    </div>


    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <script>
        var App = new Vue({ 
            el: '#app',
            data: {
                name: "山田太郎",
                games: [
                    { "name": "Cities:Skylines", "url": "https://www.youtube.com/results?search_query=Cities:Skylines" },
                    { "name": "fifa20", "url": "https://www.youtube.com/results?search_query=fifa20" },
                    { "name": "Last of us 2", "url": "https://www.youtube.com/results?search_query=Last of us 2" },
                    { "name": "Cities:Skylines", "url": "https://www.youtube.com/results?search_query=GTA" },
                ],
                gamesapi: []
            },

            created() { //< createdはvueのライフサイクルフックのひとつ　詳細：　https://jp.vuejs.org/v2/api/#created
                fetch('https://api.myjson.com/bins/tw4ls') //ダミーで作成したjsonをapiで取得(http://myjson.com/tw4ls)
                    .then(response => response.json())
                    .then(json => {
                        this.gamesapi = json.products
                    })
            },
            computed: {　//computed = vueの算出プロパティ　詳細：https://jp.vuejs.org/v2/guide/computed.html
                /*算出プロパティとは
                Vue.jsではテンプレート内に計算や式を記述することができますが、使いすぎるとテンプレートにロジックが増えて、メンテナンスしづらくなってしまいます。
                算出プロパティは処理に名前をつけて、テンプレートに記述することでテンプレートを簡潔にし、この問題を解決してくれます。
                定義した算出プロパティは、テンプレート上では、あたかも変数であるかのように扱えます。*/
                totalProducts() {
                    // es6 reduceメソッド ＝ http://js.studio-kingdom.com/javascript/array/reduce
                    /*reduce()メソッドは配列に対して関数を適用し、その処理によって配列の各値を(左から右に)一つの値にまとめます。*/
                    /*reduceを使う理由：for文で記述するより楽だから*/
                    return this.gamesapi.reduce((sum, item) => {
                        return sum + item.stock
                    }, 0)//ここの0はsumの初期値

                }
            }
        });

    </script>
</body>

</html>

```
　

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).  

