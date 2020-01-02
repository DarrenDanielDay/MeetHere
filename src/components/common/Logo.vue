<template>
  <div>
    <el-image :src="logoImg" style="width: 50px; height: 50px;" fit="contain" alt="Logo.png"></el-image>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { logo } from '../../util/images';
class Logo extends Vue {
    private logoImg: string;
    constructor() {
        super();
        this.logoImg = logo;
    }
}

export { Logo };
export default Logo;

</script>

<style>
</style>