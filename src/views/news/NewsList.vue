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
        ></news-card>
        <!-- </div> -->
      </el-col>
    </el-row>
    <el-pagination
      layout="prev, pager, next"
      :total.sync="pager.totalCount"
      :current-page.sync="pager.currentPage"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import NewsCard from "../../components/news/NewsCard.vue";
import { NewsPager } from "../../util/pager";

@Component({
  components: {
    NewsCard
  }
})
class NewsList extends Vue {
  public pager: NewsPager;

  constructor() {
    super();
    this.pager = new NewsPager(8);
    this.pager.onPageChange()
  }

  public changePage() {
    this.pager
      .onPageChange()
      .then()
      .catch(() => {
        this.$message({
          message: "请求失败！",
          type: "error"
        });
      });
  }
}

export { NewsList };
export default NewsList;
</script>