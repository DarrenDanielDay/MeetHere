<template>
  <div class="outside">
    <div class="page">
    <div style="padding: 5% 5% 5% 5%;margin: 0 5% 0 5%;">
      <el-row>
        <el-col :span="24">
          <el-row>
            <el-col :span="24">
              <b-carousel
                :interval="5000"
                :controls="true"
                fade
                :indicators="true"
                img-height="480"
                img-width="600"
              >
                <b-carousel-slide
                  v-for="(item, index) in venue.images"
                  :key="index"
                  style="width: 100%;height: 600px;"
                >
                  <h3 style>{{venue.name}}</h3>
                  <h3>实景图</h3>
                  <el-image slot="img" :src="item" fit="scale-down"></el-image>
                </b-carousel-slide>
              </b-carousel>
            </el-col>
          </el-row>
          <el-row>
            <table>
              <tr v-for="(item, index) in venueInfo" :key="index">
                <th>{{index}}</th>
                <td>{{item}}</td>
                <!-- <el-divider></el-divider> -->
              </tr>
            </table>
          </el-row>
          <el-divider>可预约场地</el-divider>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div style="display:flex; flex-wrap: wrap;justify-content: space-around;">
            <div v-for="(site, index) in venue.sites" :key="index">
              <SiteCard :site="site" :detailed="false"></SiteCard>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-divider>用户评论</el-divider>
    <paged-comments :target="venue"></paged-comments>
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
      <comment-editor :target="venue" ref="comment-editor" commentType="对场馆说些什么吧"></comment-editor>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import PagedComments from "../../components/comment/PagedComments.vue";
import { Prop } from "vue-property-decorator";
import { Venue } from "../../model/entity/venue";
import { userverification } from "../../store/user-verification";
import router from "@/router";
import CommentEditor from "../../components/user/CommentEditor.vue";
import { Comment } from "../../model/entity/comment";
import backend from '../../logic/backend';
import noop from '../../util/no-operation';
import { SiteBean } from '../../model/bean/site-bean';
import moment from 'moment';
import SiteCard from '../../components/venue/SiteCard.vue';

@Component({
  components: {
    PagedComments,
    CommentEditor,
    SiteCard: SiteCard
  }
})
class VenueDetail extends Vue {
  @Prop({
    default: -1,
  })
  public venueID!: number;

  public venue: Venue;

  public venueInfo = {
    场馆名称: "",
    场馆地址: "",
    场馆简介: "",
    开放时间: ""
  };

  constructor() {
    super();
    this.venue = Venue._empty();
    this.venue.id = this.venueID
    this.getVenueDetail()
  }

  public getVenueDetail() {
    backend.get("/venue-detail", {
      id: this.venueID
    }).then((rs) => {
      const bean = rs.data.result
      const sites: SiteBean[] = []
      bean.sites.forEach(v => {
        sites.push({
          id: v.id,
          introduction: v.intruction,
          image: v.image,
          price: v.price,
          name: v.name,
          venueID: v.venueId
        })
      })
      this.venue.update({
        id: bean.id,
        name: bean.name,
        address: bean.address,
        introduction: bean.introduction,
        images: bean.images,
        sites: sites,
        phone: bean.phone,
        price: 100,
        beginTime: moment.utc(bean.beginTime),
        endTime: moment.utc(bean.endTime),
        cover: ""
      })
      this.venueInfo.场馆名称 = bean.name
      this.venueInfo.场馆地址 = bean.address
      this.venueInfo.场馆简介 = bean.introduction
      this.venueInfo.开放时间 = `${bean.beginTime} ~ ${bean.endTime}`
    }).catch(() => {
      this.$message({
        message: "请尝试刷新页面！",
        type: "warning"
      })
    })
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
        const comment = Comment._empty()
        comment.target = this.venue
        editor.show(comment);
      }
    }
  }
}

export { VenueDetail };
export default VenueDetail;
</script>

<style scoped>
#page {
  padding: 5% 5% 5% 5%;
  margin: 5% 5% 5% 5%;
}
table {
  padding: 0% 5% 0% 5%;
}
th {
  width: 100px;
  text-align: right;
  padding: 10px;
  border-bottom-style: solid;
  border-bottom-color: darkgrey;
  border-bottom-width: 1px;
}
td {
  width: 1200px;
  text-align: left;
  padding: 10px;
  border-bottom-style: solid;
  border-bottom-color: darkgrey;
  border-bottom-width: 1px;
}
</style>