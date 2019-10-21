<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <Skills /> -->
    <nav>
      <router-link to="./">Home</router-link>
      <router-link to="./about">About</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script>
/* eslint-disable */

import ToDo from "./components/ToDoList.vue"; //ToDoList App

export default {
  name: "app",
  components: {
    ToDo
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700");

* {
  box-sizing: border-box;
  //-webkit-transform-style: preserve-3d;
  margin: 0;
  padding: 0;
}

body,
html {
  background: #fafaff;
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 20px 20px 20px 0;
}
nav a {
  padding: 10px;
  text-decoration: none;
  background: #333;
  border-radius: 3px;
  color: #fff;
  font-weight: bold;
  margin-right: 15px;
}
</style>
