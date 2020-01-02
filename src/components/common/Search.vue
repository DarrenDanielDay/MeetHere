<template>
  <div class="home-search">
    <div id="sbox" @keydown.enter="onSearch">
      <el-input size="mini" v-model="input" suffix-icon="el-icon-search" placeholder="请输入内容"></el-input>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import router from '../../router';

@Component({})
class Search extends Vue {
  public input: string = "";

  constructor() {
    super();
  }

  public onSearch() {
    // todo search venues
    router.push({
      name: 'search',
      params: {
        keyword: this.input
      }
    })
  }
}

export default Search;
export { Search };
</script>

<style>
#sbox {
  display: flex;
}
#sbox .el-input {
  margin-right: 1%;
}
.home-search {
  background-color: #24292e;
  height: 100%;
  color: #fff;
  display: flex;
}
</style>
