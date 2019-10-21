<template>
  <div class="hello">
    <br />
    <div class="holder">
      <div class="title">
        <h3>[ v-forとv-ifの使用例 ]</h3>
      </div>
      <ul>
        <li v-for="(data, index) in skills" :key="index">{{index}}: {{data.skill}}</li>
      </ul>

      <p v-if="skills.length >= 1">一つ以上のスキルをお持ちですね。</p>
      <p v-else>一つまたはそれ以下のスキルしかお持ちではないですね。</p>
    </div>
  </div>
</template>

<script>
//リストレンダリング
//v-for > https://jp.vuejs.org/v2/guide/list.html
//条件付きレンダリング
//v-if > https://jp.vuejs.org/v2/guide/conditional.html

export default {
  name: "Skills",
  data() {
    return {
      skills: [
        { skill: "HTML" },
        { skill: "CSS" },
        { skill: "JS" },
        { skill: "FIREBASE" },
        { skill: "WORDPRESS" },
        { skill: "DESIGN" }
      ]
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

  ul {
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;

    li {
      margin: 4px;
      border: 1px solid #ccc;
      padding: 4px;
    }
  }
}
</style>
