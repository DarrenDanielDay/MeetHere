<template>
  <div class="outside">
    <div class="page">
      <div>
        <el-row>
          <el-col>
            <news-card :news="news" :detailed="true"></news-card>
          </el-col>
        </el-row>
        <el-row v-for="(comment, index) in pageComments" :key="index">
          <el-col>
            <comment-card :comment="comment">
              <el-button 
                v-if="editable"
                @click="showEditor(comment)"
                type="info"
                icon="el-icon-edit"
                circle></el-button>
              <el-button
              v-if="reportable"
               @click="showReport(index)" 
               icon="el-icon-warning-outline"
                circle 
                type="warning"
            ></el-button>
            </comment-card>
          </el-col>
        </el-row>
        <el-pagination
          :current-page.sync="commentIndex"
          :page-size="commentPageSize"
          :total="comments.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CommentCard from "../../components/comment/CommentCard.vue";
import { userverification } from "../../store/user-verification";
import Report from '../../components/common/Report.vue';
import CommentEditor from '../../components/user/CommentEditor.vue';

@Component({
  components: {
    CommentCard: CommentCard
  }
})
class NewsDetail extends Vue {
  public deletable: boolean = false;
  public editable: boolean = false;
  public reportable: boolean = false;

  constructor() {
    super();
  }
  public showReport(id: number) {
      const report = this.$refs["report"];
      if (report instanceof Report) {
          report.show(id);
      }
  }

  public showEditor(comment: Comment) {
      const editor = this.$refs["comment-editor"];
      if (editor instanceof CommentEditor) {
          
      }
  }
}
</script>

<style>
</style>