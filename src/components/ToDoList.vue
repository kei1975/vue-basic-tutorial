
<template>
  <div>
    <br />
    <div class="holder">
      <div class="title">
        <h3>ToDoList入力フォーム</h3>
      </div>

      <form @submit.prevent="addToDo">
        <input
          type="text"
          placeholder="あなたのToDoを入れてください(※3文字以上)"
          v-model="todolist"
          v-validate="'min:3'"
          name="todolist"
        />

        <transition
          name="alert-in"
          enter-active-class="animated flipInX"
          leave-active-class="animated flipOutX"
        >
          <p class="alert" v-if="errors.has('todolist')">{{errors.first('todolist')}}</p>
        </transition>
      </form>
      <br />
      {{todolist}}
      <br />

      <p>[ あなたのToDoリストになります ]</p>

      <ul>
        <transition-group
          name="list"
          enter-active-class="animated bounceInUp"
          leave-active-class="animated bounceOutDown"
        >
          <li v-for="(data, index) in todolists" :key="`first-${index}`">
            {{ data.todolist }}
            <i class="fa fa-minus-circle" v-on:click="remove(index)"></i>
          </li>
        </transition-group>
      </ul>
      <p v-if="endedTodoList.length !== 0">[ Todo対応済みのリスト ]</p>
      <ul class="endedTodoList">
        <transition-group
          name="list"
          enter-active-class="animated bounceInUp"
          leave-active-class="animated bounceOutDown"
        >
          <li v-for="(data, index) in endedTodoList" :key="`deleted-${index}`">{{ data.todolist }}</li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  data() {
    return {
      todolist: "",
      todolists: [
        { todolist: "JSを勉強する" },
        { todolist: "大根を買ってくる" }
      ],
      endedTodoList: []
    };
  },
  methods: {
    addToDo() {
      this.$validator.validateAll().then(result => {
        //console.log("result = " + result);
        if (result && this.todolist != "") {
          this.todolists.push({ todolist: this.todolist });
          this.todolist = "";
        } else {
          console.log("無効です");
        }
      });
    },
    remove(id) {
      //adding removing todo inside ended todolist first.
      this.endedTodoList.push(this.todolists[id]);

      this.todolists.splice(id, 1);
      //console.log("this.endedTodoList = " + JSON.stringify(this.endedTodoList));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";

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
i {
  float: right;
  cursor: pointer;
}
</style>