<template>
  <div style="min-width:320px; max-width: 800px;">
    <el-card v-if="detailed">
      <div slot="header">
        <h2>{{news.title}}</h2>
        <span>{{news.publisher.nickname}}</span>
        发布于
        <span>{{news.time}}</span>
      </div>
      <div>
        <!-- content -->
        <el-row>
          <el-col>
            <el-carousel :interval="4000">
              <el-carousel-item v-for="(img, index) in news.imgs" :key="index">
                <el-image :src="img"></el-image>
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="padding: 10px 0;">
            <!-- <div v-for="(line, index) in pageLines" :key="index" style="text-align: left;">
              {{line}}
              <br />
            </div>-->
            <!-- <pre style="text-align: left;" v-for="(line, index) in pageLines" :key="index">
              {{line}}
            </pre>-->
            <!-- <pre style="text-align: left;" width="40">
              {{pageContent}}
            </pre>-->
            <pre style="white-space: pre-wrap;text-align: left;">{{news.content}}</pre>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card v-else shadow="hover">
      <div>
        <!-- content -->
        <el-row>
          <el-col>
            <el-carousel :interval="4000" height="180px" indicator-position="none" arrow="hover">
              <el-carousel-item v-for="(img, index) in news.imgs" :key="index">
                <el-image :src="img"></el-image>
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <a style="font-size:10px" :href="`/news-detail/${news.id}`">{{news.title}}</a>
          </el-col>
        </el-row>
        <div style="display: flex; flex-direction:row-reverse;justify-content:space-between;">
          <slot></slot>
          <!-- <el-button @click.stop="toDetail">详情</el-button> -->
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { News } from "../../model/entity/news";
import router from "../../router";

@Component({})
class NewsCard extends Vue {
  @Prop({
    default() {
      return News._default();
    }
  })
  private news!: News;

  @Prop({
    default: false
  })
  private detailed!: boolean;

  constructor() {
    super();
  }

  private toDetail() {
    router.push({
      name: "news-detail",
      params: {
        newsID: this.news.id.toString()
      }
    });
  }
}
export { NewsCard }
export default NewsCard;
</script>

<style>
pre {
  text-overflow: pre-wrap;
}
textarea {
  overflow: hidden;
}
</style>