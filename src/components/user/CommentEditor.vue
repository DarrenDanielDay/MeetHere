<template>
  <div>
    <editor id="comment-editor" @checked="submit" ref="comment-editor">
      <el-form :rules="rules" :model="commentCopy">
        <el-form-item>
          <el-input
            type="textarea"
            :placeholder="commentType"
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
import {
  CommentBean,
  CommentTarget,
  emptyCommentBean
} from "../../model/bean/comment-bean";
import { Comment } from "../../model/entity/comment";
import { ChainAction } from "../../util/action";
import { Prop } from "vue-property-decorator";
import backend from "../../logic/backend";
import { userverification } from "../../store/user-verification";
import { isNewsBean } from "../../model/bean/news-bean";
import noop from "../../util/no-operation";

@Component({
  components: {
    editor: Editor
  }
})
class CommentEditor extends Vue {
  @Prop({
    default: "说些什么吧",
    type: String
  })
  public commentType!: string;

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
    if (model.id === emptyCommentBean.id) {
      // new
      if (!model.target) {
        backend
          .get("/add-global-comment", {
            userId: userverification.getCurrentUser().id,
            content: model.content
          })
          .then(rs => {
            console.log(rs);
            if (rs.data.code === 200) {
              this.$message({
                message: "发表评论成功！",
                type: "success"
              });
              action.notify();
            } else {
              throw new Error(rs.data.message);
            }
          })
          .catch(e => {
            this.$message({
              message: `发表失败！${e}`
            });
            action.abort(e);
          });
      } else if (isNewsBean(model.target)) {
        backend
          .get("/add-news-comment", {
            userId: userverification.getCurrentUser().id,
            content: model.content,
            newsId: model.target.id
          })
          .then(rs => {
            console.log(rs);
            if (rs.data.code === 200) {
              this.$message({
                message: "发表评论成功！",
                type: "success"
              });
              action.notify();
            } else {
              throw new Error(rs.data.message);
            }
          })
          .catch(e => {
            this.$message({
              message: `发表失败！${e}`
            });
            action.abort(e);
          });
      } else {
        backend
          .get("/add-venue-comment", {
            userId: userverification.getCurrentUser().id,
            content: model.content,
            venueId: model.target.id
          })
          .then(rs => {
            if (rs.data.code === 200) {
              this.$message({
                message: "发表评论成功！",
                type: "success"
              });
              action.notify();
            } else {
              throw new Error(rs.data.message);
            }
          })
          .catch(e => {
            this.$message({
              message: `发表失败！${e}`
            });
            action.abort(e);
          });
      }
    } else {
      // modify
      backend
        .get("/modify-comment", {
          userId: userverification.getCurrentUser().id,
          content: model.content,
          commentId: model.id
        })
        .then(rs => {
          if (rs.data.code === 200) {
            this.$message({
              message: "修改成功！",
              type: "success"
            });
            action.notify();
          } else {
            this.$message({
              message: rs.data.message,
              type: "error"
            });
            action.abort(rs.data.message);
          }
        })
        .catch(noop);
    }
    // setTimeout(() => {
    //   action.notify();
    //   this.$message({
    //     message: "提交成功！",
    //     type: "success"
    //   });
    // });
  }
}

export { CommentEditor };
export default CommentEditor;
</script>

<style>
</style>