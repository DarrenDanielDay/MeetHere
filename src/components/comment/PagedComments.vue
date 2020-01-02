<template>
  <div>
    <el-row v-for="(comment, index) in pager.currentPageElements" :key="index">
      <el-col>
        <comment-card :comment="comment">
          <el-button
            v-if="editable(comment)"
            @click="showEditor(comment)"
            type="info"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            v-if="reportable(comment)"
            @click="showReport(comment)"
            icon="el-icon-warning-outline"
            circle
            type="warning"
          ></el-button>
          <el-button
            v-if="deletable(comment)"
            @click="confirmDelete(comment)"
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
        </comment-card>
      </el-col>
    </el-row>
    <el-pagination
      layout="prev, pager, next, jumper"
      :current-page.sync="pager.currentPage"
      :page-size="pager.pageSize"
      :total="pager.totalCount"
      @current-change="onPageChange"
    ></el-pagination>
    <confirm
      ref="delete-comment-confirm"
      id="delete-comment-confirm"
      title="确认删除"
      message="确认删除吗？此操作不可逆！"
      confirmText="删除"
      cancelText="取消"
      confirmStyle="danger"
      cancelStyle="info"
    ></confirm>
    <comment-editor ref="comment-editor"></comment-editor>
    <report ref="report"></report>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import { userverification } from "@/store/user-verification";
import { Comment } from "../../model/entity/comment";
import Report from "../common/Report.vue";
import CommentEditor from "../user/CommentEditor.vue";
import Confirm from "../common/Confirm.vue";
import { noop } from "vue-class-component/lib/util";
import Component from "vue-class-component";
import CommentCard from "./CommentCard.vue";
import { CommentPager } from "../../util/pager";
import { CommentTarget } from "../../model/bean/comment-bean";
import { Prop } from "vue-property-decorator";
import backend from '../../logic/backend';

@Component({
  components: {
    CommentCard: CommentCard,
    CommentEditor: CommentEditor,
    Report: Report,
    Confirm: Confirm
  }
})
class PagedComments extends Vue {
  @Prop({
    required: true
  })
  public readonly target!: CommentTarget;

  public pager: CommentPager;

  constructor() {
    super();
    this.pager = new CommentPager(10, this.target);
    this.pager.onPageChange()
  }
  public deletable(comment: Comment): boolean {
    const user = userverification.getCurrentUser();
    return user.isAdmin || user.id === comment.user.id;
  }
  public editable(comment: Comment): boolean {
    const user = userverification.getCurrentUser();
    return user.id === comment.user.id;
  }
  public reportable(comment: Comment): boolean {
    const user = userverification.getCurrentUser();
    return !user.isAdmin && user.id !== comment.user.id;
  }
  public showReport(comment: Comment) {
    const report = this.$refs["report"];
    if (report instanceof Report) {
      report.show(comment.id);
    }
  }

  public showEditor(comment: Comment) {
    const editor = this.$refs["comment-editor"];
    if (editor instanceof CommentEditor) {
      editor.show(comment);
    }
  }

  public confirmDelete(comment: Comment) {
    const confirm = this.$refs["delete-comment-confirm"];
    if (confirm instanceof Confirm) {
      confirm
        .show()
        .then(() => {
          backend.get("/delete-comment",{
            id: comment.id
          }).then((rs) => {
            if (rs.data.code === 200) {
              this.$message({
                type: "success",
                message: "删除成功！"
              })
            } else {
              this.$message({
                type: "error",
                message: `删除失败！${rs.data.message}`
              })
            }
          })
        })
        .catch(noop);
    }
  }

  public onPageChange() {
    this.pager
      .onPageChange()
      .then(() => {})
      .catch(() => {
        this.$message({
          message: "翻页失败",
          type: "error"
        });
      });
  }
  public created() {
    this.onPageChange();
  }
}

export { PagedComments };
export default PagedComments;
</script>

<style>
</style>