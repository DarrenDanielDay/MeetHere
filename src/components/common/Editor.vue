<template>
  <b-modal :title="title" :id="this.id" :ref="this.id" :hide-footer="true" @hide="confirmLeave">
    <confirm
      confirmStyle="danger"
      :ref="confirm"
      :id="confirm"
      title="退出编辑"
      message="确认离开吗？我们不会保留任何更改！"
    ></confirm>
    <slot></slot>
    <div style="display: flex;flex-direction: row-reverse;">
      <!-- <el-button @click="handleClickSubmit" icon="el-icon-s-promotion" type="primary"></el-button> -->
      <submit-button :action="editorAction"></submit-button>
    </div>
  </b-modal>
</template>

<script lang="ts">
import Vue, { VNode } from "vue";
import Component from "vue-class-component";
import Confirm from "./Confirm.vue";
import { Prop } from "vue-property-decorator";
import { BModal } from "bootstrap-vue";
import ElementUI from "element-ui";
import {
  CallbackAction,
  Action,
  SimpleAction,
  ChainAction,
  PromiseAction,
  AlwaysAction,
  AlwaysPromise,
  actionTypes,
  DelayAction
} from "../../util/action";

import { isElForm } from "../../util/element-ui-types";
import SubmitButton from "./SubmitButton.vue";

@Component({
  components: {
    Confirm,
    SubmitButton
  }
})
class Editor extends Vue {
  @Prop({
    required: true
  })
  public id!: string;

  @Prop({
    default: "编辑器",
    type: String
  })
  public title!: string;

  public editorAction: ChainAction;
  private get confirm(): string {
    return `leave-${this.id}-confirm`;
  }

  private modal!: object;

  constructor() {
    super();
    this.editorAction = new ChainAction();
  }

  public confirmLeave(event: Event): void {
    if (!event.cancelable) {
      return;
    }
    event.preventDefault();
    const confirm = this.$refs[this.confirm];
    if (confirm instanceof Confirm) {
      confirm
        .show()
        .then(() => {
          this.forceHide();
        })
        .catch(() => {});
    }
  }

  public show(): void {
    this.$bvModal.show(this.id);
    this.editorAction
      .clear()
      .next(new CallbackAction (() => {
        const component = this.$slots["default"]![0].componentInstance;
        if (component && isElForm(component)) {
          this.modal = component.model;
          return component.validate()
        } else {
          console.warn("cannot find el-form, which is expected");
          return AlwaysPromise();
        }
      }))
      .next(() => {
        this.$emit("checked", this.editorAction, this.modal)
      })
      .wait()
      .next(() => {
        console.log("hiding...");
        this.forceHide();
      });
  }

  public forceHide(): void {
    const modal = this.$refs[this.id];
    if (modal instanceof BModal) {
      modal.hide("FORCE");
    }
  }

  private findForm() {}

  // public handleClickSubmit() {
  //   const slots = this.$slots["default"];
  //   if (slots) {
  //     const slot = slots[0];
  //     if (slot) {
  //       const component = slot.componentInstance;
  //       if (component && isElForm(component)) {
  //         let chain = new ChainAction()
  //           .next(component.validate())
  //           .next(() => {
  //             console.log("emit!");
  //             this.$emit("submit", chain, component.model);
  //           })
  //           .wait()
  //           .next(this.submitAction)
  //           .next(() => {
  //             console.log("submited!");
  //           });
  //         chain
  //           .perform()
  //           .then(() => {
  //             this.$emit("submit-success");
  //             this.forceHide();
  //             console.log("submit success!");
  //           })
  //           .catch(e => {
  //             this.$emit("submit-failed", e);
  //             console.log("submit failed!");
  //             console.warn(e);
  //           });
  //       }
  //     }
  //   }
  // }
}

export default Editor;
export { Editor };
</script>

<style>
</style>
