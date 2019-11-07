
<template>
  <div>
    <div class="holder">
      <div class="title">
        <h3>ToDoList入力フォーム</h3>
      </div>

      <!--01-->
      <form @submit.prevent="addToDo">
        <input type="text" placeholder="あなたのToDoを入れてください" v-model="todolist" />
      </form>

      <br />
      {{todolist}}
      <br />
      <!--01-->

      <!--02-->
      <p>[ あなたのToDoリストになります ]</p>

      <ul>
        <li v-for="(data, index) in todolists" :key="`first-${index}`">
          {{ data.todolist }}
          <!--03-->
          <i class="fa fa-minus-circle" v-on:click="remove(index)"></i>
          <!--03-->
        </li>
      </ul>
      <!--02-->
      <!--04-->
      <p v-if="endedTodoList.length !== 0">[ Todo対応済みのリスト ]</p>

      <ul class="endedTodoList">
        <li v-for="(data, index) in endedTodoList" :key="`deleted-${index}`">{{ data.todolist }}</li>
      </ul>
      <!--04-->
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  data() {
    return {
      todolist: "", //1
      //2
      todolists: [
        { todolist: "JSを勉強する" },
        { todolist: "大根を買ってくる" }
      ],
      //3
      endedTodoList: []
    };
  },
  methods: {
    addToDo() {
      if (this.todolist != "") {
        this.todolists.push({ todolist: this.todolist });
        this.todolist = "";
      } else {
        console.log("無効です");
      }
    },
    //03
    remove(id) {
      //adding removing todo inside ended todolist first.
      this.endedTodoList.push(this.todolists[id]);
      //removing from todolists
      this.todolists.splice(id, 1);
      //The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
      //console.log("this.endedTodoList = " + JSON.stringify(this.endedTodoList));
    }
    //03
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";

h3 {
  margin-bottom: 20px;
  text-decoration-line: underline;
  text-decoration-style: double;
  font-style: italic;
}
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

ul li {
  padding: 20px;
  font-size: 1.3em;
  color: #fff;
  background-color: orange;
  border-left: 10px solid red;
  margin-bottom: 2px;
  font-weight: bold;
}

ul.endedTodoList li {
  color: #555;
  background-color: #ccc;
  border-left: 10px solid #333;
  text-decoration-line: line-through;
  opacity: 0.5;
}
p {
  text-align: center;
  padding: 30px 0;
  color: gray;
}

input {
  width: calc(100% - 40px);
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  background-color: #323333;
  color: #fff;
}
.alert {
  background: #fdf2ce;
  font-weight: bold;
  display: inline-block;
  padding: 5px;
  margin-top: -20px;
}
.alert-in-enter-active {
  animation: bounce-in 0.5s;
}
.alert-in-leave-active {
  animation: bounce-in 0.5s reverse;
}

i {
  float: right;
  cursor: pointer;
}
</style>