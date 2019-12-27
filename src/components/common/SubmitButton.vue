<template>
  <el-button :icon="currentIcon" :type="type" @click="onClick" :circle="circle" :round="round">
    <slot>提交</slot>
  </el-button>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import { ButtonType } from "element-ui/types/button";
import {
  Action,
  SimpleAction,
  ChainAction,
  AlwaysAction,
  PromiseAction,
  CallbackAction,
  actionTypes,
  DelayAction
} from "../../util/action";
@Component({})
class SubmitButton extends Vue {
  @Prop({
    default: false
  })
  public round!: boolean;

  @Prop({
    default: false
  })
  public circle!: boolean;
  
  @Prop({
    default: "el-icon-s-promotion"
  })
  public icon!: string;

  @Prop({
    default: "primary"
  })
  public type!: ButtonType;

  @Prop({
    default() {
      return new DelayAction(2000);
    },
    type: actionTypes
  })
  public action!: Action;

  public currentIcon: string;

  constructor() {
    super();
    this.currentIcon = this.icon;
  }

  public onClick() {
    // console.log("calling onClick()...");
    this.currentIcon = "el-icon-loading";
    this.action
      .perform()
      .then(() => {
        this.resetIcon();
        // this.$emit("submit-success");
      })
      .catch(() => {
        this.resetIcon();
        // this.$emit("submit-failed");
      });
  }

  public resetIcon() {
    this.currentIcon = this.icon;
    // console.log("reset!")
  }
}

export { SubmitButton };
export default SubmitButton;
</script>
