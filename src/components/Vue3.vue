<template>
  <div class="hello">
    <br />
    <div class="holder">
      <div class="title">
        <h3>[ v-bind:classの使用例 ]</h3>
      </div>

      <div v-bind:class="{ 'alert-class': showAlert, 'another-class': showClass }">アラート</div>
    </div>
  </div>
</template>

<script>
//クラスとスタイルのバインディング
//v-bind > https://jp.vuejs.org/v2/guide/class-and-style.html

export default {
  name: "Skills",
  data() {
    return {
      showAlert: true,
      showClass: true
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.alert-class {
  background: red;
  width: 100%;
  height: 60px;
}
.another-class {
  color: #fff;
  padding: 4px;
  border: 10px solid #000;
}
.holder {
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
