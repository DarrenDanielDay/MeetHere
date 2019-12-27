<template>
  <div>
    <el-row>
      <el-col style="display:flex; flex-wrap: wrap;justify-content: space-around; width:1440px">
        <!-- <div style="display: flex; flex-wrap: wrap"> -->

        <news-card
          v-for="(news, index) in pager.currentPageElements"
          :key="index"
          :news="news"
          :detailed="false"
          style="margin: 10px 0"
        >
          <el-button @click="confirmDelete(news)" icon="el-icon-delete" circle type="danger"></el-button>
          <el-button circle icon="el-icon-edit" type="info" @click="showEditor(news)"></el-button>
        </news-card>
        <!-- </div> -->
      </el-col>
    </el-row>
    <el-pagination
      layout="prev, pager, next"
      :page-size="pager.pageSize"
      :total="pager.totalCount"
      :current-page.sync="pager.currentPage"
      @currentChange="onChange"
    ></el-pagination>
    <confirm
      ref="delete-news-confirm"
      id="delete-news-confirm"
      title="确认删除"
      message="确认删除吗？此操作不可逆！"
      confirmStyle="danger"
      cancelStyle="info"
    ></confirm>
    <div style="position: fixed;right: 40px;bottom: 40px;">
      <el-popover placement="left" trigger="hover" content="添加新闻">
        <el-button
          slot="reference"
          icon="el-icon-plus"
          circle
          type="info"
          @click="showEditor(emptyNews)"
        ></el-button>
      </el-popover>
    </div>
    <news-editor ref="news-editor"></news-editor>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import NewsEditor from "../../components/admin/NewsEditor.vue";
import Confirm from "../../components/common/Confirm.vue";
import { News } from "../../model/entity/news";
import { NewsPager } from "../../util/pager";
import NewsCard from "../../components/news/NewsCard.vue";

@Component({
  components: {
    NewsEditor,
    Confirm,
    NewsCard
  }
})
class NewsRoom extends Vue {
  public pager: NewsPager = new NewsPager(9);
  public emptyNews: News = News._empty();
  constructor() {
    super();
  }
  public showEditor(news: News) {
    const editor = this.$refs["news-editor"];
    if (editor instanceof NewsEditor) {
      editor.show(news);
    }
  }
  public confirmDelete(news: News) {
    const confirm = this.$refs["delete-news-confirm"];
    if (confirm instanceof Confirm) {
      confirm
        .show()
        .then(() => {
          this.handleDelete(news);
        })
        .catch(() => {});
    }
  }

  public handleDelete(news: News) {
    // todo handle delete news
  }
  public onChange() {
    this.pager
      .onPageChange()
      .then(() => {})
      .catch(e => {
        console.error(e);
        this.$message({
          message: `更新失败:${e}`
        });
      });
  }
  public mounted() {
    this.onChange();
  }
}

export { NewsRoom };
export default NewsRoom;
</script>

<style>
</style>