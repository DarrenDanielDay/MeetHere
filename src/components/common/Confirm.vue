<template>
  <b-modal :id="id" :hide-footer="true" :title="title">
    <el-row>
      <el-col>
        <span>{{message}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <slot></slot>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="display: flex; flex-direction: row-reverse;">
        <el-button
          ref="cancelButton"
          id="cancelButton"
          :type="cancelStyle"
          style="margin: 10px"
        >{{cancelText}}</el-button>
        <el-button
          ref="confirmButton"
          id="confirmButton"
          :type="confirmStyle"
          style="margin: 10px"
        >{{ confirmText}}</el-button>
      </el-col>
    </el-row>
  </b-modal>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
@Component({})
class Confirm extends Vue {
  public static acceptPromise(): Promise<any> {
    return new Promise(accept => {
      accept();
    });
  }

  @Prop({
    required: true,
    type: String
  })
  public id!: string;

  @Prop({
    default: "请确认",
    type: String
  })
  public title!: string;

  @Prop({
    default: "取消",
    type: String
  })
  public cancelText!: string;

  @Prop({
    default: "确认",
    type: String
  })
  public confirmText!: string;

  @Prop({
    default: "primary",
    type: String
  })
  public confirmStyle!: string;

  @Prop({
    default: "",
    type: String
  })
  public cancelStyle!: string;

  @Prop({
    default: "确认吗？",
    type: String
  })
  public message!: string;

  constructor() {
    super();
  }

  public show(): Promise<any> {
    this.$bvModal.show(this.id);
    return new Promise((accept, reject) => {
      let timer = setInterval(() => {
        let confirmButton = document.getElementById("confirmButton");
        let cancelButton = document.getElementById("cancelButton");
        if (confirmButton && cancelButton) {
          confirmButton.onclick = () => {
            this.hide();
            accept();
          };
          cancelButton.onclick = () => {
            this.hide();
            reject();
          };
          clearInterval(timer);
        }
      }, 1);
    });
  }

  public hide(): void {
    this.$bvModal.hide(this.id);
  }
}

export default Confirm;
export { Confirm };
</script>

<style>
</style>