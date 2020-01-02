<template>
  <div class="header">
    <el-menu
      mode="horizontal"
      background-color="#24292e"
      text-color="#ffffff"
      active-text-color="#ffffff"
      :router="true"
      style="display:flex;"
    >
      <el-menu-item index="/">
        <meet-here-logo></meet-here-logo>
      </el-menu-item>
      <el-menu-item index="/">
        <span style="font-size:25px">MeetHere</span>
      </el-menu-item>
      <el-menu-item index="/">主页</el-menu-item>
      <el-menu-item index="/venues">场馆</el-menu-item>
      <el-menu-item index="/news">新闻</el-menu-item>
      <el-menu-item index="/comments">评论</el-menu-item>
      <el-menu-item>
        <search></search>
      </el-menu-item>
      <el-menu-item
        style="display:flex; justify-content:flex-end; flex-grow: 1;"
        v-if="!user.isLoggedIn"
        class="login-register"
      >
        <span class="login-button">
          <b-button v-b-modal.login-modal  variant="outline-light">登录</b-button>
          <b-modal id="login-modal" hide-footer title="登录">
            <login @login="handleLoginSuccess"></login>
          </b-modal>
        </span>
        <span class="register-button">
          <b-button v-b-modal.register-modal variant="outline-light">注册</b-button>
          <b-modal id="register-modal" hide-footer title="注册">
            <register @register="handleRegisterSuccess"></register>
          </b-modal>
        </span>
      </el-menu-item>
      <el-menu-item v-else style="display:flex; justify-content:flex-end; flex-grow: 1;">
        <el-submenu v-if="!(user.isAdmin)" index="/user">
          <template slot="title">
            <small-avatar :user="user" style="margin: 10px"></small-avatar>
            <span>{{greet}}</span>
          </template>
          <el-menu-item-group>
            <template slot="title">场馆预约</template>
            <el-menu-item index="/user/order-room">
              <i class="el-icon-document-copy"></i>
              <span>订单一览</span>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">个人中心</template>
            <el-menu-item index="/user/info-room">
              <i class="el-icon-edit-outline"></i>
              <span>个人信息维护</span>
            </el-menu-item>
            <el-menu-item @click="onLogout">
              <i class="el-icon-switch-button"></i>
              <span style="color: #ff2200">退出登录</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu v-else index="/admin">
          <template slot="title">
            <small-avatar :user="user" style="margin: 10px"></small-avatar>
            <span>{{"管理员 "+greet}}</span>
          </template>
          <el-menu-item-group>
            <template slot="title">用户</template>
            <el-menu-item index="/admin/user-room">
              <i class="el-icon-user"></i>
              <span style>用户管理</span>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">新闻</template>
            <el-menu-item index="/admin/news-room">
              <i class="el-icon-news"></i>
              <span style>新闻管理</span>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">场馆</template>
            <el-menu-item index="/admin/venue-room">
              <i class="el-icon-office-building"></i>
              <span style>场馆管理</span>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">订单</template>
            <el-menu-item index="/admin/order-room">
              <i class="el-icon-s-order"></i>
              <span style>订单管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/order-statistics">
              <i class="el-icon-s-data"></i>
              <span style>订单统计</span>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">评论</template>
            <el-menu-item index="/admin/delete-comment">
              <i class="el-icon-s-comment"></i>
              <span style>评论管理</span>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">个人中心</template>
            <el-menu-item index="/user/info-room">
              <i class="el-icon-edit-outline"></i>
              <span>个人信息维护</span>
            </el-menu-item>
            <el-menu-item index="/testpage">
              <i class="el-icon-info"></i>
              <span style="color: #ffff00">开发中...</span>
            </el-menu-item>
            <el-menu-item @click="onLogout">
              <i class="el-icon-switch-button"></i>
              <span style="color: #ff2200">退出登录</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import SmallAvatar from "../user/SmallAvatar.vue";
import Search from "./Search.vue";
import Login from "../user/Login.vue";
import Register from "../user/Register.vue";
import { User } from "../../model/entity/user";
import { userverification } from "../../store/user-verification";
import router from '../../router';
import Logo from './Logo.vue';

@Component({
  components: {
    SmallAvatar,
    Search: Search,
    Login: Login,
    Register: Register,
    MeetHereLogo: Logo
  }
})
class Navigator extends Vue {
  public user: User;

  get greet(): string {
    if (this.user.isLoggedIn) {
      return `${this.user.nickname}，您好`;
    } else {
      return "未登录";
    }
  }

  constructor() {
    super();
    this.user = userverification.getCurrentUser();
  }

  public handleLoginSuccess() {
      this.$bvModal.hide("login-modal");
  }

  public handleRegisterSuccess() {
      this.$bvModal.hide("register-modal");
  }

  public onLogout() {
      // todo logout
      userverification.getCurrentUser().isLoggedIn = false;
      userverification.saveCurrentUser()
      this.$message({
          message: '退出登录成功！',
          type: "success"
      })
      router.push('/');
  }
}

export { Navigator };
export default Navigator;
</script>

<style scped>
.el-menu-item {
  padding: 0;
  /* width: 1000px; */
}
/* .header {
  position: absolute;
  top: 0%;
  width: 100%;
  z-index: 100;
} */

.login-register {
  display: flexbox;
}

.login-button {
  /* margin-left: 10px; */
  /* margin-right: 10px; */
  margin: 10px 5px;
  display: flex;
}

.register-button {
  /* margin-left: 10px; */
  /* margin-right: 10px; */
  margin: 10px 5px;
  display: flex;
}
</style>