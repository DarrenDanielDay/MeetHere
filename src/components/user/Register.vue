<template>
  <div v-on:keyup.enter="onSubmit">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerForm.email" placeholder="E-mail" prefix-icon="el-icon-paperclip"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobilephone">
        <el-input
          v-model="registerForm.mobilephone"
          placeholder="Mobile Phone"
          prefix-icon="el-icon-mobile-phone"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username" placeholder="Username" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="registerForm.password"
          placeholder="Password"
          type="password"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <submit-button type="primary" :action="registerAction" icon="el-icon-check" round>注册</submit-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import SubmitButton from "../common/SubmitButton.vue";
import { ElFormRule } from "../../util/element-ui-types";
import { validators } from "../../logic/input-validators";
import {
  ChainAction,
  CallbackAction,
  CheckFormAction
} from "../../util/action";

@Component({
  components: {
    SubmitButton
  }
})
class Register extends Vue {
  private registerForm = {
    username: "",
    password: "",
    email: "",
    mobilephone: ""
  };

  private registerRules: {
    username: ElFormRule[];
    password: ElFormRule[];
    email: ElFormRule[];
    mobilephone: ElFormRule[];
  } = {
    username: [
      {
        required: true,
        validator: (r, v, cb) => {
          cb(validators.usernameValidator(v) || undefined);
        }
      }
    ],
    password: [
      {
        required: true,
        validator: (r, v, cb) => {
          cb(validators.passwordValidator(v) || undefined);
        }
      }
    ],
    email: [
      {
        required: true,
        validator: (r, v, cb) => {
          cb(validators.emailValidator(v) || undefined);
        }
      }
    ],
    mobilephone: [
      {
        required: true,
        validator: (r, v, cb) => {
          cb(validators.telephoneValidator(v) || undefined);
        }
      }
    ]
  };

  private registerAction: ChainAction = new ChainAction();

  constructor() {
    super();
  }

  public created() {
    this.registerAction
      .next(new CheckFormAction(this, "registerForm"))
      .next(() => {
        // todo submit
        this.$message({
          message: "注册成功！",
          type: "success"
        });
        this.registerAction.notify();
      })
      .wait()
      .next(() => {
        this.$emit("register");
      });
  }
}

export { Register };
export default Register;
</script>

<style></style>
