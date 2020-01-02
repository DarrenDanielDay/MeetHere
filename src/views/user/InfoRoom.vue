<template>
  <div class="inforoom">
    <el-row type="flex">
      <el-col :span="11">
        <div v-on:keyup.enter="onSubmit">
          <el-form ref="infoForm" :model="infoForm" :rules="rules">
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="infoForm.email"
                placeholder="E-mail"
                prefix-icon="el-icon-paperclip"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobilephone">
              <el-input
                v-model="infoForm.mobilephone"
                placeholder="Mobile Phone"
                prefix-icon="el-icon-mobile-phone"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="nickname">
              <el-input
                v-model="infoForm.nickname"
                placeholder="Username"
                prefix-icon="el-icon-user"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" icon="el-icon-check" round>修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="11">
        <el-avatar :size="200" fit="scale-down" shape="square">
          <el-image v-if="user.avatar" :src="user.avatar"></el-image>
          <i class="el-icon-plus" v-else></i>
        </el-avatar>
        <el-upload
          :auto-upload="false"
          :limit="1"
          action
          list-type="picture-card"
          :file-list="fileList"
          :on-change="onSelectAvatar"
          :on-remove="onRemoveAvatar"
        >
          <i v-if="!avatarSelected" class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button round @click="onChangeAvatar">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { UserBean } from "../../model/bean/user-bean";
import { userverification } from "../../store/user-verification";
import { User } from "@/model/entity/user";
import { isElForm, ElFormRule } from "../../util/element-ui-types";
import noop from "../../util/no-operation";
import Component from "vue-class-component";
import { validators } from "../../logic/input-validators";
import backend from "../../logic/backend";
import {
  FileListItem,
  ElUploadInternalFileDetail
} from "element-ui/types/upload";
import Axios from "axios";

@Component({})
class InfoRoom extends Vue {
  private avatarSelected: boolean = false;
  private avatarFile?: File;
  private fileList: FileListItem[] = [];
  private selectedAvatarUrl: string = "";
  private user: User;
  private infoForm: User;
  private rules: { [k in keyof User]?: ElFormRule[] } = {
    email: [
      {
        validator: (r, v, cb) => {
          cb(validators.emailValidator(v) || undefined);
        }
      }
    ],
    mobilephone: [
      {
        validator: (r, v, cb) => {
          cb(validators.mobilephoneValidator(v) || undefined);
        }
      }
    ]
  };
  constructor() {
    super();
    this.user = userverification.getCurrentUser();
    this.infoForm = this.user.clone();
  }

  public onRemoveAvatar() {
    this.avatarSelected = false;
    this.avatarFile = undefined;
  }

  public onChangeAvatar() {
    if (!this.avatarFile) {
      this.$message({
        message: "请先选择图片！",
        type: "error"
      });
      return;
    }
    const user = userverification.getCurrentUser();
    if (!user.isLoggedIn) {
      console.error("error detected in inforoom");
      return;
    }
    const id = user.id;
    const formData = new FormData();
    formData.append("avatar", this.avatarFile);
    // backend.post("/update-avatar", {
    //   file: formData,
    //   userId: userverification.getCurrentUser().id
    // }).then((rs) => {
    //   this.$message({
    //     message: rs.data.message,
    //     type: "success"
    //   })
    // }).catch(noop)
    Axios.post(
      `http://ecnuer996.cn/MeetHere/api/update-avatar`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        params: {
          userId: id
        }
      }
    )
      .then(() => {
        this.$message({ message: "修改成功", type: "success" });
        user.selfUpdate();
      })
      .catch(e => {
        this.$message({ message: e, type: "error" });
      });
  }

  public onSelectAvatar(
    a: ElUploadInternalFileDetail,
    b: ElUploadInternalFileDetail[]
  ) {
    this.avatarSelected = true;
    this.selectedAvatarUrl = URL.createObjectURL(a.raw);
    this.avatarFile = a.raw;
  }

  public onSubmit() {
    const form = this.$refs["infoForm"];
    if (isElForm(form)) {
      form
        .validate()
        .then(() => {
          this.updateInfo();
        })
        .catch(noop);
    }
  }

  public updateInfo() {
    // todo
    const form = this.infoForm;
    backend
      .post("/update-user-info", {
        avatar: form.avatar,
        email: form.email,
        id: userverification.getCurrentUser().id,
        phone: form.mobilephone,
        nickname: form.nickname
      })
      .then(rs => {
        const dt = rs.data;
        if (dt.code === 200) {
          this.user.selfUpdate();
          this.$message({
            message: "修改个人信息成功",
            type: "success"
          });
          userverification.updateCurrentUser(form);
          userverification.saveCurrentUser();
        } else {
          this.$message({
            message: dt.message,
            type: "error"
          });
        }
      })
      .catch(noop);
  }
}

export { InfoRoom };
export default InfoRoom;
</script>

<style scoped>
.inforoom {
  padding: 70px;
  min-width: 806px;
}
</style>
