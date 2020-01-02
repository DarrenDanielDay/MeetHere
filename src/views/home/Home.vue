<template>
  <div>
    <el-row>
      <el-col>
        <venue-pictures :imgs="imgs"></venue-pictures>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="12">
        <news></news>
      </el-col>
      <el-col :span="12">
        <comments :comments="comments"></comments>
      </el-col>
    </el-row> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Comment } from "../../model/entity/comment";
import Component from "vue-class-component";
import Comments from "../../components/homepage/Comments.vue";
import NewsList from "../../components/homepage/NewsList.vue";
import { defaultImages } from "../../util/images";
import VenuePicture from "../../components/homepage/VenuePictures.vue";

@Component({
  components: {
    comments: Comments,
    news: NewsList,
    VenuePictures: VenuePicture
  }
})
class Home extends Vue {
  public comments!: Comment[];
  public imgs!: string[];

  constructor() {
    super();
  }

  public created() {
    this.getRecentComments();
    this.getVenuePictrues();
  }

  public getRecentComments() {
    // todo get newest comments
    this.comments = [Comment._default(), Comment._default()];
  }

  public getVenuePictrues() {
    this.imgs = defaultImages;
    // todo get venue images
  }
}

export default Home;
export { Home };
</script>

<style>
</style>