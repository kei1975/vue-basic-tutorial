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
