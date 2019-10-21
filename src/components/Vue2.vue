<template>
  <div class="hello">
    <br />
    <div class="holder">
      <div class="title">
        <h3>[ 外部CSSの使用例 ]</h3>
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
export default {
  name: "Skills",
  data() {
    return {
      skills: [{ skill: "HTML" }, { skill: "CSS" }]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./ToDo.css" scoped>
</style>
