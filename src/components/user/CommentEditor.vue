<template>
  <div>
    <editor id="comment-editor" @checked="submit" ref="comment-editor">
      <el-form :rules="rules" :model="commentCopy">
        <el-form-item>
          <el-input
            type="textarea"
            placeholder="说些什么吧"
            maxlength="140"
            show-word-limit
            v-model="commentCopy.content"
            :rows="5"
          ></el-input>
        </el-form-item>
      </el-form>
    </editor>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Editor from "../common/Editor.vue";
import { ElFormRule } from "../../util/element-ui-types";
import { CommentBean } from "../../model/bean/comment-bean";
import { Comment } from "../../model/entity/comment";
import { ChainAction } from "../../util/action";
import { Prop } from "vue-property-decorator";

@Component({
  components: {
    editor: Editor
  }
})
class CommentEditor extends Vue {
  private rules: { [CommentProp in keyof CommentBean]?: ElFormRule[] } = {
    content: [{ required: true, message: "评论不可为空！" }]
  };

  private commentCopy: Comment = Comment._default();
  constructor() {
    super();
  }
  public show(comment: Comment) {
    this.commentCopy = comment.clone();
    const editor = this.$refs["comment-editor"];
    if (editor instanceof Editor) {
      editor.show();
    }
  }

  public submit(action: ChainAction, model: CommentBean) {
    // todo submit comment
    setTimeout(() => {
      action.notify();
      this.$message({
        message: "提交成功！",
        type: "success"
      });
    });
  }
}

export { CommentEditor };
export default CommentEditor;
</script>

<style>
</style>