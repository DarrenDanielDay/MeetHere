<template>
  <div>
    <el-row>
      <el-col>
        <news-card :news="news" :detailed="true"></news-card>
      </el-col>
    </el-row>
    <el-divider>用户评论</el-divider>
    <paged-comments :target="news"></paged-comments>
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
      <comment-editor ref="comment-editor" commentType="对新闻说些什么吧"></comment-editor>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CommentCard from "../../components/comment/CommentCard.vue";
import { userverification } from "../../store/user-verification";
import Report from "../../components/common/Report.vue";
import CommentEditor from "../../components/user/CommentEditor.vue";
import { Comment } from "../../model/entity/comment";
import Confirm from "../../components/common/Confirm.vue";
import noop from "../../util/no-operation";
import { News } from "../../model/entity/news";
import { Prop } from "vue-property-decorator";
import PagedComments from "../../components/comment/PagedComments.vue";
import NewsCard from "../../components/news/NewsCard.vue";
import backend from "../../logic/backend";
import moment from "moment";
import { User } from "../../model/entity/user";
import router from '@/router';

@Component({
  components: {
    CommentCard: CommentCard,
    report: Report,
    CommentEditor: CommentEditor,
    confirm: Confirm,
    PagedComments: PagedComments,
    NewsCard: NewsCard
  }
})
class NewsDetail extends Vue {
  @Prop({
    default: -1
  })
  public newsID!: number;

  @Prop({
    default() {
      return News._default();
    }
  })
  public news!: News;

  constructor() {
    super();
    this.getNewsInfo();
  }

  public getNewsInfo() {
    // todo get news detail
    this.news = News._empty();
    this.news.id = this.newsID;
    backend
      .get("/news", {
        newsId: this.newsID
      })
      .then(rs => {
        if (rs.data.code === 200) {
          const bean = rs.data.result.news;
          this.news.content = bean.content;
          this.news.title = bean.title;
          this.news.time = moment(bean.time);
          this.news.publisher = User.fromID(bean.managerId);
          backend
            .get("/news-images", {
              newsId: this.newsID
            })
            .then(rr => {
              this.news.imgs = rr.data.result.images;
            })
            .catch(noop);
        } else {
          throw new Error(rs.data.message);
        }
      });
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
        comment.target = this.news
        editor.show(comment);
      }
    }
  }
}

export { NewsDetail };
export default NewsDetail;
</script>

<style>
</style>