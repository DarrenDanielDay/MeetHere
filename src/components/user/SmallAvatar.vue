<template>
  <el-avatar :size="40" fit="scale-down" :style="bg">
    <el-image v-if="user&&user.avatar" :src="user.avatar"></el-image>
    <span v-else :style="fg">{{(user&&user.username||'')[0]}}</span>
  </el-avatar>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { User } from "@/model/entity/user";

@Component({})
class SmallAvatar extends Vue {
  @Prop({
    required: true
  })
  public user!: User;

  private preColors: string[] = [
    "#0066ff",
    "#9933cc",
    "#ffaa00",
    "#cccccc",
    "#ff4400",
    "#00ff66"
  ];

  get bg() {
    if (this.user && this.user.avatar) {
      return {};
    }
    let color = 0;
    let i = 0;
    let username = (this.user && this.user.nickname) || "";
    for (; i < username.length; i++) {
      color += username.charCodeAt(i);
    }
    // console.log(`username hash ${color}`)
    color %= this.preColors.length;
    return {
      backgroundColor: this.preColors[color]
    };
  }

  get fg() {
    return {
      color: "#ffffff"
    };
  }

  constructor() {
    super();
  }
}

export default SmallAvatar;
export { SmallAvatar };
</script>

<style>
</style>