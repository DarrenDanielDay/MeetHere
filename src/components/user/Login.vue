<template>
  <div>
    <!-- <b-modal id="login-modal" ref="login-modal" title="登录" hide-footer> -->
    <div v-on:keyup.enter="onSubmit">
      <el-tabs v-model="type">
        <el-tab-pane label="普通用户登录" name="user">
          <el-form ref="user-form" :model="loginForm" :rules="loginRules">
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="Username"
                prefix-icon="el-icon-user"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="loginForm.password"
                placeholder="Password"
                type="password"
                prefix-icon="el-icon-lock"
              ></el-input>
            </el-form-item>
            <el-form-item style="display: flex;flex-direction: row-reverse">
              <submit-button
                :action="userLoginAction"
                type="primary"
                icon="el-icon-s-promotion"
                :round="true"
              >登录</submit-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="管理员登录" name="admin">
          <el-form ref="admin-form" :model="loginForm" :rules="loginRules">
            <el-form-item label="管理员名" prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="Administrator"
                prefix-icon="el-icon-user-solid"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="loginForm.password"
                placeholder="Password"
                type="password"
                prefix-icon="el-icon-lock"
              ></el-input>
            </el-form-item>
            <el-form-item style="display: flex;flex-direction: row-reverse">
              <submit-button
                type="warning"
                icon="el-icon-key"
                :round="true"
                :action="adminLoginAction"
              >登录</submit-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { ElFormRule, isElForm } from "../../util/element-ui-types";
import SubmitButton from "../common/SubmitButton.vue";
import router from "../../router";
import store from "../../store";
import {
  ChainAction,
  CallbackAction,
  CheckFormAction
} from "../../util/action";
import { backend } from "../../logic/backend";
import { BModal } from "bootstrap-vue";
import { MeetHereResponse } from "../../util/apis";
import { UserBean } from "../../model/bean/user-bean";
import { userverification } from "../../store/user-verification";

@Component({
  components: {
    SubmitButton
  }
})
class Login extends Vue {
  private type: "user" | "admin" = "user";
  private loginForm: { username: string; password: "" } = {
    username: "",
    password: ""
  };
  private loginRules: { username: ElFormRule[]; password: ElFormRule[] } = {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  };

  private userLoginAction: ChainAction;
  private adminLoginAction: ChainAction;

  constructor() {
    super();
    this.userLoginAction = new ChainAction();
    this.adminLoginAction = new ChainAction();
  }

  public onSubmit() {
    this.userLoginAction
      .perform()
      .then()
      .catch();
  }

  public created() {
    this.userLoginAction
      .next(new CheckFormAction(this, "user-form"))
      .next(() => {
        backend
          .post("/sign-in", {
            id: this.loginForm.username,
            method: "nickname",
            credential: this.loginForm.password
          })
          .then(rs => {
            if (rs.data.code === 200) {
              this.$message({
                message: "登录成功",
                type: "success"
              });
              // todo save user
              //   userverification.setCurrentUser({
              //       nickname: this.loginForm.username,
              //       isAdmin: false,
              //       isLoggedIn: true,
              //       avatar:
              //   })
              this.userLoginAction.notify();
            } else {
              console.error(rs.data.message);
              this.$message({
                message: `登录失败！${rs.data.message}`,
                type: "error"
              });
              this.userLoginAction.abort(rs.data.message);
            }
          })
          .catch(e => {
            this.userLoginAction.abort(e);
          });
      })
      .wait()
      .next(() => {
        this.$emit("login");
      });

    this.adminLoginAction
      .next(
        new CallbackAction(() => {
          const form = this.$refs["admin-form"];
          if (isElForm(form)) {
            return form.validate();
          } else {
            throw new Error("cannot find el-form!");
          }
        })
      )
      .next(() => {
        backend
          // todo admin login 对接
          .post("/sign-in", {
            id: this.loginForm.username,
            method: "nickname",
            credential: this.loginForm.password
          })
          .then(rs => {
            if (rs.data.code === 200) {
              this.$message({
                message: "登录成功",
                type: "success"
              });
              // todo save user
              //   userverification.setCurrentUser({
              //       nickname: this.loginForm.username,
              //       isAdmin: false,
              //       isLoggedIn: true,
              //       avatar:
              //   })
              this.adminLoginAction.notify();
            } else {
              console.error(rs.data.message);
              this.$message({
                message: `登录失败！${rs.data.message}`,
                type: "error"
              });
              this.adminLoginAction.abort(rs.data.message);
            }
          })
          .catch(e => {
            this.adminLoginAction.abort(e);
          });
      })
      .wait()
      .next(() => {
        console.log("emit!");
        this.$emit("login");
      });
  }
}

export default Login;
export { Login };
</script>

<style></style>
