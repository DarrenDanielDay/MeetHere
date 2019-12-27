<template>
  <div class="outside">
    <div class="page">
      <el-row>
        <el-col>
          <h3>重置密码申请一览</h3>
        </el-col>
      </el-row>
      <el-table :data="userList" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="90px"></el-table-column>
        <el-table-column prop="username" label="用户名" width="100px"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200px"></el-table-column>
        <el-table-column prop="mobilephone" label="手机号" width="200px"></el-table-column>
        <el-table-column label="审核">
          <template slot-scope="scope">
            <el-button size="mini" @click="confirmAccept(scope.row)">通过申请</el-button>
            <el-button size="mini" type="danger" @click="confirmReject(scope.row)">拒绝申请</el-button>
          </template>
        </el-table-column>
      </el-table>
      <confirm
        ref="apply-user-confirm"
        id="apply-user-confrim"
        title="确认通过"
        message="确认通过申请么？此操作不可逆"
        confirmStyle="danger"
        cancelStyle="info"
      ></confirm>
      <confirm
        ref="reject-user-confirm"
        id="reject-user-confirm"
        title="确认拒绝"
        message="确认拒绝申请么？此操作不可逆"
        confirmStyle="danger"
        cancelStyle="info"
      ></confirm>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Order } from "../../model/entity/order";
import { Prop, Component } from "vue-property-decorator";
import Confirm from "../../components/common/Confirm.vue";
import { UserBean } from "../../model/bean/user-bean";
import { noop } from "vue-class-component/lib/util";

@Component({
  components: {
    confirm: Confirm
  }
})
class UserRoom extends Vue {
  private userList: UserBean[] = [];
  constructor() {
    super();
  }

  public confirmAccept(user: UserBean) {
    const acConfirm = this.$refs["apply-user-confirm"];
    if (acConfirm instanceof Confirm) {
      acConfirm
        .show()
        .then(() => {
          this.handleAccept(user);
        })
        .catch(noop);
    }
  }

  public confirmReject(user: UserBean) {
    const acConfirm = this.$refs["reject-user-confirm"];
    if (acConfirm instanceof Confirm) {
      acConfirm
        .show()
        .then(() => {
          this.handleReject(user);
        })
        .catch(noop);
    }
  }

  public handleAccept(user: UserBean) {
    // todo accept reset password
    this.$message({
      message: "密码重置成功！",
      type: "success"
    });
  }

  public handleReject(user: UserBean) {
    // todo reject reset password
    this.$message({
      message: "回绝请求成功！",
      type: "success"
    });
  }
}

export { UserRoom };
export default UserRoom;
</script>

<style>
</style>