<template>
  <div>
    <paged-comments :target="undefined"></paged-comments>
    <div style="position: fixed;right: 40px;bottom: 40px;">
      <el-popover placement="left" trigger="hover" content="评论场馆">
        <el-button
          slot="reference"
          size="large"
          icon="el-icon-chat-dot-round"
          circle
          type="info"
          @click="showWriter"
        ></el-button>
      </el-popover>
      <comment-editor ref="comment-editor" commentType="对MeetHere说些什么吧"></comment-editor>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import PagedComments from "../../components/comment/PagedComments.vue";
import CommentEditor from "../../components/user/CommentEditor.vue";
import { userverification } from "@/store/user-verification";
import router from "@/router";
import { Comment } from "../../model/entity/comment";

@Component({
  components: {
    PagedComments,
    CommentEditor
  }
})
class WebSiteComments extends Vue {
  constructor() {
    super();
  }
  public showWriter() {
    let user = userverification.getCurrentUser();
    if (!user.isLoggedIn) {
      this.$message({
        message: "请先登录！",
        type: "error"
      });
      router.push("/");
    } else if (user.isAdmin) {
      this.$message({
        message: "管理员暂不支持评论！",
        type: "warning"
      });
    } else {
      const editor = this.$refs["comment-editor"];
      if (editor instanceof CommentEditor) {
        const comment = Comment._empty();
        comment.target = undefined
        editor.show(comment);
      }
    }
  }
}

export { WebSiteComments };
export default WebSiteComments;
</script>

<style>
</style>