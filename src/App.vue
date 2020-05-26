<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  position: relative;
  height: 100%;
}
html,
body {
  height: 100%;
}
h1 {
  margin: 0;
}
ul li {
  list-style: none;
}
.mint-toast.is-placemiddle {
  width: 5rem !important;
  height: 3rem !important;
  display: flex;
  align-items: center;
}
.mint-toast-text {
  font-size: 0.4rem !important;
  margin: auto;
}
.mint-msgbox-title {
  font-size: 26px;
}
.mint-msgbox-message {
  font-size: 26px;
}
.mint-msgbox-btns {
  font-size: 26px;
}
</style>
