<template>
  <div id="app">
    <el-container>
      <el-header style="padding: 0">
        <navigator style="min-width:806px;"></navigator>
      </el-header>
      <el-main style="padding: 0">
        <div class="outside">
          <div class="page">
            <router-view />
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";
import Navigator from "./components/common/Navigator.vue";

@Component({
  components: {
    HelloWorld,
    navigator: Navigator
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
.el-header {
  background-color: #24292e;
  color: #333;
  text-align: center;
}

.el-main {
  color: #333;
  text-align: center;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
}

.outside {
  display: flex;
  justify-content: center;
}
.page {
  min-width: 806px;
  max-width: 1440px;
}
</style>
