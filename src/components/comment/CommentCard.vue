<template>
  <div class="comment-card">
    <el-card shadow="hover">
      <template slot="header" style="display: flex;">
        <div style="display:flex; align-items: center;">
          <SmallAvatar :user="comment.user" style></SmallAvatar>
          <div style="margin-left: 10px;">
            <div class="comment-username">
              <span>{{comment.user.nickname}}</span>
            </div>
            <div style="margin: 0;font-size: 12px;">
              <i class="el-icon-time"></i>
              <span :datetime="comment.time" :pubdate="comment.time">{{comment.time}}</span>
            </div>
          </div>
          <div style="flex: 1;text-align: right;">
            <slot></slot>
          </div>
        </div>
      </template>
      <blockquote>
        <pre>
          {{comment.content}}
        </pre>
      </blockquote>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Comment } from '../../model/entity/comment';
import { Prop, Component } from 'vue-property-decorator';
import SmallAvatar from '../user/SmallAvatar.vue';


@Component({
  components:{
    SmallAvatar
  }
})
class CommentCard extends Vue {

  @Prop({
    type: Comment,
    default() {
      return Comment._default();
    }
  })
  public comment!: Comment;

  constructor() {
    super();
  }
}

export { CommentCard };
export default CommentCard;

</script>

<style scoped>
blockquote {
  text-emphasis: e;
  text-align: left;
  margin: 2%;
  padding: 0;
  font-family: georgia, serif;
  font-style: italic;
}
blockquote:before {
  content: "\201C";
  font-size: 40px;
  margin-left: -10px;
  font-family: georgia, serif;
  color: #666666;
}
blockquote p {
  font-size: 14px;
  font-weight: 300;
  /* line-height: 18px; */
  margin-bottom: 0;
  font-style: italic;
}

.comment-card {
  text-align: left;
}

.comment-content {
  text-align: left;
  width: 600px;
}

.comment-username {
  text-align: left;
  color: #ff6600;
  font-weight: bold;
}

.el-card {
  width: 100%;
}
.right-placed {
  float: right;
}
</style>